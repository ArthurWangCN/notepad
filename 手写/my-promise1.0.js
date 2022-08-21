const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks && this.onFulfilledCallbacks.forEach(onFulfilled => {
        onFulfilled(value);
      })
    }
    const reject = reason => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks && this.onRejectedCallbacks.forEach(onRejected => {
        onRejected(reason);
      })
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject('xxx')
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      typeof onFulfilled === 'function' && setTimeout(() => {
        onFulfilled(this.value)
      }, 0);
    } else if (this.state === REJECTED) {
      typeof onRejected === 'function' && setTimeout(() => {
        onRejected(this.reason)
      }, 0);
    } else {
      console.log('pending...');
      if (typeof onFulfilled === 'function') {
        this.onFulfilledCallbacks.push(value => setTimeout(() => {
          onFulfilled(value);
        }, 0))
      }
      if (typeof onRejected === 'function') {
        this.onRejectedCallbacks.push(reason => setTimeout(() => {
          onRejected(reason)
        }, 0))
      }
    }
  }
}
