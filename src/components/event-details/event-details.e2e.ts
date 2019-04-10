import { newE2EPage } from '@stencil/core/testing';
import { HubEventDetails } from './event-details';
import { registerForEvent, unregisterForEvent } from "@esri/hub-events";

const TOMORROW = (function() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return now;
})();

describe('hub-event-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`<hub-event-details
      clientid="QVQNb3XfDzoboWS0"
      eventtitle="meeting of the badger platoon"
      orgurl="https://cityx.maps.arcgis.com">
    </hub-event-details>`);
    // casting to HTMLElement throws an error
    const element:any = await page.find('hub-event-details');
    expect(element).toHaveClass('hydrated');
    const button = element.querySelector('button')
    expect(button.innerHTML).toBe(`Attend`);
  });

  it('should issue a follow request when folks click on the button', () => {
    const hubEventDetails = new HubEventDetails();

    const eventGroupId = "dda4e7";
    hubEventDetails.eventGroupId = eventGroupId;

    hubEventDetails.session = `{
      "username": "casey",
      "portal": "https://www.arcgis.com/sharing/rest/",
      "token": "fake-token",
      "tokenExpires": ${TOMORROW.getTime()}
    }`;

    return hubEventDetails.toggleRegister()
      .then(response => {
        expect((registerForEvent as any).mock.calls.length).toBe(1);
        expect((registerForEvent as any).mock.calls[0][0].groupId).toBe(eventGroupId);
        expect((registerForEvent as any).mock.calls[0][0].authentication.username).toBe("casey");
        expect(response.success).toBe(true);
        expect(hubEventDetails.attending).toBe(true);
        expect(hubEventDetails.callToActionText).toBe("Attending");
      })
  });

  it('should issue an unfollow request if the person was already following', () => {
    const hubEventDetails = new HubEventDetails();

    const eventGroupId = "dda4e7";
    hubEventDetails.eventGroupId = eventGroupId;
    hubEventDetails.attending = true;

    hubEventDetails.session = `{
      "username": "casey",
      "portal": "https://www.arcgis.com/sharing/rest/",
      "token": "fake-token",
      "tokenExpires": ${TOMORROW.getTime()}
    }`;

    return hubEventDetails.toggleRegister()
      .then(response => {
        expect((unregisterForEvent as any).mock.calls.length).toBe(1);
        expect((unregisterForEvent as any).mock.calls[0][0].groupId).toBe(eventGroupId);
        expect((unregisterForEvent as any).mock.calls[0][0].authentication.username).toBe("casey");
        expect(response.success).toBe(true);
        expect(hubEventDetails.attending).toBe(false);
        expect(hubEventDetails.callToActionText).toBe("Attend");
      })
  });
});
