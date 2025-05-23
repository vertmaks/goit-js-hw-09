import { emailErrorMsg, emptyErrorMsg } from './form-errors';
import { refs } from './refs';

const STORAGE_KEY = 'feedback-form-state';
const form = refs.form;
const emailInput = refs.emailInput;
const textInput = refs.textInput;

let msgTimeoutId = null;
let emailTimeoutId = null;
let shakeId = null;

export function emailCheck() {
  const correctEmailRule = emailInput.value.match(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );

  if (emailInput.value === '') {
    const existingError = emailInput.parentElement.querySelector(
      '.form-error-empty-msg'
    );
    if (existingError) existingError.remove();

    emailInput.style.borderColor = 'tomato';
    emailInput.insertAdjacentHTML('afterend', emptyErrorMsg);

    const emptyError = emailInput.parentElement.querySelector(
      '.form-error-empty-msg'
    );
    emptyError.classList.add('is-onscreen');

    if (emailTimeoutId) clearTimeout(emailTimeoutId);
    emailTimeoutId = setTimeout(() => {
      emailInput.style.borderColor = '';
      emptyError.classList.remove('is-onscreen');
      emptyError.remove();
    }, 5000);

    return false;
  } else if (!correctEmailRule) {
    const existingError = emailInput.parentElement.querySelector(
      '.form-email-error-msg'
    );
    if (existingError) existingError.remove();

    emailInput.style.borderColor = 'tomato';
    emailInput.insertAdjacentHTML('afterend', emailErrorMsg);

    const emailError = emailInput.parentElement.querySelector(
      '.form-email-error-msg'
    );
    emailError.classList.add('is-onscreen');

    if (emailTimeoutId) clearTimeout(emailTimeoutId);
    emailTimeoutId = setTimeout(() => {
      emailInput.style.borderColor = '';
      emailError.classList.remove('is-onscreen');
      emailError.remove();
    }, 5000);

    return false;
  } else {
    emailInput.style.borderColor = '';
    if (emailTimeoutId) clearTimeout(emailTimeoutId);

    return true;
  }
}

export function msgCheck() {
  if (textInput.value.trim() === '') {
    const existingError = textInput.parentElement.querySelector(
      '.form-error-empty-msg'
    );
    if (existingError) existingError.remove();

    textInput.style.borderColor = 'tomato';
    textInput.insertAdjacentHTML('afterend', emptyErrorMsg);

    const emptyError = textInput.parentElement.querySelector(
      '.form-error-empty-msg'
    );
    emptyError.classList.add('is-onscreen');

    if (msgTimeoutId) clearTimeout(msgTimeoutId);
    msgTimeoutId = setTimeout(() => {
      textInput.style.borderColor = '';
      emptyError.classList.remove('is-onscreen');
      emptyError.remove();
    }, 5000);

    return false;
  } else {
    textInput.style.borderColor = '';
    if (msgTimeoutId) clearTimeout(msgTimeoutId);

    return true;
  }
}

export function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  const isMsgFilled = msgCheck();
  const isEmailValid = emailCheck();

  if (!isMsgFilled || !isEmailValid) {
    // console.log('Please, fill all fields');
    return;
  }

  // if (!isEmailValid) {
  //   if (emailInput.value === '') {
  //     const existingError = emailInput.parentElement.querySelector(
  //       '.form-error-empty-msg'
  //     );
  //     if (existingError) existingError.remove();
  //     emailInput.insertAdjacentHTML('afterend', emptyErrorMsg);
  //     waitForElement(
  //       '.form-error-empty-msg',
  //       emailInput.parentElement,
  //       shakeError => {
  //         triggerShake(shakeError);
  //       }
  //     );
  //   } else {
  //     const existingError = emailInput.parentElement.querySelector(
  //       '.form-email-error-msg'
  //     );
  //     if (existingError) existingError.remove();
  //     emailInput.insertAdjacentHTML('afterend', emailErrorMsg);
  //     waitForElement(
  //       '.form-email-error-msg',
  //       emailInput.parentElement,
  //       shakeError => {
  //         triggerShake(shakeError);
  //       }
  //     );
  //   }
  // }

  // if (!isMsgFilled) {
  //   const existingError = textInput.parentElement.querySelector(
  //     '.form-error-empty-msg'
  //   );
  //   if (existingError) existingError.remove();
  //   textInput.insertAdjacentHTML('afterend', emptyErrorMsg);
  //   waitForElement(
  //     '.form-error-empty-msg',
  //     textInput.parentElement,
  //     shakeError => {
  //       triggerShake(shakeError);
  //     }
  //   );

  //   if (shakeId) clearTimeout(shakeId);
  //   shakeId = setTimeout(() => {
  //     textInput.parentElement.querySelector('.form-error-empty-msg').remove();
  //   }, 5000);
  // }

  const savedLSData = localStorage.getItem(STORAGE_KEY);
  if (savedLSData) {
    try {
      const dataFromLS = JSON.parse(savedLSData);
      console.log('Submitted data:', dataFromLS);
    } catch (error) {
      console.log('Submitted data: <invalid JSON>');
    }
  }

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

export function handleFormInput(event) {
  const form = event.currentTarget;
  const formData = new FormData(form);
  const filteredData = Array.from(formData.entries()).filter(
    ([_, value]) => value && value.trim() !== ''
  );

  if (filteredData.length > 0) {
    const formDataObj = Object.fromEntries(filteredData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataObj));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function populateForm() {
  const savedLSData = localStorage.getItem(STORAGE_KEY);

  if (!savedLSData) return;

  try {
    const dataFromLS = JSON.parse(savedLSData);
    Object.keys(dataFromLS).forEach(field => {
      if (
        form.elements[field] &&
        dataFromLS[field] !== undefined &&
        dataFromLS[field] !== ''
      ) {
        form.elements[field].value = dataFromLS[field];
      }
    });
  } catch (error) {
    alert('Ooops... something went wrong');
  }
}

function waitForElement(selector, parent, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    const element = parent.querySelector(selector);
    if (element) {
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(parent, { childList: true, subtree: true });
}

export function triggerShake(el) {
  el.classList.add('shake');
  setTimeout(() => {
    el.classList.remove('shake');
  }, 350);
}
