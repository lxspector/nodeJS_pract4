const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.redirect('/');
});

app.put('/note/:id', async (req, res) => {
  const updated = await updateNote(req.params.id, req.body.title);
  if (updated) {
    res.json({ message: 'Note updated', updated: true });
  } else {
    res.status(404).json({ message: 'Note not found', updated: false });
  }
});

app.delete('/note/:id', async (req, res) => {
  const removed = await removeNote(req.params.id);
  if (removed) {
    res.json({ message: 'Note removed', removed: true });
  } else {
    res.status(404).json({ message: 'Note not found', removed: false });
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
