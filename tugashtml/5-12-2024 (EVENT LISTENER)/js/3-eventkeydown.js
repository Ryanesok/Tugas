const inputField = document.getElementById('inputField');
const displayText = document.getElementById('displayedText');

inputField.addEventListener('keydown', function(event){
    displayText.textContent = event.target.value;
});