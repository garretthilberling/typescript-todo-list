import { v4 as uuidV4 } from 'uuid';

type Task = {
    id: String,
    title: String,
    completed: boolean,
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", event => {
    event.preventDefault();
    console.log('Im working');

    if (input?.value == '' || input?.value == null) return;

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask);
    
    addListItem(newTask);
    input.value = "";
});

function addListItem(task: Task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks()
    });
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('TASKS');
    if (!taskJSON) return [];
    return JSON.parse(taskJSON);
}