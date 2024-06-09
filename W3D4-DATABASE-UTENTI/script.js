// Attendo il contenuto del DOM
document.addEventListener('DOMContentLoaded', () => {
    // URL dell'API da cui recuperare i dati degli utenti
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    // Seleziono id filterOption
    const filterOption = document.getElementById('filterOption');
    // Seleziona id filterInput
    const filterInput = document.getElementById('filterInput');
    // Seleziono id userTable dove verranno caricati tutti i dati nella schermata principale
    const userTable = document.getElementById('userTable');

    // Funzione asincrona per recuperare i dati degli utenti dall'API
    async function fetchUsers() {
        try {
            // Effetto una richiesta GET all'API
            const response = await fetch(apiUrl);
            // Verifica se la risposta non è ok
            if (!response.ok) {
                // Visualizzo un errore nel recupero dei dati
                throw new Error('Errore nel recupero dei dati');
            }
            // Converto in JSON
            const users = await response.json();
            // Salva i dati degli utenti nel localStorage
            localStorage.setItem('users', JSON.stringify(users));
            // Restituisce i dati degli utenti
            return users;
        } catch (error) {
            console.error(error);
            // Mostro un messaggio di errore a video
            alert('Si è verificato un errore nel recupero dei dati');
            return [];
        }
    }

    // Funzione per visualizzare gli utenti nella tabella
    function displayUsers(users) {
        // Svuotao il contenuto
        userTable.innerHTML = '';
        
        users.forEach(user => {
            // Creo una riga (tr) per l'utente
            const line = document.createElement('tr');
            
            // Creo e aggiungo le celle (td) alla riga
            const nameCell = document.createElement('td');
            nameCell.textContent = user.name;
            line.appendChild(nameCell);
            
            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.username;
            line.appendChild(usernameCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            line.appendChild(emailCell);

            const phoneCell = document.createElement('td');
            phoneCell.textContent = user.phone;
            line.appendChild(phoneCell);

            const websiteCell = document.createElement('td');
            websiteCell.textContent = user.website;
            line.appendChild(websiteCell);

            // Inserisco la riga
            userTable.appendChild(line);
        });
    }

    // Funzione asincrona x avviare
    async function start() {
        // Recupera i dati degli utenti dal localStorage, se presenti
        let users = JSON.parse(localStorage.getItem('users'));
        
        // Se non ci sono dati nel localStorage, recupera gli utenti dall'API
        if (!users) {
            users = await fetchUsers();
        } else {
            // Visualizza subito gli utenti dal localStorage
            displayUsers(users);
        }

        // Aggiungo un event listener all'input di testo per il filtraggio
        filterInput.addEventListener('input', () => {
            // Ottengo il testo del filtro convertito in minuscolo
            const filterText = filterInput.value.toLowerCase();
            // Ottiengo il criterio di filtro selezionato nel dropdown
            const filterBy = filterOption.value;
            // Filtro gli utenti in base al testo e al criterio di filtro
            const filteredUsers = users.filter(user => 
                user[filterBy].toLowerCase().includes(filterText)
            );
            // Visualizza gli utenti filtrati nella tabella
            displayUsers(filteredUsers);
        });
        // Aggiunge un event listener al dropdown per il cambiamento del criterio di filtro
        filterOption.addEventListener('change', () => {
            // Ottiene il testo del filtro convertito in minuscolo
            const filterText = filterInput.value.toLowerCase();
            // Ottiene il nuovo criterio di filtro selezionato nel dropdown
            const filterBy = filterOption.value;
            // Filtra gli utenti in base al testo e al nuovo criterio di filtro
            const filteredUsers = users.filter(user => 
                user[filterBy].toLowerCase().includes(filterText)
            );
            // Visualizza gli utenti filtrati nella tabella
            displayUsers(filteredUsers);
        });
    }

    // Chiama la funzione start per avviare
    start();
});
