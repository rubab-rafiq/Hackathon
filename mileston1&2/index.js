var toggleButton = document.getElementById("toggle-technical-skills");
var skills = document.getElementById("technical-skills");
toggleButton.addEventListener('click', function () {
    if (skills.style.display === 'none') {
        skills.style.display = 'block';
    }
    else {
        skills.style.display = 'none';
    }
});
