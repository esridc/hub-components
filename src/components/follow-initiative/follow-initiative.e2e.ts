import { newE2EPage } from '@stencil/core/testing';
import { HubFollowInitiative } from './follow-initiative';
import { followInitiative, unfollowInitiative } from "@esri/hub-initiatives";

const TOMORROW = (function() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return now;
})();

describe('hub-follow-initiative', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`<hub-follow-initiative
      clientid="QVQNb3XfDzoboWS0"
      initiativeid="dda4e76677604838bf5718eda40b1cc0"
      orgurl="https://cityx.maps.arcgis.com">
    </hub-follow-initiative>`);
    // casting to HTMLElement throws an error
    const element:any = await page.find('hub-follow-initiative');
    expect(element).toHaveClass('hydrated');
    const button = element.querySelector('button')
    expect(button.innerHTML).toBe(`<svg draggable=\"auto\" class=\"follow-icon\" viewbox=\"0 0 120 120\" width=\"100%\" height=\"100%\"><circle cx=\"18.385\" cy=\"101.615\" r=\"18.385\"></circle><path d=\"M-1.031 61c32.533 0 59 26.468 59 59s-26.467 59-59 59-59-26.468-59-59 26.467-59 59-59m0-23c-45.288 0-82 36.713-82 82s36.712 82 82 82 82-36.713 82-82-36.712-82-82-82z\"></path><path d=\"M.154 23.041c53.349 0 96.75 43.402 96.75 96.75s-43.402 96.75-96.75 96.75-96.75-43.402-96.75-96.75 43.402-96.75 96.75-96.75m0-23c-66.136 0-119.75 53.615-119.75 119.75s53.614 119.75 119.75 119.75c66.135 0 119.75-53.615 119.75-119.75S66.289.041.154.041z\"></path></svg>Follow Our Initiative`);
  });

  it('should issue a follow request when folks click on the button', () => {
    const hubFollowInitiative = new HubFollowInitiative();

    const initId = "dda4e76677604838bf5718eda40b1cc0";
    hubFollowInitiative.initiativeid = initId;
    hubFollowInitiative.session = `{
      "username": "casey",
      "portal": "https://www.arcgis.com/sharing/rest/",
      "token": "fake-token",
      "tokenExpires": ${TOMORROW.getTime()}
    }`;

    return hubFollowInitiative.toggleFollow()
      .then(response => {
        expect((followInitiative as any).mock.calls.length).toBe(1);
        expect((followInitiative as any).mock.calls[0][0].initiativeId).toBe(initId);
        expect((followInitiative as any).mock.calls[0][0].authentication.username).toBe("casey");
        expect(response.success).toBe(true);
        expect(hubFollowInitiative.following).toBe(true);
        expect(hubFollowInitiative.callToActionText).toBe("Unfollow Our Initiative");
      })
  });

  it('should issue an unfollow request if the person was already following', () => {
    const hubFollowInitiative = new HubFollowInitiative();

    const initId = "dda4e76677604838bf5718eda40b1cc0";
    hubFollowInitiative.initiativeid = initId;
    hubFollowInitiative.following = true;

    hubFollowInitiative.session = `{
      "username": "casey",
      "portal": "https://www.arcgis.com/sharing/rest/",
      "token": "fake-token",
      "tokenExpires": ${TOMORROW.getTime()}
    }`;

    return hubFollowInitiative.toggleFollow()
      .then(response => {
        expect((unfollowInitiative as any).mock.calls.length).toBe(1);
        expect((unfollowInitiative as any).mock.calls[0][0].initiativeId).toBe(initId);
        expect((unfollowInitiative as any).mock.calls[0][0].authentication.username).toBe("casey");
        expect(response.success).toBe(true);
        expect(hubFollowInitiative.following).toBe(false);
        expect(hubFollowInitiative.callToActionText).toBe("Follow Our Initiative");
      })
  });
});

