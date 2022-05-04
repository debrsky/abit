export function createElement(html) {
  const elem = document.createElement('div');
  elem.insertAdjacentHTML('afterbegin', html);
  return elem.firstElementChild;
}

export function createElementFromTemplate(tmplElem) {
  const elem = document.createElement('div');
  elem.append(tmplElem.content.cloneNode(true));
  return elem.firstElementChild;
}

export function getFormData(formElem) {
  const formData = new FormData(formElem);
  const data = {};
  for (const [fkey, value] of formData.entries()) {
    const key = kebabToCamel(fkey);
    data[key] = value;
  }
  return data;

  // FIXME доделать для массивов значений key
}

export function setFormData(formElem, data) {
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
export function camelToKebab(str) {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
}

// https://stackoverflow.com/questions/57556471/convert-kebab-case-to-camelcase-with-javascript
export function kebabToCamel(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
