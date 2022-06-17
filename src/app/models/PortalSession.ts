import {User} from "./user";

export class PortalSession {
  sha256secret?: string;
  connected: boolean = false;
  peer1: User;
  peer2: User;

  constructor(peer1: User, peer2: User, sha256secret: string) {
    this.sha256secret = sha256secret;
    this.peer1 = peer1;
    this.peer2 = peer2;
  }

  connect(user: User, secretKey: string){
    // test connection,
    this.connected = true;
  }

  disconnect(user: User){
    this.connected = false;
  }

  newPortal(user: User, secretKey: string){

  }
}
