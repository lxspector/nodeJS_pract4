const express = require('express');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

// Middleware для обработки JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Главная страница - отображение заметок
app.get('/', async (req, res) => {
  try {
    const notes = await getNotes();
    res.render('index', { notes });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).send('Server Error');
  }
});

// Добавление новой заметки
app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title);
    res.redirect('/');
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).send('Server Error');
  }
});

// Обновление заметки
app.put('/note/:id', async (req, res) => {
  try {
    const result = await updateNote(req.params.id, req.body.title);
    if (result) {
      res.json({ message: 'Note updated' });
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).send('Server Error');
  }
});

// Удаление заметки
app.delete('/note/:id', async (req, res) => {
  try {
    const result = await removeNote(req.params.id);
    if (result) {
      res.json({ message: 'Note removed' });
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    console.error('Error removing note:', error);
    res.status(500).send('Server Error');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
