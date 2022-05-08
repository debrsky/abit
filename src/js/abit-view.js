import {createElement} from './utils/index.js';

export function createAbitViewElem({
  regDate,
  fio,
  gender,
  certScore,
  extraScore,
  totalScore,
  hasEduCertOriginal,
  hasMedicalCert,
  hasFluoro,
  hasVaccine,
  needDorm,
  school,
  schoolYear,
  address,
  tel,
  memo,
  contractReady,
  applications,
  _id,
  _rev
} = {}) {
  const totalScoreNum =
    totalScore ??
    (parseFloat(certScore.replace(',', '.')) || 0) +
      (parseFloat(extraScore.replace(',', '.')) || 0);
  const totalScoreNumFixed = parseFloat(totalScoreNum.toFixed(2));

  const html = `
  <div class="abit-view" data-id="${_id}" data-rev="${_rev}">
    <div class="field abit-view__reg-date">${regDate}</div>
    <div class="field abit-view__gender emoji">${
      {м: '♂️', ж: '♀️'}[gender] ?? '-'
    }</div>
    <div class="field abit-view__fio">${fio}</div>
    <div class="field-container">
      <div class="field abit-view__cert-score">${certScore}</div>
      <div class="field abit-view__extra-score">${extraScore}</div>
      <div class="field abit-view__total-score">=${totalScoreNumFixed}</div>
    </div>
    <div class="field-container">
      <div class="field abit-view__has-edu-cert-original">☑️</div>
      <div class="field abit-view__has-medical-cert">✅</div>
      <div class="field abit-view__has-fluoro">🗹</div>
      <div class="field abit-view__has-vaccine">✔️</div>
    </div>
    <div class="field abit-view__address">${address}</div>
    <div class="field abit-view__tel">${tel}</div>
    <div class="field abit-view__need-dorm">🏨</div>
    <div class="field-container">
      <div class="field abit-view__school-year">${schoolYear}</div>
      <div class="field abit-view__school">${school}</div>
    </div>
    <div class="field abit-view__contract-ready">✅</div>
  </div>
`;

  return createElement(html);
}
