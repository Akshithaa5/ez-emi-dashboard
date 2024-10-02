// Function to save documents to localStorage
function saveDocuments(customerName, documents) {
    localStorage.setItem(customerName, JSON.stringify(documents));
}

// Function to get documents from localStorage
function getDocuments(customerName) {
    const documents = localStorage.getItem(customerName);
    return documents ? JSON.parse(documents) : [];
}

// Function to delete a specific document for a customer
function deleteDocument(customerName, index) {
    const documents = getDocuments(customerName);
    if (index >= 0 && index < documents.length) {
        documents.splice(index, 1);
        saveDocuments(customerName, documents);
        displayAllDocuments();
    }
}

// Function to update the status of a document
function updateDocumentStatus(customerName, index, newStatus) {
    const documents = getDocuments(customerName);
    documents[index].status = newStatus;
    saveDocuments(customerName, documents);
}

// Function to update the name of a document
function updateDocumentName(customerName, index, newName) {
    const documents = getDocuments(customerName);
    documents[index].name = newName;
    saveDocuments(customerName, documents);
}