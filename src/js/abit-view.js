import {createElementFromTemplate, kebabToCamel} from './utils/index.js';

export function createAbitViewElemFromTemplate(tmplElem, data) {
  const abitViewElem = createElementFromTemplate(tmplElem);

  for (const elem of abitViewElem.querySelectorAll(`[name]`)) {
    const key = kebabToCamel(elem.getAttribute('name'));
    if (data[key]) elem.textContent = data[key];
  }

  const idElem = abitViewElem;
  const id = data.id ?? data._id;
  if (idElem && id) idElem.dataset.id = id;

  const genderElem = abitViewElem.querySelector('.abit-view__gender');
  genderElem.textContent = data.gender === 'м' ? '♂️' : '♀️';

  const needDormElem = abitViewElem.querySelector('.abit-view__need-dorm');
  switch (Number(data.needDorm)) {
    case 0:
      needDormElem.textContent = '';
      break;
    case 1:
      needDormElem.textContent = '🏨';
      needDormElem.style.fontSize = '0.5em';
      break;
    case 2:
      needDormElem.textContent = '🏨';
      needDormElem.style.fontSize = '1em';
      break;
    default:
      needDormElem.textContent = '<?>';
  }

  const applicationsListElem = abitViewElem.querySelector(
    '.abit-view__applications-list'
  );

  applicationsListElem.replaceChildren();

  data.applications.forEach((app) => {
    const elem = document.createElement('span');
    elem.innerHTML = `${app.eduProg}<span class="abit-view__application-grade">${app.grade}<span>`;
    elem.classList.add('abit-view__application');

    elem.setAttribute('title', app.grade);

    if (app.priority) elem.classList.add('abit-view__application--priority');
    if (app.disabled) elem.classList.add('abit-view__application--disabled');

    if (app.priority) {
      applicationsListElem.append(elem);
    } else {
      applicationsListElem.prepend(elem);
    }
  });

  return abitViewElem;
}
