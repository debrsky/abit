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

  // src/js/edu-prog-view.js
  function createEduProgViewElemFromTemplate(tmplElem, data) {
    const eduProgViewElem = createElementFromTemplate(tmplElem);
    for (const elem of eduProgViewElem.querySelectorAll(`[name]`)) {
      const key = kebabToCamel(elem.getAttribute("name"));
      if (data[key])
        elem.textContent = data[key];
    }
    const idElem = eduProgViewElem;
    const id = data.id ?? data._id;
    if (idElem && id)
      idElem.dataset.id = id;
    return eduProgViewElem;
  }
})();
//# sourceMappingURL=edu-prog-view.js.map
