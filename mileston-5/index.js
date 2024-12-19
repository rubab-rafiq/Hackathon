"use strict";
var _a, _b;
const form = document.getElementById("resume-form");
const resumeOutput = document.getElementById("resume-output");
const shareableLinkContainer = document.getElementById("shareable-link-container");
const shareableLink = document.getElementById("shareable-link");
const pdfButtonContainer = document.getElementById("pdf-button-container");
const defaultAvatar = "https://via.placeholder.com/150";
// Form submit event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const resumeData = getFormData();
    if (!resumeData)
        return;
    saveAndGenerateResume(resumeData);
});
// Form se data lene ka function
function getFormData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phonenumber = document.getElementById("phonenumber").value.trim();
    const education = document.getElementById("education").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const username = document.getElementById("username").value.trim();
    const profilePictureInput = document.getElementById("profile-picture");
    if (!name || !email || !phonenumber || !education || !experience || !username) {
        alert("Please fill out all required fields.");
        return null;
    }
    let profilePictureUrl = defaultAvatar;
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const file = profilePictureInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            var _a;
            profilePictureUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            const updatedData = { name, email, phonenumber, education, experience, username, profilePictureUrl, skills: getSkills() };
            saveAndGenerateResume(updatedData);
        };
        return null;
    }
    return { name, email, phonenumber, education, experience, username, profilePictureUrl, skills: getSkills() };
}
function getSkills() {
    return Array.from(document.querySelectorAll(".skill-input"))
        .map((input) => input.value.trim())
        .filter((value) => value);
}
// Save and generate resume
function saveAndGenerateResume(resumeData) {
    localStorage.setItem(`resume_${resumeData.username}`, JSON.stringify(resumeData));
    generateResumeOutput(resumeData);
    createShareableLink(resumeData.username);
    pdfButtonContainer.style.display = "block"; // Show PDF download button after generating the resume
}
function generateResumeOutput(data) {
    document.title = `${data.name}'s Resume`;
    resumeOutput.innerHTML =
        `<div class="profile-picture">
      <img src="${data.profilePictureUrl}" alt="Profile picture of ${data.name}">
    </div>
    <h2>${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phonenumber}</p>
    <div class="resume-section">
      <h3>Education</h3>
      <p>${data.education}</p>
    </div>
    <div class="resume-section">
      <h3>Experience</h3>
      <p>${data.experience}</p>
    </div>
    <div class="resume-section">
      <h3>Skills</h3>
      <ul>
        ${data.skills.length > 0 ? data.skills.map((skill) => `<li>${skill}</li>`).join("") : "<li>No skills added</li>"}
      </ul>
    </div>`;
}
// Create shareable link
function createShareableLink(username) {
    const currentUrl = window.location.origin;
    const link = `${currentUrl}/?username=${username}`;
    shareableLink.href = link;
    shareableLink.textContent = `View ${username}'s Resume`;
    shareableLinkContainer.style.display = "block";
}
// PDF download function
function downloadPDF() {
    const resumeContent = document.getElementById("resume-output");
    if (resumeContent) {
        html2pdf()
            .set({
            margin: 1,
            filename: "resume.pdf",
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { orientation: "portrait" },
        })
            .from(resumeContent)
            .save();
    }
}
// URL se resume data load karna
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    if (username) {
        const resumeData = localStorage.getItem(`resume_${username}`);
        if (resumeData) {
            const parsedData = JSON.parse(resumeData);
            generateResumeOutput(parsedData);
            pdfButtonContainer.style.display = "block"; // Show the download button
        }
        else {
            resumeOutput.innerHTML =
                `<p><strong>Resume for ${username}</strong> not found. Please create your resume first.</p>
        <p><a href="/" style="color:blue;">Go back to create your resume</a></p>`;
        }
    }
});
// Add skill dynamically
(_a = document.getElementById("add-skill-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    const skillInput = document.createElement("input");
    skillInput.type = "text";
    skillInput.classList.add("skill-input");
    skillInput.placeholder = "Add a skill";
    (_a = document.getElementById("skills-container")) === null || _a === void 0 ? void 0 : _a.appendChild(skillInput);
});
// Ensure download button works
(_b = document.getElementById("download-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", downloadPDF);
