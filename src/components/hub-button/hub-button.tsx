import { Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'hub-button',
  styleUrl: 'hub-button.css'
})

export class HubButton {
  /**
   * Button text to display
   */
  @Prop({ mutable: true }) text: string;

  /**
   * Icon to display alongside the text
   */
  @Prop() icon: JSX.Element;

  /**
   * action to trigger when the button is clicked
   */
  @Prop() action: Function = function() { return 'foo' };

  @Listen('click') handleKeyDown() {
    this.action()
  }

  render() {
    return <button class="hub-btn">
        {this.icon}
        {this.text}
      </button>;
  }
}
