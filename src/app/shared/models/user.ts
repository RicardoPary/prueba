export class User {
  id: number;
  name: String;
}

export class UserFilter {
  size = 8;
  page = 1;
  user: User = new User();
}
