class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, dueDate, status) {
        // Aumentar el identificador antes de crear la tarea
        this.currentId++;

        // Crear la nueva tarea
        const newTask = {
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,

            // La tarea 5 exige este estado inicial
            status: 'PORHACER'
        };

        // Registrar la tarea en el arreglo
        this.tasks.push(newTask);

        return newTask;
    }
}