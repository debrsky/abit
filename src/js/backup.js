import PouchDB from 'pouchdb';
import * as dbConsts from './db/consts.js';

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

const loadSpecialities = async () => {
  const res = await db.query('spec', {include_docs: true});

  const doc =
    res.total_rows === 0 ? {type: 'spec', specialities: []} : res.rows[0].doc;

  {
    const res = await fetch(`${path}/specialities2022.json`);

    if (res.ok) {
      const specialities = await res.json();
      console.log(specialities);
      doc.specialities = specialities;
      if (doc._id) {
        await db.put(doc).catch((err) => console.log('PUT ERROR', err, doc));
      } else {
        await db.post(doc).catch((err) => console.log('POST ERROR', err, doc));
      }

      return specialities;
    }
  }
};

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

    output.append('\nДобавление специальностей...');
    const specialities = await loadSpecialities();
    output.append(specialities.length);

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

function replaceConsts(fStr) {
  let res = fStr;
  for (const [key, value] of Object.entries(dbConsts)) {
    res = res.replaceAll(key, JSON.stringify(value));
  }
  return res;
}

const mapFn = replaceConsts(
  /* eslint-disable */
  function mapFun(doc) {
    if (doc.type === `spec`) {
      for (const spec of doc.specialities) {
        if (spec?.fullTime?.level9?.freePlaces)
          emit(`${spec.code}9`, [spec.code, spec.name, FULL_TIME, L_9, FREE]);

        if (spec?.fullTime?.level9?.paidPlaces)
          emit(`${spec.code}9к`, [spec.code, spec.name, FULL_TIME, L_9, PAID]);
        if (spec?.fullTime?.level11?.freePlaces)
          emit(`${spec.code}`, [spec.code, spec.name, FULL_TIME, L_11, FREE]);
        if (spec?.fullTime?.level11?.paidPlaces)
          emit(`${spec.code}к`, [spec.code, spec.name, FULL_TIME, L_11, PAID]);
        if (spec?.absentia?.level11?.freePlaces)
          emit(`${spec.code}з`, [spec.code, spec.name, ABSENTIA, L_11, FREE]);
        if (spec?.absentia?.level11?.paidPlaces)
          emit(`${spec.code}зк`, [spec.code, spec.name, ABSENTIA, L_11, PAID]);
      }
    }
  }.toString()
  /* eslint-enable */
);

async function createEduProgsView(db) {
  // eslint-disable-next-line no-shadow
  const eduProgs = {
    _id: '_design/eduProgs',
    views: {
      eduProgs: {map: mapFn}
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
