import {User} from "./user";

export class PortalSession {
  sha256secret?: string;
  peers: User[] = [];

  constructor(sha256secret?: string, peer1?: User, peer2?: User) {
    this.sha256secret = sha256secret;
    if (peer1 instanceof User) {
      this.peers.push(peer1);
    }
    if (peer2 instanceof User) {
      this.peers.push(peer2);
    }
  }
}
