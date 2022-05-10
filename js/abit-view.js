(() => {
  // src/js/utils/index.js
  function createElementFromTemplate(tmplElem) {
    const elem = document.createElement("div");
    elem.append(tmplElem.content.cloneNode(true));
    return elem.firstElementChild;
  }
  function kebabToCamel(str) {
    return str.replace(/-./g, (x) => x[1].toUpperCase());
  }

  // src/js/abit-view.js
  function createAbitViewElemFromTemplate(tmplElem, data) {
    const abitViewElem = createElementFromTemplate(tmplElem);
    for (const elem of abitViewElem.querySelectorAll(`[name]`)) {
      const key = kebabToCamel(elem.getAttribute("name"));
      elem.textContent = data[key] ?? "";
    }
    const idElem = abitViewElem;
    const id = data.id ?? data._id;
    if (idElem && id)
      idElem.dataset.id = id;
    const genderElem = abitViewElem.querySelector(".abit-view__gender");
    genderElem.textContent = data.gender === "\u043C" ? "\u2642\uFE0F" : "\u2640\uFE0F";
    const needDormElem = abitViewElem.querySelector(".abit-view__need-dorm");
    switch (Number(data.needDorm)) {
      case 0:
        needDormElem.textContent = "";
        break;
      case 1:
        needDormElem.innerHTML = '<span class="emoji">\u{1F3E8}</span>';
        needDormElem.style.fontSize = "0.5em";
        break;
      case 2:
        needDormElem.innerHTML = '<span class="emoji">\u{1F3E8}</span>';
        needDormElem.style.fontSize = "1em";
        break;
      default:
        needDormElem.textContent = "<?>";
    }
    const applicationsListElem = abitViewElem.querySelector(".abit-view__applications-list");
    applicationsListElem.replaceChildren();
    data.applications.forEach((app) => {
      const elem = document.createElement("span");
      elem.innerHTML = `${app.eduProg}<span class="abit-view__application-grade">${app.grade}<span>`;
      elem.classList.add("abit-view__application");
      elem.setAttribute("title", app.grade);
      if (app.priority)
        elem.classList.add("abit-view__application--priority");
      if (app.disabled)
        elem.classList.add("abit-view__application--disabled");
      if (app.priority) {
        applicationsListElem.append(elem);
      } else {
        applicationsListElem.prepend(elem);
      }
    });
    const scoreListElem = abitViewElem.querySelector(".abit-view__score-list");
    const certScore = parseFloat((data.certScore || 0).toString().replace(",", "."));
    const extraScore = parseFloat((data.extraScore || 0).toString().replace(",", "."));
    const totalScore = certScore + extraScore;
    scoreListElem.replaceChildren();
    if (totalScore === 0)
      return;
    if (extraScore > 0 && certScore > 0) {
      {
        const elem = document.createElement("span");
        elem.classList.add("abit-view__cert-score");
        elem.textContent = certScore.toString().replace(".", ",");
        scoreListElem.append(elem);
      }
      {
        const elem = document.createElement("span");
        elem.classList.add("abit-view__extra-score");
        elem.textContent = extraScore.toString().replace(".", ",");
        scoreListElem.append("+", elem, "=");
      }
    }
    if (totalScore > 0) {
      const elem = document.createElement("span");
      elem.classList.add("abit-view__total-score");
      elem.textContent = parseFloat(totalScore.toFixed(2)).toString().replace(".", ",");
      scoreListElem.append(elem);
    }
    const hasMedicalCert = abitViewElem.querySelector(".abit-view__has-medical-cert span");
    const hasFluoro = abitViewElem.querySelector(".abit-view__has-fluoro span");
    const hasVaccine = abitViewElem.querySelector(".abit-view__has-vaccine span");
    const hasEduCertOriginal = abitViewElem.querySelector(".abit-view__has-edu-cert-original span");
    if (!data.hasMedicalCert)
      hasMedicalCert.classList.add("not-visible");
    if (!data.hasFluoro)
      hasFluoro.classList.add("not-visible");
    if (!data.hasVaccine)
      hasVaccine.classList.add("not-visible");
    if (!data.hasEduCertOriginal)
      hasEduCertOriginal.classList.add("not-visible");
    return abitViewElem;
  }
})();
//# sourceMappingURL=abit-view.js.map
