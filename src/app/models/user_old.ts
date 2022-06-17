function generatePublicKey(length: number): string {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export class User {

  private readonly _public_key: string;
  private _friends?: Array<User>;
  private _private_key: string;
  constructor(
    public _username: string,
    private _password: string,
    private _email: string | null
  ) {
    this._friends = new Array<User>();
    this._public_key = generatePublicKey(12);
    this._private_key = 'private-key'
  }



  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string | null {
    return this._email;
  }

  set email(value: string | null) {
    this._email = value;
  }

  get public_key(): string{
    return this._public_key;
  }

  get friends(): Array<User> {
    // @ts-ignore
    return this._friends;
  }

  set friends(friends: Array<User>) {
    this._friends = friends;
  }


}
