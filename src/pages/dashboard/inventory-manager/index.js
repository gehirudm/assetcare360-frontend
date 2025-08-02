function logout() {
    alert("You have been logged out.");
}

// Modal elements
const formModal = document.getElementById('form-modal');
const formModalContent = document.getElementById('form-modal-content');
const closeBtn = document.querySelector('#form-modal .close-btn');

// Form templates (Supervisor Dashboard style)
const forms = {
    addItem: `
        <h3 id="modalTitle">Add New Item</h3>
        <p id="modalDesc">Fill the form below to add a new spare part to the inventory.</p>
        <form id="addItemForm">
          <label for="item-name">Item Name</label>
          <input id="item-name" name="itemName" type="text" placeholder="Item Name" required />
          
          <label for="part-number">Part Number</label>
          <input id="part-number" name="partNumber" type="text" placeholder="Part Number" required />
          
          <label for="quantity">Quantity</label>
          <input id="quantity" name="quantity" type="number" min="1" placeholder="Quantity" required />

          <label for="compatible-machines">Compatible Machines</label>
          <input id="compatible-machines" name="compatibleMachines" type="text" placeholder="e.g. Trucks, Forklifts" />

          <button type="submit">Add Item</button>
        </form>
      `,
    approveOrders: `
        <h3 id="modalTitle">Approve Orders</h3>
        <p id="modalDesc">Review and approve pending orders.</p>
        <form id="approveOrdersForm">
          <label for="order-id">Order ID</label>
          <input id="order-id" name="orderId" type="text" placeholder="Order ID" required />

          <label for="approval-status">Approval Status</label>
          <select id="approval-status" name="approvalStatus" required>
            <option value="">Select Status</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>

          <label for="comments">Comments</label>
          <textarea id="comments" name="comments" placeholder="Optional comments"></textarea>

          <button type="submit">Submit</button>
        </form>
      `,
    usageReport: `
        <h3 id="modalTitle">Usage Reports</h3>
        <p id="modalDesc">Generate inventory usage reports for a selected period.</p>
        <form id="usageReportForm">
          <label for="start-date">Start Date</label>
          <input id="start-date" name="startDate" type="date" required />

          <label for="end-date">End Date</label>
          <input id="end-date" name="endDate" type="date" required />

          <button type="submit">Generate Report</button>
        </form>
      `
};

// Show modal with form content
function openFormModal(formKey) {
    formModalContent.innerHTML = forms[formKey] || '<p>Form not found.</p>';
    formModal.classList.add('active');
    formModalContent.querySelector('form')?.focus();
}

// Close modal
function closeFormModal() {
    formModal.classList.remove('active');
    formModalContent.innerHTML = '';
}

// Close modal on close button click
closeBtn.addEventListener('click', closeFormModal);

// Close modal on clicking outside modal content
formModal.addEventListener('click', e => {
    if (e.target === formModal) {
        closeFormModal();
    }
});

// Open modal when clicking buttons with data-form attribute
document.querySelectorAll('.quick-actions button[data-form], #btnAddItem, #btnAddItem2, #btnApproveOrders, #btnUsageReport').forEach(btn => {
    btn.addEventListener('click', e => {
        const formKey = btn.getAttribute('data-form') || (btn.id === 'btnAddItem' || btn.id === 'btnAddItem2' ? 'addItem' : (btn.id === 'btnApproveOrders' ? 'approveOrders' : 'usageReport'));
        openFormModal(formKey);
    });
});

// Example form submit handlers
document.body.addEventListener('submit', e => {
    e.preventDefault();
    alert('Form submitted: ' + e.target.id);
    closeFormModal();
});