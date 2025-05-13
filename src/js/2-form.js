import { emailCheck, msgCheck, triggerShake } from './form-check-logic';
import { incorrectEmail, emptyEmail } from './form-errors';
import { refs } from './refs';

function formSubmit(event) {
  event.preventDefault();
  const form = event.target;
  isMsgEmpty = msgCheck;
  const isEmailValid = emailCheck;

  if (!isEmailValid) {
    if (refs.emailInput.value === '') {
      triggerShake(refs.emptyErrorMsg);
    } else {
      triggerShake(refs.emailErrorMsg);
    }
  }
}
