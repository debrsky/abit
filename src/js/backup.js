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

  await createSpecView(db);
  await createEduProgsView(db);
  await createEduProgs2View(db);
  await createAbitsView(db);
}

async function createSpecView(db) {
  const spec = {
    _id: '_design/spec',
    views: {
      spec: {
        map: function mapFun(doc) {
          // eslint-disable-next-line
          if (doc.type === 'spec') emit(doc);
        }.toString()
      }
    }
  };

  return await db.put(spec);
}

async function createEduProgs2View(db) {
  // eslint-disable-next-line no-shadow
  const eduProgs = {
    _id: '_design/eduProgs2',
    views: {
      eduProgs2: {
        // eslint-disable-next-line sonarjs/cognitive-complexity
        map: function mapFun(doc) {
          if (doc.type === `spec`) {
            for (const spec of doc.specialities) {
              const l9 = '9 классов';
              const l11 = '11 классов';
              const fullTime = 'очная';
              const absentia = 'заочная';
              const free = 'бюджет';
              const paid = 'внебюджет';
              if (spec?.fullTime?.level9?.freePlaces)
                // eslint-disable-next-line no-undef
                emit(`${spec.code}9`, [spec.name, fullTime, l9, free]);

              if (spec?.fullTime?.level9?.paidPlaces)
                // eslint-disable-next-line no-undef
                emit(`${spec.code}9к`, [spec.name, fullTime, l9, paid]);
              if (spec?.fullTime?.level11?.freePlaces)
                // eslint-disable-next-line no-undef
                emit(`${spec.code}`, [spec.name, fullTime, l11, free]);
              if (spec?.fullTime?.level11?.paidPlaces)
                // eslint-disable-next-line no-undef
                emit(`${spec.code}к`, [spec.name, fullTime, l11, paid]);
              if (spec?.absentia?.level11?.freePlaces)
                // eslint-disable-next-line no-undef
                emit(`${spec.code}з`, [spec.name, absentia, l11, free]);
              if (spec?.absentia?.level11?.paidPlaces)
                // eslint-disable-next-line no-undef
                emit(`${spec.code}зк`, [spec.name, absentia, l11, paid]);
            }
          }
        }.toString()
      }
    }
  };

  return await db.put(eduProgs);
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
