// Crear una sola instancia de TaskManager
const taskManager = new TaskManager();

// Seleccionar elementos del documento
const newTaskForm =
    document.querySelector('#newTaskForm');

const errorAlert =
    document.querySelector('#errorAlert');

const successAlert =
    document.querySelector('#successAlert');

// Validar la información del formulario
function validateFormFields(data) {
    const errors = [];

    if (data.name === '') {
        errors.push(
            'El nombre de la tarea es obligatorio.'
        );
    }

    if (data.description === '') {
        errors.push(
            'La descripción es obligatoria.'
        );
    }

    if (data.dueDate === '') {
        errors.push(
            'Debes seleccionar una fecha de entrega.'
        );
    }

    if (data.status === '') {
        errors.push(
            'Debes seleccionar un estado.'
        );
    }

    return errors;
}

// Escuchar el envío del formulario
newTaskForm.addEventListener(
    'submit',
    function (event) {
        // Evitar la recarga de la página
        event.preventDefault();

        // Recuperar los elementos del formulario
        const taskNameInput =
            document.querySelector('#taskName');

        const taskDescriptionInput =
            document.querySelector(
                '#taskDescription'
            );

        const taskDateInput =
            document.querySelector('#taskDate');

        const taskStatusInput =
            document.querySelector('#taskStatus');

        // Obtener los valores ingresados
        const formData = {
            name: taskNameInput.value.trim(),

            description:
                taskDescriptionInput.value.trim(),

            dueDate: taskDateInput.value,

            status: taskStatusInput.value
        };

        // Ejecutar las validaciones existentes
        const errors =
            validateFormFields(formData);

        // Ocultar mensaje anterior de éxito
        successAlert.classList.add('d-none');

        // Impedir el registro si existen errores
        if (errors.length > 0) {
            errorAlert.innerHTML =
                errors.join('<br>');

            errorAlert.classList.remove('d-none');

            return;
        }

        // Ocultar los errores
        errorAlert.classList.add('d-none');

        // Registrar la tarea en TaskManager
        const newTask = taskManager.addTask(
            formData.name,
            formData.description,
            formData.dueDate,
            formData.status
        );

        // Comprobar el resultado en la consola
        console.log(
            'Tarea registrada:',
            newTask
        );

        console.log(
            'Todas las tareas:',
            taskManager.tasks
        );

        // Mostrar confirmación
        successAlert.textContent =
            `Tarea registrada correctamente con id ${newTask.id}.`;

        successAlert.classList.remove('d-none');

        // Limpiar el formulario
        newTaskForm.reset();
    }
);

// Seleccionar los botones de las tarjetas
const completeButtons =
    document.querySelectorAll(
        '.boton-completar'
    );

// Conservar la funcionalidad de la tarea 4
completeButtons.forEach(function (button) {
    button.addEventListener(
        'click',
        function () {
            const taskCard =
                button.closest('.tarjeta-tarea');

            const statusBadge =
                taskCard.querySelector('.badge');

            // Guardar el estado original
            if (
                !statusBadge.dataset.originalText
            ) {
                statusBadge.dataset.originalText =
                    statusBadge.textContent.trim();

                statusBadge.dataset.originalClass =
                    statusBadge.className;
            }

            // Marcar o desmarcar la tarjeta
            taskCard.classList.toggle(
                'tarea-completada'
            );

            const isCompleted =
                taskCard.classList.contains(
                    'tarea-completada'
                );

            if (isCompleted) {
                button.textContent =
                    'Marcar como pendiente';

                button.classList.remove(
                    'btn-outline-success'
                );

                button.classList.add(
                    'btn-outline-secondary'
                );

                statusBadge.className =
                    'badge estado-finalizada';

                statusBadge.textContent =
                    'Completada';
            } else {
                button.textContent =
                    'Marcar como completada';

                button.classList.remove(
                    'btn-outline-secondary'
                );

                button.classList.add(
                    'btn-outline-success'
                );

                statusBadge.className =
                    statusBadge.dataset.originalClass;

                statusBadge.textContent =
                    statusBadge.dataset.originalText;
            }
        }
    );
});