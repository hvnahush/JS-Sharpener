let notes = [];

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const desc = document.getElementById('noteDesc').value;

    if (title && desc) {
        notes.push({ title, desc });
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteDesc').value = '';
        renderNotes();
    }
}
function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

function renderNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    const search = document.getElementById('search').value.toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.desc.toLowerCase().includes(search)
    );

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `<h2>${note.title}</h2><p>${note.desc}</p>`;
        notesContainer.appendChild(noteDiv);
    });

    document.getElementById('totalNotes').innerText = notes.length;
    document.getElementById('showingNotes').innerText = filteredNotes.length;
}

function filterNotes() {
    renderNotes();
}