function logout() {
    alert("You have been logged out.");
}

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

function openModal(type, reference = '') {
    let content = '';
    let refLabel = reference ? `<p><strong>Reference: </strong>${reference}</p>` : '';

    switch (type) {
        case 'requestParts':
            content = `
            <h3 id="modalTitle">Request Spare Parts</h3>
            ${refLabel}
            <form>
              <label for="partName">Part Name</label>
              <input id="partName" type="text" placeholder="Enter part name" required />
              <label for="quantity">Quantity</label>
              <input id="quantity" type="number" min="1" placeholder="Enter quantity" required />
              <label for="reason">Reason for Request</label>
              <textarea id="reason" placeholder="Describe why you need these parts"></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Request Parts submitted')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'updateProgress':
            content = `
            <h3 id="modalTitle">Update Repair Progress</h3>
            ${refLabel}
            <form>
              <label for="progressStatus">Progress Status</label>
              <select id="progressStatus" required>
                <option value="">Select status</option>
                <option value="started">Started</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_parts">Waiting for Parts</option>
                <option value="testing">Testing</option>
              </select>
              <label for="comments">Comments</label>
              <textarea id="comments" placeholder="Add comments about progress"></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Progress updated')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'markComplete':
            content = `
            <h3 id="modalTitle">Mark Repair as Complete</h3>
            ${refLabel}
            <form>
              <label for="completionNotes">Completion Notes</label>
              <textarea id="completionNotes" placeholder="Add notes about repair completion"></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Repair marked complete')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'submitCosts':
            content = `
            <h3 id="modalTitle">Submit Repair Costs</h3>
            ${refLabel}
            <form>
              <label for="costAmount">Cost Amount (Rs.)</label>
              <input id="costAmount" type="number" min="0" step="0.01" placeholder="Enter cost amount" required />
              <label for="costDetails">Cost Details</label>
              <textarea id="costDetails" placeholder="Provide details about the costs"></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Costs submitted')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'checkPartsStatus':
            content = `
            <h3 id="modalTitle">Check Parts Status</h3>
            ${refLabel}
            <p>Parts for this ticket are currently being processed. Estimated delivery: 2 days.</p>
            <div class="modal-buttons">
              <button type="button" class="btn-close" onclick="closeModal()">Close</button>
            </div>`;
            break;

        case 'requestSpareParts':
            content = `
            <h3 id="modalTitle">Request Spare Parts</h3>
            <form>
              <label for="sparePartName">Spare Part Name</label>
              <input id="sparePartName" type="text" placeholder="Enter spare part name" required />
              <label for="spareQuantity">Quantity</label>
              <input id="spareQuantity" type="number" min="1" placeholder="Enter quantity" required />
              <label for="spareReason">Reason for Request</label>
              <textarea id="spareReason" placeholder="Reason for requesting parts"></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Spare parts request submitted')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'submitRepairReport':
            content = `
            <h3 id="modalTitle">Submit Repair Report</h3>
            <form>
              <label for="repairTicket">Ticket Number</label>
              <input id="repairTicket" type="text" placeholder="Enter ticket number" required />
              <label for="repairDetails">Repair Details</label>
              <textarea id="repairDetails" placeholder="Describe the repair work done" required></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Repair report submitted')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'claimWarranty':
            content = `
            <h3 id="modalTitle">Claim Warranty</h3>
            ${refLabel}
            <form>
              <label for="warrantyTicket">Ticket Number / Vehicle</label>
              <input id="warrantyTicket" type="text" placeholder="Enter ticket or vehicle info" required />
              <label for="warrantyDetails">Details</label>
              <textarea id="warrantyDetails" placeholder="Explain warranty claim" required></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Warranty claim submitted')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'reportBreakdown':
            content = `
            <h3 id="modalTitle">Report Breakdown</h3>
            <form>
              <label for="vehicleId">Vehicle/Equipment ID</label>
              <input id="vehicleId" type="text" placeholder="Enter vehicle or equipment ID" required />
              <label for="breakdownDetails">Breakdown Details</label>
              <textarea id="breakdownDetails" placeholder="Describe the issue" required></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Breakdown reported')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'updatePartsUsage':
            content = `
            <h3 id="modalTitle">Update Parts Usage</h3>
            ${refLabel}
            <form>
              <label for="usedParts">Parts Used</label>
              <textarea id="usedParts" placeholder="List parts used" required></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Parts usage updated')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        case 'submitPartsCost':
            content = `
            <h3 id="modalTitle">Submit Parts Cost</h3>
            ${refLabel}
            <form>
              <label for="partsCost">Cost Amount (Rs.)</label>
              <input id="partsCost" type="number" min="0" step="0.01" placeholder="Enter cost amount" required />
              <label for="costRemarks">Remarks</label>
              <textarea id="costRemarks" placeholder="Add remarks about cost"></textarea>
              <div class="modal-buttons">
                <button type="button" class="btn-submit" onclick="submitForm('Parts cost submitted')">Submit</button>
                <button type="button" class="btn-close" onclick="closeModal()">Close</button>
              </div>
            </form>`;
            break;

        default:
            content = `<h3 id="modalTitle">Info</h3><p>Action not implemented.</p>
          <div class="modal-buttons">
            <button type="button" class="btn-close" onclick="closeModal()">Close</button>
          </div>`;
    }

    modalContent.innerHTML = content;
    modal.style.display = 'flex';
    modal.focus();
}

function closeModal() {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
}

function submitForm(msg) {
    alert(msg);
    closeModal();
}

// Close modal when clicking outside content
window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

window.openModal = openModal;
window.closeModal = closeModal;