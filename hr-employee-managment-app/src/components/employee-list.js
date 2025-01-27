import { LitElement, html, css } from 'lit';
import { store, subscribeToStore } from '../store.js';
import { Router } from '@vaadin/router';
import { localize } from '../local/localization.js';

class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    searchQuery: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    selectedEmployee: { type: Object },
    isDialogOpen: { type: Boolean },
    currentLanguage: { type: String }, 
  };

  static styles = css`
  :host {
    display: block;
    padding: 16px;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    background-color: #ffffff;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #ff6600;
  }
  .search-input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 250px;
  }
  .view-toggle {
    cursor: pointer;
    padding: 8px;
    border: none;
    background: #ff6600;
    color: white;
    border-radius: 8px;
    font-size: 14px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0;
    overflow: hidden;
  }
  th {
    background-color: white;
    color: #ff6600;
    text-align: left;
    font-size: 14px;
    padding: 16px;
    border-bottom: 2px solid #ddd;
  }
  td {
    padding: 12px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ddd;
  }
  tbody tr:nth-child(odd) {
    background-color: #f8f8f8;
  }
  tbody tr:hover {
    background-color: #f1f1f1;
  }
  td:nth-child(1),
  td:nth-child(2) {
    font-weight: bold; 
  }
  th:nth-child(1),
  th:nth-child(2) {
    font-weight: bold; 
  }
  .actions button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #ff6600;
    margin: 0 4px;
  }
  .actions button:hover {
    color: #e65c00;
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
  }

  .employee-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .employee-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: calc(33.333% - 16px); 
    box-sizing: border-box;
  }

  .employee-card div {
    margin-bottom: 8px;
  }

  .employee-card .actions {
    display: flex;
    justify-content: space-between;
  }

  .employee-card button {
    background: #ff6600;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }

  .employee-card button:hover {
    background: #e55d00;
  }

  .pagination-arrow {
    background: #f1f1f1;
    color: #333;
    border: 1px solid #ddd;
    padding: 8px 12px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }

  .pagination-arrow:hover:not([disabled]) {
    background: #e5e5e5;
  }

  .pagination-number {
    background: #f1f1f1;
    color: #333;
    border: 1px solid #ddd;
    padding: 8px 12px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }

  .pagination-number:hover {
    background: #e5e5e5;
  }

  .pagination-number.active {
    background: #ff6600;
    color: white;
    border: none;
  }

  .pagination-arrow[disabled] {
    background: #e5e5e5;
    color: #999;
    cursor: not-allowed;
  }
`;

  constructor() {
    super();
    this.employees = store.getState().employees;
    this.viewMode = 'table';
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.currentLanguage = store.getState().language || 'en'; 
  }

  connectedCallback() {
    super.connectedCallback();
  
    this._unsubscribe = subscribeToStore((state) => {
        this.employees = state.employees;
        this.currentLanguage = state.language;
      });
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
  
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  openDeleteDialog(employee) {
    this.selectedEmployee = employee;
    this.isDialogOpen = true;
  }

  handleDelete(e) {
    const { id } = e.detail;
    store.dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
    this.isDialogOpen = false;
  }

  handleCancel() {
    this.isDialogOpen = false;
  }

  get filteredEmployees() {
    return this.employees
      .filter(emp => emp.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  updateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'table' ? 'list' : 'table';
  }

  goToPage(page) {
    this.currentPage = page;
  }

  changePage(step) {
    this.currentPage = Math.max(1, this.currentPage + step);
  }

  render() {
    return html`
      <div class="header">
        <h2>${localize('employeeList', this.currentLanguage)}</h2>
        <input 
          type="text" 
          class="search-input" 
          placeholder="${localize('searchPlaceholder', this.currentLanguage)}" 
          @input="${this.updateSearchQuery}" 
        />
        <button class="view-toggle" @click="${this.toggleViewMode}">
          ${this.viewMode === 'table' 
            ? localize('listView', this.currentLanguage) 
            : localize('tableView', this.currentLanguage)}
        </button>
      </div>
      ${this.viewMode === 'table' ? this.renderTable() : this.renderList()}
      ${this.renderPagination()}
    `;
  }

  renderTable() {
    return html`
      <table>
        <thead>
          <tr>
            <th>${localize('firstName', this.currentLanguage)}</th>
            <th>${localize('lastName', this.currentLanguage)}</th>
            <th>${localize('dateOfEmployment', this.currentLanguage)}</th>
            <th>${localize('dateOfBirth', this.currentLanguage)}</th>
            <th>${localize('phone', this.currentLanguage)}</th>
            <th>${localize('email', this.currentLanguage)}</th>
            <th>${localize('department', this.currentLanguage)}</th>
            <th>${localize('position', this.currentLanguage)}</th>
            <th>${localize('actions', this.currentLanguage)}</th>
          </tr>
        </thead>
        <tbody>
          ${this.filteredEmployees.map(
            (emp) => html`
              <tr>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.dateOfEmployment}</td>
                <td>${emp.dateOfBirth}</td>
                <td>${emp.phone}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td class="actions">
                  <button @click="${() => Router.go(`/edit/${emp.id}`)}">
                    📝 
                  </button>
                  <button @click="${() => this.openDeleteDialog(emp)}">
                    🗑️ 
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <confirm-dialog
        .employee="${this.selectedEmployee}"
        .open="${this.isDialogOpen}"
        @confirm-delete="${this.handleDelete}"
        @cancel-delete="${this.handleCancel}"
      ></confirm-dialog>
    `;
  }

  renderList() {
    return html`
      <div class="employee-list">
        ${this.filteredEmployees.map(
          (emp) => html`
            <div class="employee-card">
              <div>
                <strong>${localize('firstName', this.currentLanguage)}:</strong> ${emp.firstName}
              </div>
              <div>
                <strong>${localize('lastName', this.currentLanguage)}:</strong> ${emp.lastName}
              </div>
              <div>
                <strong>${localize('dateOfEmployment', this.currentLanguage)}:</strong> ${emp.dateOfEmployment}
              </div>
              <div>
                <strong>${localize('dateOfBirth', this.currentLanguage)}:</strong> ${emp.dateOfBirth}
              </div>
              <div>
                <strong>${localize('phone', this.currentLanguage)}:</strong> ${emp.phone}
              </div>
              <div>
                <strong>${localize('email', this.currentLanguage)}:</strong> ${emp.email}
              </div>
              <div>
                <strong>${localize('department', this.currentLanguage)}:</strong> ${emp.department}
              </div>
              <div>
                <strong>${localize('position', this.currentLanguage)}:</strong> ${emp.position}
              </div>
              <div class="actions">
                <button @click="${() => Router.go(`/edit/${emp.id}`)}">
                  📝 ${localize('edit', this.currentLanguage)}
                </button>
                <button @click="${() => this.openDeleteDialog(emp)}">
                  🗑️ ${localize('delete', this.currentLanguage)}
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
    renderPagination() {
    const totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return html`
      <div class="pagination">
        <button 
          class="pagination-arrow" 
          @click="${() => this.changePage(-1)}" 
          ?disabled="${this.currentPage === 1}"
        >
          <
        </button>
        ${pageNumbers.map(
          (page) => html`
            <button
              class="pagination-number ${this.currentPage === page ? 'active' : ''}"
              @click="${() => this.goToPage(page)}"
            >
              ${page}
            </button>
          `
        )}
        <button 
          class="pagination-arrow" 
          @click="${() => this.changePage(1)}" 
          ?disabled="${this.currentPage === totalPages}"
        >
          >
        </button>
      </div>
    `;
  }
}
customElements.define('employee-list', EmployeeList);
