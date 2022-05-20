import Applications from './svelte/applications.svelte';
import {db} from './db/index.js';

// eslint-disable-next-line no-unused-vars
const applications = new Applications({
  target: document.getElementById('applications')
});

(async () => {
  const eduProgs = await db.query('eduProgs2');

  applications.eduProgs = eduProgs.rows.map(({key, value}) => ({
    code: key,
    specCode: value[0],
    specName: value[1],
    eduForm: value[2],
    baseEduLevel: value[3],
    finSource: value[4]
  }));
})();

console.log('applications-form');
