import { newE2EPage } from '@stencil/core/testing';
import {} from 'jest';
import { HubFollowInitiative } from './follow-initiative';
import { UserSession } from "@esri/arcgis-rest-auth";
import * as hubInitiatives from "@esri/hub-initiatives";

describe('hub-follow-initiative', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<hub-follow-initiative></hub-follow-initiative>');
    // casting to HTMLElement throws an error
    const element:any = await page.find('hub-follow-initiative');
    expect(element).toHaveClass('hydrated');
    const button = element.querySelector('button')
    expect(button.innerHTML).toBe(`<svg draggable=\"auto\" class=\"follow-icon\" viewbox=\"0 0 120 120\" width=\"100%\" height=\"100%\"><circle cx=\"18.385\" cy=\"101.615\" r=\"18.385\"></circle><path d=\"M-1.031 61c32.533 0 59 26.468 59 59s-26.467 59-59 59-59-26.468-59-59 26.467-59 59-59m0-23c-45.288 0-82 36.713-82 82s36.712 82 82 82 82-36.713 82-82-36.712-82-82-82z\"></path><path d=\"M.154 23.041c53.349 0 96.75 43.402 96.75 96.75s-43.402 96.75-96.75 96.75-96.75-43.402-96.75-96.75 43.402-96.75 96.75-96.75m0-23c-66.136 0-119.75 53.615-119.75 119.75s53.614 119.75 119.75 119.75c66.135 0 119.75-53.615 119.75-119.75S66.289.041.154.041z\"></path></svg>Follow Our Initiative`);
  });

  it('should start doing stuff when folks click on the button', () => {
    jest.mock('@esri/arcgis-rest-auth');

    const serialize = jest.fn(() => 'notarealsession');
    const tokenExpires = new Date(2019, 1, 1);
    (UserSession.beginOAuth2 as any).mockResolvedValue({ serialize, tokenExpires });

    // UserSession.beginOAuth2.mockResolvedValue({
    //   clientId:"QVQNb3XfDzoboWS0",username:"jagravois51",token:"fake",
    //   tokenExpires:"2019-04-19T20:06:24.213Z",
    //   portal:"https://cityx.maps.arcgis.com/sharing/rest",
    //   ssl:true,
    //   tokenDuration:20160,
    //   refreshTokenTTL:1440
    // });

    // spyOn(hubInitiatives, "followInitiative").and.returnValue(
    //   new Promise(resolve => {
    //     resolve({
    //       success: true,
    //       username:"jagravois51"
    //     });
    //   })
    // );

    const follow = new HubFollowInitiative();
    follow.triggerFollow().then(response => {
        expect(response).toBe(true);
      })
  });
});
