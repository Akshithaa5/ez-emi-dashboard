// Handle login check
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('loginError').textContent = 'Invalid login credentials!';
    }
});

document.getElementById('uploadForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value.trim();
    const panCard = document.getElementById('panCard').files[0]?.name || 'No file selected';
    const aadharCard = document.getElementById('aadharCard').files[0]?.name || 'No file selected';
    const salarySlip = document.getElementById('salarySlip').files[0]?.name || 'No file selected';

    if (!customerName) {
        alert("Please enter a customer name.");
        return;
    }

    const uploadedDocuments = [{
            type: 'PAN Card',
            name: panCard,
            status: 'Under Review'
        },
        {
            type: 'Aadhar Card',
            name: aadharCard,
            status: 'Under Review'
        },
        {
            type: 'Salary Slip',
            name: salarySlip,
            status: 'Under Review'
        }
    ];


    saveDocuments(customerName, uploadedDocuments);


    document.getElementById('uploadForm').reset();


    displayDocuments(customerName, uploadedDocuments);
});


function displayDocuments(customerName, documents) {
    const tableBody = document.querySelector('#documentsTable tbody');


    const existingRows = document.querySelectorAll(`#documentsTable tbody tr[data-customer="${customerName}"]`);
    existingRows.forEach(row => row.remove());


    documents.forEach((doc, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-customer', customerName);
        row.innerHTML = `
        <td>${customerName}</td>
        <td>${doc.type}</td>
        <td>${doc.name}</td>
        <td>
          <select class="doc-status" data-index="${index}" data-customer="${customerName}">
            <option value="Under Review" ${doc.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
            <option value="Accepted" ${doc.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
            <option value="Rejected" ${doc.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
          </select>
        </td>
        <td><button class="edit-btn" data-index="${index}" data-customer="${customerName}">Edit</button></td>
        <td><button class="delete-btn" data-index="${index}" data-customer="${customerName}">Delete</button></td>
      `;
        tableBody.appendChild(row);
    });
}


document.querySelector('#documentsTable')?.addEventListener('change', function(event) {
    if (event.target.classList.contains('doc-status')) {
        const customerName = event.target.getAttribute('data-customer');
        const index = event.target.getAttribute('data-index');
        const updatedStatus = event.target.value;


        updateDocumentStatus(customerName, index, updatedStatus);


        const updatedDocuments = getDocuments(customerName);
        displayDocuments(customerName, updatedDocuments);
    }
});


document.querySelector('#documentsTable')?.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const customerName = event.target.getAttribute('data-customer');
        const index = event.target.getAttribute('data-index');

        const confirmation = confirm('Are you sure you want to delete this document?');

        if (confirmation) {

            deleteDocument(customerName, index);


            const updatedDocuments = getDocuments(customerName);
            displayDocuments(customerName, updatedDocuments);
        }
    }
});


document.querySelector('#documentsTable')?.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const customerName = event.target.getAttribute('data-customer');
        const index = event.target.getAttribute('data-index');

        const newDocName = prompt('Enter new document name:');
        if (newDocName) {

            updateDocumentName(customerName, index, newDocName);


            const updatedDocuments = getDocuments(customerName);
            displayDocuments(customerName, updatedDocuments);
        }
    }
});


window.addEventListener('load', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
});