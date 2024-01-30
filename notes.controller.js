const fs = require('fs/promises');
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');

// Функция для добавления новой заметки
async function addNote(title) {
  const notes = await getNotes();
  const newNote = { id: Date.now().toString(), title };

  notes.push(newNote);
  await saveNotes(notes);
}

// Функция для получения всех заметок
async function getNotes() {
  try {
    const data = await fs.readFile(notesPath, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(notesPath, JSON.stringify([]));
      return [];
    } else {
      throw error;
    }
  }
}

// Функция для сохранения заметок в файл
async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
}

// Функция для удаления заметки по id
async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (notes.length > filteredNotes.length) {
    await saveNotes(filteredNotes);
    return true;
  }
  return false;
}

// Функция для обновления заметки по id
async function updateNote(id, newTitle) {
  const notes = await getNotes();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index].title = newTitle;
    await saveNotes(notes);
    return true;
  }
  return false;
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
