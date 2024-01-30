document.addEventListener('DOMContentLoaded', () => {
  // Обработка редактирования заметок
  document.querySelectorAll('.edit-note').forEach((button) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.list-group-item');
      toggleEditMode(listItem, true);
    });
  });

  // Обработка сохранения изменений
  document.querySelectorAll('.save-note').forEach((button) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.list-group-item');
      const noteId = listItem.dataset.id;
      const newTitle = listItem.querySelector('.edit-note-title').value;

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
            listItem.querySelector('.note-title').textContent = newTitle;
            toggleEditMode(listItem, false);
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
    });
  });

  // Обработка отмены изменений
  document.querySelectorAll('.cancel-note').forEach((button) => {
    button.addEventListener('click', () => {
      const listItem = button.closest('.list-group-item');
      toggleEditMode(listItem, false);
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

  // Функция для переключения режима редактирования
  function toggleEditMode(listItem, isEdit) {
    const noteTitleEl = listItem.querySelector('.note-title');
    const editInput = listItem.querySelector('.edit-note-title');
    const editButton = listItem.querySelector('.edit-note');
    const saveButton = listItem.querySelector('.save-note');
    const cancelButton = listItem.querySelector('.cancel-note');

    if (isEdit) {
      noteTitleEl.style.display = 'none';
      editInput.style.display = 'block';
      saveButton.style.display = 'inline-block';
      cancelButton.style.display = 'inline-block';
      editButton.style.display = 'none';
    } else {
      noteTitleEl.style.display = 'block';
      editInput.style.display = 'none';
      saveButton.style.display = 'none';
      cancelButton.style.display = 'none';
      editButton.style.display = 'inline-block';
    }
  }
});
