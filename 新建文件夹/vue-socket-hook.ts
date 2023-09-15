import type { Ref } from "vue";
import { computed, ref, unref, watch } from "vue";
import { useDocumentVisibility, useNetwork } from "@vueuse/core";
import dayjs from "dayjs";
import { useLoginStore } from "@/stores/login";

const isInIframe = (): boolean => {
  // 判断当前页面是否在iframe内部
  if (window.self !== window.top) {
    return true;
  }
  return false;
};

enum SocketStatus {
  // 连接中
  connect,
  // 连接成功
  open,
  // 连接关闭中
  closeing,
  // 连接已关闭
  closed,
}

class Socket {
  reconnectStatus: boolean;
  reconnectTimer: any;
  heartBeatTimer: any;
  serverReplyTimer: any;
  options: any;
  _socket: any;
  data: Ref<any>;

  constructor(options: any) {
    const defaultOption = {
      // 是否开启重连
      reconnect: true,
      // 重连的时间
      reconnectTime: 3000,
      // 心跳时间间隔
      beatTime: 10000,
    };
    // 重新连接状态
    this.reconnectStatus = false;
    // 重新连接的定时器
    this.reconnectTimer = undefined;
    // 合并默认参数及传入参数
    this.options = Object.assign({}, defaultOption, options);
    // socket实例
    this._socket = null;
    // 心跳的循环定时器
    this.heartBeatTimer = undefined;
    // 检测心跳是否回来消息的定时器
    this.serverReplyTimer = undefined;
    this.data = ref<any>();
    this._createSocket();
  }

  // 初始化方法
  _inits() {
    this._socket.onopen = () => {
      // open被触发,那么证明连接上了,就清除重连的定时器
      this.reconnectTimer && clearInterval(this.reconnectTimer);
      // 将重连的状态置为未在重连
      this.reconnectStatus = false;
      // 连接成功,开始心跳
      this.startHeartBeat();
      // 派发一个连接成功的事件出去
      // console.log('socket连接成功 :', event, dayjs().format('YYYY-MM-DD HH:mm:ss'));
    };
    this._socket.onmessage = (event: any) => {
      // 如果是心跳包的回复,那么就不派发事件,并且清除心跳包是否回复的定时器,等待赋值新的定时器
      const d = JSON.parse(event.data);
      if (d.cmd === "socket.ping") {
        clearTimeout(this.serverReplyTimer);
        return;
      }
      if (d.event === "socket.open") {
        console.log("socket.open", dayjs().format("YYYY-MM-DD HH:mm:ss"));
      }
      // 将事件派发出去
      this.data.value = event.data;
      // this.$emit(SOCKET_EVENTS.socket_message, event);
    };
    this._socket.onclose = (event: any) => {
      // 派发socket关闭事件
      console.log("socket关闭 :", event, dayjs().format("YYYY-MM-DD HH:mm:ss"));
      // wasClean表示是否正常关闭,如果非正常关闭,那么开始重连
      if (!event.wasClean) {
        this.close();
        this.reconnect();
      }
    };
    this._socket.onerror = () => {
      // 派发错误信息事件
      // console.log('socket错误 :', event);
    };
  }

  // 创建连接
  _createSocket() {
    this.close();
    this._socket = new window.WebSocket(this.options.host);
    this._inits();
  }

  // 重连机制
  reconnect() {
    /**
     * 重连的几种情况:
     *      1. 单独触发onclose事件的重连
     *            1.1 第一次连接直接失败触发
     *            1.2 开启重连后,重连失败触发
     *      2. 单独触发心跳包未收到回复的重连
     *      3. 心跳包未收到回复同时onclose事件也被触发的重连
     * 为了避免同时开启多个重连,所以需要一个全局的状态,来判断是否已经在重连中,如果已经在重连中,那么就不再开启重连
     */
    if (this.reconnectStatus) {
      return;
    }
    // 将重连状态置为正在重连中
    this.reconnectStatus = true;
    // 开始重连,关闭心跳包发送
    clearInterval(this.heartBeatTimer);
    clearTimeout(this.serverReplyTimer);
    // 第一次进来直接重连
    if (!this.reconnectTimer) {
      this._createSocket();
    }
    // 并且创建一个循环定时器,准备进行多次重连
    this.reconnectTimer = setInterval(() => {
      // 因为会存在定时器执行的时间比上一次重连结果的返回还要快的情况，所以要做判断
      // 如果上一次重连失败了，那么才会进行再次重连；保证一次重连动作完成之后才能进行下次重连
      if (this._socket.readyState === SocketStatus.closed) {
        this._createSocket();
      }
    }, this.options.reconnectTime);
  }

  // 开启心跳
  startHeartBeat() {
    // 开启循环发送心跳包
    this.heartBeatTimer = setInterval(() => {
      this.send(JSON.stringify({ cmd: "socket.ping" }));
      // 如果在规定时间内,没有收到回复,那么断定失去连接,开启重连
      this.serverReplyTimer = setTimeout(() => {
        this.reconnect();
      }, this.options.beatTime);
    }, this.options.beatTime);
  }

  // 发送信息
  send(msg: string) {
    if (this._socket.readyState === SocketStatus.open) {
      this._socket?.send(msg);
    }
  }

  // 关闭socket
  close() {
    // 主动断开，关闭心跳包发送
    this.heartBeatTimer && clearInterval(this.heartBeatTimer);
    this.serverReplyTimer && clearTimeout(this.serverReplyTimer);
    this.reconnectTimer && clearInterval(this.reconnectTimer);
    this.reconnectStatus = false;
    this._socket?.close();
  }

  // 获取socket实例对象
  getSocket() {
    return this._socket;
  }
}

export const useGlobalWebSocketBack = () => {
  let ws: any;

  const _isInIframe = isInIframe();

  const loginStore = useLoginStore();

  const wsUrl = computed<string>(() => {
    const { token } = loginStore;
    // const negotiateToken = getNegotiateCookie("token"); // 协商token
    let _wsUrl = "";

    // if (isOutside && negotiateToken) {
    //   _wsUrl = `${import.meta.env.VITE_SOCKET_URL}?token=${negotiateToken}`;
    // }

    // if (!isOutside && token) {
    //   _wsUrl = `${import.meta.env.VITE_SOCKET_URL}?token=${token}`;
    // }

    _wsUrl = `${import.meta.env.VITE_SOCKET_URL}?token=${token}`;

    return _wsUrl;
  });
  if (_isInIframe) return;

  if (unref(wsUrl)) {
    ws = new Socket({ host: wsUrl.value });
  }
  // 监听网络状态，断网了之后关闭，连网后重连
  const { isOnline } = useNetwork();
  watch(isOnline, (_isOnline) => {
    if (_isInIframe) return;
    if (_isOnline) {
      console.log("网络连接成功", dayjs().format("YYYY-MM-DD HH:mm:ss"));
      ws?.close();
      ws?._createSocket();
    } else {
      ws?.close();
    }
  });
  const visible = useDocumentVisibility();
  watch(visible, (current, previous) => {
    if (current === "visible" && previous === "hidden") {
      // console.log('打开页面', dayjs().format('YYYY-MM-DD HH:mm:ss'));
      const localTime = Number(
        localStorage.getItem("DFQ_CONTRACT_SOCKET_TIME"),
      );
      const nowTime = Date.now();
      const m = Math.ceil((nowTime - localTime) / (1000 * 60));
      // console.log(`页面隐藏了：${m}分钟`);
      if (m > 5) {
        ws?.close();
        ws?._createSocket();
        // console.log('网络连接成功了', dayjs().format('YYYY-MM-DD HH:mm:ss'));
      }
    } else {
      // localStorage.setItem('DFQ_CONTRACT_SOCKET_TIME', String(Date.now()));
      console.log("关闭页面", dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }
  });
  return ws;
};
