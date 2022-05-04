export function createElement(html) {
  const elem = document.createElement('div');
  elem.insertAdjacentHTML('afterbegin', html);
  return elem.firstElementChild;
}

export function fillForm(formElem, data) {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      const name = camelToKebab(key);
      const elem = formElem.elements[name];
      if (!elem) continue;

      elem.value = value;
      continue;
    }

    if (typeof value === 'number') {
      continue;
    }

    // FIXME доделать для разных типов
  }
}

// https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
function camelToKebab(str) {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
}
