const taskManager = new TaskManager();

const initialTasks = [
    { id: 1, name: 'Practicar portugues', description: 'Repasar vocabulario y completar una leccion de practica.', dueDate: '2026-08-18', status: 'PORHACER' },
    { id: 2, name: 'Organizar el mercado', description: 'Preparar la lista de alimentos y productos necesarios para la semana.', dueDate: '2026-08-19', status: 'PORHACER' },
    { id: 3, name: 'Repasar la clase de Java', description: 'Revisar los apuntes y practicar los ejercicios vistos durante la clase.', dueDate: '2026-08-21', status: 'PORHACER' },
    { id: 4, name: 'Actualizar mi hoja de vida', description: 'Agregar los cursos recientes y revisar la informacion de contacto.', dueDate: '2026-08-23', status: 'PORHACER' },
    { id: 5, name: 'Hacer mantenimiento al computador', description: 'Organizar los archivos y eliminar los programas que ya no utilizo.', dueDate: '2026-08-12', status: 'DONE' }
];

const newTaskForm = document.querySelector('#newTaskForm');
const errorAlert = document.querySelector('#errorAlert');
const successAlert = document.querySelector('#successAlert');
const tasksList = document.querySelector('#tasksList');

taskManager.load();
if (localStorage.getItem('tasks') === null) {
    taskManager.setTasks(initialTasks);
    taskManager.save();
}
taskManager.render();

function showSuccess(message) {
    successAlert.textContent = message;
    successAlert.classList.remove('d-none');
    errorAlert.classList.add('d-none');
}

function validateFormFields(data) {
    const errors = [];
    if (data.name === '') errors.push('Debes escribir el nombre de la tarea.');
    if (data.description === '') errors.push('Debes escribir una descripcion.');
    if (data.dueDate === '') errors.push('Debes seleccionar una fecha de entrega.');
    if (data.status === '') errors.push('Debes seleccionar el estado.');
    return errors;
}

newTaskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
        name: document.querySelector('#taskName').value.trim(),
        description: document.querySelector('#taskDescription').value.trim(),
        dueDate: document.querySelector('#taskDate').value,
        status: document.querySelector('#taskStatus').value
    };

    const errors = validateFormFields(formData);
    successAlert.classList.add('d-none');

    if (errors.length > 0) {
        errorAlert.innerHTML = errors.join('<br>');
        errorAlert.classList.remove('d-none');
        return;
    }

    errorAlert.classList.add('d-none');

    taskManager.addTask(formData.name, formData.description, formData.dueDate, formData.status);
    taskManager.save();
    taskManager.render();
    showSuccess('La tarea fue guardada correctamente.');

    newTaskForm.reset();
});

tasksList.addEventListener('click', function (event) {
    const clickedButton = event.target.closest('button');
    if (clickedButton === null) return;

    const parentTask = clickedButton.closest('[data-task-id]');
    if (parentTask === null) return;

    const taskId = Number(parentTask.dataset.taskId);

    if (clickedButton.classList.contains('done-button')) {
        const task = taskManager.getTaskById(taskId);
        if (task !== undefined) {
            task.status = 'DONE';
            taskManager.save();
            taskManager.render();
            showSuccess('La tarea fue marcada como terminada.');
        }
    }

    if (clickedButton.classList.contains('delete-button')) {
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
        showSuccess('La tarea fue eliminada.');
    }
});
