import PouchDB from 'pouchdb';

const input = document.forms.form.file;
const selectFileHandler = (event) => {
  const [file] = event.target.files;
  const reader = new FileReader();
  reader.addEventListener('load', async ()=>{
    const data = JSON.parse(reader.result);
    await importDocs(data.abits);
    event.target.value = null;
  });
  reader.readAsText(file);
};

input.addEventListener('change', selectFileHandler);

async function importDocs (docs) {
  let db = new PouchDB('my_database');
  await db.destroy();
  db = new PouchDB('my_database');
  await db.bulkDocs(docs);

  const dbDocs = await db.allDocs({
    include_docs: true,
    attachments: true
  });

  console.log(dbDocs);
};
