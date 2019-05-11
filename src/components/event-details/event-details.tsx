import { Component, Prop, State } from '@stencil/core';

import { getPortal } from '@esri/arcgis-rest-request';
import { UserSession } from '@esri/arcgis-rest-auth';
import {
  getEventServiceUrl,
  searchEvents,
  registerForEvent,
  unregisterForEvent
} from '@esri/hub-events';

import { readSessionFromCookie, writeSessionToCookie } from '../../utils/utils';

@Component({
  tag: 'hub-event-details',
  styleUrl: 'event-details.css'
})

/*
to do:
  figure out the bare minimum we can ask for in config
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
  @Prop() eventtitle: string;

  /**
   * url of the ArcGIS Online organization
   */
  @Prop() orgurl: string = `https://www.arcgis.com`;

  /**
   * Serialized authentication information.
   */
  @Prop({ mutable: true }) session: string;

  /**
   *
   */
  @Prop({ mutable: true }) eventDate: string;

  /**
   *
   */
  @Prop({ mutable: true }) eventOrganizer: JSX.Element;

  /**
   *
   */
  @Prop({ mutable: true }) eventServiceUrl: string;

  /**
   *
   */
  @Prop({ mutable: true }) eventGroupId: string;

  /**
   *
   */
  @Prop({ mutable: true }) attending: boolean;

  /**
   * Text to display on the button
   */
  @State() callToActionText: string = "Attend";

  triggerRegister = ():Promise<any> => {
    this.session = readSessionFromCookie();
    if (!this.session) {
      // register your own app to create a unique clientId
      return UserSession.beginOAuth2({
        clientId: this.clientid,
        portal: `${this.orgurl}/sharing/rest`,
        redirectUri: `${window.location}authenticate.html`
      })
        .then(session => {
            writeSessionToCookie(session);
            this.session = session.serialize();
            return this.toggleRegister();
        })
    } else {
      return this.toggleRegister();
    }
  }

  toggleRegister = ():Promise<{ success: boolean }> => {
    if (!this.attending) {
      return registerForEvent({
        groupId: this.eventGroupId,
        authentication: UserSession.deserialize(this.session)
      })
        .then(response => {
          if (response.success === true) {
            return Promise.resolve();
          }
        })
        .catch(err => {
          if (err.originalMessage === "User is already a member of group.") {
            return Promise.resolve();
          }
          else throw err;
        })
        .then(() => {
          this.callToActionText = "Attending";
          this.attending = true;
          return { success: true };
        })
    } else {
      return unregisterForEvent({
        groupId: this.eventGroupId,
        authentication: UserSession.deserialize(this.session)
      })
        .then(response => {
          if (response.success === true) {
            this.callToActionText = "Attend";
            this.attending = false;
            return { success: true }
          }
          else return { success: false }
        })
    }
  }

  componentDidLoad() {
    getPortal(null, {
      portal: `${this.orgurl}/sharing/rest/`
    })
      .then(response => {
        getEventServiceUrl(response.id)
          .then(url => {
            this.eventServiceUrl = url;
            searchEvents({ url: this.eventServiceUrl })
              .then(response => {
                if (response.data.length > 0) {
                  for (let i=0; i<response.data.length;i++) {
                    if (response.data[i].attributes.title === this.eventtitle) {
                      const eventDetails = response.data[i].attributes;
                      this.eventDate = new Date(eventDetails.startDate).toString();
                      this.eventGroupId = eventDetails.groupId;
                      this.eventOrganizer = this.digOutContactInfo(eventDetails);
                      break;
                    }
                  }
                }
              })
          })
        })
  }

  digOutContactInfo(details:any):JSX.Element {
    const organizers:any = JSON.parse(details.organizers);
    if (organizers.length > 0) {
      const contact = `mailto:${organizers[0].contact}`
      return <p>organized by: <a href={contact}>{organizers[0].name}</a></p>
    }
  }

  render() {
    return <div class="hub-event-details">
      <div class="hub-event-background-image"></div>
      <div class="hub-event-content">
        <h3>{this.eventtitle}</h3>
        <p>{this.eventDate}</p>
        <p>{this.eventOrganizer}</p>
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
