import PouchDB from 'pouchdb';
const db = new PouchDB('my_database');

const outputElem = document.getElementById("abit-list");

outputElem.addEventListener('dblclick', (event)=>{
  const target = event.target.closest('.item');
  console.log(target);
  target.classList.toggle('dark');
});

(async () => {
  console.time('0');
  const dbDocs = await db.allDocs({
    include_docs: true,
    attachments: true
  });
  console.timeEnd('0');

  const abits = dbDocs.rows.map(row => row.doc);

  console.time('1');
  const items = abits.sort((a, b) => {
    const a0 = a.fio, b0 = b.fio;
    if (a0 < b0) return -1;
    if (a0 > b0) return 1;
    return 0;
  })
  .map(abit => {
    const html = `
<details id="${abit._id}" class="item">
  <summary>${abit.fio}</summary>
  <pre>${JSON.stringify(abit, null, 4)}</pre>
  <button type="button">Правка</button>
</details>`;
    const elem = document.createElement('div');
    elem.insertAdjacentHTML('afterbegin', html);
    return elem.firstElementChild;
  });

  outputElem.append(...items);

  console.timeEnd('1');
})();

console.log('It works.');
