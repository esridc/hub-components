import { Component, Prop, Listen } from '@stencil/core';
import { UserSession } from '@esri/arcgis-rest-auth';

// import { format } from '../../utils/utils';

@Component({
  tag: 'hub-follow-button',
  styleUrl: 'hub-follow-button.css',
  shadow: true
})

export class HubFollowButton {
  /**
   * The first name
   */
  @Prop() clientid: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  @Listen('click')
  handleKeyDown(){
  // register your own app to create a unique clientId
  UserSession.beginOAuth2({
    clientId: this.clientid,
    redirectUri: 'http://localhost:3333/authenticate.html'
  })
    .then(session => {
      console.log(session)
    });
  }

  render() {
    // return <div>Hello, World! I'm {this.getText()}</div>;
    return <button class="btn">Follow</button>;
  }
}
