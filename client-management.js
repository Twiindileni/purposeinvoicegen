// Client Management System
class ClientManager {
    constructor() {
        this.clients = JSON.parse(localStorage.getItem('clients') || '[]');
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.updateClientList();
    }

    setupEventListeners() {
        document.getElementById('saveClientBtn').addEventListener('click', () => this.saveClient());
        document.getElementById('clearClientBtn').addEventListener('click', () => this.clearClient());
    }

    saveClient() {
        const clientName = document.getElementById('clientName').value;
        const clientAddress = document.getElementById('clientAddress').value;

        if (!clientName || !clientAddress) {
            alert('Please fill in both client name and address');
            return;
        }

        const client = {
            name: clientName,
            address: clientAddress,
            id: Date.now()
        };

        this.clients.push(client);
        localStorage.setItem('clients', JSON.stringify(this.clients));
        this.updateClientList();
    }

    clearClient() {
        document.getElementById('clientName').value = '';
        document.getElementById('clientAddress').value = '';
    }

    loadClient(client) {
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientAddress').value = client.address;
    }

    deleteClient(clientId) {
        this.clients = this.clients.filter(client => client.id !== clientId);
        localStorage.setItem('clients', JSON.stringify(this.clients));
        this.updateClientList();
    }

    updateClientList() {
        const clientList = document.getElementById('clientList');
        clientList.innerHTML = '';
        
        this.clients.forEach(client => {
            const div = document.createElement('div');
            div.className = 'client-item';
            div.innerHTML = `
                <div class="client-info">
                    <h4>${client.name}</h4>
                    <p>${client.address}</p>
                </div>
                <div class="client-actions">
                    <button class="btn btn-secondary" onclick="clientManager.loadClient(${JSON.stringify(client)})">Load</button>
                    <button class="btn btn-danger" onclick="clientManager.deleteClient(${client.id})">Delete</button>
                </div>
            `;
            clientList.appendChild(div);
        });
    }
}

// Initialize client manager
const clientManager = new ClientManager(); 