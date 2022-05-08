import {setFormData, getFormData} from './utils/index.js';
import {createEduProgViewElemFromTemplate} from './edu-prog-view.js';
import A11yDialog from 'a11y-dialog'; // TODO https://github.com/Ghosh/micromodal
import {
  diff
  // addedDiff,
  // deletedDiff,
  // updatedDiff,
  // detailedDiff
} from 'deep-object-diff';

import {db} from './db/index.js';

let eduProgs = [];

const outputElem = document.getElementById('edu-prog-list');
const eduProgViewTemplateElem = document.getElementById('edu-prog-view');

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

document.documentElement.addEventListener('keydown', async (event) => {
  if (event.code === 'Insert') {
    await openEditForm(null);
  }
});

const dbChangeHandlers = {
  handlers: [],
  subscribe(handler) {
    this.handlers.push(handler);
  },
  unsubscribe(handler) {
    const idx = this.handlers.findIndex((el) => el === handler);
    if (idx === -1) return;
    this.handlers.splice(idx, 1);
  },
  handle(change) {
    this.handlers.forEach((handler) => handler(change));
  }
};

function changeListHandler(change) {
  console.log('****************');
  console.log(change);
  const id = change.id;

  let eduProgIdx = eduProgs.findIndex((el) => el._id === id);
  let eduProg;

  if (eduProgIdx === -1) {
    eduProg = change.doc;
    eduProgs.unshift(eduProg);
    eduProgIdx = 0;
  } else {
    eduProg = eduProgs[eduProgIdx];
  }

  console.assert(eduProg);

  const target = outputElem.querySelector(`[data-id="${id}"]`);

  if (change.deleted) {
    target?.remove();
    eduProgs.splice(eduProgIdx, 1);
    return;
  }

  Object.assign(eduProg, change.doc);
  const elem = createEduProgViewElemFromTemplate(
    eduProgViewTemplateElem,
    eduProg
  );

  if (target) {
    target.replaceWith(elem);
  } else {
    outputElem.prepend(elem);
    elem.focus();
  }
}

dbChangeHandlers.subscribe(changeListHandler);

db.changes({
  filter: function (doc) {
    return doc.type === 'edu-prog';
  },
  since: 'now',
  live: true,
  include_docs: true,
  conflicts: true
})
  .on('change', (change) => dbChangeHandlers.handle(change))
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

  const eduProgElems = eduProgs
    .sort((a, b) => {
      const a0 = a.code;
      const b0 = b.code;
      if (a0 < b0) return -1;
      if (a0 > b0) return 1;
      return 0;
    })
    .map((eduProg) => {
      return createEduProgViewElemFromTemplate(
        eduProgViewTemplateElem,
        eduProg
      );
    });

  const chunkSize = 150;
  let idx = 0;
  while (idx <= eduProgElems.length) {
    const chunk = eduProgElems.slice(idx, idx + chunkSize);
    outputElem.append(...chunk);

    await new Promise((resolve) => setTimeout(resolve));

    idx = idx + chunkSize;
  }

  console.timeEnd('1');
})();

//
function createDialog(eduProg) {
  const template = document.getElementById('edu-prog-dialog');
  const elem = document.createElement('div');
  elem.append(template.content.cloneNode(true));
  const dialogElem = elem.firstElementChild;

  document.body.append(dialogElem);

  const form = dialogElem.querySelector('form');
  const btnDuplicate = form.querySelector('.edu-prog-form__btn--duplicate');

  const eduProgDialog = new A11yDialog(dialogElem);

  // Duplicate button handler
  form.addEventListener('click', (event) => {
    if (event.target === btnDuplicate && form.reportValidity()) {
      dialogElem.dataset.duplicate = true;
      form.requestSubmit();
    }
  });

  // Ok handler
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    eduProgDialog.hide();
  });

  if (!eduProg._id) {
    // New
    btnDuplicate.disabled = true;
    const deletedElem = form.querySelector('[name="_deleted"]');
    if (deletedElem) deletedElem.disabled = true;

    form.dataset.status = 'new';
  }

  return {eduProgDialog, dialogElem, form};
}

// Dialog
async function dialog(eduProg) {
  const {eduProgDialog, dialogElem, form} = createDialog(eduProg);

  // db change handler for dialog
  const changeDialogHandler = (change) => {
    const id = eduProg._id;
    if (change.id === id) {
      setFormData(form, change.doc);
    }
  };
  dbChangeHandlers.subscribe(changeDialogHandler);

  setFormData(form, eduProg);

  return await new Promise((resolve, reject) => {
    // close dialog handler
    dialogElem.addEventListener(
      'hide',
      (event) => {
        const detailTarget = event.detail?.currentTarget;

        if (dialogElem.dataset.duplicate) {
          // Duplicate
          const data = getFormData(form);
          delete data._id;
          delete data._rev;

          return resolve({ok: true, reason: 'Duplicate', data});
        }

        if (detailTarget === document) {
          // Esc
          return resolve({ok: false, reason: 'Esc'});
        }

        if (detailTarget?.matches('button[data-a11y-dialog-hide]')) {
          // Cancel button
          return resolve({ok: false, reason: 'a11y-dialog-hide'});
        }

        if (detailTarget === undefined) {
          // Submit
          return resolve({
            ok: true,
            reason: 'submit',
            data: getFormData(form)
          });
        }
      },
      {once: true}
    );

    eduProgDialog.show();
  }).finally(() => {
    dialogElem.remove();
    eduProgDialog.destroy();
    dbChangeHandlers.unsubscribe(changeDialogHandler);
  });
}

async function openEditForm(elem) {
  const target = elem?.closest('.edu-prog-view');

  let id;
  let eduProg;

  if (!target) {
    // New
    id = '';
    eduProg = {type: 'edu-prog'};
  } else {
    // Edit
    id = target.dataset.id;
    eduProg = eduProgs.find((el) => el._id === id);
  }

  console.assert(Boolean(eduProg));

  // Open dialog
  const {ok, reason, data} = await dialog(eduProg);
  console.log({ok, reason, data});

  if (ok) {
    const diffObject = diff(eduProg, data);

    // No changes
    if (Object.keys(diffObject).length === 0) return;

    if (data._id) {
      // Edit
      await db.put(data);
    } else {
      // New
      await db.post(data);
    }
  }
}
