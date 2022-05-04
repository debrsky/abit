import {createElementFromTemplate, kebabToCamel} from './utils/index.js';

export function createEduProgViewElemFromTemplate(tmplElem, data) {
  const eduProgViewElem = createElementFromTemplate(tmplElem);

  for (const elem of eduProgViewElem.querySelectorAll(`[name]`)) {
    const key = kebabToCamel(elem.getAttribute('name'));
    if (data[key]) elem.textContent = data[key];
  }

  const idElem = eduProgViewElem;
  const id = data.id ?? data._id;
  if (idElem && id) idElem.dataset.id = id;

  return eduProgViewElem;
}
