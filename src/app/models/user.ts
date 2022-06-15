
export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string | null,
    public secretKey: string | null,
  ) {}
}
