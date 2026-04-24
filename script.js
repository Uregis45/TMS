// TASK STORAGE AND MANAGEMENT
let tasks = [];

// Load tasks from localStorage
function loadTasks() {
    const stored = localStorage.getItem('tms_tasks');
    if(stored) {
        tasks = JSON.parse(stored);
    } else {
        // Demo initial tasks
        tasks = [
            { id: Date.now() + 1, firstName: "Prince", lastName: "Junior", date: "2026-05-15", taskDesc: "Complete frontend module", deleted: false, tempDeleted: false },
            { id: Date.now() + 2, firstName: "Regis", lastName: "Developer", date: "2026-05-20", taskDesc: "Implement backend API", deleted: false, tempDeleted: false },
            { id: Date.now() + 3, firstName: "Alice", lastName: "Smith", date: "2026-04-28", taskDesc: "Testing and debugging", deleted: false, tempDeleted: false }
        ];
        saveTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tms_tasks', JSON.stringify(tasks));
}

// Helper functions
function getActiveTasks() {
    return tasks.filter(t => !t.deleted);
}

function getTempDeletedTasks() {
    return tasks.filter(t => t.tempDeleted === true && !t.deleted);
}

function showAlert(message, type = 'success') {
    const alertDiv = document.getElementById('alertMessage');
    if(alertDiv) {
        alertDiv.textContent = message;
        alertDiv.className = `alert ${type}`;
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 3000);
    } else {
        alert(message);
    }
}

// Task CRUD operations
function addTask(firstName, lastName, date, taskDesc) {
    if(!firstName || !lastName || !date || !taskDesc) {
        showAlert("Please fill all fields!", "error");
        return false;
    }
    const newTask = {
        id: Date.now(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        date: date,
        taskDesc: taskDesc.trim(),
        deleted: false,
        tempDeleted: false
    };
    tasks.push(newTask);
    saveTasks();
    showAlert("Task added successfully!", "success");
    return true;
}

function permanentDelete(taskId) {
    const index = tasks.findIndex(t => t.id == taskId);
    if(index !== -1) {
        tasks[index].deleted = true;
        tasks[index].tempDeleted = false;
        saveTasks();
        showAlert("Task permanently deleted!", "success");
        location.reload();
    }
}

function tempDeleteTask(taskId) {
    const task = tasks.find(t => t.id == taskId);
    if(task && !task.deleted) {
        task.tempDeleted = true;
        saveTasks();
        showAlert("Task moved to temporary backup!", "success");
        location.reload();
    }
}

function restoreTask(taskId) {
    const task = tasks.find(t => t.id == taskId);
    if(task && task.tempDeleted) {
        task.tempDeleted = false;
        saveTasks();
        showAlert("Task restored successfully!", "success");
        location.reload();
    }
}

function escapeHtml(str) {
    if(!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    });
}

// Set active nav link
function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if(href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}