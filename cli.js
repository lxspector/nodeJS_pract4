const { program } = require('commander');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

program.version('1.0.0');

program
  .command('add')
  .description('Add new note to list')
  .requiredOption('--title <title>', 'Title of the note')
  .action(async (cmd) => {
    const { title } = cmd;
    await addNote(title);
  });

program
  .command('list')
  .description('Print all notes')
  .action(async () => {
    const notes = await getNotes();
    console.log(notes);
  });

program
  .command('remove')
  .description('Remove note by id')
  .requiredOption('--id <id>', 'ID of the note')
  .action(async (cmd) => {
    const { id } = cmd;
    await removeNote(id);
  });

program
  .command('edit')
  .description('Edit note by id')
  .requiredOption('--id <id>', 'ID of the note')
  .requiredOption('--title <title>', 'New title of the note')
  .action(async (cmd) => {
    const { id, title } = cmd;
    await updateNote(id, title);
  });

program.parse(process.argv);
