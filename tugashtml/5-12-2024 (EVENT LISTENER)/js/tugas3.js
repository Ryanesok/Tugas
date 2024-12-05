const inputField = document.getElementById('inputField');
const display = document.getElementById('displayed');

inputField.addEventListener('keydown', function(event){
    display.textContent = event.key;
});