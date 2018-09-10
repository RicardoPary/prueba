import { CardModule } from '../../app/shared/modules/card/card.module';

describe('CardModule', () => {
  let cardModule: CardModule;

  beforeEach(() => {
    cardModule = new CardModule();
  });

  it('should create an instance', () => {
    expect(cardModule).toBeTruthy();
  });
});
