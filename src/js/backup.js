import PouchDB from 'pouchdb';

const DB_NAME = 'my_database';
let db = new PouchDB(DB_NAME);
let remoteDB = new PouchDB(`http://localhost:5984/${DB_NAME}`);

const input = document.forms.form.file;
const selectFileHandler = (event) => {
  const [file] = event.target.files;
  const reader = new FileReader();
  reader.addEventListener('load', async () => {
    const data = JSON.parse(reader.result);

    await createDb();
    db.replicate.to(remoteDB, {live: true, retry: true});

    await db.bulkDocs(data.abits);
    await db.bulkDocs(data.eduProgs);

    const docs = await db.query(
      function (doc, emit) {
        if (doc.type === 'edu-prog') {
          emit(doc.code, null);
        }
      },
      {include_docs: false}
    );
    console.log(docs);

    event.target.value = null;
  });
  reader.readAsText(file);
};

input.addEventListener('change', selectFileHandler);

async function createDb() {
  await db.destroy();
  db = new PouchDB(DB_NAME);

  await remoteDB.destroy();
  remoteDB = new PouchDB(`http://localhost:5984/${DB_NAME}`);

  await createEduProgsView(db);
  await createAbitsView(db);
}

async function createEduProgsView(db) {
  // eslint-disable-next-line no-shadow
  const eduProgs = {
    _id: '_design/eduProgs',
    views: {
      eduProgs: {
        map: function mapFun(doc) {
          if (doc.type === `edu-prog`) {
            // eslint-disable-next-line no-undef
            emit(doc.code, null);
          }
        }.toString()
      }
    }
  };

  return await db.put(eduProgs);
}

async function createAbitsView(db) {
  const abits = {
    _id: '_design/abits',
    views: {
      abits: {
        map: function mapFun(doc) {
          if (doc.type === `abit`) {
            // eslint-disable-next-line no-undef
            emit(doc.fio, null);
          }
        }.toString()
      }
    }
  };

  return await db.put(abits);
}
