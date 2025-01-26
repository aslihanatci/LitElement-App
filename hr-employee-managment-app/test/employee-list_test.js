import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/employee-list.js';

describe('EmployeeList Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
  });

  it('renders the component', () => {
    expect(element).to.exist;
  });

  it('initially displays the table view', () => {
    expect(element.viewMode).to.equal('table');
  });

  it('toggles view mode', async () => {
    const toggleButton = element.shadowRoot.querySelector('.view-toggle');
    toggleButton.click();
    await element.updateComplete;
    expect(element.viewMode).to.equal('list');
    toggleButton.click();
    await element.updateComplete;
    expect(element.viewMode).to.equal('table');
  });

  it('updates search query', async () => {
    const searchInput = element.shadowRoot.querySelector('.search-input');
    searchInput.value = 'Ahmet';
    searchInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(element.searchQuery).to.equal('Ahmet');
  });

  it('filters employees based on search', async () => {
    element.employees = [
      { firstName: 'Ahmet', lastName: 'Yılmaz', department: 'IT' },
      { firstName: 'Mehmet', lastName: 'Kaya', department: 'HR' }
    ];
    element.searchQuery = 'Ahmet';
    await element.updateComplete;
    expect(element.filteredEmployees.length).to.equal(1);
    expect(element.filteredEmployees[0].firstName).to.equal('Ahmet');
  });

  it('paginates correctly', async () => {
    element.employees = new Array(12).fill(0).map((_, i) => ({
      firstName: `Employee${i + 1}`,
      lastName: 'Test',
      department: 'IT'
    }));
    element.itemsPerPage = 5;
    await element.updateComplete;
    expect(element.filteredEmployees.length).to.equal(5);
    element.changePage(1);
    await element.updateComplete;
    expect(element.currentPage).to.equal(2);
  });

  it('calls editEmployee when edit button is clicked', async () => {
    const spy = sinon.spy(element, 'editEmployee');
    element.employees = [{ firstName: 'Test', lastName: 'User', department: 'HR' }];
    await element.updateComplete;
    const editButton = element.shadowRoot.querySelector('button');
    editButton.click();
    expect(spy.calledOnce).to.be.true;
  });

  it('calls deleteEmployee when delete button is clicked', async () => {
    const spy = sinon.spy(element, 'deleteEmployee');
    element.employees = [{ id: 1, firstName: 'Test', lastName: 'User', department: 'HR' }];
    await element.updateComplete;
    const deleteButton = element.shadowRoot.querySelector('button:last-of-type');
    deleteButton.click();
    expect(spy.calledOnce).to.be.true;
  });
});
