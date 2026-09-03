// Creo el administrador de tareas
const taskManager = new TaskManager();

// Intento recuperar las tareas que ya están guardadas
taskManager.load();

// Reviso si es la primera vez que se abre
// esta versión del proyecto
const savedTasks =
    localStorage.getItem('tasks');

// Si todavía no hay tareas guardadas,
// agrego las cinco tareas que tenía antes
if (savedTasks === null) {
    taskManager.tasks = [
        {
            id: 1,
            name: 'Practicar portugués',
            description:
                'Repasar vocabulario y completar una lección de práctica.',
            dueDate: '2026-08-18',
            status: 'PORHACER'
        },
        {
            id: 2,
            name: 'Organizar el mercado',
            description:
                'Preparar la lista de alimentos y productos necesarios para la semana.',
            dueDate: '2026-08-19',
            status: 'PORHACER'
        },
        {
            id: 3,
            name: 'Repasar la clase de Java',
            description:
                'Revisar los apuntes y practicar los ejercicios vistos durante la clase.',
            dueDate: '2026-08-21',
            status: 'PORHACER'
        },
        {
            id: 4,
            name: 'Actualizar mi hoja de vida',
            description:
                'Agregar los cursos recientes y revisar la información de contacto.',
            dueDate: '2026-08-23',
            status: 'PORHACER'
        },
        {
            id: 5,
            name: 'Hacer mantenimiento al computador',
            description:
                'Organizar los archivos y eliminar los programas que ya no utilizo.',
            dueDate: '2026-08-12',
            status: 'DONE'
        }
    ];

    // Como ya tengo cinco tareas,
    // el último identificador utilizado es 5
    taskManager.currentId = 5;

    // Guardo las tareas iniciales
    taskManager.save();
}

// Muestro las tareas en la página
taskManager.render();

// Selecciono el formulario
const newTaskForm =
    document.querySelector('#newTaskForm');

// Selecciono las alertas
const errorAlert =
    document.querySelector('#errorAlert');

const successAlert =
    document.querySelector('#successAlert');

// Selecciono la lista
const tasksList =
    document.querySelector('#tasksList');

// Función para revisar los campos
function validateFormFields(data) {
    const errors = [];

    if (data.name === '') {
        errors.push(
            'Debes escribir el nombre de la tarea.'
        );
    }

    if (data.description === '') {
        errors.push(
            'Debes escribir una descripción.'
        );
    }

    if (data.dueDate === '') {
        errors.push(
            'Debes seleccionar una fecha de entrega.'
        );
    }

    if (data.status === '') {
        errors.push(
            'Debes seleccionar el estado.'
        );
    }

    return errors;
}

// Escucho el envío del formulario
newTaskForm.addEventListener(
    'submit',
    function (event) {
        // Evito que la página se recargue
        event.preventDefault();

        // Selecciono los campos
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

        // Recupero lo que escribió la persona
        const formData = {
            name: taskNameInput.value.trim(),

            description:
                taskDescriptionInput.value.trim(),

            dueDate: taskDateInput.value,

            status: taskStatusInput.value
        };

        // Reviso si existen errores
        const errors =
            validateFormFields(formData);

        // Oculto un mensaje anterior
        successAlert.classList.add('d-none');

        // Si hay errores, los muestro
        if (errors.length > 0) {
            errorAlert.innerHTML =
                errors.join('<br>');

            errorAlert.classList.remove('d-none');

            return;
        }

        // Si está correcto, oculto los errores
        errorAlert.classList.add('d-none');

        // Agrego la tarea con TaskManager
        const newTask = taskManager.addTask(
            formData.name,
            formData.description,
            formData.dueDate,
            formData.status
        );

        // Guardo las tareas
        taskManager.save();

        // Actualizo la lista
        taskManager.render();

        // Compruebo el resultado en la consola
        console.log(
            'Agregué esta tarea:',
            newTask
        );

        console.log(
            'Estas son todas mis tareas:',
            taskManager.tasks
        );

        // Muestro una confirmación
        successAlert.textContent =
            'La tarea fue guardada correctamente.';

        successAlert.classList.remove('d-none');

        // Limpio el formulario
        newTaskForm.reset();
    }
);

// Utilizo un solo evento para toda la lista
tasksList.addEventListener(
    'click',
    function (event) {
        // Reviso si la persona presionó un botón
        const clickedButton =
            event.target.closest('button');

        if (clickedButton === null) {
            return;
        }

        // Busco la tarjeta donde está el botón
        const parentTask =
            clickedButton.closest(
                '[data-task-id]'
            );

        if (parentTask === null) {
            return;
        }

        // Los atributos data llegan como texto
        const taskIdText =
            parentTask.dataset.taskId;

        // Convierto el id a número
        const taskId =
            Number(taskIdText);

        // Compruebo si se presionó Mark As Done
        if (
            clickedButton.classList.contains(
                'done-button'
            )
        ) {
            // Busco la tarea correspondiente
            const task =
                taskManager.getTaskById(taskId);

            if (task !== undefined) {
                // Cambio solamente su estado
                task.status = 'DONE';

                // Vuelvo a mostrar la lista
                taskManager.render();
            }
        }

        // Compruebo si se presionó Eliminar
        if (
            clickedButton.classList.contains(
                'delete-button'
            )
        ) {
            // Elimino la tarea correcta
            taskManager.deleteTask(taskId);

            // Guardo la colección actualizada
            taskManager.save();

            // Vuelvo a mostrar la lista
            taskManager.render();
        }
    }
);