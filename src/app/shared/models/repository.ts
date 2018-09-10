export class Repository {
  username: String;
}

export class RepositoryFilter {
  size = 8;
  page = 1;
  repository: Repository = new Repository();
}
