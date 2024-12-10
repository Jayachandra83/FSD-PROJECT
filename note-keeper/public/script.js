const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

// Fetch notes from the server
const fetchNotes = async () => {
    const response = await fetch('/api/notes');
    const notes = await response.json();
    renderNotes(notes);
};

// Render notes on the page
const renderNotes = (notes) => {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${note.text}
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesList.appendChild(li);
    });
};

// Add a new note
addNoteBtn.addEventListener('click', async () => {
    const text = noteInput.value.trim();
    if (text) {
        await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        noteInput.value = '';
        fetchNotes();
    }
});

// Delete a note
const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
};

// Initial fetch
fetchNotes();
