class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, dueDate, status = 'PORHACER') {
        this.currentId++;
        const newTask = { id: this.currentId, name, description, dueDate, status };
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(taskId) {
        const remainingTasks = [];
        for (const task of this.tasks) {
            if (task.id !== taskId) {
                remainingTasks.push(task);
            }
        }
        this.tasks = remainingTasks;
    }

    getTaskById(taskId) {
        for (const task of this.tasks) {
            if (task.id === taskId) {
                return task;
            }
        }
        return undefined;
    }

    setTasks(tasks) {
        this.tasks = tasks;
        let highestId = 0;
        for (const task of tasks) {
            if (task.id > highestId) {
                highestId = task.id;
            }
        }
        this.currentId = highestId;
    }

    // Tarea 8: guardo el arreglo y el ultimo id en localStorage.
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);

        const currentId = String(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    // Tarea 8: recupero los datos al volver a abrir la pagina.
    load() {
        const tasksJson = localStorage.getItem('tasks');
        const currentId = localStorage.getItem('currentId');

        if (tasksJson !== null) {
            this.tasks = JSON.parse(tasksJson);
        }
        if (currentId !== null) {
            this.currentId = Number(currentId);
        }
    }

    createTaskHtml(id, name, description, dueDate, status) {
        let statusClass = 'estado-pendiente';
        let taskClass = '';
        let doneButton = '';

        if (status === 'DONE') {
            statusClass = 'estado-finalizada';
            taskClass = 'tarea-completada';
        } else {
            doneButton = `
                <button type="button" class="done-button btn btn-success">
                    Marcar como terminada
                </button>
            `;
        }

        return `
            <div class="col-12">
                <article class="card tarjeta-tarea ${taskClass}" data-task-id="${id}">
                    <div class="card-body">
                        <div class="encabezado-tarea">
                            <h3 class="card-title">${name}</h3>
                            <span class="badge ${statusClass}">${status}</span>
                        </div>
                        <p class="card-text">${description || 'Sin descripcion'}</p>
                        <p class="fecha-tarea">Fecha de entrega: ${dueDate}</p>
                        <div class="d-flex gap-2 flex-wrap">
                            ${doneButton}
                            <button type="button" class="delete-button btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }

    render() {
        const tasksList = document.querySelector('#tasksList');
        const taskCounter = document.querySelector('#taskCounter');
        tasksList.innerHTML = '';

        for (const task of this.tasks) {
            tasksList.innerHTML += this.createTaskHtml(
                task.id, task.name, task.description, task.dueDate, task.status
            );
        }

        const totalTasks = this.tasks.length;
        taskCounter.textContent = totalTasks === 1 ? '1 tarea' : totalTasks + ' tareas';
    }
}
