登录时需要把密码进行RSA加密传给后端，后端已经给了公钥密钥，前端需要利用这个密钥进行加密传给后端:

```bash
npm install jsencrypt
```

```js
import { JSEncrypt } from 'jsencrypt'
```

```js
// 登录
function submit() {
  loading.value = true
  // 新建一个JSEncrypt对象
  let encryptor = new JSEncrypt()
  // 设置公钥 （这是后端直接给我的，看你们项目情况是需要调接口获得，还是程序中直接写死）
  let publicKey = 'KoZIhvcNAQwxOggaWPsYQJT+kpWZ/SpshZzmB=='
  encryptor.setPublicKey(publicKey) // publicKey为公钥
  // 加密数据
  password.value = encryptor.encrypt(form.value.password)
//调用登录接口 （已经封装了axios）
  login({
    accountNumber: form.value.suAccount,
    kaptcha: form.value.validation,
    password: password.value,
    sign: sign.value,
  }).then((res) => {
    loading.value = false
    if (res.code === 200) {
      message.success(res.msg)
      // 存储token
      Cookies.set('token', res.data.token)
      router.push({ name: 'home' })
      sessionStorage.removeItem('sign')
    }
  })
}

```
