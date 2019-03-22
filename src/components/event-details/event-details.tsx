import { Component, Prop, State } from '@stencil/core';
import { UserSession } from '@esri/arcgis-rest-auth';
import { IUser } from '@esri/arcgis-rest-common-types';

// import { searchEvents, registerForEvent } from '@esri/hub-events';

@Component({
  tag: 'hub-event-details',
  styleUrl: 'event-details.css'
})

/*
to do:
  design/layout card
  hydrate card with event metadata
  write logic in hub.js to register
  use it here
*/
export class HubEventDetails {
  /**
   * ClientID to identify the app launching auth
   */
  @Prop() clientid: string;

  /**
   * identifier for the ArcGIS Hub initiative
   */
  @Prop() eventid: string;

  /**
   * url of the ArcGIS Online organization
   */
  @Prop() orgurl: string = `https://www.arcgis.com`;

  /**
   * User metadata
   */
  @Prop({ mutable: true }) user: IUser;

  /**
   * Authentication info.
   */
  @Prop({ mutable: true }) session: UserSession;

  /**
   * Text to display on the button
   */
  @State() callToActionText: string = "Attend";

  triggerRegister = () => {
    this.callToActionText === "Attend" ? this.callToActionText = "Attending" : this.callToActionText = "Attend";
    // searchEvents({
    //   url: ""
    // })
    //   .then(() => {
    //     if (!this.session) {
    //       // register your own app to create a unique clientId
    //       UserSession.beginOAuth2({
    //         clientId: this.clientid,
    //         portal: `${this.orgurl}/sharing/rest`,
    //         redirectUri: `${window.location}authenticate.html`
    //       })
    //         .then(session => {
    //             this.session = session;
    //             registerForEvent({
    //               eventId: this.eventid,
    //               authentication: this.session
    //             })
    //               .then(response => {
    //                 console.log(response);
    //               })
    //         })
    //       }
    //   })
  }

  render() {
    return <div class="event-details-component">
      <hub-button
        text={this.callToActionText}
        action={this.triggerRegister}>
      </hub-button>
    </div>;
  }
}
