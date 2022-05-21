import {db} from './db/index.js';
import template from '../pug/templates/need-dorm.pug';

const mapFn = function (doc) {
  if (doc.type !== 'abit') return;
  if (![1, 2].includes(Number(doc.needDorm))) return;

  const value = {
    fio: doc.fio,
    address: doc.address,
    tel: doc.tel,
    applications: doc.applications,
    needDorm: Number(doc.needDorm),
    memo: doc.memo
  };

  // eslint-disable-next-line no-undef
  emit([2 - Number(doc.needDorm), doc.fio], value);
};

const timestampElem = document.getElementById('timestamp');
timestampElem.textContent = new Date().toLocaleString('ru', {});

(async () => {
  const res = await db.query(mapFn);
  const needDormList = res.rows.map((row) => row.value);

  const priority = needDormList.filter((abit) => abit.needDorm === 2);
  const need = needDormList.filter((abit) => abit.needDorm === 1);

  const target = document.getElementById('need-dorm');

  const needDormHtml = template({priority, need});

  target.innerHTML = needDormHtml;
})();
