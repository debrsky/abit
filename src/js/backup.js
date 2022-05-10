import PouchDB from 'pouchdb';

const DB_NAME = 'my_database';
let db = new PouchDB(DB_NAME);

const input = document.forms.form.file;
const btnLoadFakeData = document.getElementById('load-fake-data');
const output = document.getElementById('output');

const selectFileHandler = (event) => {
  const [file] = event.target.files;
  const reader = new FileReader();
  reader.addEventListener('load', async () => {
    const data = JSON.parse(reader.result);

    await createDb();

    await db.bulkDocs(data.abits);
    await db.bulkDocs(data.eduProgs);

    event.target.value = null;
  });
  reader.readAsText(file);
};

const path = document.currentScript.src.match(/^(.+)\/[^/]+$/)[1];

const btnLoadFakeDataHandler = async (event) => {
  output.append('Загрузка...');
  const res = await fetch(`${path}/fake-data.json`);
  if (res.ok) {
    const data = await res.json();

    output.append('\nСоздание БД...');
    await createDb();

    output.append('\nДобавление абитуриентов...');
    await db.bulkDocs(data.abits);
    output.append(data.abits.length);

    output.append('\nДобавление образовательных программ...');
    await db.bulkDocs(data.eduProgs);
    output.append(data.eduProgs.length);

    output.append('\n∎');
  }
};

input.addEventListener('change', selectFileHandler);
btnLoadFakeData.addEventListener('click', btnLoadFakeDataHandler);

async function createDb() {
  await db.destroy();
  db = new PouchDB(DB_NAME);

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
