import {fillForm} from './utils/index.js';
import {createEduProgViewElem} from './edu-prog-view.js';
import PouchDB from 'pouchdb';
import A11yDialog from 'a11y-dialog';
const db = new PouchDB('my_database');

let items = [];
let eduProgs = [];

// Get the dialog container HTML element (with the accessor method you want)
const eduProgDialogElem = document.getElementById('edu-prog-dialog');
const eduProgDialogFormElem = eduProgDialogElem.querySelector('form');
const eduProgDialog = new A11yDialog(eduProgDialogElem);

const outputElem = document.getElementById('edu-prog-list');

outputElem.addEventListener('dblclick', (event) => {
  const target = event.target.closest('.edu-prog-view');
  const id = target.dataset.id;

  const eduProg = eduProgs.find((el) => el._id === id);
  fillForm(eduProgDialogFormElem, eduProg);

  eduProgDialog.show();
});

(async () => {
  console.log('query');
  console.time('0');
  let dbDocs;
  try {
    dbDocs = await db.query('eduProgs', {
      include_docs: true,
      attachments: true
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
    .map((eduProg) => createEduProgViewElem(eduProg));

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

console.log('It works.');
