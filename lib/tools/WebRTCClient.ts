type ClientType = 'local' | 'remote';

interface IProp {
  clientType?: ClientType,
  onIcecandidate?: (e: any) => void,
  onIceconnectionstatechange?: (e: Event) => void,
  onTrack?: (e: any) => void;
  onDataChannel?: (e: RTCDataChannelEvent) => void;
  onReceiveMessage?: (e: MessageEvent) => void;
}

export default class WebRTCClient {
  pc: RTCPeerConnection;
  dataChannel: RTCDataChannel | null = null;

  isLocal: boolean;

  constructor({
    clientType = 'local',
    onIcecandidate,
    onIceconnectionstatechange,
    onTrack,
    onDataChannel,
    onReceiveMessage,
  }: IProp) {
    this.isLocal = clientType === 'local';
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.voipbuster.com ',
        },
      ],
    });
    if (onIcecandidate) this.onIcecandidate(onIcecandidate);
    if (onIceconnectionstatechange) this.onIceconnectionstatechange(onIceconnectionstatechange);
    if (onTrack) this.onTrack(onTrack);
    if (onDataChannel) this.onDataChannel(onDataChannel);
    if (onReceiveMessage) this.receiveMessage(onReceiveMessage);
  }

  createDataChannel = () => {
    this.dataChannel = this.pc.createDataChannel('chat');
  }

  onDataChannel = (cb: (e: RTCDataChannelEvent) => void) => {
    this.pc.addEventListener('datachannel', (e) => {
      if (cb) cb(e);
      this.dataChannel = e.channel;
    });
  }

  // icecandidate
  // 包含通信协议(TCP/UDP)和通信IP， STUN和TURN协议中描述网络信息的格式规范 ，解决双方网络链接问题
  onIcecandidate = (cb: (e: RTCPeerConnectionIceEvent) => void) => {
    this.pc?.addEventListener('icecandidate', async (e) => {
      if (cb) cb(e);
    });
  }

  onIceconnectionstatechange = (cb: (e: Event) => void) => {
    this.pc?.addEventListener('iceconnectionstatechange', (e) => {
      if (cb) cb(e);
    });
  }

  onTrack = (cb: (e: any) => void) => {
    this.pc?.addEventListener('track', (e) => {
      if (cb) cb(e);
    });
  }

  addIceCandidate = (candidate: RTCIceCandidate) => {
    this.pc?.addIceCandidate(candidate);
  }

  // SDP
  // 浏览器能力，包括不限于音视频编码格式，带宽，流控策略等
  createOffer = async () => {
    const offer = await this.pc?.createOffer();
    await this.pc?.setLocalDescription(offer);
    return offer;
  }

  createAnswer = async () => {
    const answer = await this.pc?.createAnswer();
    await this.pc?.setLocalDescription(answer);
    return answer;
  }

  saveRemoteDescription = async (des: any) => {
    await this.pc?.setRemoteDescription(des);
  }

  // track
  addTrack = (track: MediaStreamTrack, localStream: MediaStream) => {
    this.pc?.addTrack(track, localStream);
  }

  sendMessage = (message: string) => {
    this.dataChannel?.send(message);
  }

  receiveMessage = (cb: (e: MessageEvent) => void) => {
    this.dataChannel?.addEventListener('message', (e) => {
      if (cb) cb(e);
    });
  }
}
