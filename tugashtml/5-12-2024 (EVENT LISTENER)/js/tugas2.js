const hoverButton = document.getElementById('hoverButton');
const outputHover = document.getElementById('outputHover');

hoverButton.addEventListener('mouseover', function(){
    outputHover.textContent = "Mouse is over the button!";
});

hoverButton.addEventListener('click', function(){
    outputHover.textContent = "Mouse is clicking the button!";
});