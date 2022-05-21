import FormSvelte from './svelte/comp.svelte';
import {db} from './db/index.js';

const svelte = document.getElementById('svelte');

// eslint-disable-next-line no-unused-vars
const app = new FormSvelte({
  target: svelte
});

(async () => {
  const eduProgs = await db.query('eduProgs');
  console.log(eduProgs);

  app.eduProgs = eduProgs.rows.map(({key, value}) => ({
    code: key,
    specCode: value[0],
    specName: value[1],
    eduForm: value[2],
    baseEduLevel: value[3],
    finSource: value[4]
  }));
})();
