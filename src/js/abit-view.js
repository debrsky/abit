import tmpl from '../pug/includes/abit-view.pug';

export function createAbitViewElem(data) {
  const div = document.createElement('div');
  div.innerHTML = tmpl({data});
  const elem = div.firstElementChild;
  div.remove();
  return elem;
}
