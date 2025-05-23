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

form.addEventListener('input', handleFormInput);
