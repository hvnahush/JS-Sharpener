const apiurl = 'https://crudcrud.com/api/df651714ad7d4049af574fc04042d44e';

async function fetchNotes() {
    try {
        const response = await axios.get(apiurl);
        return response.data;
    } catch (err) {
        console.error("Error fetching Notes:", err);
        return [];
    }
}

async function addNote() {
    const title = document.getElementById('noteTitle').value;
    const desc = document.getElementById('noteDesc').value;

    if (title && desc) {
        try {
            await axios.post(apiurl, { title, desc });
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteDesc').value = '';
            renderNotes();
        } catch (err) {
            console.error('Error adding note:', err);
        }
    }
}

async function deleteNote(id) {
    try {
        await axios.delete(`${apiurl}/${id}`);
        renderNotes();
    } catch (err) {
        console.error('Error deleting note:', err);
    }
}

async function renderNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    const search = document.getElementById('search').value.toLowerCase();
    const notes = await fetchNotes();

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.desc.toLowerCase().includes(search)
    );

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.desc}</p>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });

    document.getElementById('totalNotes').innerText = notes.length;
    document.getElementById('showingNotes').innerText = filteredNotes.length;
}

function filterNotes() {
    renderNotes();
}

// Initial render
renderNotes();
