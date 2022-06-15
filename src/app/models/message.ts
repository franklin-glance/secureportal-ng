export class Message {
  from_user: string;
  from_key: string;
  timestamp?: string;
  content?: string;
  constructor(from_user: string, from_key : string, content?: string, timestamp?: string) {
    this.from_user = from_user;
    this.from_key = from_key;
    this.content = content;
    this.timestamp = timestamp;
  }
}
