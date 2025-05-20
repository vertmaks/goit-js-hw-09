import { emailCheck, msgCheck, formSubmit } from './form-check-logic';
import { refs } from './refs';

const STORAGE_KEY = 'feedback-form-state';
const form = refs.form;
const emailInput = refs.emailInput;
const textInput = refs.textInput;

refreshInputValue();

emailInput.addEventListener('blur', emailCheck);

textInput.addEventListener('blur', msgCheck);

form.addEventListener('submit', formSubmit);

form.addEventListener('submit', handleFormSubmit);

form.addEventListener('focusout', handleFormInput);

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  localStorage.removeItem(STORAGE_KEY);

  form.reset();
}

function handleFormInput(event) {
  const form = event.currentTarget;
  const formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(' handleFormInput res:', formDataObj);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataObj));
}

function refreshInputValue() {
  const savedLSData = localStorage.getItem(STORAGE_KEY);

  if (!savedLSData) return;

  try {
    const dataFromLS = JSON.parse(savedLSData);

    const formEl = new FormData(form);
    const formFields = Array.from(formEl.keys());
    console.log(' refreshInputValue formFields:', formFields);

    formFields.forEach(field => {
      form.elements[field].value = dataFromLS[field];
    });
  } catch (error) {
    alert('Ooops... something went wrong');
  }
}
