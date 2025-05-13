import { emailCheck, msgCheck, formSubmit } from './form-check-logic';
import { refs } from './refs';

refs.emailInput.addEventListener('blur', emailCheck);
refs.textInput.addEventListener('blur', msgCheck);
refs.form.addEventListener('submit', formSubmit);
