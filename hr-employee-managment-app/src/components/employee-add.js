import { LitElement, html, css } from 'lit';
import { store } from '../store.js';
import { Router } from '@vaadin/router';
import './employee-form.js';

class AddEmployee extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: #f8f8f8;
    }
    .card {
      max-width: 600px;
      margin: 20px auto; 
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }   
    h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #ff6600;
    }
  `;

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
  }

  handleSave(newEmployee) {
    const emailExists = store.getState().employees.some(
      (emp) => emp.email === newEmployee.email
    );
    if (emailExists) {
      alert('An employee with this email already exists!');
      return;
    }
    const employees = store.getState().employees;
    const maxId = employees.length > 0 ? Math.max(...employees.map((emp) => emp.id)) : 0;
    const newEmployeeWithID = { ...newEmployee, id: maxId + 1 };

    store.dispatch({
      type: 'ADD_EMPLOYEE',
      payload: newEmployeeWithID,
    });

    Router.go('/employees');
  }

  handleCancel() {
    Router.go('/employees'); 
  }

  render() {
    return html`
      <div class="card">
        <h2>Create Employee</h2>
        <employee-form
          .employee=${this.employee}
          mode="add"
          @save=${(e) => this.handleSave(e.detail)}
          @cancel=${this.handleCancel}>
        </employee-form>
      </div>
    `;
  }
}

customElements.define('employee-add', AddEmployee);
