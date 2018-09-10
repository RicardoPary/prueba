import { RepositoriesModule } from '../../app/pages/repositories/repositories.module';

describe('RepositoriesModule', () => {
  let repositoriesModule: RepositoriesModule;

  beforeEach(() => {
    repositoriesModule = new RepositoriesModule();
  });

  it('should create an instance', () => {
    expect(repositoriesModule).toBeTruthy();
  });
});
