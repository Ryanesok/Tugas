// Timer Functionality
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const toggleButton = document.getElementById('toggle-timer');
const resetButton = document.getElementById('reset-timer');
const timerTypeSelect = document.getElementById('timer-type');
const menuImage = document.getElementById('menu-img');
const menuParagraph = document.getElementById('menu-p');
const customTimeInput = document.getElementById('custom-time');
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');

timerTypeSelect.addEventListener('change', () => {
    const selectedValue = timerTypeSelect.value;

    if(selectedValue === 'study'){
        menuImage.src = 'Resources/cat_smile.png';
        menuParagraph.textContent = "Semangat belajarnya Kaka!";
    }else if(selectedValue === 'break'){
        menuImage.src = 'Resources/cat_sleep.jpg';
        menuImage.title = 'kucing ini akan menemanimu tidur';
        menuParagraph.textContent = "Istirahat yang cukup kaka!";
    }
})

navbar.addEventListener('click', () => {
    menu.classList.toggle('active');
});

function updateTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        clearInterval(timer);
        const alarm = new Audio('Resources/alarm.wav');
        alarm.play();
        setTimeout(() => {
            alert('Waktu habis! Silakan input ulang waktu.');
            alarm.pause(); // Berhenti saat alert ditekan
        }, 500); // tunggu 0.5 detik sebelum muncul alert
        isRunning = false;
        // Tambahkan alarm ketika waktu habis
        return;
    }
    
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

toggleButton.addEventListener('click', () => {
    if (!isRunning) {
        const customTime = customTimeInput.value;
        if (customTime) {
            minutes = parseInt(customTime);
            seconds = 0;
        }
        
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        toggleButton.textContent = '⏸️'; // Ubah tombol menjadi pause
    } else {
        clearInterval(timer);
        isRunning = false;
        toggleButton.textContent = '▶️'; // Ubah tombol menjadi start
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    minutesDisplay.textContent = '25';
    secondsDisplay.textContent = '00';
    isRunning = false;
    toggleButton.textContent = '▶️'; // Pastikan tombol kembali ke start setelah reset
    alert('Timer telah direset!');
});

// To-Do List Functionality
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Load todo list from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            
            const span = document.createElement('span');
            span.textContent = todo.text;
            if (todo.completed) {
                span.classList.add('completed');
            }
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑️'; // Simbol tempat sampah dipertahankan
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(li);
                saveTodos();
            });
            
            span.addEventListener('click', () => {
                span.classList.toggle('completed');
                saveTodos();
            });
            
            li.appendChild(span);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        
        const span = document.createElement('span');
        span.textContent = todoText;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️'; // Simbol tempat sampah dipertahankan
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });
        
        span.addEventListener('click', () => {
            span.classList.toggle('completed');
            saveTodos();
        });
        
        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
        
        todoInput.value = '';
        saveTodos();
    }
}

addTodoButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function saveTodos() {
    const todos = Array.from(todoList.children).map(todo => ({
        text: todo.children[0].textContent,
        completed: todo.children[0].classList.contains('completed')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}