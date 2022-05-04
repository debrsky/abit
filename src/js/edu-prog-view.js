import {createElement} from './utils/index.js';

export function createEduProgViewElem({
  code,
  speciality,
  qualification,
  eduForm,
  baseEduLevel,
  duration,
  finSource,
  placesNumber,
  _id
} = {}) {
  const html = `
<div class="edu-prog-view" data-id="${_id}">
  <div class="field edu-prog-view__code">${code}</div>
  <div class="field edu-prog-view__speciality">${speciality}</div>
  <div class="field edu-prog-view__qualification">${qualification}</div>
  <div class="field edu-prog-view__edu-form">${eduForm}</div>
  <div class="field edu-prog-view__base-edu-level">${baseEduLevel}</div>
  <div class="field edu-prog-view__duration">${duration}</div>
  <div class="field edu-prog-view__fin-source">${finSource}</div>
  <div class="field edu-prog-view__places-number">${placesNumber}</div>
</div>
`;

  return createElement(html);
}
