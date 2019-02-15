import { newE2EPage } from '@stencil/core/testing';

describe('hub-follow-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<hub-follow-button></hub-follow-button>');
    const element = await page.find('hub-follow-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<hub-follow-button></hub-follow-button>');
    const component = await page.find('hub-follow-button');
    const element = await page.find('hub-follow-button >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
