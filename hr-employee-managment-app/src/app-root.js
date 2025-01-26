import { LitElement, html, css } from 'lit';
import { initRouter } from './router.js';
import './components/navigation-menu.js';
import './components/employee-list.js';
import './components/employee-add.js';
import './components/employee-edit.js';
import './components/employee-form.js';
import './components/confirm-dialog.js';

class AppRoot extends LitElement {

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    .container {
      display: grid;
      grid-template-rows: auto 1fr auto; 
      height: 100vh;
      background: #f8f8f8;
    }
    main {
      padding: 20px;
      display: flex;
      justify-content: center;
    }
  `;

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('#outlet');
    initRouter(outlet);
  }

  render() {
    return html`
      <div class="container">
        <navigation-menu></navigation-menu>
        <div id="outlet"></div>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);
