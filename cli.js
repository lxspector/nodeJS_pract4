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
    try {
      const { title } = cmd;
      await addNote(title);
      console.log(`Note added: ${title}`);
    } catch (error) {
      console.error(`Error adding note: ${error.message}`);
    }
  });

program
  .command('list')
  .description('Print all notes')
  .action(async () => {
    try {
      const notes = await getNotes();
      console.log(notes);
    } catch (error) {
      console.error(`Error retrieving notes: ${error.message}`);
    }
  });

program
  .command('remove')
  .description('Remove note by id')
  .requiredOption('--id <id>', 'ID of the note')
  .action(async (cmd) => {
    try {
      const { id } = cmd;
      const result = await removeNote(id);
      if (result) {
        console.log(`Note removed: ${id}`);
      } else {
        console.log(`Note not found: ${id}`);
      }
    } catch (error) {
      console.error(`Error removing note: ${error.message}`);
    }
  });

program
  .command('edit')
  .description('Edit note by id')
  .requiredOption('--id <id>', 'ID of the note')
  .requiredOption('--title <title>', 'New title of the note')
  .action(async (cmd) => {
    try {
      const { id, title } = cmd;
      const result = await updateNote(id, title);
      if (result) {
        console.log(`Note updated: ID ${id}, New Title ${title}`);
      } else {
        console.log(`Note not found: ${id}`);
      }
    } catch (error) {
      console.error(`Error updating note: ${error.message}`);
    }
  });

program.parse(process.argv);
