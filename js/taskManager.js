class TaskManager {
    constructor(currentId = 0) {
        // Aquí guardaré todas mis tareas
        this.tasks = [];

        // Este número me permite crear ids diferentes
        this.currentId = currentId;
    }

    // Agregar una nueva tarea
    addTask(name, description, dueDate, status) {
        // Aumento el contador antes de crear la tarea
        this.currentId++;

        const newTask = {
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            status: 'PORHACER'
        };

        // Guardo la nueva tarea en el arreglo
        this.tasks.push(newTask);

        return newTask;
    }

    // Eliminar una tarea usando su id
    deleteTask(taskId) {
        const newTasks = [];

        // Recorro las tareas que tengo guardadas
        for (let task of this.tasks) {
            // Conservo las que tengan un id diferente
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }

        // Actualizo la colección
        this.tasks = newTasks;
    }

    // Buscar una tarea utilizando su id
    getTaskById(taskId) {
        let foundTask;

        for (let task of this.tasks) {
            if (task.id === taskId) {
                foundTask = task;
            }
        }

        return foundTask;
    }

    // Guardar las tareas en el navegador
    save() {
        const tasksAsText =
            JSON.stringify(this.tasks);

        localStorage.setItem(
            'tasks',
            tasksAsText
        );

        localStorage.setItem(
            'currentId',
            this.currentId.toString()
        );
    }

    // Recuperar las tareas guardadas
    load() {
        const savedTasks =
            localStorage.getItem('tasks');

        const savedCurrentId =
            localStorage.getItem('currentId');

        if (savedTasks !== null) {
            this.tasks =
                JSON.parse(savedTasks);
        }

        if (savedCurrentId !== null) {
            this.currentId =
                Number(savedCurrentId);
        }
    }

    // Crear el HTML de una tarjeta
    createTaskHtml(
        id,
        name,
        description,
        dueDate,
        status
    ) {
        let statusClass = 'estado-pendiente';
        let taskClass = '';
        let doneButton = '';

        // Si está terminada, cambio su apariencia
        if (status === 'DONE') {
            statusClass = 'estado-finalizada';
            taskClass = 'tarea-completada';
        } else {
            // Si está pendiente, muestro este botón
            doneButton = `
                <button
                    type="button"
                    class="done-button btn btn-success"
                >
                    Mark As Done
                </button>
            `;
        }

        return `
            <div class="col-12">
                <article
                    class="card tarjeta-tarea ${taskClass}"
                    data-task-id="${id}"
                >
                    <div class="card-body">

                        <div class="encabezado-tarea">
                            <h3 class="card-title">
                                ${name}
                            </h3>

                            <span class="badge ${statusClass}">
                                ${status}
                            </span>
                        </div>

                        <p class="card-text">
                            ${description}
                        </p>

                        <p class="fecha-tarea">
                            Fecha de entrega: ${dueDate}
                        </p>

                        <div class="d-flex gap-2 flex-wrap">
                            ${doneButton}

                            <button
                                type="button"
                                class="delete-button btn btn-danger"
                            >
                                Eliminar
                            </button>
                        </div>

                    </div>
                </article>
            </div>
        `;
    }

    // Mostrar las tareas en la página
    render() {
        const tasksList =
            document.querySelector('#tasksList');

        const taskCounter =
            document.querySelector('#taskCounter');

        // Limpio la lista antes de volver a mostrarla
        tasksList.innerHTML = '';

        // Recorro el arreglo y creo cada tarjeta
        for (let task of this.tasks) {
            const taskHtml =
                this.createTaskHtml(
                    task.id,
                    task.name,
                    task.description,
                    task.dueDate,
                    task.status
                );

            tasksList.innerHTML += taskHtml;
        }

        // Actualizo el contador
        const totalTasks = this.tasks.length;

        if (totalTasks === 1) {
            taskCounter.textContent = '1 tarea';
        } else {
            taskCounter.textContent =
                totalTasks + ' tareas';
        }
    }
}