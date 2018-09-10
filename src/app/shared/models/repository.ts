export class Repository {
  username: String;
}

export class RepositoryFilter {
  size = 6;
  page = 1;
  repository: Repository = new Repository();
}
