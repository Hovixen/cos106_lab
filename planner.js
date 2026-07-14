// ===========================================================
// Academic Planner — interactive task management system
// Demonstrates: arrays, functions, DOM manipulation,
// event handling, dynamic content updates, localStorage
// ===========================================================

const STORAGE_KEY = 'academicPlannerTasks';

/** @type {{id: number, text: string, due: string, done: boolean}[]} */
let tasks = [];

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const dueInput = document.getElementById('task-due');
const list = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const statTotal = document.getElementById('stat-total');
const statDone = document.getElementById('stat-done');
const statOpen = document.getElementById('stat-open');
const filterSelect = document.getElementById('task-filter');

let currentFilter = 'all';

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : seedTasks();
  } catch (err) {
    tasks = seedTasks();
  }
}

function seedTasks() {
  return [
    { id: 1, text: 'Finish structural analysis sketches', due: '2026-07-18', done: false },
    { id: 2, text: 'Submit studio project proposal', due: '2026-07-15', done: true },
    { id: 3, text: 'Read chapter 4 — Materials & Construction', due: '2026-07-20', done: false }
  ];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text, due) {
  const task = {
    id: Date.now(),
    text: text.trim(),
    due: due || '',
    done: false
  };
  tasks.push(task);
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function formatDue(due) {
  if (!due) return 'No due date';
  const d = new Date(due + 'T00:00:00');
  if (isNaN(d)) return due;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function getVisibleTasks() {
  if (currentFilter === 'open') return tasks.filter(t => !t.done);
  if (currentFilter === 'done') return tasks.filter(t => t.done);
  return tasks;
}

function render() {
  const visible = getVisibleTasks();
  list.innerHTML = '';

  if (visible.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    visible.forEach(task => list.appendChild(buildTaskEl(task)));
  }

  const done = tasks.filter(t => t.done).length;
  statTotal.textContent = tasks.length;
  statDone.textContent = done;
  statOpen.textContent = tasks.length - done;
}

function buildTaskEl(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.done ? ' done' : '');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.done ? 'incomplete' : 'complete'}`);
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const textWrap = document.createElement('div');
  textWrap.className = 'task-text';
  const textSpan = document.createElement('div');
  textSpan.textContent = task.text;
  const dueSpan = document.createElement('div');
  dueSpan.className = 'task-due';
  dueSpan.textContent = formatDue(task.due);
  textWrap.appendChild(textSpan);
  textWrap.appendChild(dueSpan);

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'task-del';
  delBtn.textContent = 'Delete';
  delBtn.setAttribute('aria-label', `Delete "${task.text}"`);
  delBtn.addEventListener('click', () => deleteTask(task.id));

  li.appendChild(checkbox);
  li.appendChild(textWrap);
  li.appendChild(delBtn);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return;
  }
  addTask(value, dueInput.value);
  form.reset();
  input.focus();
});

filterSelect.addEventListener('change', () => {
  currentFilter = filterSelect.value;
  render();
});

loadTasks();
render();
