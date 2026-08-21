// Crear una instancia de TaskManager
const taskManager = new TaskManager();

// Comprobar que la colección comienza vacía
console.log(taskManager.tasks);

// Seleccionar elementos del formulario
const taskForm = document.querySelector('#taskForm');
const errorAlert = document.querySelector('#errorAlert');

// Validar los datos del formulario
function validateFormFields(data) {
    const errors = [];

    if (data.name === '') {
        errors.push('El nombre de la tarea es obligatorio.');
    }

    if (data.description === '') {
        errors.push('La descripción es obligatoria.');
    }

    if (data.date === '') {
        errors.push('Debes seleccionar una fecha de entrega.');
    }

    if (data.status === '') {
        errors.push('Debes seleccionar un estado.');
    }

    return errors;
}

// Escuchar el envío del formulario
taskForm.addEventListener('submit', function (event) {
    // Evitar que la página se recargue
    event.preventDefault();

    // Seleccionar los campos
    const taskNameInput = document.querySelector('#taskName');
    const taskDescriptionInput =
        document.querySelector('#taskDescription');
    const taskDateInput = document.querySelector('#taskDate');
    const taskStatusInput = document.querySelector('#taskStatus');

    // Recuperar los valores
    const formData = {
        name: taskNameInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
        date: taskDateInput.value,
        status: taskStatusInput.value
    };

    // Validar los datos
    const errors = validateFormFields(formData);

    // Mostrar errores
    if (errors.length > 0) {
        errorAlert.innerHTML = errors.join('<br>');
        errorAlert.classList.remove('d-none');
        return;
    }

    // Ocultar la alerta si el formulario es válido
    errorAlert.classList.add('d-none');

    console.log('Nombre:', formData.name);
    console.log('Descripción:', formData.description);
    console.log('Fecha:', formData.date);
    console.log('Estado:', formData.status);
    console.log('El formulario es válido.');
});

// Seleccionar todos los botones para completar tareas
const completeButtons =
    document.querySelectorAll('.boton-completar');

// Agregar interacción a cada botón
completeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const taskCard = button.closest('.tarjeta-tarea');
        const statusBadge =
            taskCard.querySelector('.badge');

        // Guardar el estado original la primera vez
        if (!statusBadge.dataset.originalText) {
            statusBadge.dataset.originalText =
                statusBadge.textContent.trim();

            statusBadge.dataset.originalClass =
                statusBadge.className;
        }

        // Cambiar el estado visual
        taskCard.classList.toggle('tarea-completada');

        const isCompleted =
            taskCard.classList.contains('tarea-completada');

        if (isCompleted) {
            button.textContent = 'Marcar como pendiente';

            button.classList.remove('btn-outline-success');
            button.classList.add('btn-outline-secondary');

            statusBadge.className =
                'badge estado-finalizada';

            statusBadge.textContent = 'Completada';
        } else {
            button.textContent = 'Marcar como completada';

            button.classList.remove('btn-outline-secondary');
            button.classList.add('btn-outline-success');

            statusBadge.className =
                statusBadge.dataset.originalClass;

            statusBadge.textContent =
                statusBadge.dataset.originalText;
        }
    });
});