import { incorrectEmail, emptyEmail } from './form-errors';
import { refs } from './refs';

let msgTimeoutId = null;
let emailTimeoutId = null;

export function emailCheck() {
  const correctEmailRule = emailInput.value.match(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );

  if (refs.emailInput.value === '') {
    refs.emailInput.style.borderColor = 'tomato';

    //   insert emty error to HTML!

    // old example
    // emailEmptyError.classList.remove('visually-hidden');
    // emailEmptyError.classList.add('is-onscreen');
    // emailErrorMsg.classList.remove('is-onscreen');

    if (emailTimeoutId) clearTimeout(emailTimeoutId);
    emailTimeoutId = setTimeout(() => {
      refs.emailInput.style.borderColor = '';

      // remove empty error from HTML!

      // old example
      //   emailEmptyError.classList.remove('is-onscreen');
      //   emailEmptyError.classList.add('visually-hidden');
    }, 5000);

    return false;
  } else if (!correctEmailRule) {
    refs.emailInput.style.borderColor = 'tomato';

    //   insert ivalid email error to HTML

    //   old example
    // emailErrorMsg.classList.remove('visually-hidden');
    // emailErrorMsg.classList.add('is-onscreen');
    // emailEmptyError.classList.remove('is-onscreen');

    if (emailTimeoutId) clearTimeout(emailTimeoutId);
    emailTimeoutId = setTimeout(() => {
      refs.emailInput.style.borderColor = '';

      // remove ivalid email error from HTML

      // old example
      //   emailErrorMsg.classList.remove('is-onscreen');
      //   emailErrorMsg.classList.add('visually-hidden');
    }, 5000);

    return false;
  } else {
    emailInput.style.borderColor = '';

    //   don't add enything!
    //   old!
    // emailErrorMsg.classList.remove('is-onscreen');
    // emailEmptyError.classList.remove('is-onscreen');

    if (emailTimeoutId) clearTimeout(emailTimeoutId);

    return true;
  }
}

export function msgCheck() {
  if (refs.textInput.value.trim() === '') {
    refs.textInput.style.borderColor = 'tomato';

    //   insert empty HTML error!

    //   old
    // nameEmptyError.classList.remove('visually-hidden');
    // nameEmptyError.classList.add('is-onscreen');

    if (msgTimeoutId) clearTimeout(msgTimeoutId);
    msgTimeoutId = setTimeout(() => {
      refs.textInput.style.borderColor = '';

      // remove empty HTML error!

      // old
      //   nameEmptyError.classList.remove('is-onscreen');
    }, 5000);

    return false;
  } else {
    refes.textInput.style.borderColor = '';

    //   remove empty HTML error!

    //   nameEmptyError.classList.remove('is-onscreen');
    // nameEmptyError.classList.add('visually-hidden');

    if (msgTimeoutId) clearTimeout(msgTimeoutId);

    return true;
  }
}

export function triggerShake(el) {
  el.classList.add('shake');
  setTimeout(() => {
    el.classList.remove('shake');
  }, 350);
}
