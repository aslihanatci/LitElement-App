import { LitElement, html, css } from 'lit';
import { localize } from '../local/localization.js';
import { store, subscribeToStore } from '../store.js';

class EmployeeForm extends LitElement {
  static styles = css`
    form {
      display: grid;
      grid-gap: 16px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    label {
      font-weight: bold;
      margin-bottom: 4px;
      color: #ff6600; 
    }
    input,
    select {
      width: 100%;
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 10px; 
    }
    button {
      padding: 10px 16px;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type='submit'] {
      background: #28a745; 
      color: white;
    }
    button.cancel {
      background: #dc3545; 
      color: white;
    }
    button:hover {
      opacity: 0.9;
    }
  `;

  static properties = {
    employee: { type: Object },
    mode: { type: String }, 
    language: { type: String },
  };

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.mode = 'add';
    this.language = store.getState().language || 'en';  
  }

  connectedCallback() {
    super.connectedCallback();
  
    this._unsubscribe = subscribeToStore((state) => {
        this.language = state.language;
      });
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
  
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.employee = { ...this.employee, [name]: value };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('save', { detail: this.employee }));
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <div class="form-group">
          <label for="firstName">${localize('form_firstName', this.language)}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            .value=${this.employee.firstName || ''}
            @input=${this.handleInputChange}
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">${localize('form_lastName', this.language)}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            .value=${this.employee.lastName || ''}
            @input=${this.handleInputChange}
            required
          />
        </div>
        <div class="form-group">
          <label for="dateOfEmployment">${localize('form_dateOfEmployment', this.language)}</label>
          <input
            type="date"
            id="dateOfEmployment"
            name="dateOfEmployment"
            .value=${this.employee.dateOfEmployment || ''}
            @input=${this.handleInputChange}
            required
          />
        </div>
        <div class="form-group">
          <label for="dateOfBirth">${localize('form_dateOfBirth', this.language)}</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            .value=${this.employee.dateOfBirth || ''}
            @input=${this.handleInputChange}
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">${localize('form_phone', this.language)}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            .value=${this.employee.phone || ''}
            @input=${this.handleInputChange}
            required
          />
        </div>
        <div class="form-group">
          <label for="email">${localize('form_email', this.language)}</label>
          <input
            type="email"
            id="email"
            name="email"
            .value=${this.employee.email || ''}
            @input=${this.handleInputChange}
            required
          />
        </div>
        <div class="form-group">
          <label for="department">${localize('form_department', this.language)}</label>
          <select
            id="department"
            name="department"
            .value=${this.employee.department || ''}
            @change=${this.handleInputChange}
            required
          >
            <option value="" disabled selected>${localize('form_selectDepartment', this.language)}</option>
            <option value="Analytics">${localize('form_analytics', this.language)}</option>
            <option value="Tech">${localize('form_tech', this.language)}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="position">${localize('form_position', this.language)}</label>
          <select
            id="position"
            name="position"
            .value=${this.employee.position || ''}
            @change=${this.handleInputChange}
            required
          >
            <option value="" disabled selected>${localize('form_selectPosition', this.language)}</option>
            <option value="Junior">${localize('form_junior', this.language)}</option>
            <option value="Medior">${localize('form_medior', this.language)}</option>
            <option value="Senior">${localize('form_senior', this.language)}</option>
          </select>
        </div>
        <div class="button-group">
          <button type="submit">
            ${this.mode === 'edit' ? localize('form_update', this.language) : localize('form_create', this.language)}
          </button>
          <button
            type="button"
            class="cancel"
            @click=${this.handleCancel}
          >
            ${localize('form_cancel', this.language)}
          </button>
        </div>
      </form>
    `;
  }
}


customElements.define('employee-form', EmployeeForm);
