如果你有 **多个 Axios 请求**，你可以使用 **`AbortController`** 或 **管理多个 `CancelToken`**（不推荐，因其已废弃）来终止所有请求。以下是不同的实现方式：

---

## **1. 使用 `AbortController` 终止多个请求（推荐 ✅）**
你可以 **使用一个 `AbortController` 实例** 来管理多个请求，同时终止它们。

### **示例**
```ts
const controller = new AbortController(); // 创建控制器
const signal = controller.signal; // 获取 signal

// 发送多个请求
axios.get('https://api.example.com/data1', { signal }).catch(handleCancel);
axios.get('https://api.example.com/data2', { signal }).catch(handleCancel);
axios.post('https://api.example.com/data3', { signal }).catch(handleCancel);

// 处理请求取消
function handleCancel(error: any) {
  if (axios.isCancel(error)) {
    console.log('请求被取消:', error.message);
  } else {
    console.error('请求失败:', error);
  }
}

// 2 秒后取消所有请求
setTimeout(() => {
  controller.abort(); // 终止所有请求
  console.log('所有请求已终止');
}, 2000);
```

### **原理**
- 传入同一个 `signal` 给多个请求。
- 调用 `controller.abort()` **一次性终止所有绑定的请求**。

---

## **2. 在 Vue 3 中管理多个请求**
如果你在 Vue 3 组件中发送多个请求，可以在 `onUnmounted` 时取消所有请求，避免组件销毁后仍在执行网络请求。

### **示例**
```ts
import { ref, onUnmounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const data1 = ref(null);
    const data2 = ref(null);
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get('https://api.example.com/data1', { signal: controller.signal }),
          axios.get('https://api.example.com/data2', { signal: controller.signal }),
        ]);
        data1.value = res1.data;
        data2.value = res2.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('请求被取消');
        } else {
          console.error('请求失败:', error);
        }
      }
    };

    fetchData();

    onUnmounted(() => {
      controller.abort(); // 组件销毁时终止所有请求
    });

    return { data1, data2 };
  }
};
```

### **原理**
- 组件销毁时，`onUnmounted` 触发 `controller.abort()` 终止所有请求，防止内存泄漏。
- `Promise.all([])` 可以并行发送多个请求，提高效率。

---

## **3. 使用多个 `AbortController`（针对不同场景）**
如果你想有更细粒度的控制，可以为不同的请求分配 **不同的 `AbortController`**。

### **示例**
```ts
const controller1 = new AbortController();
const controller2 = new AbortController();

// 发送不同的请求
axios.get('https://api.example.com/user', { signal: controller1.signal }).catch(handleCancel);
axios.get('https://api.example.com/orders', { signal: controller2.signal }).catch(handleCancel);

// 只终止某个请求
setTimeout(() => {
  controller1.abort(); // 只终止 user 请求
  console.log('用户信息请求已终止');
}, 1000);

// 之后再终止另一个请求
setTimeout(() => {
  controller2.abort(); // 终止 orders 请求
  console.log('订单信息请求已终止');
}, 2000);
```

### **适用场景**
- 需要 **独立控制** 不同的请求（比如有些请求要保持，有些要取消）。

---

## **4. 使用 `CancelToken` 终止多个请求（已废弃 ❌ 不推荐）**
在 `axios@0.22.0` 之前，你可以使用 `CancelToken`（已废弃）来管理多个请求。

### **示例**
```ts
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('https://api.example.com/data1', { cancelToken: source.token }).catch(handleCancel);
axios.get('https://api.example.com/data2', { cancelToken: source.token }).catch(handleCancel);

// 取消所有请求
setTimeout(() => {
  source.cancel('手动取消请求');
}, 2000);
```

### **⚠️ 注意**
- `CancelToken` **已被 `AbortController` 取代**，官方不再维护。
- 新项目建议 **完全使用 `AbortController`**。

---

## **总结**
| 方法 | 适用场景 | 是否推荐 |
|------|--------|--------|
| **使用 `AbortController`（全局）** | 终止所有请求 | ✅ 推荐 |
| **使用 `AbortController`（细粒度控制）** | 终止特定请求 | ✅ 推荐 |
| **在 Vue 组件中 `onUnmounted` 取消** | 组件卸载时取消请求 | ✅ 推荐 |
| **使用 `CancelToken`** | 旧版 `axios` | ❌ 已废弃 |

👉 **最佳实践**：
- **全局终止多个请求** → **使用 `AbortController`**。
- **Vue 组件卸载时终止请求** → **在 `onUnmounted` 中调用 `controller.abort()`**。
- **对不同请求独立管理** → **创建多个 `AbortController`**。

这样可以确保请求管理更加高效，同时避免内存泄漏！🚀
