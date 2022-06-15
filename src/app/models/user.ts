export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string | null,
    public secret_key: string | null,
    public public_key: CryptoKey,
  ) {}
}
