import {setFormData, getFormData} from './utils/index.js';
import {createEduProgViewElemFromTemplate} from './edu-prog-view.js';
import A11yDialog from 'a11y-dialog';

import {db} from './db/index.js';

let items = [];
let eduProgs = [];

const outputElem = document.getElementById('edu-prog-list');
const eduProgViewTemplateElem = document.getElementById('edu-prog-view');

const openEditForm = async (elem) => {
  const target = elem.closest('.edu-prog-view');
  if (!target) return;

  const id = target.dataset.id;

  const eduProg = eduProgs.find((el) => el._id === id);

  const {ok, data} = await dialog(eduProg);
  if (ok) {
    await db.put(data);
  }
};

outputElem.addEventListener('dblclick', async (event) => {
  await openEditForm(event.target);
});
outputElem.addEventListener('keydown', async (event) => {
  if (event.code === 'ArrowDown') {
    document.activeElement.nextElementSibling?.focus();
    return;
  }

  if (event.code === 'ArrowUp') {
    document.activeElement.previousElementSibling?.focus();
    return;
  }

  if (event.code === 'Enter') {
    event.preventDefault();
    await openEditForm(event.target);
  }
});

function changeListHandler(change) {
  console.log('****************');
  console.log(change);
  const id = change.id;
  const eduProg = eduProgs.find((el) => el._id === id);
  Object.assign(eduProg, change.doc);
  const elem = createEduProgViewElemFromTemplate(
    eduProgViewTemplateElem,
    eduProg
  );

  const target = outputElem.querySelector(`[data-id="${id}"]`);
  target.replaceWith(elem);
}

const changeHandlers = [changeListHandler];

function handleChange(change) {
  changeHandlers.forEach((handler) => handler(change));
}

db.changes({
  filter: function (doc) {
    return doc.type === 'edu-prog';
  },
  since: 'now',
  live: true,
  include_docs: true,
  conflicts: true
})
  .on('change', handleChange)
  .on('error', function (err) {
    console.log(err);
  });

// *****************************************************
(async () => {
  console.log('query');
  console.time('0');
  let dbDocs;
  try {
    dbDocs = await db.query('eduProgs', {
      include_docs: true,
      attachments: false,
      conflicts: true
    });
  } catch (err) {
    console.log('ОШИБКА', err);
    throw err;
  }

  console.log(dbDocs);

  console.timeEnd('0');

  eduProgs = dbDocs.rows.map((row) => row.doc);

  console.time('1');
  items = eduProgs
    .sort((a, b) => {
      const a0 = a.code;
      const b0 = b.code;
      if (a0 < b0) return -1;
      if (a0 > b0) return 1;
      return 0;
    })
    .map((eduProg) =>
      createEduProgViewElemFromTemplate(eduProgViewTemplateElem, eduProg)
    );

  const chunkSize = 150;
  let idx = 0;
  while (idx <= items.length) {
    const chunk = items.slice(idx, idx + chunkSize);
    outputElem.append(...chunk);

    await new Promise((resolve) => setTimeout(resolve));

    idx = idx + chunkSize;
  }

  console.timeEnd('1');
})();

// Dialog
async function dialog(eduProg) {
  const eduProgDialogTemplateElem = document.getElementById('edu-prog-dialog');
  const elem = document.createElement('div');
  elem.append(eduProgDialogTemplateElem.content.cloneNode(true));
  const eduProgDialogElem = elem.firstElementChild;

  document.body.append(eduProgDialogElem);

  const eduProgDialogFormElem = eduProgDialogElem.querySelector('form');
  const eduProgDialog = new A11yDialog(eduProgDialogElem);

  eduProgDialogFormElem.addEventListener('submit', (event) => {
    event.preventDefault();
    eduProgDialog.hide();
  });

  setFormData(eduProgDialogFormElem, eduProg);

  const changeDialogHandler = (change) => {
    const id = eduProg._id;
    if (change.id === id) {
      console.log('dialog handler', id);
      setFormData(eduProgDialogFormElem, change.doc);
    }
  };

  changeHandlers.push(changeDialogHandler);

  return await new Promise((resolve, reject) => {
    eduProgDialogElem.addEventListener(
      'hide',
      (event) => {
        const detailTarget = event.detail?.currentTarget;

        // Esc
        if (detailTarget === document) {
          return resolve({ok: false, reason: 'Esc'});
        }

        if (detailTarget?.matches('button[data-a11y-dialog-hide]')) {
          return resolve({ok: false, reason: 'a11y-dialog-hide'});
        }

        // submit
        if (detailTarget === undefined) {
          return resolve({
            ok: true,
            reason: 'submit',
            data: getFormData(eduProgDialogFormElem)
          });
        }
      },
      {once: true}
    );

    eduProgDialog.show();
  }).finally(() => {
    eduProgDialogElem.remove();

    const idx = changeHandlers.findIndex(
      (handler) => handler === changeDialogHandler
    );
    changeHandlers.splice(idx, 1);
  });
}

console.log('It works.');
