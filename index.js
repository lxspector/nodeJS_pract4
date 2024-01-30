const express = require('express');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

const app = express();
const port = 3002;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Главная страница - отображение всех заметок
app.get('/', async (req, res) => {
  try {
    const notes = await getNotes();
    res.render('index', { title: 'Example Server', notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Server Error');
  }
});

// Добавление новой заметки
app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title);
    res.redirect('/');
  } catch (error) {
    console.error(chalk.red('Error: '), error);
    res.status(500).send('Server Error');
  }
});

// Обновление заметки
app.put('/note/:id', async (req, res) => {
  try {
    const updated = await updateNote(req.params.id, req.body.title);
    if (updated) {
      res.json({ message: 'Note updated' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error(chalk.red('Error: '), error);
    res.status(500).send('Server Error');
  }
});

// Удаление заметки
app.delete('/note/:id', async (req, res) => {
  try {
    const removed = await removeNote(req.params.id);
    if (removed) {
      res.json({ message: 'Note removed' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    console.error(chalk.red('Error: '), error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example server is running on port ${port}`);
});
