import {
  emailCheck,
  msgCheck,
  handleFormSubmit,
  handleFormInput,
  populateForm,
} from './form-check-logic.js';
import { refs } from './refs';

const form = refs.form;
const emailInput = refs.emailInput;
const textInput = refs.textInput;

populateForm();

emailInput.addEventListener('blur', emailCheck);

textInput.addEventListener('blur', msgCheck);

form.addEventListener('submit', handleFormSubmit);

form.addEventListener('focusout', handleFormInput);

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const form = event.currentTarget;

//   const savedLSData = localStorage.getItem(STORAGE_KEY);
//   if (savedLSData) {
//     try {
//       const dataFromLS = JSON.parse(savedLSData);
//       console.log('Submitted data:', dataFromLS);
//     } catch (error) {
//       console.log('Submitted data: <invalid JSON>');
//     }
//   } else {
//     console.log('Please, fill all fields');
//   }

//   localStorage.removeItem(STORAGE_KEY);

//   form.reset();
// }
