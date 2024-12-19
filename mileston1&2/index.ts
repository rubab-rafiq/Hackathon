const toggleButton = document.getElementById("toggle-technical-skills") as HTMLButtonElement;
const skills = document.getElementById("technical-skills") as HTMLElement;

toggleButton.addEventListener('click',()=>{
    if(skills.style.display === 'none'){
        skills.style.display ='block'
    } else{
        skills.style.display = 'none'
    }
});
