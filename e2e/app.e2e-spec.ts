import { LindenmayerSystemsGeneratorPage } from './app.po';

describe('lindenmayer-systems-generator App', function() {
  let page: LindenmayerSystemsGeneratorPage;

  beforeEach(() => {
    page = new LindenmayerSystemsGeneratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
