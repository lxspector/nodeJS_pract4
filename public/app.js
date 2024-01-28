document.addEventListener('DOMContentLoaded', () => {
  // Обработка редактирования заметок
  document.querySelectorAll('.edit-note').forEach((button) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.list-group-item');
      const noteTitleEl = listItem.querySelector('.note-title');
      const noteId = listItem.dataset.id;
      const originalTitle = noteTitleEl.textContent;
      const newTitle = prompt('Введите новое название:', originalTitle);

      if (newTitle !== null && newTitle !== originalTitle) {
        fetch('/note/' + noteId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (data.message === 'Note updated') {
              noteTitleEl.textContent = newTitle;
            } else {
              alert('Ошибка при обновлении: ' + data.message);
            }
          })
          .catch((error) => {
            console.error(
              'There has been a problem with your fetch operation:',
              error
            );
          });
      }
    });
  });

  // Обработка удаления заметок
  document.querySelectorAll('.delete-note').forEach((button) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.list-group-item');
      const noteId = listItem.dataset.id;

      if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
        fetch('/note/' + noteId, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (data.message === 'Note removed') {
              listItem.remove();
            } else {
              alert('Ошибка при удалении: ' + data.message);
            }
          })
          .catch((error) => {
            console.error(
              'There has been a problem with your fetch operation:',
              error
            );
          });
      }
    });
  });
});
