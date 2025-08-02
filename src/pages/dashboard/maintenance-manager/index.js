// Utility to set focus inside modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function logout() {
    alert("You have been logged out.");
    // Add actual logout logic here
}

function openModal(type, ticketId = '', estCost = 0, details = '') {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modal-overlay');
    const titleEl = document.getElementById('modal-title');
    const contentEl = document.getElementById('modal-content');

    // Clear old content
    contentEl.innerHTML = '';

    if (type === 'approveCost') {
        titleEl.innerText = `Approve Cost for ${ticketId}`;
        contentEl.innerHTML = `
          <form id="approveCostForm">
            <label for="cost">Estimated Cost (Rs):</label>
            <input type="number" id="cost" name="cost" value="${estCost}" min="0" required />
            
            <label for="comments">Comments:</label>
            <textarea id="comments" name="comments" placeholder="Add remarks..."></textarea>

            <button type="submit" class="submit-btn">Confirm Approval</button>
          </form>
        `;

        document.getElementById('approveCostForm').onsubmit = function (e) {
            e.preventDefault();
            alert(`Cost approved for ${ticketId} with amount Rs.${this.cost.value}`);
            closeModal();
        };

    } else if (type === 'viewDetails') {
        titleEl.innerText = ticketId + ' - Details';
        contentEl.innerHTML = `<p>${details}</p>`;

    } else if (type === 'viewReport') {
        titleEl.innerText = ticketId + ' - Service Report';
        contentEl.innerHTML = `<p>Viewing report for <strong>${ticketId}</strong>.</p>`;

    } else if (type === 'inputServiceReport') {
        titleEl.innerText = 'Input Service Report';
        contentEl.innerHTML = `
          <form id="serviceReportForm">
            <label for="vehicleId">Vehicle ID:</label>
            <input type="text" id="vehicleId" name="vehicleId" required />
            
            <label for="serviceType">Service Type:</label>
            <input type="text" id="serviceType" name="serviceType" required />
            
            <label for="cost">Cost (Rs):</label>
            <input type="number" id="cost" name="cost" min="0" required />
            
            <label for="remarks">Remarks:</label>
            <textarea id="remarks" name="remarks"></textarea>
            
            <button type="submit" class="submit-btn">Submit Report</button>
          </form>
        `;

        document.getElementById('serviceReportForm').onsubmit = function (e) {
            e.preventDefault();
            alert(`Service report submitted for vehicle ${this.vehicleId.value}`);
            closeModal();
        };

    } else if (type === 'scheduleMaintenance') {
        titleEl.innerText = 'Schedule Maintenance';
        contentEl.innerHTML = `
          <form id="scheduleMaintenanceForm">
            <label for="vehicleId">Vehicle ID:</label>
            <input type="text" id="vehicleId" name="vehicleId" required />
            
            <label for="scheduleDate">Schedule Date:</label>
            <input type="date" id="scheduleDate" name="scheduleDate" required />
            
            <label for="maintenanceType">Maintenance Type:</label>
            <input type="text" id="maintenanceType" name="maintenanceType" required />
            
            <button type="submit" class="submit-btn">Schedule</button>
          </form>
        `;

        document.getElementById('scheduleMaintenanceForm').onsubmit = function (e) {
            e.preventDefault();
            alert(`Maintenance scheduled for vehicle ${this.vehicleId.value} on ${this.scheduleDate.value}`);
            closeModal();
        };

    } else if (type === 'generateCostAnalysis') {
        titleEl.innerText = 'Cost Analysis';
        contentEl.innerHTML = `
          <p>Generating cost analysis...</p>
          <ul>
            <li>Current Month: Rs. 1,350,000</li>
            <li>Pending Approvals: Rs. 422,000</li>
            <li>Projected Next Month: Rs. 1,500,000</li>
          </ul>
        `;
    }

    overlay.style.display = 'flex';
    modal.focus();
    trapFocus(modal);
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.style.display = 'none';
}

// Close modal on clicking outside modal content
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
        closeModal();
    }
});

// Accessibility: close modal on Escape key globally
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('modal-overlay');
        if (overlay.style.display === 'flex') {
            closeModal();
        }
    }
});

window.openModal = openModal;
window.closeModal = closeModal;