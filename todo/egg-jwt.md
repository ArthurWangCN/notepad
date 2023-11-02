# 使用egg-jwt进行路由鉴权以及登录、注册接口的实现

## 注册api

![注册](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cfe32dbbdfa4b63ade07f4c4bc1efb0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=780&h=1028&s=38170&e=jpg&b=ffffff)

根据上面的流程， 我们来实现基本的注册能力

### Controller
首先我们来新建一个控制器user, 用来处理用户相关的操作

在控制器内我们需要做几件事

1. 获取到路由提交的用户名和密码 （注册我们一般适用post提交， 所以此处我们使用query抓取参数）
2. 用获取的用户名和密码调用数据库查询 （数据库相关的操作我们放在service下，我们此处可以先进行调用）
3. 返回信息 （先将查询后的result直接返回）

```js
const { Controller } = require('egg');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.query;
    const body = {
      code: 200,
      msg: '注册成功',
    };
    const result = await ctx.service.user.getUserByName(username);
    if (!result) {
      const res = await ctx.service.user.register({ username, password });
      if (res.affectedRows === 1) {
        body.code = 200;
        body.msg = '注册成功';
      } else {
        body.code = 500;
        body.msg = '注册失败';
      }
    } else {
      // 用户名已注册
      body.code = 500;
      body.msg = '用户名已注册';
    }
    ctx.body = body;
  }
}

module.exports = UserController;
```

代码里面，我们先调用getUserByName查询用户名是否呢已经注册， 根据结果我们才进行数据的添加注册

### Service

根据上面控制器以及注册流程， 我们在seivice里面需要提供两个方法，分别处理

1. 根据username字段查询用户名是否已经注册
2. 注册功能，也就是数据插入

创建app/service/user.js进行数据库相关的操作

```js
const { Service } = require('egg');

class UserService extends Service {
  // 根据username字段查询用户信息
  async getUserByName(username) {
    const { app } = this;
    const result = await app.mysql.get('user', { username });
    return result;
  }
  // 注册
  async register(params) {
    const { app } = this;
    const { username, password } = params;
    const ctime = new Date();
    const result = await app.mysql.insert('user', { username, password, ctime });
    return result;
  }
}

module.exports = UserService;
```

### 路由
最后我们来创建一个注册的路由

```js
module.exports = app => {
  const { router, controller } = app;
  // 注册
  router.post('/register', controller.user.register);
};
```

## 登录

![登录](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/111e23dae78443de9995c37a83fd3a2b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=244&h=606&s=15747&e=jpg&b=fefefe)

### 安装egga-jwt

```shell
npm add egg-jwt --save
```

注册插件

```js
module.exports = {
  ...
    jwt: {
  enable: true,
    package: 'egg-jwt',
    },
    ...
}
```

配置

```js
config.jwt = {
  secret: '123456', // 自定义的密钥字段
};
```

### 登录api

首先我们在app/controller/user.js 中定一个login controller , 来实现登录相关的逻辑

```js
class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.query;
    const body = {
      code: 200,
      msg: '登录成功',
      data: {},
    };
    const userinfo = await ctx.service.user.getUserByName(username);
    if (userinfo && userinfo.password === password) {
      // 200
      body.code = 200;
      body.msg = '登录成功';
    } else if (userinfo && userinfo.password !== password) {
      // password error
      body.code = 401;
      body.msg = '密码错误';
    } else {
      // 用户不存在
      body.code = 401;
      body.msg = '用户不存在';
    }
    ctx.body = body;
  }
}
```

通过ctx.query抓取到用户提交的信息 username  `` password , 然后根据 username 去数据库 user表中查询相关用户信息， 进行对比。

以下我们定义 getUserByName 方法， 用来根据 username 去数据库 user表中查询相关用户信息

```js
class UserService extends Service {

  async getUserByName(username) {
    const { app } = this;
    const result = await app.mysql.get('user', { username });
    return result;
  }
}
```

此处我们已经实现了基本的login 接口， 但登陆成功后， 我们需要返回token， 提供给前台， 用来进行后续接口请求的鉴权。

在上面的login 方法中继续补充token 返回

```js
body.data.token = app.jwt.sign({
  ...userinfo,
  time: Date.now(),
}, app.config.jwt.secret);
```

我们用当前时间生成token, 方便我们后面对比。此处需要说明我们在config中声明的变量， 在运行时都会挂载到app中的config字段上。

## 鉴权中间件

接下来我们需要思考一个问题， token生成后如何实现接口鉴权？

思路其实都是一样的， 就是在请求的接口中抓取token字段， 进行解析， 然后对比是否有效， 但具体如何实现才能更高效、简单呢？

前面我们在实现api的时候在每一个 Controller也就是接口的实现内都可以访问到ctx， 此时我们进行token 的判断， 也可以实现接口的鉴权， 但问题是， 这样写在每一个接口的实现内， 效率太低， 同时不方便维护。

此时， 我们就需要用到middleware 中间件， 在egg中我们需要开发中间件的时候只需要在 app/middleware/下直接新建就可以自动挂载到app上

接下来我们实现路有鉴权的中间件

```js
module.exports = () => {
  return async function jwterror(ctx, next) {
    const { app, header: { token } } = ctx;
    if (!token) {
      ctx.body = {
        msg: '缺少token',
        code: 401,
      };
      return;
    }
    try {
      const userinfo = app.jwt.verify(token, app.config.jwt.secret);
      console.log(userinfo);
      await next();
    } catch (error) {
      ctx.body = {
        msg: 'token已过期，请重新登录',
        code: 401,
      };
    }

  };
};
```

抓取到 header 中的token 字段后， 我们调用 jwt.verify() 来进行解析。获取到 userinfo 之后我们只需要对比一下是否生效就可以了， 此处对比根据需求自行实现。

中间件实现后， 具体如何调用， 常见的会有两种方式

1、全局

也就是挂载到全局， 会在所有的路由上生效。

具体就是 在config/config.default.js中定义

```js
config.middleware = [ 'jwterror' ];
```

2、按需

但有时候我们又不是所有的路由都需要鉴权， 就比如登录、注册。 前面说了middleware会挂载到app上， 所以我们在定义路有的时候在需要的路由上进行调用就可以了

```js
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwterror = middleware.jwterror();

  
  router.get('/list', jwterror, controller.account.list);
};
```

需要注意的是，middleware挂载的是定义的jwterror方法， 执行后return 出来的是内部的jwterror 函数。
