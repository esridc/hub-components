import { newE2EPage } from '@stencil/core/testing';

import { HubButton } from './hub-button';

describe('hub-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`<hub-button text="click me!"></hub-button>`);
    const element = await page.find('hub-button');
    expect(element).toHaveClass('hydrated');
    expect(element.innerText).toBe('click me!');
  });

  it('should do something when folks click on the button', () => {
    const hub = new HubButton();
    expect(hub.text).toEqual(undefined);
    expect(hub.action()).toEqual('foo');
  });
});
