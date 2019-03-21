import { newE2EPage } from '@stencil/core/testing';

describe('hub-follow-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<hub-follow-button></hub-follow-button>');
    const element = await page.find('hub-follow-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the button', async () => {
    const page = await newE2EPage();

    await page.setContent(`<hub-follow-button clientid='foo'initiativeid='bar'orgurl='baz.maps.arcgis.com'></hub-follow-button>`);
    // const component = await page.find('hub-follow-button');
    // const element = await page.find('hub-follow-button >>> div');
    // expect(component.innerHTML).toEqual('Follow');
  });
});
