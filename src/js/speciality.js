import {db} from './db/index.js';
import SpecTable from './svelte/blocks/speciality-table.svelte';

// eslint-disable-next-line no-unused-vars
let specTable;

const save = async (doc) => {
  console.log('saving...', doc);

  let res;
  if (doc._id) {
    const check = await db.get(doc._id);
    console.log('CHECK', check);

    res = await db.put(doc).catch((err) => console.log('PUT ERROR', err, doc));
  } else {
    res = await db
      .post(doc)
      .catch((err) => console.log('POST ERROR', err, doc));
  }
  specTable.doc = Object.assign(doc, {_id: res.id, _rev: res.rev});
  console.log('saved', res, doc);
};

(async () => {
  const res = await db.query('spec', {include_docs: true});

  const doc =
    res.total_rows === 0 ? {type: 'spec', specialities: []} : res.rows[0].doc;

  // eslint-disable-next-line no-unused-vars
  specTable = new SpecTable({
    target: document.getElementById('speciality-table'),
    props: {save, doc}
  });
})();

(async () => {
  const res = await db.query('eduProgs2', {include_docs: false});
  console.log('eduProgs2', res);
})();
