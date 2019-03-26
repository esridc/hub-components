import { newE2EPage } from '@stencil/core/testing';

describe('hub-event-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<hub-event-details></hub-event-details>');
    const element = await page.find('hub-event-details');
    expect(element).toHaveClass('hydrated');
  });

  // it('renders changes to the button', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent(`<hub-follow-initiative clientid='foo'initiativeid='bar'orgurl='baz.maps.arcgis.com'></hub-follow-initiative>`);
  //   const component = await page.find('hub-follow-initiative');
  //   const element = await page.find('hub-follow-initiative >>> div');
  //   expect(component).toEqual(component);
  //   expect(element).toEqual(element);
  // });
});
