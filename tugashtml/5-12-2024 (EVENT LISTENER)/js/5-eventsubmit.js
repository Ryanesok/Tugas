const form = document.getElementById('myForm');
const nameField = document.getElementById('nameField');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', function(event){
    if(nameField.value.trim() === ''){
        errorMessage.textContent = 'Name Field cannot be empty!';
        event.preventDefault();
    }else{
        errorMessage.textContent = '';
        alert(`form submitted with name: ${nameField.value}`);
    }
});