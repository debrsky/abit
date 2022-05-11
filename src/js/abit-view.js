import tmpl from '../pug/includes/abit-view.pug';

export function createAbitViewElem(data) {
  const div = document.createElement('div');
  div.innerHTML = tmpl({data});
  return div.firstElementChild;
}
