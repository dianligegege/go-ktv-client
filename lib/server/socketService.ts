import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket?: Socket;
  private url?: string;
  private option?: object;

  public connect(url: string, option: object) {
    if (this.socket && this.url === url && Object.is(option, this.option)) return this.socket;
    this.url = url;
    this.option = option;
    this.socket = io(this.url, this.option);
    this.setupEventHandlers();
  }

  // 断开链接
  public disconnect() {
    this.socket?.disconnect();
  }

  private setupEventHandlers() {
    this.socket?.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket?.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  public emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    if (callback) {
      this.socket?.off(event, callback);
    } else {
      this.socket?.off(event);
    }
  }
}

export const socketClient = new SocketService();