"use strict";
var _a;
// Form and resume output elements ko get karna
const form = document.getElementById("resume-form");
const resumeOutput = document.getElementById("resume-output");
// Input fields ko get karna
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phonenumber");
const educationInput = document.getElementById("education");
const experienceInput = document.getElementById("experience");
const skillsContainer = document.getElementById("skills-container");
const profilePictureInput = document.getElementById("profile-picture");
// Default avatar ko set karna (agar user ne profile picture na upload ki ho)
const defaultAvatar = "https://via.placeholder.com/150";
// Skills add karne ke liye button ka event
(_a = document.getElementById("add-skill-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const skillInput = document.createElement("input");
    skillInput.type = "text";
    skillInput.classList.add("skill-input");
    skillInput.placeholder = "Add a skill";
    // Skills container mein new input field add karna
    skillsContainer.appendChild(skillInput);
});
// Form submit hone par ye function run hoga
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Form ko reload hone se rokna
    // Agar required fields (name, email, education, experience) empty hain, toh alert dena
    if (!nameInput.value.trim() || !emailInput.value.trim() || !educationInput.value.trim() || !experienceInput.value.trim()) {
        alert("Please fill out all required fields.");
        return;
    }
    // Skills ko array mein store karna (non-empty skills ko filter karna)
    const skills = Array.from(document.querySelectorAll(".skill-input"))
        .map(input => input.value.trim())
        .filter(value => value); // Sirf non-empty values ko rakhna
    // Profile picture ko read karna (agar user ne upload ki ho)
    let profilePictureUrl = defaultAvatar; // Default avatar agar user ne koi picture na di ho
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePictureUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume(); // Profile picture load hone ke baad resume generate karna
        };
        reader.readAsDataURL(profilePictureInput.files[0]); // File ko base64 URL mein convert karna
    }
    else {
        generateResume(); // Agar profile picture na ho toh resume generate karna
    }
    // Resume ko generate karna
    function generateResume() {
        resumeOutput.innerHTML = `
      <div class="profile-picture">
        <img src="${profilePictureUrl}" alt="Profile Picture">
      </div>

      <h2>${nameInput.value}</h2>
        
      <p><strong>Emails:</strong> ${emailInput.value}</p>

      <p><strong>Phone:</strong> ${phoneInput.value}</p>

      <div class="resume-section">
        <h3>Education</h3>
        <p>${educationInput.value}</p>
      </div>

      <div class="resume-section">
        <h3>Experience</h3>
        <p>${experienceInput.value}</p>
      </div>

      <div class="resume-section">
        <h3>Skills</h3>
        <ul>
          ${skills.length > 0 ? skills.map(skill => `<li>${skill}</li>`).join('') : "<li>No skills added</li>"}
        </ul>
      </div>                                                                                            
    `;
    }
});
