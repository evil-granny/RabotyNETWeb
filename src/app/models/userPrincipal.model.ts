export class UserPrincipal {

  constructor(username: string, roles: string[], token: string, userId: number) {
    this.username = username;
    this.roles = roles;
    this.token = token;
  }

  username: string;

  roles: string[];

  token: string;

  userId: number;
}
