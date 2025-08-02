function logout() {
    alert("You have been logged out.");
}

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

function openModal(type) {
    let content = '';

    // Existing forms
    if (type === 'vehicleCheck') {
        content = `
          <h3>Vehicle Check</h3>
          <form>
            <label>Vehicle ID</label>
            <input type="text" value="Truck LKA-1234" readonly>
            <label>Checked By</label>
            <input type="text" value="Gehiru Damindu" readonly>
            <label>Comments</label>
            <textarea placeholder="Add comments"></textarea>
            <button type="button" class="submit-btn">Submit</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    } else if (type === 'spareParts') {
        content = `
          <h3>Spare Parts Order</h3>
          <form>
            <label>Order ID</label>
            <input type="text" value="#ORD-2025-003" readonly>
            <label>Cost</label>
            <input type="text" value="Rs.22,500" readonly>
            <label>Reason</label>
            <textarea placeholder="Approval reason"></textarea>
            <button type="button" class="submit-btn">Approve</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    } else if (type === 'budgetApproval') {
        content = `
          <h3>Repair Budget Approval</h3>
          <form>
            <label>Ticket</label>
            <input type="text" value="#MT-2024-046" readonly>
            <label>Asset</label>
            <input type="text" value="Forklift FL-008" readonly>
            <label>Estimated Cost</label>
            <input type="text" value="Rs.14,400" readonly>
            <label>Remarks</label>
            <textarea placeholder="Add remarks"></textarea>
            <button type="button" class="submit-btn">Approve</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    } else if (type === 'assignTechnician') {
        content = `
          <h3>Assign Technician</h3>
          <form>
            <label>Ticket</label>
            <input type="text" value="#MT-2024-047" readonly>
            <label>Select Technician</label>
            <select>
              <option>Technician A</option>
              <option>Technician B</option>
              <option>Technician C</option>
            </select>
            <button type="button" class="submit-btn">Assign</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    }

    // New forms for management buttons
    else if (type === 'assignFaultTickets') {
        content = `
          <h3>Assign Fault Tickets</h3>
          <form>
            <label>Select Ticket</label>
            <select>
              <option>MT-2024-047</option>
              <option>MT-2024-048</option>
              <option>MT-2024-049</option>
            </select>
            <label>Assign Technician</label>
            <select>
              <option>Technician A</option>
              <option>Technician B</option>
            </select>
            <button type="button" class="submit-btn">Assign</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    } else if (type === 'monitorRepair') {
        content = `
          <h3>Monitor Repair Progress</h3>
          <form>
            <label>Enter Ticket ID</label>
            <input type="text" placeholder="e.g., MT-2024-047">
            <button type="button" class="submit-btn">Check Progress</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    } else if (type === 'updateAsset') {
        content = `
          <h3>Update Asset Status</h3>
          <form>
            <label>Asset ID</label>
            <input type="text" placeholder="Enter Asset ID">
            <label>New Status</label>
            <select>
              <option>Active</option>
              <option>Under Repair</option>
              <option>Decommissioned</option>
            </select>
            <button type="button" class="submit-btn">Update</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    } else if (type === 'closeTickets') {
        content = `
          <h3>Close Completed Tickets</h3>
          <form>
            <label>Select Completed Ticket</label>
            <select>
              <option>MT-2024-041</option>
              <option>MT-2024-042</option>
            </select>
            <label>Remarks</label>
            <textarea placeholder="Add closing remarks"></textarea>
            <button type="button" class="submit-btn">Close Ticket</button>
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
          </form>`;
    }

    modalContent.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

window.openModal = openModal;
window.closeModal = closeModal;