import { Component, Prop, State } from '@stencil/core';
import { UserSession } from '@esri/arcgis-rest-auth';
import { IUser } from '@esri/arcgis-rest-common-types';

import {
  // searchEvents,
  registerForEvent
} from '@esri/hub-events';

@Component({
  tag: 'hub-event-details',
  styleUrl: 'event-details.css'
})

/*
to do:
  hydrate card with event metadata
  new logic in hub.js to actually register
*/
export class HubEventDetails {
  /**
   * ClientID to identify the app launching OAuth
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
   *
   */
  @Prop({ mutable: true }) eventTitle: string = "Event Title";

  /**
   *
   */
  @Prop({ mutable: true }) eventDate: string = "Tomorrow @ 3:00pm";

  /**
   *
   */
  @Prop({ mutable: true }) eventOrganizer: JSX.Element = <a href="https://twitter.com/geogangster">John G</a>;

  /**
   * Text to display on the button
   */
  @State() callToActionText: string = "Attend";

  triggerRegister = () => {
    if (!this.session) {
      // register your own app to create a unique clientId
      UserSession.beginOAuth2({
        clientId: this.clientid,
        portal: `${this.orgurl}/sharing/rest`,
        redirectUri: `${window.location}authenticate.html`
      })
        .then(session => {
            this.session = session;
            this.triggerRegister();
        })
      } else {
        registerForEvent({
          eventId: this.eventid,
          authentication: this.session
        })
          .then(response => {
            console.log(response);
            this.callToActionText === "Attend" ? this.callToActionText = "Attending" : this.callToActionText = "Attend";
          })
      }
  }

  hydrateDetails = () => {
    // searchEvents({
    //   url: ""
    // })
    //   .then(() => {

    //   })
    // this.eventTitle = "";
    // this.eventDate = "";
    // this.eventOrganizer = "";
  }

  render() {
    this.hydrateDetails();
    return <div class="hub-event-details">
      <div class="hub-event-background-image"></div>
      <div class="hub-event-content">
        <h2>{this.eventTitle}</h2>
        <p>{this.eventDate}</p>
        <p>organized by: {this.eventOrganizer}</p>
      </div>
      <div class="hub-event-footer">
        <hub-button
          text={this.callToActionText}
          action={this.triggerRegister}>
        </hub-button>
      </div>
    </div>;
  }
}
