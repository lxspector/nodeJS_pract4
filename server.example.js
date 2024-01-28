const express = require('express');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const notes = await getNotes();
  res.render('index', { notes });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.redirect('/');
});

app.put('/note/:id', async (req, res) => {
  await updateNote(req.params.id, req.body.title);
  res.json({ message: 'Note updated' });
});

app.delete('/note/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.json({ message: 'Note removed' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
