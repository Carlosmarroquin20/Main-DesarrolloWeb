const container = document.querySelector('.container');
const addColumnButton = document.getElementById('addColumn');

// Agregar columna al hacer clic en el botón "Agregar columna"
addColumnButton.addEventListener('click', addColumn);

function addColumn() {
  const newColumn = createColumn();
  container.insertBefore(newColumn, addColumnButton);
}

function createColumn() {
  const column = document.createElement('div');
  column.className = 'column';
  column.innerHTML = `
    <div class="column-header">
      <h2>Columna</h2>
      <button class="delete-column">Eliminar</button>
    </div>
    <button class="add-button">Agregar tarea</button>
  `;

  // Agregar tarea al hacer clic en el botón "Agregar tarea"
  const addButton = column.querySelector('.add-button');
  addButton.addEventListener('click', () => addTask(column));

  // Eliminar columna al hacer clic en el botón "Eliminar"
  const deleteButton = column.querySelector('.delete-column');
  deleteButton.addEventListener('click', () => deleteColumn(column));

  // Funciones de arrastrar y soltar
  column.addEventListener('dragover', dragOver);
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', drop);

  return column;
}

function addTask(column) {
  const newCard = createCard();
  column.appendChild(newCard);
}

function createCard() {
  const card = document.createElement('div');
  card.className = 'card';
  card.draggable = true;
  card.textContent = 'Nueva tarea';
  
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
  
  return card;
}

function deleteColumn(column) {
  container.removeChild(column);
}

// Funciones de arrastrar y soltar (drag and drop)
function dragStart() {
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function drop() {
  this.classList.remove('hovered');
  const card = document.querySelector('.dragging');
  this.appendChild(card);
}
