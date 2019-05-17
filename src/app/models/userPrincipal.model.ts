export class UserPrincipal {

  username: string;

  roles: string[];

  token: string;

  userId: BigInteger;

  constructor(username: string, roles: string[], token: string, userId: BigInteger) {
    this.username = username;
    this.roles = roles;
    this.token = token;
    this.userId = userId;
  }

}
