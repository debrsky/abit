import A11yDialog from 'a11y-dialog';
import {createAbitViewElem} from './abit-view.js';
import AbitForm from './svelte/comp.svelte';

import {db, subscribe, unsubscribe} from './db/index.js';

let items = [];
let docs = [];
let eduProgs = [];

const outputElem = document.getElementById('abit-list');
const progressElem = document.getElementById('progress');

const editDoc = async (id) => {
  const doc = docs.find((doc) => doc._id === id);
  console.assert(doc);

  const result = await openEditDialog(doc);
  console.log(result);

  if (!result.ok) return;

  const docNew = {...result.doc};

  if (result.cmd === 'duplicate') {
    delete docNew._id;
    delete docNew._rev;
  }

  if (!docNew._id) {
    const {ok, id, rev} = await db.post(docNew);
    console.assert(ok);
    docNew._rev = rev;
    docNew._id = id;
  } else {
    const {ok, id, rev} = await db.put(docNew);
    console.assert(ok);
    console.assert(doc._id === id);
    docNew._rev = rev;
  }
};

outputElem.addEventListener('dblclick', async (event) => {
  const target = event.target.closest('.item');
  const id = target.dataset.id;
  await editDoc(id);
});

document.documentElement.addEventListener('keydown', async (event) => {
  if (event.code === 'Insert') {
    // await openEditForm(null);
  }
});

const dbChangeHandler = (change) => {
  const {id, doc} = change;

  const docIdx = docs.findIndex((doc) => doc._id === id);

  if (docIdx === -1) {
    docs.unshift(doc);
    const elem = createAbitViewElem(doc);
    outputElem.prepend(elem);
    elem.scrollIntoView({block: 'center'});
    return;
  }

  docs[docIdx] = doc;

  const docElem = outputElem.querySelector(`[data-id="${id}"]`);
  console.assert(docElem);
  docElem.replaceWith(createAbitViewElem(doc));
};

subscribe(dbChangeHandler);

(async () => {
  console.log('query');

  console.time('0');

  const ep = await db.query('eduProgs');
  eduProgs = ep.rows.map(({key, value}) => ({
    code: key,
    specCode: value[0],
    specName: value[1],
    eduForm: value[2],
    baseEduLevel: value[3],
    finSource: value[4]
  }));

  const dbDocs = await db.query('abits', {
    include_docs: true,
    attachments: true
  });

  docs = dbDocs.rows.map((row) => row.doc);

  console.timeEnd('0');

  const abits = dbDocs.rows.map((row) => row.doc);

  console.time('1');
  items = abits
    .sort((a, b) => {
      const a0 = a.fio;
      const b0 = b.fio;
      if (a0 < b0) return -1;
      if (a0 > b0) return 1;
      return 0;
    })
    .map((abit) => createAbitViewElem(abit));

  progressElem.max = items.length - 1;
  progressElem.value = 0;
  const chunkSize = 150;
  let idx = 0;
  while (idx <= items.length) {
    const chunk = items.slice(idx, idx + chunkSize);
    outputElem.append(...chunk);

    await new Promise((resolve) => setTimeout(resolve));
    // await new Promise((resolve) => queueMicrotask(resolve));

    idx = idx + chunkSize;
    progressElem.value = idx;
  }

  console.timeEnd('1');
})();

const dialogElem = document.getElementById('edit-dialog');
const abitForm = new AbitForm({
  target: dialogElem.querySelector('.dialog-content-form')
});

const dialog = new A11yDialog(dialogElem);

function openEditDialog(doc) {
  let dialogRes = {};

  abitForm.eduProgs = eduProgs;
  abitForm.data = {...doc};
  abitForm.close = (res = {}) => {
    dialogRes = res;
    dialog.hide();
  };

  const dbDocChangeHandler = (change) => {
    const {id} = change;
    if (id !== doc._id) return;

    abitForm.data = {...change.doc};
  };

  subscribe(dbDocChangeHandler);

  const executor = (resolve, reject) => {
    dialogElem.addEventListener(
      'hide',
      (event) => {
        resolve({
          ok: dialogRes.ok,
          cmd: dialogRes.cmd,
          doc: {...abitForm.data}
        });
      },
      {once: true}
    );

    dialog.show();
  };

  return new Promise(executor).finally(() => unsubscribe(dbDocChangeHandler));
}
