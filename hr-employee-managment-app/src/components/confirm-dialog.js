import { LitElement, html, css } from 'lit';

class ConfirmDialog extends LitElement {
  static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      background: white;
      border-radius: 8px;
      padding: 24px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .dialog-header {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 16px;
      color: #ff6600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dialog-body {
      margin-bottom: 16px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    button {
      padding: 8px 16px;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .proceed {
      background: #ff6600;
      color: white;
    }
    .cancel {
      background: #ddd;
      color: black;
    }
    button:hover {
      opacity: 0.9;
    }
  `;

  static properties = {
    employee: { type: Object },
    open: { type: Boolean },
  };

  constructor() {
    super();
    this.employee = {};
    this.open = false;
  }

  handleProceed() {
    this.dispatchEvent(new CustomEvent('confirm-delete', { detail: this.employee }));
    this.open = false;
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel-delete'));
    this.open = false;
  }

  render() {
    if (!this.open) return null;

    return html`
      <div class="overlay">
        <div class="dialog">
          <div class="dialog-header">
            <span>Are you sure?</span>
            <button @click=${this.handleCancel}>&times;</button>
          </div>
          <div class="dialog-body">
            Selected employee record of <strong>${this.employee.firstName} ${this.employee.lastName}</strong> will be deleted.
          </div>
          <div class="dialog-actions">
            <button class="proceed" @click=${this.handleProceed}>Proceed</button>
            <button class="cancel" @click=${this.handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
