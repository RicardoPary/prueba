export class User {
  id: number;
  name: String;
}

export class UserFilter {
  size = 10;
  page = 1;
  field: User = new User();
}
