export interface User {
  username: string;
  password?: string;
  email?: string;
  public_key?: string;
  friends: Array<User>;
  private_key?: string;
}
