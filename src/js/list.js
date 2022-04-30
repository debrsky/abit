import {createAbitViewElem} from './abit-view.js';
import PouchDB from 'pouchdb';
const db = new PouchDB('my_database');

const outputElem = document.getElementById('abit-list');
const progressElem = document.getElementById('progress');

outputElem.addEventListener('dblclick', (event) => {
  const target = event.target.closest('.item');
  console.log(target);
  target.classList.toggle('dark');
});

outputElem.addEventListener('click', (event) => {
  const target = event.target;
  console.log(target);
});

let items = [];

(async () => {
  console.time('0');
  const dbDocs = await db.allDocs({
    include_docs: true,
    attachments: true
  });
  console.timeEnd('0');

  const abits = dbDocs.rows.map((row) => row.doc);

  console.time('1');
  items = abits
    .sort((a, b) => {
      const a0 = a.fio,
        b0 = b.fio;
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

console.log('It works.');
