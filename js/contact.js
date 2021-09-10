/** @format */

const form = document.querySelector("#contact-form");
const nameElement = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

const successContainer = document.querySelector(".success");
let validName;
let validEmail;
let validSubject;
let validMessage;

function validateForm(event) {
  event.preventDefault();
  validName = false;
  validEmail = false;
  validSubject = false;
  validMessage = false;

  if (nameElement.value.trim().length >= 5) {
    nameError.style.display = "none";
    validName = true;
  } else {
    nameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
    validEmail = true;
  } else {
    emailError.style.display = "block";
  }

  if (subject.value.trim().length > 15) {
    subjectError.style.display = "none";
    validSubject = true;
  } else {
    subjectError.style.display = "block";
  }

  if (message.value.trim().length > 25) {
    messageError.style.display = "none";
    validMessage = true;
  } else {
    messageError.style.display = "block";
  }

  if (formSuccess() === true) {
    successContainer.style.display = "block";
    nameElement.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
  } else {
    successContainer.style.display = "none";
  }
}

form.addEventListener("submit", validateForm);

function formSuccess() {
  if (validName && validEmail && validSubject && validMessage) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
