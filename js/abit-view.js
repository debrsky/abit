(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/pug/includes/abit-view.pug
  function pug_attr(t, e, n, r) {
    if (e === false || e == null || !e && (t === "class" || t === "style"))
      return "";
    if (e === true)
      return " " + (r ? t : t + '="' + t + '"');
    var f = typeof e;
    return f !== "object" && f !== "function" || typeof e.toJSON != "function" || (e = e.toJSON()), typeof e == "string" || (e = JSON.stringify(e), n || e.indexOf('"') === -1) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
  }
  function pug_classes(s, r) {
    return Array.isArray(s) ? pug_classes_array(s, r) : s && typeof s == "object" ? pug_classes_object(s) : s || "";
  }
  function pug_classes_array(r, a) {
    for (var s, e = "", u = "", c = Array.isArray(a), g = 0; g < r.length; g++)
      (s = pug_classes(r[g])) && (c && a[g] && (s = pug_escape(s)), e = e + u + s, u = " ");
    return e;
  }
  function pug_classes_object(r) {
    var a = "", n = "";
    for (var o in r)
      o && r[o] && pug_has_own_property.call(r, o) && (a = a + n + o, n = " ");
    return a;
  }
  function pug_escape(e) {
    var a = "" + e, t = pug_match_html.exec(a);
    if (!t)
      return e;
    var r, c, n, s = "";
    for (r = t.index, c = 0; r < a.length; r++) {
      switch (a.charCodeAt(r)) {
        case 34:
          n = "&quot;";
          break;
        case 38:
          n = "&amp;";
          break;
        case 60:
          n = "&lt;";
          break;
        case 62:
          n = "&gt;";
          break;
        default:
          continue;
      }
      c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }
    return c !== r ? s + a.substring(c, r) : s;
  }
  var pug_has_own_property = Object.prototype.hasOwnProperty;
  var pug_match_html = /["&<>]/;
  function pug_rethrow(e, n, r, t) {
    if (!(e instanceof Error))
      throw e;
    if (!(typeof window == "undefined" && n || t))
      throw e.message += " on line " + r, e;
    var o, a, i, s;
    try {
      t = t || __require("fs").readFileSync(n, { encoding: "utf8" }), o = 3, a = t.split("\n"), i = Math.max(r - o, 0), s = Math.min(a.length, r + o);
    } catch (t2) {
      return e.message += " - could not read from " + n + " (" + t2.message + ")", void pug_rethrow(e, null, r);
    }
    o = a.slice(i, s).map(function(e2, n2) {
      var t2 = n2 + i + 1;
      return (t2 == r ? "  > " : "    ") + t2 + "| " + e2;
    }).join("\n"), e.path = n;
    try {
      e.message = (n || "Pug") + ":" + r + "\n" + o + "\n\n" + e.message;
    } catch (e2) {
    }
    throw e;
  }
  function template(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
      ;
      var locals_for_with = locals || {};
      (function(Number2, data2, parseFloat2) {
        ;
        pug_debug_line = 1;
        pug_html = pug_html + "<article" + (' class="item abit-view"' + pug_attr("data-id", data2._id, true, false)) + ">";
        ;
        pug_debug_line = 2;
        pug_html = pug_html + '<div class="container" style="display: flex;">';
        ;
        pug_debug_line = 3;
        pug_html = pug_html + '<div class="value abit-view__reg-date">';
        ;
        pug_debug_line = 3;
        pug_html = pug_html + pug_escape((pug_interp = data2.regDate) == null ? "" : pug_interp) + "</div>";
        ;
        pug_debug_line = 5;
        pug_html = pug_html + '<div class="value abit-view__gender">';
        ;
        pug_debug_line = 6;
        if (data2.gender === "\u043C") {
          ;
          pug_debug_line = 7;
          pug_html = pug_html + '<div class="emoji">';
          ;
          pug_debug_line = 7;
          pug_html = pug_html + "\u2642\uFE0F</div>";
        }
        ;
        pug_debug_line = 8;
        if (data2.gender === "\u0436") {
          ;
          pug_debug_line = 9;
          pug_html = pug_html + '<div class="emoji">';
          ;
          pug_debug_line = 9;
          pug_html = pug_html + "\u2640\uFE0F</div>";
        }
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 11;
        pug_html = pug_html + '<div class="value abit-view__fio">';
        ;
        pug_debug_line = 11;
        pug_html = pug_html + pug_escape((pug_interp = data2.fio) == null ? "" : pug_interp) + "</div>";
        ;
        pug_debug_line = 13;
        pug_html = pug_html + '<div class="value abit-view__applications-list">';
        ;
        pug_debug_line = 14;
        ;
        (function() {
          var $$obj = data2.applications;
          if (typeof $$obj.length == "number") {
            for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
              var app = $$obj[pug_index0];
              ;
              pug_debug_line = 15;
              const classes = {
                "abit-view__application--priority": app.priority,
                "abit-view__application--disabled": app.disabled
              };
              pug_debug_line = 20;
              pug_html = pug_html + "<span" + pug_attr("class", pug_classes(["abit-view__application", classes], [false, true]), false, false) + ">";
              ;
              pug_debug_line = 21;
              pug_html = pug_html + pug_escape((pug_interp = app.eduProg) == null ? "" : pug_interp);
              ;
              pug_debug_line = 22;
              pug_html = pug_html + '<span class="abit-view__application-grade">';
              ;
              pug_debug_line = 22;
              pug_html = pug_html + pug_escape((pug_interp = app.grade) == null ? "" : pug_interp) + "</span></span>";
            }
          } else {
            var $$l = 0;
            for (var pug_index0 in $$obj) {
              $$l++;
              var app = $$obj[pug_index0];
              ;
              pug_debug_line = 15;
              const classes = {
                "abit-view__application--priority": app.priority,
                "abit-view__application--disabled": app.disabled
              };
              pug_debug_line = 20;
              pug_html = pug_html + "<span" + pug_attr("class", pug_classes(["abit-view__application", classes], [false, true]), false, false) + ">";
              ;
              pug_debug_line = 21;
              pug_html = pug_html + pug_escape((pug_interp = app.eduProg) == null ? "" : pug_interp);
              ;
              pug_debug_line = 22;
              pug_html = pug_html + '<span class="abit-view__application-grade">';
              ;
              pug_debug_line = 22;
              pug_html = pug_html + pug_escape((pug_interp = app.grade) == null ? "" : pug_interp) + "</span></span>";
            }
          }
        }).call(this);
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 24;
        const certScore = parseFloat2((data2.certScore || 0).toString().replace(",", "."));
        const extraScore = parseFloat2((data2.extraScore || 0).toString().replace(",", "."));
        const totalScore = parseFloat2((certScore + extraScore).toFixed(2));
        ;
        pug_debug_line = 29;
        pug_html = pug_html + '<div class="value abit-view__score-list">';
        ;
        pug_debug_line = 30;
        if (extraScore > 0 && certScore > 0) {
          ;
          pug_debug_line = 31;
          pug_html = pug_html + '<span class="abit-view__cert-score">';
          ;
          pug_debug_line = 31;
          pug_html = pug_html + pug_escape((pug_interp = certScore.toString().replace(".", ",")) == null ? "" : pug_interp) + "</span>";
          ;
          pug_debug_line = 32;
          pug_html = pug_html + "+";
          ;
          pug_debug_line = 33;
          pug_html = pug_html + '<span class="abit-view__extra-score">';
          ;
          pug_debug_line = 33;
          pug_html = pug_html + pug_escape((pug_interp = extraScore.toString().replace(".", ",")) == null ? "" : pug_interp) + "</span>";
          ;
          pug_debug_line = 34;
          pug_html = pug_html + "=";
        }
        ;
        pug_debug_line = 36;
        if (totalScore) {
          ;
          pug_debug_line = 37;
          pug_html = pug_html + '<span class="abit-view__total-score">';
          ;
          pug_debug_line = 37;
          pug_html = pug_html + pug_escape((pug_interp = totalScore.toString().replace(".", ",")) == null ? "" : pug_interp) + "</span>";
        }
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 39;
        pug_html = pug_html + '<div class="value abit-view__has-medical-cert">';
        ;
        pug_debug_line = 40;
        if (data2.hasMedicalCert) {
          ;
          pug_debug_line = 41;
          pug_html = pug_html + '<span class="emoji">';
          ;
          pug_debug_line = 41;
          pug_html = pug_html + "\u2695\uFE0F</span>";
        }
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 42;
        pug_html = pug_html + '<div class="value abit-view__has-fluoro">';
        ;
        pug_debug_line = 43;
        if (data2.hasFluoro) {
          ;
          pug_debug_line = 44;
          pug_html = pug_html + '<span class="emoji">';
          ;
          pug_debug_line = 44;
          pug_html = pug_html + pug_escape((pug_interp = "\u{1FAC1}") == null ? "" : pug_interp) + "</span>";
        }
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 45;
        pug_html = pug_html + '<div class="value abit-view__has-vaccine">';
        ;
        pug_debug_line = 46;
        if (data2.hasVaccine) {
          ;
          pug_debug_line = 47;
          pug_html = pug_html + '<span class="emoji">';
          ;
          pug_debug_line = 47;
          pug_html = pug_html + "\u{1F489}</span>";
        }
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 48;
        pug_html = pug_html + '<div class="value abit-view__has-edu-cert-original">';
        ;
        pug_debug_line = 49;
        if (data2.hasEduCertOriginal) {
          ;
          pug_debug_line = 50;
          pug_html = pug_html + '<span class="emoji">';
          ;
          pug_debug_line = 50;
          pug_html = pug_html + "\u2714\uFE0F</span>";
        }
        pug_html = pug_html + "</div></div>";
        ;
        pug_debug_line = 52;
        pug_html = pug_html + '<div class="container" style="display: flex;">';
        ;
        pug_debug_line = 53;
        pug_html = pug_html + '<div class="value abit-view__need-dorm">';
        ;
        pug_debug_line = 54;
        if (Number2(data2.needDorm) === 1) {
          ;
          pug_debug_line = 55;
          pug_html = pug_html + '<span class="emoji" style="font-size: 0.5em">';
          ;
          pug_debug_line = 55;
          pug_html = pug_html + "\u{1F3E8}</span>";
        }
        ;
        pug_debug_line = 56;
        if (Number2(data2.needDorm) === 2) {
          ;
          pug_debug_line = 57;
          pug_html = pug_html + '<span class="emoji">';
          ;
          pug_debug_line = 57;
          pug_html = pug_html + "\u{1F3E8}</span>";
        }
        pug_html = pug_html + "</div>";
        ;
        pug_debug_line = 59;
        pug_html = pug_html + '<div class="value abit-view__address">';
        ;
        pug_debug_line = 59;
        pug_html = pug_html + pug_escape((pug_interp = data2.address) == null ? "" : pug_interp) + "</div>";
        ;
        pug_debug_line = 60;
        pug_html = pug_html + '<div class="value abit-view__tel">';
        ;
        pug_debug_line = 60;
        pug_html = pug_html + pug_escape((pug_interp = data2.tel) == null ? "" : pug_interp) + "</div></div>";
        ;
        pug_debug_line = 62;
        pug_html = pug_html + '<div class="container" style="display: flex;">';
        ;
        pug_debug_line = 63;
        pug_html = pug_html + '<div class="value abit-view__school-year">';
        ;
        pug_debug_line = 63;
        pug_html = pug_html + pug_escape((pug_interp = data2.schoolYear) == null ? "" : pug_interp) + "</div>";
        ;
        pug_debug_line = 64;
        pug_html = pug_html + '<div class="value abit-view__school">';
        ;
        pug_debug_line = 64;
        pug_html = pug_html + pug_escape((pug_interp = data2.school) == null ? "" : pug_interp) + "</div></div>";
        ;
        pug_debug_line = 66;
        pug_html = pug_html + '<div class="value abit-view--memo">';
        ;
        pug_debug_line = 66;
        pug_html = pug_html + pug_escape((pug_interp = data2.memo) == null ? "" : pug_interp) + "</div></article>";
      }).call(this, "Number" in locals_for_with ? locals_for_with.Number : typeof Number !== "undefined" ? Number : void 0, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : void 0, "parseFloat" in locals_for_with ? locals_for_with.parseFloat : typeof parseFloat !== "undefined" ? parseFloat : void 0);
      ;
    } catch (err) {
      pug_rethrow(err, pug_debug_filename, pug_debug_line);
    }
    ;
    return pug_html;
  }
  var abit_view_default = template;

  // src/js/abit-view.js
  function createAbitViewElem(data2) {
    const div = document.createElement("div");
    div.innerHTML = abit_view_default({ data: data2 });
    const elem = div.firstElementChild;
    div.remove();
    return elem;
  }
})();
//# sourceMappingURL=abit-view.js.map
