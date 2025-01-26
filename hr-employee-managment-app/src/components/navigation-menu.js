import { LitElement, html, css } from 'lit';
import { localize } from '../local/localization.js';
import { store } from '../store.js';

class NavigationMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: white;
      padding: 10px 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo img {
      height: 40px;
    }
    .actions {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    button, select {
      background: #ff6600;
      color: white;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 5px;
    }
    button:hover, select:hover {
      background: #e65c00;
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  `;

  static properties = {
    currentLang: { type: String },
  };

  constructor() {
    super();
    this.currentLang = store.getState().language;
  }

  render() {
    return html`
      <div class="nav-container">
        <div class="logo">
          <img src="/src/assets/ING_Logo.png" alt="Logo" />
        </div>
        <div class="actions">
          <button @click=${this._navigateToEmployees}>
          👤 ${localize('employees', this.currentLang)}
          </button>
          <button @click=${this._addEmployee}>
          ➕ ${localize('addNew', this.currentLang )}
          </button>
          <select @change=${this._changeLanguage}>
            <option value="en" ?selected=${this.currentLang === 'en'}>🇺🇲</option>
            <option value="tr" ?selected=${this.currentLang === 'tr'}>🇹🇷</option>
          </select>
        </div>
      </div>
    `;
  }

  _navigateToEmployees() {
    window.location.pathname = '/employees'; 
  }

  _addEmployee() {
    window.location.pathname = '/add'; 
  }

  _changeLanguage(e) {
    this.currentLang = e.target.value;
    store.dispatch({ type: 'SET_LANGUAGE', payload: e.target.value });
  }
}

customElements.define('navigation-menu', NavigationMenu);
