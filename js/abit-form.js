(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/deepmerge/dist/cjs.js
  var require_cjs = __commonJS({
    "node_modules/deepmerge/dist/cjs.js"(exports, module) {
      "use strict";
      var isMergeableObject = function isMergeableObject2(value) {
        return isNonNullObject(value) && !isSpecial(value);
      };
      function isNonNullObject(value) {
        return !!value && typeof value === "object";
      }
      function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
      }
      var canUseSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
      function isReactElement(value) {
        return value.$$typeof === REACT_ELEMENT_TYPE;
      }
      function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
      }
      function cloneUnlessOtherwiseSpecified(value, options) {
        return options.clone !== false && options.isMergeableObject(value) ? deepmerge3(emptyTarget(value), value, options) : value;
      }
      function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function(element2) {
          return cloneUnlessOtherwiseSpecified(element2, options);
        });
      }
      function getMergeFunction(key, options) {
        if (!options.customMerge) {
          return deepmerge3;
        }
        var customMerge = options.customMerge(key);
        return typeof customMerge === "function" ? customMerge : deepmerge3;
      }
      function getEnumerableOwnPropertySymbols(target) {
        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
          return target.propertyIsEnumerable(symbol);
        }) : [];
      }
      function getKeys(target) {
        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
      }
      function propertyIsOnObject(object, property) {
        try {
          return property in object;
        } catch (_) {
          return false;
        }
      }
      function propertyIsUnsafe(target, key) {
        return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
      }
      function mergeObject(target, source, options) {
        var destination = {};
        if (options.isMergeableObject(target)) {
          getKeys(target).forEach(function(key) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
          });
        }
        getKeys(source).forEach(function(key) {
          if (propertyIsUnsafe(target, key)) {
            return;
          }
          if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
          } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
          }
        });
        return destination;
      }
      function deepmerge3(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
        options.isMergeableObject = options.isMergeableObject || isMergeableObject;
        options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
        if (!sourceAndTargetTypesMatch) {
          return cloneUnlessOtherwiseSpecified(source, options);
        } else if (sourceIsArray) {
          return options.arrayMerge(target, source, options);
        } else {
          return mergeObject(target, source, options);
        }
      }
      deepmerge3.all = function deepmergeAll(array, options) {
        if (!Array.isArray(array)) {
          throw new Error("first argument should be an array");
        }
        return array.reduce(function(prev, next) {
          return deepmerge3(prev, next, options);
        }, {});
      };
      var deepmerge_1 = deepmerge3;
      module.exports = deepmerge_1;
    }
  });

  // (disabled):node_modules/immediate/lib/nextTick
  var require_nextTick = __commonJS({
    "(disabled):node_modules/immediate/lib/nextTick"() {
    }
  });

  // node_modules/immediate/lib/queueMicrotask.js
  var require_queueMicrotask = __commonJS({
    "node_modules/immediate/lib/queueMicrotask.js"(exports) {
      "use strict";
      exports.test = function() {
        return typeof window.queueMicrotask === "function";
      };
      exports.install = function(func) {
        return function() {
          window.queueMicrotask(func);
        };
      };
    }
  });

  // node_modules/immediate/lib/mutation.js
  var require_mutation = __commonJS({
    "node_modules/immediate/lib/mutation.js"(exports) {
      "use strict";
      var Mutation = window.MutationObserver || window.WebKitMutationObserver;
      exports.test = function() {
        return Mutation;
      };
      exports.install = function(handle) {
        var called = 0;
        var observer = new Mutation(handle);
        var element2 = window.document.createTextNode("");
        observer.observe(element2, {
          characterData: true
        });
        return function() {
          element2.data = called = ++called % 2;
        };
      };
    }
  });

  // node_modules/immediate/lib/messageChannel.js
  var require_messageChannel = __commonJS({
    "node_modules/immediate/lib/messageChannel.js"(exports) {
      "use strict";
      exports.test = function() {
        if (window.setImmediate) {
          return false;
        }
        return typeof window.MessageChannel !== "undefined";
      };
      exports.install = function(func) {
        var channel = new window.MessageChannel();
        channel.port1.onmessage = func;
        return function() {
          channel.port2.postMessage(0);
        };
      };
    }
  });

  // node_modules/immediate/lib/stateChange.js
  var require_stateChange = __commonJS({
    "node_modules/immediate/lib/stateChange.js"(exports) {
      "use strict";
      exports.test = function() {
        return "document" in window && "onreadystatechange" in window.document.createElement("script");
      };
      exports.install = function(handle) {
        return function() {
          var scriptEl = window.document.createElement("script");
          scriptEl.onreadystatechange = function() {
            handle();
            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
          };
          window.document.documentElement.appendChild(scriptEl);
          return handle;
        };
      };
    }
  });

  // node_modules/immediate/lib/timeout.js
  var require_timeout = __commonJS({
    "node_modules/immediate/lib/timeout.js"(exports) {
      "use strict";
      exports.test = function() {
        return true;
      };
      exports.install = function(t) {
        return function() {
          setTimeout(t, 0);
        };
      };
    }
  });

  // node_modules/immediate/lib/index.js
  var require_lib = __commonJS({
    "node_modules/immediate/lib/index.js"(exports, module) {
      var import_nextTick = __toESM(require_nextTick());
      var import_queueMicrotask = __toESM(require_queueMicrotask());
      var import_mutation = __toESM(require_mutation());
      var import_messageChannel = __toESM(require_messageChannel());
      var import_stateChange = __toESM(require_stateChange());
      var import_timeout = __toESM(require_timeout());
      var types = [
        import_nextTick.default,
        import_queueMicrotask.default,
        import_mutation.default,
        import_messageChannel.default,
        import_stateChange.default,
        import_timeout.default
      ];
      var draining;
      var currentQueue;
      var queueIndex = -1;
      var queue2 = [];
      var scheduled = false;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue2 = currentQueue.concat(queue2);
        } else {
          queueIndex = -1;
        }
        if (queue2.length) {
          nextTick();
        }
      }
      function nextTick() {
        if (draining) {
          return;
        }
        scheduled = false;
        draining = true;
        var len2 = queue2.length;
        var timeout = setTimeout(cleanUpNextTick);
        while (len2) {
          currentQueue = queue2;
          queue2 = [];
          while (currentQueue && ++queueIndex < len2) {
            currentQueue[queueIndex].run();
          }
          queueIndex = -1;
          len2 = queue2.length;
        }
        currentQueue = null;
        queueIndex = -1;
        draining = false;
        clearTimeout(timeout);
      }
      var scheduleDrain;
      var i = -1;
      var len = types.length;
      while (++i < len) {
        if (types[i] && types[i].test && types[i].test()) {
          scheduleDrain = types[i].install(nextTick);
          break;
        }
      }
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        var fun = this.fun;
        var array = this.array;
        switch (array.length) {
          case 0:
            return fun();
          case 1:
            return fun(array[0]);
          case 2:
            return fun(array[0], array[1]);
          case 3:
            return fun(array[0], array[1], array[2]);
          default:
            return fun.apply(null, array);
        }
      };
      module.exports = immediate2;
      function immediate2(task) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i2 = 1; i2 < arguments.length; i2++) {
            args[i2 - 1] = arguments[i2];
          }
        }
        queue2.push(new Item(task, args));
        if (!scheduled && !draining) {
          scheduled = true;
          scheduleDrain();
        }
      }
    }
  });

  // node_modules/spark-md5/spark-md5.js
  var require_spark_md5 = __commonJS({
    "node_modules/spark-md5/spark-md5.js"(exports, module) {
      (function(factory) {
        if (typeof exports === "object") {
          module.exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define(factory);
        } else {
          var glob;
          try {
            glob = window;
          } catch (e) {
            glob = self;
          }
          glob.SparkMD5 = factory();
        }
      })(function(undefined2) {
        "use strict";
        var add32 = function(a2, b) {
          return a2 + b & 4294967295;
        }, hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        function cmn(q, a2, b, x, s, t) {
          a2 = add32(add32(a2, q), add32(x, t));
          return add32(a2 << s | a2 >>> 32 - s, b);
        }
        function md5cycle(x, k) {
          var a2 = x[0], b = x[1], c = x[2], d = x[3];
          a2 += (b & c | ~b & d) + k[0] - 680876936 | 0;
          a2 = (a2 << 7 | a2 >>> 25) + b | 0;
          d += (a2 & b | ~a2 & c) + k[1] - 389564586 | 0;
          d = (d << 12 | d >>> 20) + a2 | 0;
          c += (d & a2 | ~d & b) + k[2] + 606105819 | 0;
          c = (c << 17 | c >>> 15) + d | 0;
          b += (c & d | ~c & a2) + k[3] - 1044525330 | 0;
          b = (b << 22 | b >>> 10) + c | 0;
          a2 += (b & c | ~b & d) + k[4] - 176418897 | 0;
          a2 = (a2 << 7 | a2 >>> 25) + b | 0;
          d += (a2 & b | ~a2 & c) + k[5] + 1200080426 | 0;
          d = (d << 12 | d >>> 20) + a2 | 0;
          c += (d & a2 | ~d & b) + k[6] - 1473231341 | 0;
          c = (c << 17 | c >>> 15) + d | 0;
          b += (c & d | ~c & a2) + k[7] - 45705983 | 0;
          b = (b << 22 | b >>> 10) + c | 0;
          a2 += (b & c | ~b & d) + k[8] + 1770035416 | 0;
          a2 = (a2 << 7 | a2 >>> 25) + b | 0;
          d += (a2 & b | ~a2 & c) + k[9] - 1958414417 | 0;
          d = (d << 12 | d >>> 20) + a2 | 0;
          c += (d & a2 | ~d & b) + k[10] - 42063 | 0;
          c = (c << 17 | c >>> 15) + d | 0;
          b += (c & d | ~c & a2) + k[11] - 1990404162 | 0;
          b = (b << 22 | b >>> 10) + c | 0;
          a2 += (b & c | ~b & d) + k[12] + 1804603682 | 0;
          a2 = (a2 << 7 | a2 >>> 25) + b | 0;
          d += (a2 & b | ~a2 & c) + k[13] - 40341101 | 0;
          d = (d << 12 | d >>> 20) + a2 | 0;
          c += (d & a2 | ~d & b) + k[14] - 1502002290 | 0;
          c = (c << 17 | c >>> 15) + d | 0;
          b += (c & d | ~c & a2) + k[15] + 1236535329 | 0;
          b = (b << 22 | b >>> 10) + c | 0;
          a2 += (b & d | c & ~d) + k[1] - 165796510 | 0;
          a2 = (a2 << 5 | a2 >>> 27) + b | 0;
          d += (a2 & c | b & ~c) + k[6] - 1069501632 | 0;
          d = (d << 9 | d >>> 23) + a2 | 0;
          c += (d & b | a2 & ~b) + k[11] + 643717713 | 0;
          c = (c << 14 | c >>> 18) + d | 0;
          b += (c & a2 | d & ~a2) + k[0] - 373897302 | 0;
          b = (b << 20 | b >>> 12) + c | 0;
          a2 += (b & d | c & ~d) + k[5] - 701558691 | 0;
          a2 = (a2 << 5 | a2 >>> 27) + b | 0;
          d += (a2 & c | b & ~c) + k[10] + 38016083 | 0;
          d = (d << 9 | d >>> 23) + a2 | 0;
          c += (d & b | a2 & ~b) + k[15] - 660478335 | 0;
          c = (c << 14 | c >>> 18) + d | 0;
          b += (c & a2 | d & ~a2) + k[4] - 405537848 | 0;
          b = (b << 20 | b >>> 12) + c | 0;
          a2 += (b & d | c & ~d) + k[9] + 568446438 | 0;
          a2 = (a2 << 5 | a2 >>> 27) + b | 0;
          d += (a2 & c | b & ~c) + k[14] - 1019803690 | 0;
          d = (d << 9 | d >>> 23) + a2 | 0;
          c += (d & b | a2 & ~b) + k[3] - 187363961 | 0;
          c = (c << 14 | c >>> 18) + d | 0;
          b += (c & a2 | d & ~a2) + k[8] + 1163531501 | 0;
          b = (b << 20 | b >>> 12) + c | 0;
          a2 += (b & d | c & ~d) + k[13] - 1444681467 | 0;
          a2 = (a2 << 5 | a2 >>> 27) + b | 0;
          d += (a2 & c | b & ~c) + k[2] - 51403784 | 0;
          d = (d << 9 | d >>> 23) + a2 | 0;
          c += (d & b | a2 & ~b) + k[7] + 1735328473 | 0;
          c = (c << 14 | c >>> 18) + d | 0;
          b += (c & a2 | d & ~a2) + k[12] - 1926607734 | 0;
          b = (b << 20 | b >>> 12) + c | 0;
          a2 += (b ^ c ^ d) + k[5] - 378558 | 0;
          a2 = (a2 << 4 | a2 >>> 28) + b | 0;
          d += (a2 ^ b ^ c) + k[8] - 2022574463 | 0;
          d = (d << 11 | d >>> 21) + a2 | 0;
          c += (d ^ a2 ^ b) + k[11] + 1839030562 | 0;
          c = (c << 16 | c >>> 16) + d | 0;
          b += (c ^ d ^ a2) + k[14] - 35309556 | 0;
          b = (b << 23 | b >>> 9) + c | 0;
          a2 += (b ^ c ^ d) + k[1] - 1530992060 | 0;
          a2 = (a2 << 4 | a2 >>> 28) + b | 0;
          d += (a2 ^ b ^ c) + k[4] + 1272893353 | 0;
          d = (d << 11 | d >>> 21) + a2 | 0;
          c += (d ^ a2 ^ b) + k[7] - 155497632 | 0;
          c = (c << 16 | c >>> 16) + d | 0;
          b += (c ^ d ^ a2) + k[10] - 1094730640 | 0;
          b = (b << 23 | b >>> 9) + c | 0;
          a2 += (b ^ c ^ d) + k[13] + 681279174 | 0;
          a2 = (a2 << 4 | a2 >>> 28) + b | 0;
          d += (a2 ^ b ^ c) + k[0] - 358537222 | 0;
          d = (d << 11 | d >>> 21) + a2 | 0;
          c += (d ^ a2 ^ b) + k[3] - 722521979 | 0;
          c = (c << 16 | c >>> 16) + d | 0;
          b += (c ^ d ^ a2) + k[6] + 76029189 | 0;
          b = (b << 23 | b >>> 9) + c | 0;
          a2 += (b ^ c ^ d) + k[9] - 640364487 | 0;
          a2 = (a2 << 4 | a2 >>> 28) + b | 0;
          d += (a2 ^ b ^ c) + k[12] - 421815835 | 0;
          d = (d << 11 | d >>> 21) + a2 | 0;
          c += (d ^ a2 ^ b) + k[15] + 530742520 | 0;
          c = (c << 16 | c >>> 16) + d | 0;
          b += (c ^ d ^ a2) + k[2] - 995338651 | 0;
          b = (b << 23 | b >>> 9) + c | 0;
          a2 += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
          a2 = (a2 << 6 | a2 >>> 26) + b | 0;
          d += (b ^ (a2 | ~c)) + k[7] + 1126891415 | 0;
          d = (d << 10 | d >>> 22) + a2 | 0;
          c += (a2 ^ (d | ~b)) + k[14] - 1416354905 | 0;
          c = (c << 15 | c >>> 17) + d | 0;
          b += (d ^ (c | ~a2)) + k[5] - 57434055 | 0;
          b = (b << 21 | b >>> 11) + c | 0;
          a2 += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
          a2 = (a2 << 6 | a2 >>> 26) + b | 0;
          d += (b ^ (a2 | ~c)) + k[3] - 1894986606 | 0;
          d = (d << 10 | d >>> 22) + a2 | 0;
          c += (a2 ^ (d | ~b)) + k[10] - 1051523 | 0;
          c = (c << 15 | c >>> 17) + d | 0;
          b += (d ^ (c | ~a2)) + k[1] - 2054922799 | 0;
          b = (b << 21 | b >>> 11) + c | 0;
          a2 += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
          a2 = (a2 << 6 | a2 >>> 26) + b | 0;
          d += (b ^ (a2 | ~c)) + k[15] - 30611744 | 0;
          d = (d << 10 | d >>> 22) + a2 | 0;
          c += (a2 ^ (d | ~b)) + k[6] - 1560198380 | 0;
          c = (c << 15 | c >>> 17) + d | 0;
          b += (d ^ (c | ~a2)) + k[13] + 1309151649 | 0;
          b = (b << 21 | b >>> 11) + c | 0;
          a2 += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
          a2 = (a2 << 6 | a2 >>> 26) + b | 0;
          d += (b ^ (a2 | ~c)) + k[11] - 1120210379 | 0;
          d = (d << 10 | d >>> 22) + a2 | 0;
          c += (a2 ^ (d | ~b)) + k[2] + 718787259 | 0;
          c = (c << 15 | c >>> 17) + d | 0;
          b += (d ^ (c | ~a2)) + k[9] - 343485551 | 0;
          b = (b << 21 | b >>> 11) + c | 0;
          x[0] = a2 + x[0] | 0;
          x[1] = b + x[1] | 0;
          x[2] = c + x[2] | 0;
          x[3] = d + x[3] | 0;
        }
        function md5blk(s) {
          var md5blks = [], i;
          for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
          }
          return md5blks;
        }
        function md5blk_array(a2) {
          var md5blks = [], i;
          for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a2[i] + (a2[i + 1] << 8) + (a2[i + 2] << 16) + (a2[i + 3] << 24);
          }
          return md5blks;
        }
        function md51(s) {
          var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
          for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
          }
          s = s.substring(i - 64);
          length = s.length;
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
          }
          tail[i >> 2] |= 128 << (i % 4 << 3);
          if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = n * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(state, tail);
          return state;
        }
        function md51_array(a2) {
          var n = a2.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
          for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a2.subarray(i - 64, i)));
          }
          a2 = i - 64 < n ? a2.subarray(i - 64) : new Uint8Array(0);
          length = a2.length;
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a2[i] << (i % 4 << 3);
          }
          tail[i >> 2] |= 128 << (i % 4 << 3);
          if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = n * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(state, tail);
          return state;
        }
        function rhex(n) {
          var s = "", j;
          for (j = 0; j < 4; j += 1) {
            s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
          }
          return s;
        }
        function hex(x) {
          var i;
          for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
          }
          return x.join("");
        }
        if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592") {
          add32 = function(x, y) {
            var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 65535;
          };
        }
        if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
          (function() {
            function clamp(val, length) {
              val = val | 0 || 0;
              if (val < 0) {
                return Math.max(val + length, 0);
              }
              return Math.min(val, length);
            }
            ArrayBuffer.prototype.slice = function(from, to) {
              var length = this.byteLength, begin = clamp(from, length), end = length, num, target, targetArray, sourceArray;
              if (to !== undefined2) {
                end = clamp(to, length);
              }
              if (begin > end) {
                return new ArrayBuffer(0);
              }
              num = end - begin;
              target = new ArrayBuffer(num);
              targetArray = new Uint8Array(target);
              sourceArray = new Uint8Array(this, begin, num);
              targetArray.set(sourceArray);
              return target;
            };
          })();
        }
        function toUtf8(str) {
          if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
          }
          return str;
        }
        function utf8Str2ArrayBuffer(str, returnUInt8Array) {
          var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i;
          for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
          }
          return returnUInt8Array ? arr : buff;
        }
        function arrayBuffer2Utf8Str(buff) {
          return String.fromCharCode.apply(null, new Uint8Array(buff));
        }
        function concatenateArrayBuffers(first, second, returnUInt8Array) {
          var result = new Uint8Array(first.byteLength + second.byteLength);
          result.set(new Uint8Array(first));
          result.set(new Uint8Array(second), first.byteLength);
          return returnUInt8Array ? result : result.buffer;
        }
        function hexToBinaryString(hex2) {
          var bytes = [], length = hex2.length, x;
          for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex2.substr(x, 2), 16));
          }
          return String.fromCharCode.apply(String, bytes);
        }
        function SparkMD5() {
          this.reset();
        }
        SparkMD5.prototype.append = function(str) {
          this.appendBinary(toUtf8(str));
          return this;
        };
        SparkMD5.prototype.appendBinary = function(contents) {
          this._buff += contents;
          this._length += contents.length;
          var length = this._buff.length, i;
          for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
          }
          this._buff = this._buff.substring(i - 64);
          return this;
        };
        SparkMD5.prototype.end = function(raw) {
          var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
          }
          this._finish(tail, length);
          ret = hex(this._hash);
          if (raw) {
            ret = hexToBinaryString(ret);
          }
          this.reset();
          return ret;
        };
        SparkMD5.prototype.reset = function() {
          this._buff = "";
          this._length = 0;
          this._hash = [1732584193, -271733879, -1732584194, 271733878];
          return this;
        };
        SparkMD5.prototype.getState = function() {
          return {
            buff: this._buff,
            length: this._length,
            hash: this._hash.slice()
          };
        };
        SparkMD5.prototype.setState = function(state) {
          this._buff = state.buff;
          this._length = state.length;
          this._hash = state.hash;
          return this;
        };
        SparkMD5.prototype.destroy = function() {
          delete this._hash;
          delete this._buff;
          delete this._length;
        };
        SparkMD5.prototype._finish = function(tail, length) {
          var i = length, tmp, lo, hi;
          tail[i >> 2] |= 128 << (i % 4 << 3);
          if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = this._length * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(this._hash, tail);
        };
        SparkMD5.hash = function(str, raw) {
          return SparkMD5.hashBinary(toUtf8(str), raw);
        };
        SparkMD5.hashBinary = function(content, raw) {
          var hash = md51(content), ret = hex(hash);
          return raw ? hexToBinaryString(ret) : ret;
        };
        SparkMD5.ArrayBuffer = function() {
          this.reset();
        };
        SparkMD5.ArrayBuffer.prototype.append = function(arr) {
          var buff = concatenateArrayBuffers(this._buff.buffer, arr, true), length = buff.length, i;
          this._length += arr.byteLength;
          for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
          }
          this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
          return this;
        };
        SparkMD5.ArrayBuffer.prototype.end = function(raw) {
          var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << (i % 4 << 3);
          }
          this._finish(tail, length);
          ret = hex(this._hash);
          if (raw) {
            ret = hexToBinaryString(ret);
          }
          this.reset();
          return ret;
        };
        SparkMD5.ArrayBuffer.prototype.reset = function() {
          this._buff = new Uint8Array(0);
          this._length = 0;
          this._hash = [1732584193, -271733879, -1732584194, 271733878];
          return this;
        };
        SparkMD5.ArrayBuffer.prototype.getState = function() {
          var state = SparkMD5.prototype.getState.call(this);
          state.buff = arrayBuffer2Utf8Str(state.buff);
          return state;
        };
        SparkMD5.ArrayBuffer.prototype.setState = function(state) {
          state.buff = utf8Str2ArrayBuffer(state.buff, true);
          return SparkMD5.prototype.setState.call(this, state);
        };
        SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
        SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
        SparkMD5.ArrayBuffer.hash = function(arr, raw) {
          var hash = md51_array(new Uint8Array(arr)), ret = hex(hash);
          return raw ? hexToBinaryString(ret) : ret;
        };
        return SparkMD5;
      });
    }
  });

  // node_modules/vuvuzela/index.js
  var require_vuvuzela = __commonJS({
    "node_modules/vuvuzela/index.js"(exports) {
      "use strict";
      exports.stringify = function stringify3(input) {
        var queue2 = [];
        queue2.push({ obj: input });
        var res = "";
        var next, obj, prefix, val, i, arrayPrefix, keys2, k, key, value, objPrefix;
        while (next = queue2.pop()) {
          obj = next.obj;
          prefix = next.prefix || "";
          val = next.val || "";
          res += prefix;
          if (val) {
            res += val;
          } else if (typeof obj !== "object") {
            res += typeof obj === "undefined" ? null : JSON.stringify(obj);
          } else if (obj === null) {
            res += "null";
          } else if (Array.isArray(obj)) {
            queue2.push({ val: "]" });
            for (i = obj.length - 1; i >= 0; i--) {
              arrayPrefix = i === 0 ? "" : ",";
              queue2.push({ obj: obj[i], prefix: arrayPrefix });
            }
            queue2.push({ val: "[" });
          } else {
            keys2 = [];
            for (k in obj) {
              if (obj.hasOwnProperty(k)) {
                keys2.push(k);
              }
            }
            queue2.push({ val: "}" });
            for (i = keys2.length - 1; i >= 0; i--) {
              key = keys2[i];
              value = obj[key];
              objPrefix = i > 0 ? "," : "";
              objPrefix += JSON.stringify(key) + ":";
              queue2.push({ obj: value, prefix: objPrefix });
            }
            queue2.push({ val: "{" });
          }
        }
        return res;
      };
      function pop2(obj, stack, metaStack) {
        var lastMetaElement = metaStack[metaStack.length - 1];
        if (obj === lastMetaElement.element) {
          metaStack.pop();
          lastMetaElement = metaStack[metaStack.length - 1];
        }
        var element2 = lastMetaElement.element;
        var lastElementIndex = lastMetaElement.index;
        if (Array.isArray(element2)) {
          element2.push(obj);
        } else if (lastElementIndex === stack.length - 2) {
          var key = stack.pop();
          element2[key] = obj;
        } else {
          stack.push(obj);
        }
      }
      exports.parse = function(str) {
        var stack = [];
        var metaStack = [];
        var i = 0;
        var collationIndex2, parsedNum, numChar;
        var parsedString, lastCh, numConsecutiveSlashes, ch;
        var arrayElement, objElement;
        while (true) {
          collationIndex2 = str[i++];
          if (collationIndex2 === "}" || collationIndex2 === "]" || typeof collationIndex2 === "undefined") {
            if (stack.length === 1) {
              return stack.pop();
            } else {
              pop2(stack.pop(), stack, metaStack);
              continue;
            }
          }
          switch (collationIndex2) {
            case " ":
            case "	":
            case "\n":
            case ":":
            case ",":
              break;
            case "n":
              i += 3;
              pop2(null, stack, metaStack);
              break;
            case "t":
              i += 3;
              pop2(true, stack, metaStack);
              break;
            case "f":
              i += 4;
              pop2(false, stack, metaStack);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "-":
              parsedNum = "";
              i--;
              while (true) {
                numChar = str[i++];
                if (/[\d\.\-e\+]/.test(numChar)) {
                  parsedNum += numChar;
                } else {
                  i--;
                  break;
                }
              }
              pop2(parseFloat(parsedNum), stack, metaStack);
              break;
            case '"':
              parsedString = "";
              lastCh = void 0;
              numConsecutiveSlashes = 0;
              while (true) {
                ch = str[i++];
                if (ch !== '"' || lastCh === "\\" && numConsecutiveSlashes % 2 === 1) {
                  parsedString += ch;
                  lastCh = ch;
                  if (lastCh === "\\") {
                    numConsecutiveSlashes++;
                  } else {
                    numConsecutiveSlashes = 0;
                  }
                } else {
                  break;
                }
              }
              pop2(JSON.parse('"' + parsedString + '"'), stack, metaStack);
              break;
            case "[":
              arrayElement = { element: [], index: stack.length };
              stack.push(arrayElement.element);
              metaStack.push(arrayElement);
              break;
            case "{":
              objElement = { element: {}, index: stack.length };
              stack.push(objElement.element);
              metaStack.push(objElement);
              break;
            default:
              throw new Error("unexpectedly reached end of input: " + collationIndex2);
          }
        }
      };
    }
  });

  // node_modules/argsarray/index.js
  var require_argsarray = __commonJS({
    "node_modules/argsarray/index.js"(exports, module) {
      "use strict";
      module.exports = argsArray;
      function argsArray(fun) {
        return function() {
          var len = arguments.length;
          if (len) {
            var args = [];
            var i = -1;
            while (++i < len) {
              args[i] = arguments[i];
            }
            return fun.call(this, args);
          } else {
            return fun.call(this, []);
          }
        };
      }
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits2(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits2(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter() {
        EventEmitter.init.call(this);
      }
      module.exports = EventEmitter;
      module.exports.once = once2;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._eventsCount = 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once3(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys2 = Object.keys(events);
          var key;
          for (i = 0; i < keys2.length; ++i) {
            key = keys2[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount2.call(emitter, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount2;
      function listenerCount2(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once2(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a2, b) {
    return a2 != a2 ? b == b : a2 !== b || (a2 && typeof a2 === "object" || typeof a2 === "function");
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
      return root;
    }
    return node.ownerDocument;
  }
  function append_stylesheet(node, style) {
    append(node.head || node, style);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function prevent_default(fn) {
    return function(event) {
      event.preventDefault();
      return fn.call(this, event);
    };
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.wholeText !== data)
      text2.data = data;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function set_style(node, key, value, important) {
    if (value === null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
      const option = select.options[i];
      if (option.__value === value) {
        option.selected = true;
        return;
      }
    }
    select.selectedIndex = -1;
  }
  function select_value(select) {
    const selected_option = select.querySelector(":checked") || select.options[0];
    return selected_option && selected_option.__value;
  }
  function toggle_class(element2, name, toggle) {
    element2.classList[toggle ? "add" : "remove"](name);
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    const saved_component = current_component;
    do {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : window;
  function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
  }
  function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
      lookup.delete(block.key);
    });
  }
  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block3, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
      old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = /* @__PURE__ */ new Map();
    const deltas = /* @__PURE__ */ new Map();
    i = n;
    while (i--) {
      const child_ctx = get_context(ctx, list, i);
      const key = get_key(child_ctx);
      let block = lookup.get(key);
      if (!block) {
        block = create_each_block3(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }
      new_lookup.set(key, new_blocks[i] = block);
      if (key in old_indexes)
        deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = /* @__PURE__ */ new Set();
    const did_move = /* @__PURE__ */ new Set();
    function insert2(block) {
      transition_in(block, 1);
      block.m(node, next);
      lookup.set(block.key, block);
      next = block.first;
      n--;
    }
    while (o && n) {
      const new_block = new_blocks[n - 1];
      const old_block = old_blocks[o - 1];
      const new_key = new_block.key;
      const old_key = old_block.key;
      if (new_block === old_block) {
        next = new_block.first;
        o--;
        n--;
      } else if (!new_lookup.has(old_key)) {
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert2(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert2(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }
    while (o--) {
      const old_block = old_blocks[o];
      if (!new_lookup.has(old_block.key))
        destroy(old_block, lookup);
    }
    while (n)
      insert2(new_blocks[n - 1]);
    return new_blocks;
  }
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
          on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance9, create_fragment9, not_equal, props, append_styles2, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance9 ? instance9(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment9 ? create_fragment9($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr2, _oldValue, newValue) {
        this[attr2] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }
  var SvelteComponent = class {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };

  // src/js/svelte/comp.svelte
  var import_deepmerge2 = __toESM(require_cjs(), 1);

  // src/js/svelte/fields/components/checkbox.svelte
  function add_css(target) {
    append_styles(target, "svelte-11uojqh", "label.svelte-11uojqh{cursor:pointer}");
  }
  function create_if_block(ctx) {
    let span;
    let t;
    return {
      c() {
        span = element("span");
        t = text(ctx[1]);
        attr(span, "class", "field__title");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        append(span, t);
      },
      p(ctx2, dirty) {
        if (dirty & 2)
          set_data(t, ctx2[1]);
      },
      d(detaching) {
        if (detaching)
          detach(span);
      }
    };
  }
  function create_fragment(ctx) {
    let div;
    let label;
    let input;
    let t;
    let mounted;
    let dispose;
    let if_block = ctx[1] && create_if_block(ctx);
    return {
      c() {
        div = element("div");
        label = element("label");
        input = element("input");
        t = space();
        if (if_block)
          if_block.c();
        attr(input, "class", "field__value");
        attr(input, "type", "checkbox");
        attr(label, "class", "svelte-11uojqh");
        attr(div, "class", "field field--checkbox");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, label);
        append(label, input);
        input.checked = ctx[0];
        append(label, t);
        if (if_block)
          if_block.m(label, null);
        if (!mounted) {
          dispose = [
            listen(input, "change", ctx[3]),
            listen(input, "change", ctx[4])
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 1) {
          input.checked = ctx2[0];
        }
        if (ctx2[1]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block(ctx2);
            if_block.c();
            if_block.m(label, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        if (if_block)
          if_block.d();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { title } = $$props;
    let { value } = $$props;
    let { change = () => {
    } } = $$props;
    function input_change_handler() {
      value = this.checked;
      $$invalidate(0, value);
    }
    const change_handler = (e) => change(e.target.checked);
    $$self.$$set = ($$props2) => {
      if ("title" in $$props2)
        $$invalidate(1, title = $$props2.title);
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
      if ("change" in $$props2)
        $$invalidate(2, change = $$props2.change);
    };
    return [value, title, change, input_change_handler, change_handler];
  }
  var Checkbox = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, { title: 1, value: 0, change: 2 }, add_css);
    }
  };
  var checkbox_default = Checkbox;

  // src/js/svelte/fields/components/number.svelte
  function create_else_block(ctx) {
    let input;
    let input_style_value;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "field__value");
        attr(input, "type", "number");
        attr(input, "min", ctx[4]);
        attr(input, "max", ctx[5]);
        attr(input, "step", ctx[6]);
        attr(input, "style", input_style_value = ctx[2] ? `width: ${ctx[2] + 2}ch;` : false);
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(input, ctx[0]);
        if (!mounted) {
          dispose = listen(input, "input", ctx[8]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 16) {
          attr(input, "min", ctx2[4]);
        }
        if (dirty & 32) {
          attr(input, "max", ctx2[5]);
        }
        if (dirty & 64) {
          attr(input, "step", ctx2[6]);
        }
        if (dirty & 4 && input_style_value !== (input_style_value = ctx2[2] ? `width: ${ctx2[2] + 2}ch;` : false)) {
          attr(input, "style", input_style_value);
        }
        if (dirty & 1 && to_number(input.value) !== ctx2[0]) {
          set_input_value(input, ctx2[0]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(input);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block2(ctx) {
    let label;
    let span;
    let t0;
    let t1;
    let input;
    let input_style_value;
    let mounted;
    let dispose;
    return {
      c() {
        label = element("label");
        span = element("span");
        t0 = text(ctx[1]);
        t1 = space();
        input = element("input");
        attr(span, "class", "field__title");
        attr(input, "class", "field__value");
        attr(input, "type", "number");
        attr(input, "min", ctx[4]);
        attr(input, "max", ctx[5]);
        attr(input, "step", ctx[6]);
        attr(input, "style", input_style_value = ctx[2] ? `width: ${ctx[2] + 2}ch;` : false);
        input.readOnly = ctx[3];
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, span);
        append(span, t0);
        append(label, t1);
        append(label, input);
        set_input_value(input, ctx[0]);
        if (!mounted) {
          dispose = listen(input, "input", ctx[7]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 2)
          set_data(t0, ctx2[1]);
        if (dirty & 16) {
          attr(input, "min", ctx2[4]);
        }
        if (dirty & 32) {
          attr(input, "max", ctx2[5]);
        }
        if (dirty & 64) {
          attr(input, "step", ctx2[6]);
        }
        if (dirty & 4 && input_style_value !== (input_style_value = ctx2[2] ? `width: ${ctx2[2] + 2}ch;` : false)) {
          attr(input, "style", input_style_value);
        }
        if (dirty & 8) {
          input.readOnly = ctx2[3];
        }
        if (dirty & 1 && to_number(input.value) !== ctx2[0]) {
          set_input_value(input, ctx2[0]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(label);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment2(ctx) {
    let div;
    function select_block_type(ctx2, dirty) {
      if (ctx2[1])
        return create_if_block2;
      return create_else_block;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        div = element("div");
        if_block.c();
        attr(div, "class", "field");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if_block.m(div, null);
      },
      p(ctx2, [dirty]) {
        if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(div, null);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        if_block.d();
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let { title } = $$props;
    let { value } = $$props;
    let { size = 20 } = $$props;
    let { readonly } = $$props;
    let { min } = $$props;
    let { max } = $$props;
    let { step } = $$props;
    function input_input_handler() {
      value = to_number(this.value);
      $$invalidate(0, value);
    }
    function input_input_handler_1() {
      value = to_number(this.value);
      $$invalidate(0, value);
    }
    $$self.$$set = ($$props2) => {
      if ("title" in $$props2)
        $$invalidate(1, title = $$props2.title);
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
      if ("size" in $$props2)
        $$invalidate(2, size = $$props2.size);
      if ("readonly" in $$props2)
        $$invalidate(3, readonly = $$props2.readonly);
      if ("min" in $$props2)
        $$invalidate(4, min = $$props2.min);
      if ("max" in $$props2)
        $$invalidate(5, max = $$props2.max);
      if ("step" in $$props2)
        $$invalidate(6, step = $$props2.step);
    };
    return [
      value,
      title,
      size,
      readonly,
      min,
      max,
      step,
      input_input_handler,
      input_input_handler_1
    ];
  }
  var Number2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, {
        title: 1,
        value: 0,
        size: 2,
        readonly: 3,
        min: 4,
        max: 5,
        step: 6
      });
    }
  };
  var number_default = Number2;

  // src/js/svelte/fields/components/text.svelte
  function create_else_block2(ctx) {
    let input;
    let input_style_value;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "field__value");
        attr(input, "type", "text");
        attr(input, "style", input_style_value = ctx[2] ? `width: ${ctx[2]}ch;` : false);
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(input, ctx[0]);
        if (!mounted) {
          dispose = listen(input, "input", ctx[4]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 4 && input_style_value !== (input_style_value = ctx2[2] ? `width: ${ctx2[2]}ch;` : false)) {
          attr(input, "style", input_style_value);
        }
        if (dirty & 1 && input.value !== ctx2[0]) {
          set_input_value(input, ctx2[0]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(input);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block3(ctx) {
    let label;
    let span;
    let t0;
    let t1;
    let input;
    let input_style_value;
    let mounted;
    let dispose;
    return {
      c() {
        label = element("label");
        span = element("span");
        t0 = text(ctx[1]);
        t1 = space();
        input = element("input");
        attr(span, "class", "field__title");
        attr(input, "class", "field__value");
        attr(input, "type", "text");
        attr(input, "style", input_style_value = ctx[2] ? `width: ${ctx[2]}ch;` : false);
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, span);
        append(span, t0);
        append(label, t1);
        append(label, input);
        set_input_value(input, ctx[0]);
        if (!mounted) {
          dispose = listen(input, "input", ctx[3]);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & 2)
          set_data(t0, ctx2[1]);
        if (dirty & 4 && input_style_value !== (input_style_value = ctx2[2] ? `width: ${ctx2[2]}ch;` : false)) {
          attr(input, "style", input_style_value);
        }
        if (dirty & 1 && input.value !== ctx2[0]) {
          set_input_value(input, ctx2[0]);
        }
      },
      d(detaching) {
        if (detaching)
          detach(label);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment3(ctx) {
    let div;
    function select_block_type(ctx2, dirty) {
      if (ctx2[1])
        return create_if_block3;
      return create_else_block2;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        div = element("div");
        if_block.c();
        attr(div, "class", "field");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if_block.m(div, null);
      },
      p(ctx2, [dirty]) {
        if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(div, null);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        if_block.d();
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let { title } = $$props;
    let { value } = $$props;
    let { size = 20 } = $$props;
    function input_input_handler() {
      value = this.value;
      $$invalidate(0, value);
    }
    function input_input_handler_1() {
      value = this.value;
      $$invalidate(0, value);
    }
    $$self.$$set = ($$props2) => {
      if ("title" in $$props2)
        $$invalidate(1, title = $$props2.title);
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
      if ("size" in $$props2)
        $$invalidate(2, size = $$props2.size);
    };
    return [value, title, size, input_input_handler, input_input_handler_1];
  }
  var Text = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, { title: 1, value: 0, size: 2 });
    }
  };
  var text_default = Text;

  // src/js/svelte/fields/components/textarea.svelte
  function create_fragment4(ctx) {
    let div;
    let label;
    let span;
    let t0;
    let t1;
    let textarea;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        label = element("label");
        span = element("span");
        t0 = text(ctx[1]);
        t1 = space();
        textarea = element("textarea");
        attr(span, "class", "field__title");
        attr(textarea, "cols", ctx[2]);
        attr(div, "class", "field");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, label);
        append(label, span);
        append(span, t0);
        append(label, t1);
        append(label, textarea);
        set_input_value(textarea, ctx[0]);
        if (!mounted) {
          dispose = listen(textarea, "input", ctx[3]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 2)
          set_data(t0, ctx2[1]);
        if (dirty & 4) {
          attr(textarea, "cols", ctx2[2]);
        }
        if (dirty & 1) {
          set_input_value(textarea, ctx2[0]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        mounted = false;
        dispose();
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
    let { value } = $$props;
    let { size = 20 } = $$props;
    function textarea_input_handler() {
      value = this.value;
      $$invalidate(0, value);
    }
    $$self.$$set = ($$props2) => {
      if ("title" in $$props2)
        $$invalidate(1, title = $$props2.title);
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
      if ("size" in $$props2)
        $$invalidate(2, size = $$props2.size);
    };
    return [value, title, size, textarea_input_handler];
  }
  var Textarea = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment4, safe_not_equal, { title: 1, value: 0, size: 2 });
    }
  };
  var textarea_default = Textarea;

  // src/js/svelte/fields/components/date.svelte
  function create_fragment5(ctx) {
    let div;
    let label;
    let span;
    let t0;
    let t1;
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        label = element("label");
        span = element("span");
        t0 = text(ctx[1]);
        t1 = space();
        input = element("input");
        attr(span, "class", "field__title");
        attr(input, "class", "field__value");
        attr(input, "type", "date");
        input.required = ctx[2];
        attr(div, "class", "field");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, label);
        append(label, span);
        append(span, t0);
        append(label, t1);
        append(label, input);
        set_input_value(input, ctx[0]);
        if (!mounted) {
          dispose = listen(input, "input", ctx[3]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 2)
          set_data(t0, ctx2[1]);
        if (dirty & 4) {
          input.required = ctx2[2];
        }
        if (dirty & 1) {
          set_input_value(input, ctx2[0]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        mounted = false;
        dispose();
      }
    };
  }
  var re = /^\s*(\d{1,2})[.,/-](\d{1,2})[.,/-](\d{2}|\d{4})\s*$/;
  function instance5($$self, $$props, $$invalidate) {
    let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
    let { required } = $$props;
    let { value } = $$props;
    const setValue = (v) => {
      const match2 = v?.match?.(re);
      if (match2) {
        let [, dd, mm, yyyy] = match2;
        if (yyyy.length == 2)
          yyyy = `20${yyyy}`;
        const valueStr = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        if (!Number.isNaN(Date.parse(valueStr))) {
          $$invalidate(0, value = valueStr);
        }
      }
    };
    function input_input_handler() {
      value = this.value;
      $$invalidate(0, value);
    }
    $$self.$$set = ($$props2) => {
      if ("title" in $$props2)
        $$invalidate(1, title = $$props2.title);
      if ("required" in $$props2)
        $$invalidate(2, required = $$props2.required);
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 1) {
        $:
          setValue(value);
      }
    };
    return [value, title, required, input_input_handler];
  }
  var Date_1 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment5, safe_not_equal, { title: 1, required: 2, value: 0 });
    }
  };
  var date_default = Date_1;

  // src/js/svelte/fields/components/select.svelte
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[0] = list[i][0];
    child_ctx[4] = list[i][1];
    return child_ctx;
  }
  function create_if_block4(ctx) {
    let option;
    let option_value_value;
    return {
      c() {
        option = element("option");
        option.__value = option_value_value = null;
        option.value = option.__value;
      },
      m(target, anchor) {
        insert(target, option, anchor);
      },
      d(detaching) {
        if (detaching)
          detach(option);
      }
    };
  }
  function create_each_block(key_1, ctx) {
    let option;
    let t_value = ctx[4] + "";
    let t;
    let option_value_value;
    return {
      key: key_1,
      first: null,
      c() {
        option = element("option");
        t = text(t_value);
        option.__value = option_value_value = ctx[0];
        option.value = option.__value;
        this.first = option;
      },
      m(target, anchor) {
        insert(target, option, anchor);
        append(option, t);
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 2 && t_value !== (t_value = ctx[4] + ""))
          set_data(t, t_value);
        if (dirty & 2 && option_value_value !== (option_value_value = ctx[0])) {
          option.__value = option_value_value;
          option.value = option.__value;
        }
      },
      d(detaching) {
        if (detaching)
          detach(option);
      }
    };
  }
  function create_fragment6(ctx) {
    let div;
    let label;
    let span;
    let t0;
    let t1;
    let select;
    let if_block_anchor;
    let each_blocks = [];
    let each_1_lookup = /* @__PURE__ */ new Map();
    let select_style_value;
    let mounted;
    let dispose;
    let if_block = ctx[2] && create_if_block4(ctx);
    let each_value = ctx[1];
    const get_key = (ctx2) => ctx2[0];
    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context(ctx, each_value, i);
      let key = get_key(child_ctx);
      each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    }
    return {
      c() {
        div = element("div");
        label = element("label");
        span = element("span");
        t0 = text(ctx[4]);
        t1 = space();
        select = element("select");
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(span, "class", "field__title");
        attr(select, "class", "field__value");
        attr(select, "style", select_style_value = ctx[3] ? `width: ${ctx[3]}ch;` : "");
        if (ctx[0] === void 0)
          add_render_callback(() => ctx[5].call(select));
        attr(div, "class", "field");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, label);
        append(label, span);
        append(span, t0);
        append(label, t1);
        append(label, select);
        if (if_block)
          if_block.m(select, null);
        append(select, if_block_anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(select, null);
        }
        select_option(select, ctx[0]);
        if (!mounted) {
          dispose = listen(select, "change", ctx[5]);
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & 16)
          set_data(t0, ctx2[4]);
        if (ctx2[2]) {
          if (if_block) {
          } else {
            if_block = create_if_block4(ctx2);
            if_block.c();
            if_block.m(select, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        if (dirty & 2) {
          each_value = ctx2[1];
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, select, destroy_block, create_each_block, null, get_each_context);
        }
        if (dirty & 8 && select_style_value !== (select_style_value = ctx2[3] ? `width: ${ctx2[3]}ch;` : "")) {
          attr(select, "style", select_style_value);
        }
        if (dirty & 3) {
          select_option(select, ctx2[0]);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        if (if_block)
          if_block.d();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
        mounted = false;
        dispose();
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
    let { options = [] } = $$props;
    let { hasEmptyOption = false } = $$props;
    let { size } = $$props;
    let { value } = $$props;
    function select_change_handler() {
      value = select_value(this);
      $$invalidate(0, value);
      $$invalidate(1, options);
    }
    $$self.$$set = ($$props2) => {
      if ("title" in $$props2)
        $$invalidate(4, title = $$props2.title);
      if ("options" in $$props2)
        $$invalidate(1, options = $$props2.options);
      if ("hasEmptyOption" in $$props2)
        $$invalidate(2, hasEmptyOption = $$props2.hasEmptyOption);
      if ("size" in $$props2)
        $$invalidate(3, size = $$props2.size);
      if ("value" in $$props2)
        $$invalidate(0, value = $$props2.value);
    };
    return [value, options, hasEmptyOption, size, title, select_change_handler];
  }
  var Select = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment6, safe_not_equal, {
        title: 4,
        options: 1,
        hasEmptyOption: 2,
        size: 3,
        value: 0
      });
    }
  };
  var select_default = Select;

  // src/js/svelte/blocks/applications.svelte
  var import_deepmerge = __toESM(require_cjs(), 1);

  // src/js/db/consts.js
  var L_9 = "9 \u043A\u043B\u0430\u0441\u0441\u043E\u0432";
  var L_11 = "11 \u043A\u043B\u0430\u0441\u0441\u043E\u0432";
  var FULL_TIME = "\u043E\u0447\u043D\u0430\u044F";
  var ABSENTIA = "\u0437\u0430\u043E\u0447\u043D\u0430\u044F";
  var FREE = "\u0431\u044E\u0434\u0436\u0435\u0442";
  var PAID = "\u0432\u043D\u0435\u0431\u044E\u0434\u0436\u0435\u0442";

  // src/js/svelte/blocks/applications.svelte
  function add_css2(target) {
    append_styles(target, "svelte-1iddvth", "article.svelte-1iddvth.svelte-1iddvth{border:1px solid black;width:fit-content;padding:0.25em;display:flex;gap:1ch}table.edu-progs.svelte-1iddvth th.svelte-1iddvth{font-size:x-small}.edu-prog-button.svelte-1iddvth.svelte-1iddvth:not(:disabled){cursor:pointer}.edu-prog-button.svelte-1iddvth.svelte-1iddvth:active:not(:disabled){transform:scale(0.9)}table.applications.svelte-1iddvth.svelte-1iddvth{border-collapse:collapse}table.applications.svelte-1iddvth th.svelte-1iddvth{font-size:x-small;padding:0 0.5ch}table.applications.svelte-1iddvth th.svelte-1iddvth:first-child{width:6ch}.cell.svelte-1iddvth.svelte-1iddvth{display:flex;place-content:center;place-items:center}table.applications.svelte-1iddvth td.svelte-1iddvth,table.applications.svelte-1iddvth th.svelte-1iddvth{border-top:1px solid darkgrey;border-bottom:1px solid darkgrey}table.svelte-1iddvth th.svelte-1iddvth{background-color:lightgrey}");
  }
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[18] = list[i];
    child_ctx[19] = list;
    child_ctx[20] = i;
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[21] = list[i];
    child_ctx[20] = i;
    return child_ctx;
  }
  function get_each_context_2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[23] = list[i];
    return child_ctx;
  }
  function create_if_block5(ctx) {
    let button;
    let t_value = ctx[23].code + "";
    let t;
    let button_disabled_value;
    let mounted;
    let dispose;
    function func(...args) {
      return ctx[5](ctx[23], ...args);
    }
    function click_handler() {
      return ctx[6](ctx[23]);
    }
    return {
      c() {
        button = element("button");
        t = text(t_value);
        attr(button, "class", "badge edu-prog-button svelte-1iddvth");
        attr(button, "type", "button");
        button.disabled = button_disabled_value = ctx[0].some(func);
      },
      m(target, anchor) {
        insert(target, button, anchor);
        append(button, t);
        if (!mounted) {
          dispose = listen(button, "click", click_handler);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & 2 && t_value !== (t_value = ctx[23].code + ""))
          set_data(t, t_value);
        if (dirty & 3 && button_disabled_value !== (button_disabled_value = ctx[0].some(func))) {
          button.disabled = button_disabled_value;
        }
      },
      d(detaching) {
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block_2(ctx) {
    let td;
    let div;
    let if_block = ctx[23] && create_if_block5(ctx);
    return {
      c() {
        td = element("td");
        div = element("div");
        if (if_block)
          if_block.c();
        attr(div, "class", "cell svelte-1iddvth");
      },
      m(target, anchor) {
        insert(target, td, anchor);
        append(td, div);
        if (if_block)
          if_block.m(div, null);
      },
      p(ctx2, dirty) {
        if (ctx2[23]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block5(ctx2);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching)
          detach(td);
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_each_block_1(ctx) {
    let tr;
    let t;
    let each_value_2 = ctx[21];
    let each_blocks = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    }
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(tr, null);
        }
        append(tr, t);
      },
      p(ctx2, dirty) {
        if (dirty & 7) {
          each_value_2 = ctx2[21];
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_2(ctx2, each_value_2, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(tr, t);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_2.length;
        }
      },
      d(detaching) {
        if (detaching)
          detach(tr);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block2(key_1, ctx) {
    let tr;
    let td0;
    let div0;
    let button;
    let t0;
    let td1;
    let div1;
    let t1_value = ctx[18].eduProg + "";
    let t1;
    let t2;
    let td2;
    let div2;
    let numeric;
    let updating_value;
    let t3;
    let td3;
    let div3;
    let checkbox0;
    let updating_value_1;
    let t4;
    let td4;
    let div4;
    let checkbox1;
    let updating_value_2;
    let t5;
    let current;
    let mounted;
    let dispose;
    function click_handler_1() {
      return ctx[7](ctx[18]);
    }
    function numeric_value_binding(value) {
      ctx[8](value, ctx[18]);
    }
    let numeric_props = { size: 5, min: 0, max: 5 };
    if (ctx[18].grade !== void 0) {
      numeric_props.value = ctx[18].grade;
    }
    numeric = new number_default({ props: numeric_props });
    binding_callbacks.push(() => bind(numeric, "value", numeric_value_binding));
    function func_1(...args) {
      return ctx[9](ctx[20], ...args);
    }
    function checkbox0_value_binding(value) {
      ctx[10](value, ctx[18]);
    }
    let checkbox0_props = { change: func_1 };
    if (ctx[18].priority !== void 0) {
      checkbox0_props.value = ctx[18].priority;
    }
    checkbox0 = new checkbox_default({ props: checkbox0_props });
    binding_callbacks.push(() => bind(checkbox0, "value", checkbox0_value_binding));
    function checkbox1_value_binding(value) {
      ctx[11](value, ctx[18]);
    }
    let checkbox1_props = {};
    if (ctx[18].disabled !== void 0) {
      checkbox1_props.value = ctx[18].disabled;
    }
    checkbox1 = new checkbox_default({ props: checkbox1_props });
    binding_callbacks.push(() => bind(checkbox1, "value", checkbox1_value_binding));
    return {
      key: key_1,
      first: null,
      c() {
        tr = element("tr");
        td0 = element("td");
        div0 = element("div");
        button = element("button");
        t0 = space();
        td1 = element("td");
        div1 = element("div");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        div2 = element("div");
        create_component(numeric.$$.fragment);
        t3 = space();
        td3 = element("td");
        div3 = element("div");
        create_component(checkbox0.$$.fragment);
        t4 = space();
        td4 = element("td");
        div4 = element("div");
        create_component(checkbox1.$$.fragment);
        t5 = space();
        attr(button, "class", "button button--remove");
        attr(button, "type", "button");
        attr(div0, "class", "cell svelte-1iddvth");
        attr(td0, "class", "svelte-1iddvth");
        attr(div1, "class", "cell svelte-1iddvth");
        attr(td1, "class", "svelte-1iddvth");
        attr(div2, "class", "cell svelte-1iddvth");
        attr(td2, "class", "svelte-1iddvth");
        attr(div3, "class", "cell svelte-1iddvth");
        attr(td3, "class", "svelte-1iddvth");
        attr(div4, "class", "cell svelte-1iddvth");
        attr(td4, "class", "svelte-1iddvth");
        this.first = tr;
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, div0);
        append(div0, button);
        append(tr, t0);
        append(tr, td1);
        append(td1, div1);
        append(div1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, div2);
        mount_component(numeric, div2, null);
        append(tr, t3);
        append(tr, td3);
        append(td3, div3);
        mount_component(checkbox0, div3, null);
        append(tr, t4);
        append(tr, td4);
        append(td4, div4);
        mount_component(checkbox1, div4, null);
        append(tr, t5);
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", click_handler_1);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if ((!current || dirty & 1) && t1_value !== (t1_value = ctx[18].eduProg + ""))
          set_data(t1, t1_value);
        const numeric_changes = {};
        if (!updating_value && dirty & 1) {
          updating_value = true;
          numeric_changes.value = ctx[18].grade;
          add_flush_callback(() => updating_value = false);
        }
        numeric.$set(numeric_changes);
        const checkbox0_changes = {};
        if (dirty & 1)
          checkbox0_changes.change = func_1;
        if (!updating_value_1 && dirty & 1) {
          updating_value_1 = true;
          checkbox0_changes.value = ctx[18].priority;
          add_flush_callback(() => updating_value_1 = false);
        }
        checkbox0.$set(checkbox0_changes);
        const checkbox1_changes = {};
        if (!updating_value_2 && dirty & 1) {
          updating_value_2 = true;
          checkbox1_changes.value = ctx[18].disabled;
          add_flush_callback(() => updating_value_2 = false);
        }
        checkbox1.$set(checkbox1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(numeric.$$.fragment, local);
        transition_in(checkbox0.$$.fragment, local);
        transition_in(checkbox1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(numeric.$$.fragment, local);
        transition_out(checkbox0.$$.fragment, local);
        transition_out(checkbox1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(tr);
        destroy_component(numeric);
        destroy_component(checkbox0);
        destroy_component(checkbox1);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment7(ctx) {
    let article;
    let section0;
    let table0;
    let thead0;
    let t3;
    let tbody0;
    let t4;
    let section1;
    let table1;
    let thead1;
    let t16;
    let tbody1;
    let each_blocks = [];
    let each1_lookup = /* @__PURE__ */ new Map();
    let current;
    let each_value_1 = ctx[1];
    let each_blocks_1 = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    let each_value = ctx[0];
    const get_key = (ctx2) => ctx2[18].eduProg;
    for (let i = 0; i < each_value.length; i += 1) {
      let child_ctx = get_each_context2(ctx, each_value, i);
      let key = get_key(child_ctx);
      each1_lookup.set(key, each_blocks[i] = create_each_block2(key, child_ctx));
    }
    return {
      c() {
        article = element("article");
        section0 = element("section");
        table0 = element("table");
        thead0 = element("thead");
        thead0.innerHTML = `<tr><th colspan="3" class="svelte-1iddvth">\u0431\u044E\u0434\u0436\u0435\u0442</th> 
          <th colspan="3" class="svelte-1iddvth">\u0432\u043D\u0435\u0431\u044E\u0434\u0436\u0435\u0442</th></tr>`;
        t3 = space();
        tbody0 = element("tbody");
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].c();
        }
        t4 = space();
        section1 = element("section");
        table1 = element("table");
        thead1 = element("thead");
        thead1.innerHTML = `<tr><th class="svelte-1iddvth"></th> 
          <th class="svelte-1iddvth">\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F<br/>\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430</th> 
          <th class="svelte-1iddvth">\u041E\u0446\u0435\u043D\u043A\u0430 \u043F\u043E<br/>\u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u043E\u043C\u0443<br/>\u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443</th> 
          <th class="svelte-1iddvth">\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442</th> 
          <th class="svelte-1iddvth">\u0421\u043F\u0440\u044F\u0442\u0430\u0442\u044C?</th></tr>`;
        t16 = space();
        tbody1 = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(table0, "class", "edu-progs svelte-1iddvth");
        attr(table1, "class", "applications svelte-1iddvth");
        set_style(section1, "order", "-1");
        attr(article, "class", "svelte-1iddvth");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, section0);
        append(section0, table0);
        append(table0, thead0);
        append(table0, t3);
        append(table0, tbody0);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].m(tbody0, null);
        }
        append(article, t4);
        append(article, section1);
        append(section1, table1);
        append(table1, thead1);
        append(table1, t16);
        append(table1, tbody1);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].m(tbody1, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (dirty & 7) {
          each_value_1 = ctx2[1];
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks_1[i]) {
              each_blocks_1[i].p(child_ctx, dirty);
            } else {
              each_blocks_1[i] = create_each_block_1(child_ctx);
              each_blocks_1[i].c();
              each_blocks_1[i].m(tbody0, null);
            }
          }
          for (; i < each_blocks_1.length; i += 1) {
            each_blocks_1[i].d(1);
          }
          each_blocks_1.length = each_value_1.length;
        }
        if (dirty & 9) {
          each_value = ctx2[0];
          group_outros();
          each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each1_lookup, tbody1, outro_and_destroy_block, create_each_block2, null, get_each_context2);
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(article);
        destroy_each(each_blocks_1, detaching);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].d();
        }
      }
    };
  }
  var finSource = null;
  var baseEduLevel = null;
  var eduForm = null;
  function instance7($$self, $$props, $$invalidate) {
    const defaultApplication = {
      eduProg: null,
      grade: null,
      prioriry: null,
      disabled: false
    };
    let { applications = [
      {
        eduProg: "\u0417\u0418\u041E",
        grade: 5,
        priority: false,
        disabled: false
      },
      {
        eduProg: "\u0421\u042D\u0417\u0418\u0421",
        grade: 5,
        priority: null,
        disabled: false
      }
    ] } = $$props;
    let { eduProgs = [] } = $$props;
    let matrix = [];
    let baseEduLevelSet;
    let eduFormSet;
    let specSet;
    let finSourceSet;
    function addApplication(application) {
      const app2 = (0, import_deepmerge.default)(defaultApplication, application);
      $$invalidate(0, applications = [app2, ...applications].sort((a2, b) => {
        if (a2.eduProg < b.eduProg)
          return -1;
        if (a2.eduProg > b.eduProg)
          return 1;
        return 0;
      }));
    }
    function removeApplication(application) {
      $$invalidate(0, applications = applications.filter((app2) => application.eduProg !== app2.eduProg));
    }
    function findEduProg(specCode, eduForm2, baseEduLevel2, finSource2) {
      return eduProgs.find((eduProg) => eduProg.specCode === specCode && eduProg.eduForm === eduForm2 && eduProg.baseEduLevel === baseEduLevel2 && eduProg.finSource === finSource2);
    }
    const func = (eduProg, app2) => app2.eduProg === eduProg.code;
    const click_handler = (eduProg) => addApplication({ eduProg: eduProg.code });
    const click_handler_1 = (application) => removeApplication(application);
    function numeric_value_binding(value, application) {
      if ($$self.$$.not_equal(application.grade, value)) {
        application.grade = value;
        $$invalidate(0, applications);
      }
    }
    const func_1 = (idx, checked) => {
      if (checked) {
        applications.forEach((app2, i) => {
          if (i !== idx)
            app2.priority = false;
        });
        $$invalidate(0, applications);
        return;
      }
      if (!applications.some((app2) => app2.priority)) {
        $$invalidate(0, applications[0].priority = true, applications);
        $$invalidate(0, applications);
      }
    };
    function checkbox0_value_binding(value, application) {
      if ($$self.$$.not_equal(application.priority, value)) {
        application.priority = value;
        $$invalidate(0, applications);
      }
    }
    function checkbox1_value_binding(value, application) {
      if ($$self.$$.not_equal(application.disabled, value)) {
        application.disabled = value;
        $$invalidate(0, applications);
      }
    }
    $$self.$$set = ($$props2) => {
      if ("applications" in $$props2)
        $$invalidate(0, applications = $$props2.applications);
      if ("eduProgs" in $$props2)
        $$invalidate(4, eduProgs = $$props2.eduProgs);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & 1) {
        $: {
          if (applications.length > 0 && !applications.some((app2) => app2.priority)) {
            $$invalidate(0, applications[0].priority = true, applications);
            $$invalidate(0, applications);
          }
        }
      }
      if ($$self.$$.dirty & 17) {
        $: {
          $$invalidate(1, matrix = Array.from(new Set(eduProgs.map((eduProg) => eduProg.specCode))).map((specCode) => {
            const row = [
              [FULL_TIME, L_11, FREE],
              [FULL_TIME, L_9, FREE],
              [ABSENTIA, L_11, FREE],
              [FULL_TIME, L_11, PAID],
              [FULL_TIME, L_9, PAID],
              [ABSENTIA, L_11, PAID]
            ].map(([eduForm2, baseEduLelel, finSource2]) => findEduProg(specCode, eduForm2, baseEduLelel, finSource2));
            return row;
          }));
          finSourceSet = new Set(eduProgs.map((eduProg) => eduProg.finSource));
          baseEduLevelSet = new Set(eduProgs.map((eduProg) => eduProg.baseEduLevel));
          eduFormSet = new Set(eduProgs.map((eduProg) => eduProg.eduForm));
          specSet = new Set(eduProgs.filter((eduProg) => eduProg.baseEduLevel === baseEduLevel && (!eduForm || eduProg.eduForm === eduForm) && (!finSource || eduProg.finSource === finSource) && !applications.some((application) => application.eduProg === eduProg.code)).map((eduProg) => eduProg.code));
        }
      }
    };
    return [
      applications,
      matrix,
      addApplication,
      removeApplication,
      eduProgs,
      func,
      click_handler,
      click_handler_1,
      numeric_value_binding,
      func_1,
      checkbox0_value_binding,
      checkbox1_value_binding
    ];
  }
  var Applications = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment7, safe_not_equal, { applications: 0, eduProgs: 4 }, add_css2);
    }
    get applications() {
      return this.$$.ctx[0];
    }
    set applications(applications) {
      this.$$set({ applications });
      flush();
    }
    get eduProgs() {
      return this.$$.ctx[4];
    }
    set eduProgs(eduProgs) {
      this.$$set({ eduProgs });
      flush();
    }
  };
  var applications_default = Applications;

  // src/js/svelte/comp.svelte
  function add_css3(target) {
    append_styles(target, "svelte-2lwjyl", "#debug.svelte-2lwjyl{display:none}#debug.svelte-2lwjyl:target{display:block;font-size:xx-small}.delete-shadow-container.svelte-2lwjyl{position:relative}.delete-shadow-container.should-delete.svelte-2lwjyl::after{content:'';display:block;position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0, 0, 0, 0.5)}");
  }
  function create_fragment8(ctx) {
    let form;
    let div7;
    let div0;
    let dateinput;
    let updating_value;
    let t0;
    let text0;
    let updating_value_1;
    let t1;
    let select0;
    let updating_value_2;
    let t2;
    let div1;
    let select1;
    let updating_value_3;
    let t3;
    let numeric0;
    let updating_value_4;
    let t4;
    let numeric1;
    let updating_value_5;
    let t5;
    let numeric2;
    let updating_value_6;
    let t6;
    let div2;
    let checkbox0;
    let updating_value_7;
    let t7;
    let checkbox1;
    let updating_value_8;
    let t8;
    let checkbox2;
    let updating_value_9;
    let t9;
    let checkbox3;
    let updating_value_10;
    let t10;
    let div3;
    let select2;
    let updating_value_11;
    let t11;
    let text1;
    let updating_value_12;
    let t12;
    let text2;
    let updating_value_13;
    let t13;
    let div4;
    let text3;
    let updating_value_14;
    let t14;
    let text4;
    let updating_value_15;
    let t15;
    let div5;
    let textarea;
    let updating_value_16;
    let t16;
    let div6;
    let applications;
    let updating_applications;
    let t17;
    let pre0;
    let t18_value = ctx[4].join(", ") + "";
    let t18;
    let t19;
    let div9;
    let button0;
    let t21;
    let button1;
    let t23;
    let div8;
    let checkbox4;
    let updating_value_17;
    let t24;
    let pre1;
    let t25_value = JSON.stringify(ctx[0], null, 4) + "";
    let t25;
    let current;
    let mounted;
    let dispose;
    function dateinput_value_binding(value) {
      ctx[7](value);
    }
    let dateinput_props = {
      title: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
      required: true
    };
    if (ctx[0].regDate !== void 0) {
      dateinput_props.value = ctx[0].regDate;
    }
    dateinput = new date_default({ props: dateinput_props });
    binding_callbacks.push(() => bind(dateinput, "value", dateinput_value_binding));
    function text0_value_binding(value) {
      ctx[8](value);
    }
    let text0_props = { title: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F \u0418\u043C\u044F \u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E", size: 50 };
    if (ctx[0].fio !== void 0) {
      text0_props.value = ctx[0].fio;
    }
    text0 = new text_default({ props: text0_props });
    binding_callbacks.push(() => bind(text0, "value", text0_value_binding));
    function select0_value_binding(value) {
      ctx[9](value);
    }
    let select0_props = {
      title: "\u041F\u043E\u043B",
      options: [["\u043C", "\u043C\u0443\u0436\u0441\u043A\u043E\u0439"], ["\u0436", "\u0436\u0435\u043D\u0441\u043A\u0438\u0439"]]
    };
    if (ctx[0].gender !== void 0) {
      select0_props.value = ctx[0].gender;
    }
    select0 = new select_default({ props: select0_props });
    binding_callbacks.push(() => bind(select0, "value", select0_value_binding));
    function select1_value_binding(value) {
      ctx[10](value);
    }
    let select1_props = {
      title: "\u0411\u0430\u0437\u043E\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435",
      hasEmptyOption: true,
      options: [["9 \u043A\u043B\u0430\u0441\u0441\u043E\u0432", "9 \u043A\u043B\u0430\u0441\u0441\u043E\u0432"], ["11 \u043A\u043B\u0430\u0441\u0441\u043E\u0432", "11 \u043A\u043B\u0430\u0441\u0441\u043E\u0432"]]
    };
    if (ctx[0].baseEduLevel !== void 0) {
      select1_props.value = ctx[0].baseEduLevel;
    }
    select1 = new select_default({ props: select1_props });
    binding_callbacks.push(() => bind(select1, "value", select1_value_binding));
    function numeric0_value_binding(value) {
      ctx[11](value);
    }
    let numeric0_props = {
      title: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u0430\u0442\u0442\u0435\u0441\u0442\u0430\u0442\u0430",
      min: 0,
      max: 5,
      step: 0.01,
      size: 10
    };
    if (ctx[0].certScore !== void 0) {
      numeric0_props.value = ctx[0].certScore;
    }
    numeric0 = new number_default({ props: numeric0_props });
    binding_callbacks.push(() => bind(numeric0, "value", numeric0_value_binding));
    function numeric1_value_binding(value) {
      ctx[12](value);
    }
    let numeric1_props = {
      title: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B",
      min: 0,
      step: 0.1,
      size: 10
    };
    if (ctx[0].extraScore !== void 0) {
      numeric1_props.value = ctx[0].extraScore;
    }
    numeric1 = new number_default({ props: numeric1_props });
    binding_callbacks.push(() => bind(numeric1, "value", numeric1_value_binding));
    function numeric2_value_binding(value) {
      ctx[13](value);
    }
    let numeric2_props = {
      title: "\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u043A\u0443\u0440\u0441\u043D\u044B\u0439 \u0431\u0430\u043B\u043B",
      size: 10,
      readonly: true
    };
    if (ctx[0].totalScore !== void 0) {
      numeric2_props.value = ctx[0].totalScore;
    }
    numeric2 = new number_default({ props: numeric2_props });
    binding_callbacks.push(() => bind(numeric2, "value", numeric2_value_binding));
    function checkbox0_value_binding(value) {
      ctx[14](value);
    }
    let checkbox0_props = { title: "\u041F\u043E\u0434\u043B\u0438\u043D\u043D\u0438\u043A \u0430\u0442\u0442\u0435\u0441\u0442\u0430\u0442\u0430" };
    if (ctx[0].hasEduCertOriginal !== void 0) {
      checkbox0_props.value = ctx[0].hasEduCertOriginal;
    }
    checkbox0 = new checkbox_default({ props: checkbox0_props });
    binding_callbacks.push(() => bind(checkbox0, "value", checkbox0_value_binding));
    function checkbox1_value_binding(value) {
      ctx[15](value);
    }
    let checkbox1_props = { title: "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0430\u044F \u0441\u043F\u0440\u0430\u0432\u043A\u0430" };
    if (ctx[0].hasMedicalCert !== void 0) {
      checkbox1_props.value = ctx[0].hasMedicalCert;
    }
    checkbox1 = new checkbox_default({ props: checkbox1_props });
    binding_callbacks.push(() => bind(checkbox1, "value", checkbox1_value_binding));
    function checkbox2_value_binding(value) {
      ctx[16](value);
    }
    let checkbox2_props = { title: "\u0424\u043B\u044E\u043E\u0440\u043E\u0433\u0440\u0430\u0444\u0438\u044F" };
    if (ctx[0].hasFluoro !== void 0) {
      checkbox2_props.value = ctx[0].hasFluoro;
    }
    checkbox2 = new checkbox_default({ props: checkbox2_props });
    binding_callbacks.push(() => bind(checkbox2, "value", checkbox2_value_binding));
    function checkbox3_value_binding(value) {
      ctx[17](value);
    }
    let checkbox3_props = { title: "\u041F\u0440\u0438\u0432\u0438\u0432\u043A\u0438" };
    if (ctx[0].hasVaccine !== void 0) {
      checkbox3_props.value = ctx[0].hasVaccine;
    }
    checkbox3 = new checkbox_default({ props: checkbox3_props });
    binding_callbacks.push(() => bind(checkbox3, "value", checkbox3_value_binding));
    function select2_value_binding(value) {
      ctx[18](value);
    }
    let select2_props = {
      title: "\u041E\u0431\u0449\u0435\u0436\u0438\u0442\u0438\u0435",
      options: [[0, "\u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F"], [1, "\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F"], [2, "\u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u043E\u0435"]]
    };
    if (ctx[0].needDorm !== void 0) {
      select2_props.value = ctx[0].needDorm;
    }
    select2 = new select_default({ props: select2_props });
    binding_callbacks.push(() => bind(select2, "value", select2_value_binding));
    function text1_value_binding(value) {
      ctx[19](value);
    }
    let text1_props = { title: "\u0410\u0434\u0440\u0435\u0441", size: 50 };
    if (ctx[0].address !== void 0) {
      text1_props.value = ctx[0].address;
    }
    text1 = new text_default({ props: text1_props });
    binding_callbacks.push(() => bind(text1, "value", text1_value_binding));
    function text2_value_binding(value) {
      ctx[20](value);
    }
    let text2_props = { title: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", size: 15 };
    if (ctx[0].tel !== void 0) {
      text2_props.value = ctx[0].tel;
    }
    text2 = new text_default({ props: text2_props });
    binding_callbacks.push(() => bind(text2, "value", text2_value_binding));
    function text3_value_binding(value) {
      ctx[21](value);
    }
    let text3_props = { title: "\u0428\u043A\u043E\u043B\u0430", size: 70 };
    if (ctx[0].school !== void 0) {
      text3_props.value = ctx[0].school;
    }
    text3 = new text_default({ props: text3_props });
    binding_callbacks.push(() => bind(text3, "value", text3_value_binding));
    function text4_value_binding(value) {
      ctx[22](value);
    }
    let text4_props = { title: "\u0413\u043E\u0434 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0448\u043A\u043E\u043B\u044B", size: 10 };
    if (ctx[0].schoolYear !== void 0) {
      text4_props.value = ctx[0].schoolYear;
    }
    text4 = new text_default({ props: text4_props });
    binding_callbacks.push(() => bind(text4, "value", text4_value_binding));
    function textarea_value_binding(value) {
      ctx[23](value);
    }
    let textarea_props = { title: "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435", size: 90 };
    if (ctx[0].memo !== void 0) {
      textarea_props.value = ctx[0].memo;
    }
    textarea = new textarea_default({ props: textarea_props });
    binding_callbacks.push(() => bind(textarea, "value", textarea_value_binding));
    function applications_applications_binding(value) {
      ctx[24](value);
    }
    let applications_props = { eduProgs: ctx[1] };
    if (ctx[0].applications !== void 0) {
      applications_props.applications = ctx[0].applications;
    }
    applications = new applications_default({ props: applications_props });
    binding_callbacks.push(() => bind(applications, "applications", applications_applications_binding));
    function checkbox4_value_binding(value) {
      ctx[26](value);
    }
    let checkbox4_props = { title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" };
    if (ctx[3] !== void 0) {
      checkbox4_props.value = ctx[3];
    }
    checkbox4 = new checkbox_default({ props: checkbox4_props });
    binding_callbacks.push(() => bind(checkbox4, "value", checkbox4_value_binding));
    return {
      c() {
        form = element("form");
        div7 = element("div");
        div0 = element("div");
        create_component(dateinput.$$.fragment);
        t0 = space();
        create_component(text0.$$.fragment);
        t1 = space();
        create_component(select0.$$.fragment);
        t2 = space();
        div1 = element("div");
        create_component(select1.$$.fragment);
        t3 = space();
        create_component(numeric0.$$.fragment);
        t4 = space();
        create_component(numeric1.$$.fragment);
        t5 = space();
        create_component(numeric2.$$.fragment);
        t6 = space();
        div2 = element("div");
        create_component(checkbox0.$$.fragment);
        t7 = space();
        create_component(checkbox1.$$.fragment);
        t8 = space();
        create_component(checkbox2.$$.fragment);
        t9 = space();
        create_component(checkbox3.$$.fragment);
        t10 = space();
        div3 = element("div");
        create_component(select2.$$.fragment);
        t11 = space();
        create_component(text1.$$.fragment);
        t12 = space();
        create_component(text2.$$.fragment);
        t13 = space();
        div4 = element("div");
        create_component(text3.$$.fragment);
        t14 = space();
        create_component(text4.$$.fragment);
        t15 = space();
        div5 = element("div");
        create_component(textarea.$$.fragment);
        t16 = space();
        div6 = element("div");
        create_component(applications.$$.fragment);
        t17 = space();
        pre0 = element("pre");
        t18 = text(t18_value);
        t19 = space();
        div9 = element("div");
        button0 = element("button");
        button0.textContent = "\u2714\uFE0F \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044C";
        t21 = space();
        button1 = element("button");
        button1.textContent = "\u274C \u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0431\u0435\u0437 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F";
        t23 = space();
        div8 = element("div");
        create_component(checkbox4.$$.fragment);
        t24 = space();
        pre1 = element("pre");
        t25 = text(t25_value);
        attr(div0, "class", "field-container");
        attr(div1, "class", "field-container");
        attr(div2, "class", "field-container");
        attr(div3, "class", "field-container");
        attr(div4, "class", "field-container");
        attr(div5, "class", "field-container");
        attr(div6, "class", "field-container");
        attr(div7, "class", "delete-shadow-container svelte-2lwjyl");
        toggle_class(div7, "should-delete", ctx[3]);
        attr(button0, "class", "button button--primary");
        attr(button0, "type", "submit");
        attr(button1, "class", "button button--secondary");
        attr(button1, "type", "button");
        attr(div8, "class", "field-container");
        set_style(div8, "margin-left", "auto");
        attr(div9, "class", "btn-panel");
        attr(pre1, "id", "debug");
        attr(pre1, "class", "svelte-2lwjyl");
      },
      m(target, anchor) {
        insert(target, form, anchor);
        append(form, div7);
        append(div7, div0);
        mount_component(dateinput, div0, null);
        append(div0, t0);
        mount_component(text0, div0, null);
        append(div0, t1);
        mount_component(select0, div0, null);
        append(div7, t2);
        append(div7, div1);
        mount_component(select1, div1, null);
        append(div1, t3);
        mount_component(numeric0, div1, null);
        append(div1, t4);
        mount_component(numeric1, div1, null);
        append(div1, t5);
        mount_component(numeric2, div1, null);
        append(div7, t6);
        append(div7, div2);
        mount_component(checkbox0, div2, null);
        append(div2, t7);
        mount_component(checkbox1, div2, null);
        append(div2, t8);
        mount_component(checkbox2, div2, null);
        append(div2, t9);
        mount_component(checkbox3, div2, null);
        append(div7, t10);
        append(div7, div3);
        mount_component(select2, div3, null);
        append(div3, t11);
        mount_component(text1, div3, null);
        append(div3, t12);
        mount_component(text2, div3, null);
        append(div7, t13);
        append(div7, div4);
        mount_component(text3, div4, null);
        append(div4, t14);
        mount_component(text4, div4, null);
        append(div7, t15);
        append(div7, div5);
        mount_component(textarea, div5, null);
        append(div7, t16);
        append(div7, div6);
        mount_component(applications, div6, null);
        append(div7, t17);
        append(div7, pre0);
        append(pre0, t18);
        append(form, t19);
        append(form, div9);
        append(div9, button0);
        append(div9, t21);
        append(div9, button1);
        append(div9, t23);
        append(div9, div8);
        mount_component(checkbox4, div8, null);
        insert(target, t24, anchor);
        insert(target, pre1, anchor);
        append(pre1, t25);
        current = true;
        if (!mounted) {
          dispose = [
            listen(button1, "click", ctx[25]),
            listen(form, "submit", prevent_default(ctx[27]))
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const dateinput_changes = {};
        if (!updating_value && dirty[0] & 1) {
          updating_value = true;
          dateinput_changes.value = ctx2[0].regDate;
          add_flush_callback(() => updating_value = false);
        }
        dateinput.$set(dateinput_changes);
        const text0_changes = {};
        if (!updating_value_1 && dirty[0] & 1) {
          updating_value_1 = true;
          text0_changes.value = ctx2[0].fio;
          add_flush_callback(() => updating_value_1 = false);
        }
        text0.$set(text0_changes);
        const select0_changes = {};
        if (!updating_value_2 && dirty[0] & 1) {
          updating_value_2 = true;
          select0_changes.value = ctx2[0].gender;
          add_flush_callback(() => updating_value_2 = false);
        }
        select0.$set(select0_changes);
        const select1_changes = {};
        if (!updating_value_3 && dirty[0] & 1) {
          updating_value_3 = true;
          select1_changes.value = ctx2[0].baseEduLevel;
          add_flush_callback(() => updating_value_3 = false);
        }
        select1.$set(select1_changes);
        const numeric0_changes = {};
        if (!updating_value_4 && dirty[0] & 1) {
          updating_value_4 = true;
          numeric0_changes.value = ctx2[0].certScore;
          add_flush_callback(() => updating_value_4 = false);
        }
        numeric0.$set(numeric0_changes);
        const numeric1_changes = {};
        if (!updating_value_5 && dirty[0] & 1) {
          updating_value_5 = true;
          numeric1_changes.value = ctx2[0].extraScore;
          add_flush_callback(() => updating_value_5 = false);
        }
        numeric1.$set(numeric1_changes);
        const numeric2_changes = {};
        if (!updating_value_6 && dirty[0] & 1) {
          updating_value_6 = true;
          numeric2_changes.value = ctx2[0].totalScore;
          add_flush_callback(() => updating_value_6 = false);
        }
        numeric2.$set(numeric2_changes);
        const checkbox0_changes = {};
        if (!updating_value_7 && dirty[0] & 1) {
          updating_value_7 = true;
          checkbox0_changes.value = ctx2[0].hasEduCertOriginal;
          add_flush_callback(() => updating_value_7 = false);
        }
        checkbox0.$set(checkbox0_changes);
        const checkbox1_changes = {};
        if (!updating_value_8 && dirty[0] & 1) {
          updating_value_8 = true;
          checkbox1_changes.value = ctx2[0].hasMedicalCert;
          add_flush_callback(() => updating_value_8 = false);
        }
        checkbox1.$set(checkbox1_changes);
        const checkbox2_changes = {};
        if (!updating_value_9 && dirty[0] & 1) {
          updating_value_9 = true;
          checkbox2_changes.value = ctx2[0].hasFluoro;
          add_flush_callback(() => updating_value_9 = false);
        }
        checkbox2.$set(checkbox2_changes);
        const checkbox3_changes = {};
        if (!updating_value_10 && dirty[0] & 1) {
          updating_value_10 = true;
          checkbox3_changes.value = ctx2[0].hasVaccine;
          add_flush_callback(() => updating_value_10 = false);
        }
        checkbox3.$set(checkbox3_changes);
        const select2_changes = {};
        if (!updating_value_11 && dirty[0] & 1) {
          updating_value_11 = true;
          select2_changes.value = ctx2[0].needDorm;
          add_flush_callback(() => updating_value_11 = false);
        }
        select2.$set(select2_changes);
        const text1_changes = {};
        if (!updating_value_12 && dirty[0] & 1) {
          updating_value_12 = true;
          text1_changes.value = ctx2[0].address;
          add_flush_callback(() => updating_value_12 = false);
        }
        text1.$set(text1_changes);
        const text2_changes = {};
        if (!updating_value_13 && dirty[0] & 1) {
          updating_value_13 = true;
          text2_changes.value = ctx2[0].tel;
          add_flush_callback(() => updating_value_13 = false);
        }
        text2.$set(text2_changes);
        const text3_changes = {};
        if (!updating_value_14 && dirty[0] & 1) {
          updating_value_14 = true;
          text3_changes.value = ctx2[0].school;
          add_flush_callback(() => updating_value_14 = false);
        }
        text3.$set(text3_changes);
        const text4_changes = {};
        if (!updating_value_15 && dirty[0] & 1) {
          updating_value_15 = true;
          text4_changes.value = ctx2[0].schoolYear;
          add_flush_callback(() => updating_value_15 = false);
        }
        text4.$set(text4_changes);
        const textarea_changes = {};
        if (!updating_value_16 && dirty[0] & 1) {
          updating_value_16 = true;
          textarea_changes.value = ctx2[0].memo;
          add_flush_callback(() => updating_value_16 = false);
        }
        textarea.$set(textarea_changes);
        const applications_changes = {};
        if (dirty[0] & 2)
          applications_changes.eduProgs = ctx2[1];
        if (!updating_applications && dirty[0] & 1) {
          updating_applications = true;
          applications_changes.applications = ctx2[0].applications;
          add_flush_callback(() => updating_applications = false);
        }
        applications.$set(applications_changes);
        if ((!current || dirty[0] & 16) && t18_value !== (t18_value = ctx2[4].join(", ") + ""))
          set_data(t18, t18_value);
        if (dirty[0] & 8) {
          toggle_class(div7, "should-delete", ctx2[3]);
        }
        const checkbox4_changes = {};
        if (!updating_value_17 && dirty[0] & 8) {
          updating_value_17 = true;
          checkbox4_changes.value = ctx2[3];
          add_flush_callback(() => updating_value_17 = false);
        }
        checkbox4.$set(checkbox4_changes);
        if ((!current || dirty[0] & 1) && t25_value !== (t25_value = JSON.stringify(ctx2[0], null, 4) + ""))
          set_data(t25, t25_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(dateinput.$$.fragment, local);
        transition_in(text0.$$.fragment, local);
        transition_in(select0.$$.fragment, local);
        transition_in(select1.$$.fragment, local);
        transition_in(numeric0.$$.fragment, local);
        transition_in(numeric1.$$.fragment, local);
        transition_in(numeric2.$$.fragment, local);
        transition_in(checkbox0.$$.fragment, local);
        transition_in(checkbox1.$$.fragment, local);
        transition_in(checkbox2.$$.fragment, local);
        transition_in(checkbox3.$$.fragment, local);
        transition_in(select2.$$.fragment, local);
        transition_in(text1.$$.fragment, local);
        transition_in(text2.$$.fragment, local);
        transition_in(text3.$$.fragment, local);
        transition_in(text4.$$.fragment, local);
        transition_in(textarea.$$.fragment, local);
        transition_in(applications.$$.fragment, local);
        transition_in(checkbox4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(dateinput.$$.fragment, local);
        transition_out(text0.$$.fragment, local);
        transition_out(select0.$$.fragment, local);
        transition_out(select1.$$.fragment, local);
        transition_out(numeric0.$$.fragment, local);
        transition_out(numeric1.$$.fragment, local);
        transition_out(numeric2.$$.fragment, local);
        transition_out(checkbox0.$$.fragment, local);
        transition_out(checkbox1.$$.fragment, local);
        transition_out(checkbox2.$$.fragment, local);
        transition_out(checkbox3.$$.fragment, local);
        transition_out(select2.$$.fragment, local);
        transition_out(text1.$$.fragment, local);
        transition_out(text2.$$.fragment, local);
        transition_out(text3.$$.fragment, local);
        transition_out(text4.$$.fragment, local);
        transition_out(textarea.$$.fragment, local);
        transition_out(applications.$$.fragment, local);
        transition_out(checkbox4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(form);
        destroy_component(dateinput);
        destroy_component(text0);
        destroy_component(select0);
        destroy_component(select1);
        destroy_component(numeric0);
        destroy_component(numeric1);
        destroy_component(numeric2);
        destroy_component(checkbox0);
        destroy_component(checkbox1);
        destroy_component(checkbox2);
        destroy_component(checkbox3);
        destroy_component(select2);
        destroy_component(text1);
        destroy_component(text2);
        destroy_component(text3);
        destroy_component(text4);
        destroy_component(textarea);
        destroy_component(applications);
        destroy_component(checkbox4);
        if (detaching)
          detach(t24);
        if (detaching)
          detach(pre1);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function parseNumber(n) {
    if (Number.isFinite(n))
      return n;
    let r;
    try {
      r = parseFloat(n.toString().replace(",", "."));
    } catch (err) {
      return n;
    }
    if (Number.isFinite(r))
      return r;
    return n;
  }
  function instance8($$self, $$props, $$invalidate) {
    let shouldDelete = false;
    let certScore;
    let extraScore;
    let totalScore;
    let tags;
    let { eduProgs = [] } = $$props;
    let { close = () => {
    } } = $$props;
    let { data = {
      type: "abit",
      regDate: "2.3.21",
      fio: "\u041D\u0438\u044F\u0437\u043E\u0432\u0430 \u041C\u0430\u0440\u0438\u043D\u0430 \u0420\u043E\u043C\u0430\u043D\u043E\u0432\u043D\u0430",
      gender: "\u0436",
      baseEduLevel: null,
      certScore: "4,81",
      extraScore: 0.1,
      hasEduCertOriginal: true,
      hasMedicalCert: true,
      hasFluoro: true,
      hasVaccine: true,
      address: "\u041F\u041A \u0433. \u0411\u043E\u043B\u044C\u0448\u043E\u0439-\u041A\u0430\u043C\u0435\u043D\u044C",
      tel: "+79841528598",
      needDorm: "1",
      schoolYear: "2021",
      school: "\u041C\u0411\u041E\u0423 \u0421\u041E\u0428 \u2116 44 \u0433. \u0411-\u041A\u0430\u043C\u0435\u043D\u044C",
      memo: "",
      applications: [
        {
          eduProg: "\u0411\u0423",
          grade: "4",
          priority: true,
          disabled: false
        },
        {
          eduProg: "\u0411\u0423\u0437\u043A",
          grade: "4",
          priority: true,
          disabled: false
        }
      ],
      apps: { baseEduLevel: null },
      birthDate: null,
      isFullAge: false,
      passport: {
        serialNumber: null,
        issuedBy: null,
        issuedAt: null,
        addressReg: null,
        addressActual: null
      },
      counterpart: {
        fio: null,
        tel: null,
        passport: {
          serialNumber: null,
          issuedBy: null,
          issuedAt: null,
          addressReg: null,
          addressActual: null
        }
      }
    } } = $$props;
    const defaultData = {
      type: "abit",
      regDate: null,
      fio: null,
      gender: null,
      baseEduLevel: null,
      certScore: null,
      extraScore: null,
      hasEduCertOriginal: null,
      hasMedicalCert: null,
      hasFluoro: null,
      hasVaccine: null,
      address: null,
      tel: null,
      needDorm: null,
      schoolYear: null,
      school: null,
      memo: null,
      applications: [],
      birthDate: null,
      isFullAge: null,
      passport: {
        serialNumber: null,
        issuedBy: null,
        issuedAt: null,
        addressReg: null,
        addressActual: null
      },
      counterpart: {
        fio: null,
        tel: null,
        passport: {
          serialNumber: null,
          issuedBy: null,
          issuedAt: null,
          addressReg: null,
          addressActual: null
        }
      }
    };
    const setDataValue = (v) => {
      return (0, import_deepmerge2.default)(defaultData, v);
    };
    const setScoreValues = (certScore2, extraScore2) => {
      $$invalidate(0, data.certScore = parseNumber(certScore2), data);
      $$invalidate(0, data.extraScore = parseNumber(extraScore2), data);
    };
    function dateinput_value_binding(value) {
      if ($$self.$$.not_equal(data.regDate, value)) {
        data.regDate = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function text0_value_binding(value) {
      if ($$self.$$.not_equal(data.fio, value)) {
        data.fio = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function select0_value_binding(value) {
      if ($$self.$$.not_equal(data.gender, value)) {
        data.gender = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function select1_value_binding(value) {
      if ($$self.$$.not_equal(data.baseEduLevel, value)) {
        data.baseEduLevel = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function numeric0_value_binding(value) {
      if ($$self.$$.not_equal(data.certScore, value)) {
        data.certScore = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function numeric1_value_binding(value) {
      if ($$self.$$.not_equal(data.extraScore, value)) {
        data.extraScore = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function numeric2_value_binding(value) {
      if ($$self.$$.not_equal(data.totalScore, value)) {
        data.totalScore = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function checkbox0_value_binding(value) {
      if ($$self.$$.not_equal(data.hasEduCertOriginal, value)) {
        data.hasEduCertOriginal = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function checkbox1_value_binding(value) {
      if ($$self.$$.not_equal(data.hasMedicalCert, value)) {
        data.hasMedicalCert = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function checkbox2_value_binding(value) {
      if ($$self.$$.not_equal(data.hasFluoro, value)) {
        data.hasFluoro = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function checkbox3_value_binding(value) {
      if ($$self.$$.not_equal(data.hasVaccine, value)) {
        data.hasVaccine = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function select2_value_binding(value) {
      if ($$self.$$.not_equal(data.needDorm, value)) {
        data.needDorm = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function text1_value_binding(value) {
      if ($$self.$$.not_equal(data.address, value)) {
        data.address = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function text2_value_binding(value) {
      if ($$self.$$.not_equal(data.tel, value)) {
        data.tel = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function text3_value_binding(value) {
      if ($$self.$$.not_equal(data.school, value)) {
        data.school = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function text4_value_binding(value) {
      if ($$self.$$.not_equal(data.schoolYear, value)) {
        data.schoolYear = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function textarea_value_binding(value) {
      if ($$self.$$.not_equal(data.memo, value)) {
        data.memo = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    function applications_applications_binding(value) {
      if ($$self.$$.not_equal(data.applications, value)) {
        data.applications = value;
        $$invalidate(0, data), $$invalidate(5, certScore), $$invalidate(6, extraScore);
      }
    }
    const click_handler = () => {
      close({ ok: false });
    };
    function checkbox4_value_binding(value) {
      shouldDelete = value;
      $$invalidate(3, shouldDelete);
    }
    const submit_handler = () => close({
      ok: true,
      cmd: shouldDelete ? "delete" : "save"
    });
    $$self.$$set = ($$props2) => {
      if ("eduProgs" in $$props2)
        $$invalidate(1, eduProgs = $$props2.eduProgs);
      if ("close" in $$props2)
        $$invalidate(2, close = $$props2.close);
      if ("data" in $$props2)
        $$invalidate(0, data = $$props2.data);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty[0] & 1) {
        $: {
          $$invalidate(0, data = setDataValue(data));
        }
      }
      if ($$self.$$.dirty[0] & 97) {
        $: {
          $$invalidate(5, certScore = parseNumber(data.certScore));
          $$invalidate(6, extraScore = parseNumber(data.extraScore));
          $$invalidate(0, data.totalScore = !Number.isFinite(certScore) && !Number.isFinite(extraScore) ? null : parseFloat(((Number.isFinite(certScore) ? certScore : 0) + (Number.isFinite(extraScore) ? extraScore : 0)).toFixed(6)), data);
        }
      }
      if ($$self.$$.dirty[0] & 1) {
        $: {
          $$invalidate(4, tags = Array.from(data?.memo?.matchAll(/#([a-zA-Z0-9_a-яА-ЯёЁ]+)/g) || [], (tag) => tag[1]));
        }
      }
      if ($$self.$$.dirty[0] & 1) {
        $: {
          setScoreValues(data.certScore, data.extraScore);
        }
      }
    };
    return [
      data,
      eduProgs,
      close,
      shouldDelete,
      tags,
      certScore,
      extraScore,
      dateinput_value_binding,
      text0_value_binding,
      select0_value_binding,
      select1_value_binding,
      numeric0_value_binding,
      numeric1_value_binding,
      numeric2_value_binding,
      checkbox0_value_binding,
      checkbox1_value_binding,
      checkbox2_value_binding,
      checkbox3_value_binding,
      select2_value_binding,
      text1_value_binding,
      text2_value_binding,
      text3_value_binding,
      text4_value_binding,
      textarea_value_binding,
      applications_applications_binding,
      click_handler,
      checkbox4_value_binding,
      submit_handler
    ];
  }
  var Comp = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance8, create_fragment8, safe_not_equal, { eduProgs: 1, close: 2, data: 0 }, add_css3, [-1, -1]);
    }
    get eduProgs() {
      return this.$$.ctx[1];
    }
    set eduProgs(eduProgs) {
      this.$$set({ eduProgs });
      flush();
    }
    get close() {
      return this.$$.ctx[2];
    }
    set close(close) {
      this.$$set({ close });
      flush();
    }
    get data() {
      return this.$$.ctx[0];
    }
    set data(data) {
      this.$$set({ data });
      flush();
    }
  };
  var comp_default = Comp;

  // node_modules/pouchdb/lib/index-browser.es.js
  var import_immediate = __toESM(require_lib());

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid2) {
    return typeof uuid2 === "string" && regex_default.test(uuid2);
  }
  var validate_default = validate;

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  var i;
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid2 = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate_default(uuid2)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid2;
  }
  var stringify_default = stringify;

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default = v4;

  // node_modules/pouchdb/lib/index-browser.es.js
  var import_spark_md5 = __toESM(require_spark_md5());
  var import_vuvuzela = __toESM(require_vuvuzela());
  var import_argsarray = __toESM(require_argsarray());
  var import_inherits = __toESM(require_inherits_browser());
  var import_events = __toESM(require_events());
  function mangle(key) {
    return "$" + key;
  }
  function unmangle(key) {
    return key.substring(1);
  }
  function Map$1() {
    this._store = {};
  }
  Map$1.prototype.get = function(key) {
    var mangled = mangle(key);
    return this._store[mangled];
  };
  Map$1.prototype.set = function(key, value) {
    var mangled = mangle(key);
    this._store[mangled] = value;
    return true;
  };
  Map$1.prototype.has = function(key) {
    var mangled = mangle(key);
    return mangled in this._store;
  };
  Map$1.prototype.keys = function() {
    return Object.keys(this._store).map((k) => unmangle(k));
  };
  Map$1.prototype.delete = function(key) {
    var mangled = mangle(key);
    var res = mangled in this._store;
    delete this._store[mangled];
    return res;
  };
  Map$1.prototype.forEach = function(cb) {
    var keys2 = Object.keys(this._store);
    for (var i = 0, len = keys2.length; i < len; i++) {
      var key = keys2[i];
      var value = this._store[key];
      key = unmangle(key);
      cb(value, key);
    }
  };
  Object.defineProperty(Map$1.prototype, "size", {
    get: function() {
      return Object.keys(this._store).length;
    }
  });
  function Set$1(array) {
    this._store = new Map$1();
    if (array && Array.isArray(array)) {
      for (var i = 0, len = array.length; i < len; i++) {
        this.add(array[i]);
      }
    }
  }
  Set$1.prototype.add = function(key) {
    return this._store.set(key, true);
  };
  Set$1.prototype.has = function(key) {
    return this._store.has(key);
  };
  Set$1.prototype.forEach = function(cb) {
    this._store.forEach(function(value, key) {
      cb(key);
    });
  };
  Object.defineProperty(Set$1.prototype, "size", {
    get: function() {
      return this._store.size;
    }
  });
  function supportsMapAndSet() {
    if (typeof Symbol === "undefined" || typeof Map === "undefined" || typeof Set === "undefined") {
      return false;
    }
    var prop = Object.getOwnPropertyDescriptor(Map, Symbol.species);
    return prop && "get" in prop && Map[Symbol.species] === Map;
  }
  var ExportedSet;
  var ExportedMap;
  {
    if (supportsMapAndSet()) {
      ExportedSet = Set;
      ExportedMap = Map;
    } else {
      ExportedSet = Set$1;
      ExportedMap = Map$1;
    }
  }
  function isBinaryObject(object) {
    return typeof ArrayBuffer !== "undefined" && object instanceof ArrayBuffer || typeof Blob !== "undefined" && object instanceof Blob;
  }
  function cloneArrayBuffer(buff) {
    if (typeof buff.slice === "function") {
      return buff.slice(0);
    }
    var target = new ArrayBuffer(buff.byteLength);
    var targetArray = new Uint8Array(target);
    var sourceArray = new Uint8Array(buff);
    targetArray.set(sourceArray);
    return target;
  }
  function cloneBinaryObject(object) {
    if (object instanceof ArrayBuffer) {
      return cloneArrayBuffer(object);
    }
    var size = object.size;
    var type = object.type;
    if (typeof object.slice === "function") {
      return object.slice(0, size, type);
    }
    return object.webkitSlice(0, size, type);
  }
  var funcToString = Function.prototype.toString;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    var Ctor = proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  function clone(object) {
    var newObject;
    var i;
    var len;
    if (!object || typeof object !== "object") {
      return object;
    }
    if (Array.isArray(object)) {
      newObject = [];
      for (i = 0, len = object.length; i < len; i++) {
        newObject[i] = clone(object[i]);
      }
      return newObject;
    }
    if (object instanceof Date && isFinite(object)) {
      return object.toISOString();
    }
    if (isBinaryObject(object)) {
      return cloneBinaryObject(object);
    }
    if (!isPlainObject(object)) {
      return object;
    }
    newObject = {};
    for (i in object) {
      if (Object.prototype.hasOwnProperty.call(object, i)) {
        var value = clone(object[i]);
        if (typeof value !== "undefined") {
          newObject[i] = value;
        }
      }
    }
    return newObject;
  }
  function once(fun) {
    var called = false;
    return (0, import_argsarray.default)(function(args) {
      if (called) {
        throw new Error("once called more than once");
      } else {
        called = true;
        fun.apply(this, args);
      }
    });
  }
  function toPromise(func) {
    return (0, import_argsarray.default)(function(args) {
      args = clone(args);
      var self2 = this;
      var usedCB = typeof args[args.length - 1] === "function" ? args.pop() : false;
      var promise = new Promise(function(fulfill, reject) {
        var resp;
        try {
          var callback = once(function(err, mesg) {
            if (err) {
              reject(err);
            } else {
              fulfill(mesg);
            }
          });
          args.push(callback);
          resp = func.apply(self2, args);
          if (resp && typeof resp.then === "function") {
            fulfill(resp);
          }
        } catch (e) {
          reject(e);
        }
      });
      if (usedCB) {
        promise.then(function(result) {
          usedCB(null, result);
        }, usedCB);
      }
      return promise;
    });
  }
  function logApiCall(self2, name, args) {
    if (self2.constructor.listeners("debug").length) {
      var logArgs = ["api", self2.name, name];
      for (var i = 0; i < args.length - 1; i++) {
        logArgs.push(args[i]);
      }
      self2.constructor.emit("debug", logArgs);
      var origCallback = args[args.length - 1];
      args[args.length - 1] = function(err, res) {
        var responseArgs = ["api", self2.name, name];
        responseArgs = responseArgs.concat(err ? ["error", err] : ["success", res]);
        self2.constructor.emit("debug", responseArgs);
        origCallback(err, res);
      };
    }
  }
  function adapterFun(name, callback) {
    return toPromise((0, import_argsarray.default)(function(args) {
      if (this._closed) {
        return Promise.reject(new Error("database is closed"));
      }
      if (this._destroyed) {
        return Promise.reject(new Error("database is destroyed"));
      }
      var self2 = this;
      logApiCall(self2, name, args);
      if (!this.taskqueue.isReady) {
        return new Promise(function(fulfill, reject) {
          self2.taskqueue.addTask(function(failed) {
            if (failed) {
              reject(failed);
            } else {
              fulfill(self2[name].apply(self2, args));
            }
          });
        });
      }
      return callback.apply(this, args);
    }));
  }
  function pick(obj, arr) {
    var res = {};
    for (var i = 0, len = arr.length; i < len; i++) {
      var prop = arr[i];
      if (prop in obj) {
        res[prop] = obj[prop];
      }
    }
    return res;
  }
  var MAX_NUM_CONCURRENT_REQUESTS = 6;
  function identityFunction(x) {
    return x;
  }
  function formatResultForOpenRevsGet(result) {
    return [{
      ok: result
    }];
  }
  function bulkGet(db2, opts, callback) {
    var requests = opts.docs;
    var requestsById = new ExportedMap();
    requests.forEach(function(request) {
      if (requestsById.has(request.id)) {
        requestsById.get(request.id).push(request);
      } else {
        requestsById.set(request.id, [request]);
      }
    });
    var numDocs = requestsById.size;
    var numDone = 0;
    var perDocResults = new Array(numDocs);
    function collapseResultsAndFinish() {
      var results = [];
      perDocResults.forEach(function(res) {
        res.docs.forEach(function(info) {
          results.push({
            id: res.id,
            docs: [info]
          });
        });
      });
      callback(null, { results });
    }
    function checkDone() {
      if (++numDone === numDocs) {
        collapseResultsAndFinish();
      }
    }
    function gotResult(docIndex, id, docs) {
      perDocResults[docIndex] = { id, docs };
      checkDone();
    }
    var allRequests = [];
    requestsById.forEach(function(value, key) {
      allRequests.push(key);
    });
    var i = 0;
    function nextBatch() {
      if (i >= allRequests.length) {
        return;
      }
      var upTo = Math.min(i + MAX_NUM_CONCURRENT_REQUESTS, allRequests.length);
      var batch = allRequests.slice(i, upTo);
      processBatch(batch, i);
      i += batch.length;
    }
    function processBatch(batch, offset) {
      batch.forEach(function(docId, j) {
        var docIdx = offset + j;
        var docRequests = requestsById.get(docId);
        var docOpts = pick(docRequests[0], ["atts_since", "attachments"]);
        docOpts.open_revs = docRequests.map(function(request) {
          return request.rev;
        });
        docOpts.open_revs = docOpts.open_revs.filter(identityFunction);
        var formatResult = identityFunction;
        if (docOpts.open_revs.length === 0) {
          delete docOpts.open_revs;
          formatResult = formatResultForOpenRevsGet;
        }
        ["revs", "attachments", "binary", "ajax", "latest"].forEach(function(param) {
          if (param in opts) {
            docOpts[param] = opts[param];
          }
        });
        db2.get(docId, docOpts, function(err, res) {
          var result;
          if (err) {
            result = [{ error: err }];
          } else {
            result = formatResult(res);
          }
          gotResult(docIdx, docId, result);
          nextBatch();
        });
      });
    }
    nextBatch();
  }
  var hasLocal;
  try {
    localStorage.setItem("_pouch_check_localstorage", 1);
    hasLocal = !!localStorage.getItem("_pouch_check_localstorage");
  } catch (e) {
    hasLocal = false;
  }
  function hasLocalStorage() {
    return hasLocal;
  }
  (0, import_inherits.default)(Changes, import_events.default);
  function attachBrowserEvents(self2) {
    if (hasLocalStorage()) {
      addEventListener("storage", function(e) {
        self2.emit(e.key);
      });
    }
  }
  function Changes() {
    import_events.default.call(this);
    this._listeners = {};
    attachBrowserEvents(this);
  }
  Changes.prototype.addListener = function(dbName, id, db2, opts) {
    if (this._listeners[id]) {
      return;
    }
    var self2 = this;
    var inprogress = false;
    function eventFunction() {
      if (!self2._listeners[id]) {
        return;
      }
      if (inprogress) {
        inprogress = "waiting";
        return;
      }
      inprogress = true;
      var changesOpts = pick(opts, [
        "style",
        "include_docs",
        "attachments",
        "conflicts",
        "filter",
        "doc_ids",
        "view",
        "since",
        "query_params",
        "binary",
        "return_docs"
      ]);
      function onError() {
        inprogress = false;
      }
      db2.changes(changesOpts).on("change", function(c) {
        if (c.seq > opts.since && !opts.cancelled) {
          opts.since = c.seq;
          opts.onChange(c);
        }
      }).on("complete", function() {
        if (inprogress === "waiting") {
          (0, import_immediate.default)(eventFunction);
        }
        inprogress = false;
      }).on("error", onError);
    }
    this._listeners[id] = eventFunction;
    this.on(dbName, eventFunction);
  };
  Changes.prototype.removeListener = function(dbName, id) {
    if (!(id in this._listeners)) {
      return;
    }
    import_events.default.prototype.removeListener.call(this, dbName, this._listeners[id]);
    delete this._listeners[id];
  };
  Changes.prototype.notifyLocalWindows = function(dbName) {
    if (hasLocalStorage()) {
      localStorage[dbName] = localStorage[dbName] === "a" ? "b" : "a";
    }
  };
  Changes.prototype.notify = function(dbName) {
    this.emit(dbName);
    this.notifyLocalWindows(dbName);
  };
  function guardedConsole(method) {
    if (typeof console !== "undefined" && typeof console[method] === "function") {
      var args = Array.prototype.slice.call(arguments, 1);
      console[method].apply(console, args);
    }
  }
  function randomNumber(min, max) {
    var maxTimeout = 6e5;
    min = parseInt(min, 10) || 0;
    max = parseInt(max, 10);
    if (max !== max || max <= min) {
      max = (min || 1) << 1;
    } else {
      max = max + 1;
    }
    if (max > maxTimeout) {
      min = maxTimeout >> 1;
      max = maxTimeout;
    }
    var ratio = Math.random();
    var range = max - min;
    return ~~(range * ratio + min);
  }
  function defaultBackOff(min) {
    var max = 0;
    if (!min) {
      max = 2e3;
    }
    return randomNumber(min, max);
  }
  function explainError(status, str) {
    guardedConsole("info", "The above " + status + " is totally normal. " + str);
  }
  var assign;
  {
    if (typeof Object.assign === "function") {
      assign = Object.assign;
    } else {
      assign = function(target) {
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      };
    }
  }
  var $inject_Object_assign = assign;
  (0, import_inherits.default)(PouchError, Error);
  function PouchError(status, error, reason) {
    Error.call(this, reason);
    this.status = status;
    this.name = error;
    this.message = reason;
    this.error = true;
  }
  PouchError.prototype.toString = function() {
    return JSON.stringify({
      status: this.status,
      name: this.name,
      message: this.message,
      reason: this.reason
    });
  };
  var UNAUTHORIZED = new PouchError(401, "unauthorized", "Name or password is incorrect.");
  var MISSING_BULK_DOCS = new PouchError(400, "bad_request", "Missing JSON list of 'docs'");
  var MISSING_DOC = new PouchError(404, "not_found", "missing");
  var REV_CONFLICT = new PouchError(409, "conflict", "Document update conflict");
  var INVALID_ID = new PouchError(400, "bad_request", "_id field must contain a string");
  var MISSING_ID = new PouchError(412, "missing_id", "_id is required for puts");
  var RESERVED_ID = new PouchError(400, "bad_request", "Only reserved document ids may start with underscore.");
  var NOT_OPEN = new PouchError(412, "precondition_failed", "Database not open");
  var UNKNOWN_ERROR = new PouchError(500, "unknown_error", "Database encountered an unknown error");
  var BAD_ARG = new PouchError(500, "badarg", "Some query argument is invalid");
  var INVALID_REQUEST = new PouchError(400, "invalid_request", "Request was invalid");
  var QUERY_PARSE_ERROR = new PouchError(400, "query_parse_error", "Some query parameter is invalid");
  var DOC_VALIDATION = new PouchError(500, "doc_validation", "Bad special document member");
  var BAD_REQUEST = new PouchError(400, "bad_request", "Something wrong with the request");
  var NOT_AN_OBJECT = new PouchError(400, "bad_request", "Document must be a JSON object");
  var DB_MISSING = new PouchError(404, "not_found", "Database not found");
  var IDB_ERROR = new PouchError(500, "indexed_db_went_bad", "unknown");
  var WSQ_ERROR = new PouchError(500, "web_sql_went_bad", "unknown");
  var LDB_ERROR = new PouchError(500, "levelDB_went_went_bad", "unknown");
  var FORBIDDEN = new PouchError(403, "forbidden", "Forbidden by design doc validate_doc_update function");
  var INVALID_REV = new PouchError(400, "bad_request", "Invalid rev format");
  var FILE_EXISTS = new PouchError(412, "file_exists", "The database could not be created, the file already exists.");
  var MISSING_STUB = new PouchError(412, "missing_stub", "A pre-existing attachment stub wasn't found");
  var INVALID_URL = new PouchError(413, "invalid_url", "Provided URL is invalid");
  function createError(error, reason) {
    function CustomPouchError(reason2) {
      var names = Object.getOwnPropertyNames(error);
      for (var i = 0, len = names.length; i < len; i++) {
        if (typeof error[names[i]] !== "function") {
          this[names[i]] = error[names[i]];
        }
      }
      if (this.stack === void 0) {
        this.stack = new Error().stack;
      }
      if (reason2 !== void 0) {
        this.reason = reason2;
      }
    }
    CustomPouchError.prototype = PouchError.prototype;
    return new CustomPouchError(reason);
  }
  function generateErrorFromResponse(err) {
    if (typeof err !== "object") {
      var data = err;
      err = UNKNOWN_ERROR;
      err.data = data;
    }
    if ("error" in err && err.error === "conflict") {
      err.name = "conflict";
      err.status = 409;
    }
    if (!("name" in err)) {
      err.name = err.error || "unknown";
    }
    if (!("status" in err)) {
      err.status = 500;
    }
    if (!("message" in err)) {
      err.message = err.message || err.reason;
    }
    if (!("stack" in err)) {
      err.stack = new Error().stack;
    }
    return err;
  }
  function tryFilter(filter2, doc, req) {
    try {
      return !filter2(doc, req);
    } catch (err) {
      var msg = "Filter function threw: " + err.toString();
      return createError(BAD_REQUEST, msg);
    }
  }
  function filterChange(opts) {
    var req = {};
    var hasFilter = opts.filter && typeof opts.filter === "function";
    req.query = opts.query_params;
    return function filter2(change) {
      if (!change.doc) {
        change.doc = {};
      }
      var filterReturn = hasFilter && tryFilter(opts.filter, change.doc, req);
      if (typeof filterReturn === "object") {
        return filterReturn;
      }
      if (filterReturn) {
        return false;
      }
      if (!opts.include_docs) {
        delete change.doc;
      } else if (!opts.attachments) {
        for (var att in change.doc._attachments) {
          if (Object.prototype.hasOwnProperty.call(change.doc._attachments, att)) {
            change.doc._attachments[att].stub = true;
          }
        }
      }
      return true;
    };
  }
  function flatten(arrs) {
    var res = [];
    for (var i = 0, len = arrs.length; i < len; i++) {
      res = res.concat(arrs[i]);
    }
    return res;
  }
  function invalidIdError(id) {
    var err;
    if (!id) {
      err = createError(MISSING_ID);
    } else if (typeof id !== "string") {
      err = createError(INVALID_ID);
    } else if (/^_/.test(id) && !/^_(design|local)/.test(id)) {
      err = createError(RESERVED_ID);
    }
    if (err) {
      throw err;
    }
  }
  function isRemote(db2) {
    if (typeof db2._remote === "boolean") {
      return db2._remote;
    }
    if (typeof db2.type === "function") {
      guardedConsole("warn", "db.type() is deprecated and will be removed in a future version of PouchDB");
      return db2.type() === "http";
    }
    return false;
  }
  function listenerCount(ee, type) {
    return "listenerCount" in ee ? ee.listenerCount(type) : import_events.default.listenerCount(ee, type);
  }
  function parseDesignDocFunctionName(s) {
    if (!s) {
      return null;
    }
    var parts = s.split("/");
    if (parts.length === 2) {
      return parts;
    }
    if (parts.length === 1) {
      return [s, s];
    }
    return null;
  }
  function normalizeDesignDocFunctionName(s) {
    var normalized = parseDesignDocFunctionName(s);
    return normalized ? normalized.join("/") : null;
  }
  var keys = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
  ];
  var qName = "queryKey";
  var qParser = /(?:^|&)([^&=]*)=?([^&]*)/g;
  var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  function parseUri(str) {
    var m = parser.exec(str);
    var uri = {};
    var i = 14;
    while (i--) {
      var key = keys[i];
      var value = m[i] || "";
      var encoded = ["user", "password"].indexOf(key) !== -1;
      uri[key] = encoded ? decodeURIComponent(value) : value;
    }
    uri[qName] = {};
    uri[keys[12]].replace(qParser, function($0, $1, $2) {
      if ($1) {
        uri[qName][$1] = $2;
      }
    });
    return uri;
  }
  function scopeEval(source, scope) {
    var keys2 = [];
    var values = [];
    for (var key in scope) {
      if (Object.prototype.hasOwnProperty.call(scope, key)) {
        keys2.push(key);
        values.push(scope[key]);
      }
    }
    keys2.push(source);
    return Function.apply(null, keys2).apply(null, values);
  }
  function upsert(db2, docId, diffFun) {
    return db2.get(docId).catch(function(err) {
      if (err.status !== 404) {
        throw err;
      }
      return {};
    }).then(function(doc) {
      var docRev = doc._rev;
      var newDoc = diffFun(doc);
      if (!newDoc) {
        return { updated: false, rev: docRev };
      }
      newDoc._id = docId;
      newDoc._rev = docRev;
      return tryAndPut(db2, newDoc, diffFun);
    });
  }
  function tryAndPut(db2, doc, diffFun) {
    return db2.put(doc).then(function(res) {
      return {
        updated: true,
        rev: res.rev
      };
    }, function(err) {
      if (err.status !== 409) {
        throw err;
      }
      return upsert(db2, doc._id, diffFun);
    });
  }
  var thisAtob = function(str) {
    return atob(str);
  };
  var thisBtoa = function(str) {
    return btoa(str);
  };
  function createBlob(parts, properties) {
    parts = parts || [];
    properties = properties || {};
    try {
      return new Blob(parts, properties);
    } catch (e) {
      if (e.name !== "TypeError") {
        throw e;
      }
      var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
      var builder = new Builder();
      for (var i = 0; i < parts.length; i += 1) {
        builder.append(parts[i]);
      }
      return builder.getBlob(properties.type);
    }
  }
  function binaryStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }
  function binStringToBluffer(binString, type) {
    return createBlob([binaryStringToArrayBuffer(binString)], { type });
  }
  function b64ToBluffer(b64, type) {
    return binStringToBluffer(thisAtob(b64), type);
  }
  function arrayBufferToBinaryString(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
  function readAsBinaryString(blob, callback) {
    var reader = new FileReader();
    var hasBinaryString = typeof reader.readAsBinaryString === "function";
    reader.onloadend = function(e) {
      var result = e.target.result || "";
      if (hasBinaryString) {
        return callback(result);
      }
      callback(arrayBufferToBinaryString(result));
    };
    if (hasBinaryString) {
      reader.readAsBinaryString(blob);
    } else {
      reader.readAsArrayBuffer(blob);
    }
  }
  function blobToBinaryString(blobOrBuffer, callback) {
    readAsBinaryString(blobOrBuffer, function(bin) {
      callback(bin);
    });
  }
  function blobToBase64(blobOrBuffer, callback) {
    blobToBinaryString(blobOrBuffer, function(base64) {
      callback(thisBtoa(base64));
    });
  }
  function readAsArrayBuffer(blob, callback) {
    var reader = new FileReader();
    reader.onloadend = function(e) {
      var result = e.target.result || new ArrayBuffer(0);
      callback(result);
    };
    reader.readAsArrayBuffer(blob);
  }
  var setImmediateShim = self.setImmediate || self.setTimeout;
  var MD5_CHUNK_SIZE = 32768;
  function rawToBase64(raw) {
    return thisBtoa(raw);
  }
  function sliceBlob(blob, start, end) {
    if (blob.webkitSlice) {
      return blob.webkitSlice(start, end);
    }
    return blob.slice(start, end);
  }
  function appendBlob(buffer, blob, start, end, callback) {
    if (start > 0 || end < blob.size) {
      blob = sliceBlob(blob, start, end);
    }
    readAsArrayBuffer(blob, function(arrayBuffer) {
      buffer.append(arrayBuffer);
      callback();
    });
  }
  function appendString(buffer, string, start, end, callback) {
    if (start > 0 || end < string.length) {
      string = string.substring(start, end);
    }
    buffer.appendBinary(string);
    callback();
  }
  function binaryMd5(data, callback) {
    var inputIsString = typeof data === "string";
    var len = inputIsString ? data.length : data.size;
    var chunkSize = Math.min(MD5_CHUNK_SIZE, len);
    var chunks = Math.ceil(len / chunkSize);
    var currentChunk = 0;
    var buffer = inputIsString ? new import_spark_md5.default() : new import_spark_md5.default.ArrayBuffer();
    var append2 = inputIsString ? appendString : appendBlob;
    function next() {
      setImmediateShim(loadNextChunk);
    }
    function done() {
      var raw = buffer.end(true);
      var base64 = rawToBase64(raw);
      callback(base64);
      buffer.destroy();
    }
    function loadNextChunk() {
      var start = currentChunk * chunkSize;
      var end = start + chunkSize;
      currentChunk++;
      if (currentChunk < chunks) {
        append2(buffer, data, start, end, next);
      } else {
        append2(buffer, data, start, end, done);
      }
    }
    loadNextChunk();
  }
  function stringMd5(string) {
    return import_spark_md5.default.hash(string);
  }
  function rev$$1(doc, deterministic_revs) {
    if (!deterministic_revs) {
      return v4_default().replace(/-/g, "").toLowerCase();
    }
    var mutateableDoc = $inject_Object_assign({}, doc);
    delete mutateableDoc._rev_tree;
    return stringMd5(JSON.stringify(mutateableDoc));
  }
  var uuid = v4_default;
  function winningRev(metadata) {
    var winningId;
    var winningPos;
    var winningDeleted;
    var toVisit = metadata.rev_tree.slice();
    var node;
    while (node = toVisit.pop()) {
      var tree = node.ids;
      var branches = tree[2];
      var pos = node.pos;
      if (branches.length) {
        for (var i = 0, len = branches.length; i < len; i++) {
          toVisit.push({ pos: pos + 1, ids: branches[i] });
        }
        continue;
      }
      var deleted = !!tree[1].deleted;
      var id = tree[0];
      if (!winningId || (winningDeleted !== deleted ? winningDeleted : winningPos !== pos ? winningPos < pos : winningId < id)) {
        winningId = id;
        winningPos = pos;
        winningDeleted = deleted;
      }
    }
    return winningPos + "-" + winningId;
  }
  function traverseRevTree(revs, callback) {
    var toVisit = revs.slice();
    var node;
    while (node = toVisit.pop()) {
      var pos = node.pos;
      var tree = node.ids;
      var branches = tree[2];
      var newCtx = callback(branches.length === 0, pos, tree[0], node.ctx, tree[1]);
      for (var i = 0, len = branches.length; i < len; i++) {
        toVisit.push({ pos: pos + 1, ids: branches[i], ctx: newCtx });
      }
    }
  }
  function sortByPos(a2, b) {
    return a2.pos - b.pos;
  }
  function collectLeaves(revs) {
    var leaves = [];
    traverseRevTree(revs, function(isLeaf, pos, id, acc, opts) {
      if (isLeaf) {
        leaves.push({ rev: pos + "-" + id, pos, opts });
      }
    });
    leaves.sort(sortByPos).reverse();
    for (var i = 0, len = leaves.length; i < len; i++) {
      delete leaves[i].pos;
    }
    return leaves;
  }
  function collectConflicts(metadata) {
    var win = winningRev(metadata);
    var leaves = collectLeaves(metadata.rev_tree);
    var conflicts = [];
    for (var i = 0, len = leaves.length; i < len; i++) {
      var leaf = leaves[i];
      if (leaf.rev !== win && !leaf.opts.deleted) {
        conflicts.push(leaf.rev);
      }
    }
    return conflicts;
  }
  function compactTree(metadata) {
    var revs = [];
    traverseRevTree(metadata.rev_tree, function(isLeaf, pos, revHash, ctx, opts) {
      if (opts.status === "available" && !isLeaf) {
        revs.push(pos + "-" + revHash);
        opts.status = "missing";
      }
    });
    return revs;
  }
  function rootToLeaf(revs) {
    var paths = [];
    var toVisit = revs.slice();
    var node;
    while (node = toVisit.pop()) {
      var pos = node.pos;
      var tree = node.ids;
      var id = tree[0];
      var opts = tree[1];
      var branches = tree[2];
      var isLeaf = branches.length === 0;
      var history = node.history ? node.history.slice() : [];
      history.push({ id, opts });
      if (isLeaf) {
        paths.push({ pos: pos + 1 - history.length, ids: history });
      }
      for (var i = 0, len = branches.length; i < len; i++) {
        toVisit.push({ pos: pos + 1, ids: branches[i], history });
      }
    }
    return paths.reverse();
  }
  function sortByPos$1(a2, b) {
    return a2.pos - b.pos;
  }
  function binarySearch(arr, item, comparator) {
    var low = 0;
    var high = arr.length;
    var mid;
    while (low < high) {
      mid = low + high >>> 1;
      if (comparator(arr[mid], item) < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
  function insertSorted(arr, item, comparator) {
    var idx = binarySearch(arr, item, comparator);
    arr.splice(idx, 0, item);
  }
  function pathToTree(path, numStemmed) {
    var root;
    var leaf;
    for (var i = numStemmed, len = path.length; i < len; i++) {
      var node = path[i];
      var currentLeaf = [node.id, node.opts, []];
      if (leaf) {
        leaf[2].push(currentLeaf);
        leaf = currentLeaf;
      } else {
        root = leaf = currentLeaf;
      }
    }
    return root;
  }
  function compareTree(a2, b) {
    return a2[0] < b[0] ? -1 : 1;
  }
  function mergeTree(in_tree1, in_tree2) {
    var queue2 = [{ tree1: in_tree1, tree2: in_tree2 }];
    var conflicts = false;
    while (queue2.length > 0) {
      var item = queue2.pop();
      var tree1 = item.tree1;
      var tree2 = item.tree2;
      if (tree1[1].status || tree2[1].status) {
        tree1[1].status = tree1[1].status === "available" || tree2[1].status === "available" ? "available" : "missing";
      }
      for (var i = 0; i < tree2[2].length; i++) {
        if (!tree1[2][0]) {
          conflicts = "new_leaf";
          tree1[2][0] = tree2[2][i];
          continue;
        }
        var merged = false;
        for (var j = 0; j < tree1[2].length; j++) {
          if (tree1[2][j][0] === tree2[2][i][0]) {
            queue2.push({ tree1: tree1[2][j], tree2: tree2[2][i] });
            merged = true;
          }
        }
        if (!merged) {
          conflicts = "new_branch";
          insertSorted(tree1[2], tree2[2][i], compareTree);
        }
      }
    }
    return { conflicts, tree: in_tree1 };
  }
  function doMerge(tree, path, dontExpand) {
    var restree = [];
    var conflicts = false;
    var merged = false;
    var res;
    if (!tree.length) {
      return { tree: [path], conflicts: "new_leaf" };
    }
    for (var i = 0, len = tree.length; i < len; i++) {
      var branch = tree[i];
      if (branch.pos === path.pos && branch.ids[0] === path.ids[0]) {
        res = mergeTree(branch.ids, path.ids);
        restree.push({ pos: branch.pos, ids: res.tree });
        conflicts = conflicts || res.conflicts;
        merged = true;
      } else if (dontExpand !== true) {
        var t1 = branch.pos < path.pos ? branch : path;
        var t2 = branch.pos < path.pos ? path : branch;
        var diff = t2.pos - t1.pos;
        var candidateParents = [];
        var trees = [];
        trees.push({ ids: t1.ids, diff, parent: null, parentIdx: null });
        while (trees.length > 0) {
          var item = trees.pop();
          if (item.diff === 0) {
            if (item.ids[0] === t2.ids[0]) {
              candidateParents.push(item);
            }
            continue;
          }
          var elements = item.ids[2];
          for (var j = 0, elementsLen = elements.length; j < elementsLen; j++) {
            trees.push({
              ids: elements[j],
              diff: item.diff - 1,
              parent: item.ids,
              parentIdx: j
            });
          }
        }
        var el = candidateParents[0];
        if (!el) {
          restree.push(branch);
        } else {
          res = mergeTree(el.ids, t2.ids);
          el.parent[2][el.parentIdx] = res.tree;
          restree.push({ pos: t1.pos, ids: t1.ids });
          conflicts = conflicts || res.conflicts;
          merged = true;
        }
      } else {
        restree.push(branch);
      }
    }
    if (!merged) {
      restree.push(path);
    }
    restree.sort(sortByPos$1);
    return {
      tree: restree,
      conflicts: conflicts || "internal_node"
    };
  }
  function stem(tree, depth) {
    var paths = rootToLeaf(tree);
    var stemmedRevs;
    var result;
    for (var i = 0, len = paths.length; i < len; i++) {
      var path = paths[i];
      var stemmed = path.ids;
      var node;
      if (stemmed.length > depth) {
        if (!stemmedRevs) {
          stemmedRevs = {};
        }
        var numStemmed = stemmed.length - depth;
        node = {
          pos: path.pos + numStemmed,
          ids: pathToTree(stemmed, numStemmed)
        };
        for (var s = 0; s < numStemmed; s++) {
          var rev = path.pos + s + "-" + stemmed[s].id;
          stemmedRevs[rev] = true;
        }
      } else {
        node = {
          pos: path.pos,
          ids: pathToTree(stemmed, 0)
        };
      }
      if (result) {
        result = doMerge(result, node, true).tree;
      } else {
        result = [node];
      }
    }
    if (stemmedRevs) {
      traverseRevTree(result, function(isLeaf, pos, revHash) {
        delete stemmedRevs[pos + "-" + revHash];
      });
    }
    return {
      tree: result,
      revs: stemmedRevs ? Object.keys(stemmedRevs) : []
    };
  }
  function merge(tree, path, depth) {
    var newTree = doMerge(tree, path);
    var stemmed = stem(newTree.tree, depth);
    return {
      tree: stemmed.tree,
      stemmedRevs: stemmed.revs,
      conflicts: newTree.conflicts
    };
  }
  function revExists(revs, rev) {
    var toVisit = revs.slice();
    var splitRev = rev.split("-");
    var targetPos = parseInt(splitRev[0], 10);
    var targetId = splitRev[1];
    var node;
    while (node = toVisit.pop()) {
      if (node.pos === targetPos && node.ids[0] === targetId) {
        return true;
      }
      var branches = node.ids[2];
      for (var i = 0, len = branches.length; i < len; i++) {
        toVisit.push({ pos: node.pos + 1, ids: branches[i] });
      }
    }
    return false;
  }
  function getTrees(node) {
    return node.ids;
  }
  function isDeleted(metadata, rev) {
    if (!rev) {
      rev = winningRev(metadata);
    }
    var id = rev.substring(rev.indexOf("-") + 1);
    var toVisit = metadata.rev_tree.map(getTrees);
    var tree;
    while (tree = toVisit.pop()) {
      if (tree[0] === id) {
        return !!tree[1].deleted;
      }
      toVisit = toVisit.concat(tree[2]);
    }
  }
  function isLocalId(id) {
    return /^_local/.test(id);
  }
  function latest(rev, metadata) {
    var toVisit = metadata.rev_tree.slice();
    var node;
    while (node = toVisit.pop()) {
      var pos = node.pos;
      var tree = node.ids;
      var id = tree[0];
      var opts = tree[1];
      var branches = tree[2];
      var isLeaf = branches.length === 0;
      var history = node.history ? node.history.slice() : [];
      history.push({ id, pos, opts });
      if (isLeaf) {
        for (var i = 0, len = history.length; i < len; i++) {
          var historyNode = history[i];
          var historyRev = historyNode.pos + "-" + historyNode.id;
          if (historyRev === rev) {
            return pos + "-" + id;
          }
        }
      }
      for (var j = 0, l = branches.length; j < l; j++) {
        toVisit.push({ pos: pos + 1, ids: branches[j], history });
      }
    }
    throw new Error("Unable to resolve latest revision for id " + metadata.id + ", rev " + rev);
  }
  (0, import_inherits.default)(Changes$1, import_events.default);
  function tryCatchInChangeListener(self2, change, pending, lastSeq) {
    try {
      self2.emit("change", change, pending, lastSeq);
    } catch (e) {
      guardedConsole("error", 'Error in .on("change", function):', e);
    }
  }
  function Changes$1(db2, opts, callback) {
    import_events.default.call(this);
    var self2 = this;
    this.db = db2;
    opts = opts ? clone(opts) : {};
    var complete = opts.complete = once(function(err, resp) {
      if (err) {
        if (listenerCount(self2, "error") > 0) {
          self2.emit("error", err);
        }
      } else {
        self2.emit("complete", resp);
      }
      self2.removeAllListeners();
      db2.removeListener("destroyed", onDestroy);
    });
    if (callback) {
      self2.on("complete", function(resp) {
        callback(null, resp);
      });
      self2.on("error", callback);
    }
    function onDestroy() {
      self2.cancel();
    }
    db2.once("destroyed", onDestroy);
    opts.onChange = function(change, pending, lastSeq) {
      if (self2.isCancelled) {
        return;
      }
      tryCatchInChangeListener(self2, change, pending, lastSeq);
    };
    var promise = new Promise(function(fulfill, reject) {
      opts.complete = function(err, res) {
        if (err) {
          reject(err);
        } else {
          fulfill(res);
        }
      };
    });
    self2.once("cancel", function() {
      db2.removeListener("destroyed", onDestroy);
      opts.complete(null, { status: "cancelled" });
    });
    this.then = promise.then.bind(promise);
    this["catch"] = promise["catch"].bind(promise);
    this.then(function(result) {
      complete(null, result);
    }, complete);
    if (!db2.taskqueue.isReady) {
      db2.taskqueue.addTask(function(failed) {
        if (failed) {
          opts.complete(failed);
        } else if (self2.isCancelled) {
          self2.emit("cancel");
        } else {
          self2.validateChanges(opts);
        }
      });
    } else {
      self2.validateChanges(opts);
    }
  }
  Changes$1.prototype.cancel = function() {
    this.isCancelled = true;
    if (this.db.taskqueue.isReady) {
      this.emit("cancel");
    }
  };
  function processChange(doc, metadata, opts) {
    var changeList = [{ rev: doc._rev }];
    if (opts.style === "all_docs") {
      changeList = collectLeaves(metadata.rev_tree).map(function(x) {
        return { rev: x.rev };
      });
    }
    var change = {
      id: metadata.id,
      changes: changeList,
      doc
    };
    if (isDeleted(metadata, doc._rev)) {
      change.deleted = true;
    }
    if (opts.conflicts) {
      change.doc._conflicts = collectConflicts(metadata);
      if (!change.doc._conflicts.length) {
        delete change.doc._conflicts;
      }
    }
    return change;
  }
  Changes$1.prototype.validateChanges = function(opts) {
    var callback = opts.complete;
    var self2 = this;
    if (PouchDB._changesFilterPlugin) {
      PouchDB._changesFilterPlugin.validate(opts, function(err) {
        if (err) {
          return callback(err);
        }
        self2.doChanges(opts);
      });
    } else {
      self2.doChanges(opts);
    }
  };
  Changes$1.prototype.doChanges = function(opts) {
    var self2 = this;
    var callback = opts.complete;
    opts = clone(opts);
    if ("live" in opts && !("continuous" in opts)) {
      opts.continuous = opts.live;
    }
    opts.processChange = processChange;
    if (opts.since === "latest") {
      opts.since = "now";
    }
    if (!opts.since) {
      opts.since = 0;
    }
    if (opts.since === "now") {
      this.db.info().then(function(info) {
        if (self2.isCancelled) {
          callback(null, { status: "cancelled" });
          return;
        }
        opts.since = info.update_seq;
        self2.doChanges(opts);
      }, callback);
      return;
    }
    if (PouchDB._changesFilterPlugin) {
      PouchDB._changesFilterPlugin.normalize(opts);
      if (PouchDB._changesFilterPlugin.shouldFilter(this, opts)) {
        return PouchDB._changesFilterPlugin.filter(this, opts);
      }
    } else {
      ["doc_ids", "filter", "selector", "view"].forEach(function(key) {
        if (key in opts) {
          guardedConsole("warn", 'The "' + key + '" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.');
        }
      });
    }
    if (!("descending" in opts)) {
      opts.descending = false;
    }
    opts.limit = opts.limit === 0 ? 1 : opts.limit;
    opts.complete = callback;
    var newPromise = this.db._changes(opts);
    if (newPromise && typeof newPromise.cancel === "function") {
      var cancel = self2.cancel;
      self2.cancel = (0, import_argsarray.default)(function(args) {
        newPromise.cancel();
        cancel.apply(this, args);
      });
    }
  };
  function compare(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
  }
  function yankError(callback, docId) {
    return function(err, results) {
      if (err || results[0] && results[0].error) {
        err = err || results[0];
        err.docId = docId;
        callback(err);
      } else {
        callback(null, results.length ? results[0] : results);
      }
    };
  }
  function cleanDocs(docs) {
    for (var i = 0; i < docs.length; i++) {
      var doc = docs[i];
      if (doc._deleted) {
        delete doc._attachments;
      } else if (doc._attachments) {
        var atts = Object.keys(doc._attachments);
        for (var j = 0; j < atts.length; j++) {
          var att = atts[j];
          doc._attachments[att] = pick(doc._attachments[att], ["data", "digest", "content_type", "length", "revpos", "stub"]);
        }
      }
    }
  }
  function compareByIdThenRev(a2, b) {
    var idCompare = compare(a2._id, b._id);
    if (idCompare !== 0) {
      return idCompare;
    }
    var aStart = a2._revisions ? a2._revisions.start : 0;
    var bStart = b._revisions ? b._revisions.start : 0;
    return compare(aStart, bStart);
  }
  function computeHeight(revs) {
    var height = {};
    var edges = [];
    traverseRevTree(revs, function(isLeaf, pos, id, prnt) {
      var rev = pos + "-" + id;
      if (isLeaf) {
        height[rev] = 0;
      }
      if (prnt !== void 0) {
        edges.push({ from: prnt, to: rev });
      }
      return rev;
    });
    edges.reverse();
    edges.forEach(function(edge) {
      if (height[edge.from] === void 0) {
        height[edge.from] = 1 + height[edge.to];
      } else {
        height[edge.from] = Math.min(height[edge.from], 1 + height[edge.to]);
      }
    });
    return height;
  }
  function allDocsKeysParse(opts) {
    var keys2 = "limit" in opts ? opts.keys.slice(opts.skip, opts.limit + opts.skip) : opts.skip > 0 ? opts.keys.slice(opts.skip) : opts.keys;
    opts.keys = keys2;
    opts.skip = 0;
    delete opts.limit;
    if (opts.descending) {
      keys2.reverse();
      opts.descending = false;
    }
  }
  function doNextCompaction(self2) {
    var task = self2._compactionQueue[0];
    var opts = task.opts;
    var callback = task.callback;
    self2.get("_local/compaction").catch(function() {
      return false;
    }).then(function(doc) {
      if (doc && doc.last_seq) {
        opts.last_seq = doc.last_seq;
      }
      self2._compact(opts, function(err, res) {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
        (0, import_immediate.default)(function() {
          self2._compactionQueue.shift();
          if (self2._compactionQueue.length) {
            doNextCompaction(self2);
          }
        });
      });
    });
  }
  function attachmentNameError(name) {
    if (name.charAt(0) === "_") {
      return name + " is not a valid attachment name, attachment names cannot start with '_'";
    }
    return false;
  }
  (0, import_inherits.default)(AbstractPouchDB, import_events.default);
  function AbstractPouchDB() {
    import_events.default.call(this);
    for (var p in AbstractPouchDB.prototype) {
      if (typeof this[p] === "function") {
        this[p] = this[p].bind(this);
      }
    }
  }
  AbstractPouchDB.prototype.post = adapterFun("post", function(doc, opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    if (typeof doc !== "object" || Array.isArray(doc)) {
      return callback(createError(NOT_AN_OBJECT));
    }
    this.bulkDocs({ docs: [doc] }, opts, yankError(callback, doc._id));
  });
  AbstractPouchDB.prototype.put = adapterFun("put", function(doc, opts, cb) {
    if (typeof opts === "function") {
      cb = opts;
      opts = {};
    }
    if (typeof doc !== "object" || Array.isArray(doc)) {
      return cb(createError(NOT_AN_OBJECT));
    }
    invalidIdError(doc._id);
    if (isLocalId(doc._id) && typeof this._putLocal === "function") {
      if (doc._deleted) {
        return this._removeLocal(doc, cb);
      } else {
        return this._putLocal(doc, cb);
      }
    }
    var self2 = this;
    if (opts.force && doc._rev) {
      transformForceOptionToNewEditsOption();
      putDoc(function(err) {
        var result = err ? null : { ok: true, id: doc._id, rev: doc._rev };
        cb(err, result);
      });
    } else {
      putDoc(cb);
    }
    function transformForceOptionToNewEditsOption() {
      var parts = doc._rev.split("-");
      var oldRevId = parts[1];
      var oldRevNum = parseInt(parts[0], 10);
      var newRevNum = oldRevNum + 1;
      var newRevId = rev$$1();
      doc._revisions = {
        start: newRevNum,
        ids: [newRevId, oldRevId]
      };
      doc._rev = newRevNum + "-" + newRevId;
      opts.new_edits = false;
    }
    function putDoc(next) {
      if (typeof self2._put === "function" && opts.new_edits !== false) {
        self2._put(doc, opts, next);
      } else {
        self2.bulkDocs({ docs: [doc] }, opts, yankError(next, doc._id));
      }
    }
  });
  AbstractPouchDB.prototype.putAttachment = adapterFun("putAttachment", function(docId, attachmentId, rev, blob, type) {
    var api = this;
    if (typeof type === "function") {
      type = blob;
      blob = rev;
      rev = null;
    }
    if (typeof type === "undefined") {
      type = blob;
      blob = rev;
      rev = null;
    }
    if (!type) {
      guardedConsole("warn", "Attachment", attachmentId, "on document", docId, "is missing content_type");
    }
    function createAttachment(doc) {
      var prevrevpos = "_rev" in doc ? parseInt(doc._rev, 10) : 0;
      doc._attachments = doc._attachments || {};
      doc._attachments[attachmentId] = {
        content_type: type,
        data: blob,
        revpos: ++prevrevpos
      };
      return api.put(doc);
    }
    return api.get(docId).then(function(doc) {
      if (doc._rev !== rev) {
        throw createError(REV_CONFLICT);
      }
      return createAttachment(doc);
    }, function(err) {
      if (err.reason === MISSING_DOC.message) {
        return createAttachment({ _id: docId });
      } else {
        throw err;
      }
    });
  });
  AbstractPouchDB.prototype.removeAttachment = adapterFun("removeAttachment", function(docId, attachmentId, rev, callback) {
    var self2 = this;
    self2.get(docId, function(err, obj) {
      if (err) {
        callback(err);
        return;
      }
      if (obj._rev !== rev) {
        callback(createError(REV_CONFLICT));
        return;
      }
      if (!obj._attachments) {
        return callback();
      }
      delete obj._attachments[attachmentId];
      if (Object.keys(obj._attachments).length === 0) {
        delete obj._attachments;
      }
      self2.put(obj, callback);
    });
  });
  AbstractPouchDB.prototype.remove = adapterFun("remove", function(docOrId, optsOrRev, opts, callback) {
    var doc;
    if (typeof optsOrRev === "string") {
      doc = {
        _id: docOrId,
        _rev: optsOrRev
      };
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
    } else {
      doc = docOrId;
      if (typeof optsOrRev === "function") {
        callback = optsOrRev;
        opts = {};
      } else {
        callback = opts;
        opts = optsOrRev;
      }
    }
    opts = opts || {};
    opts.was_delete = true;
    var newDoc = { _id: doc._id, _rev: doc._rev || opts.rev };
    newDoc._deleted = true;
    if (isLocalId(newDoc._id) && typeof this._removeLocal === "function") {
      return this._removeLocal(doc, callback);
    }
    this.bulkDocs({ docs: [newDoc] }, opts, yankError(callback, newDoc._id));
  });
  AbstractPouchDB.prototype.revsDiff = adapterFun("revsDiff", function(req, opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    var ids = Object.keys(req);
    if (!ids.length) {
      return callback(null, {});
    }
    var count = 0;
    var missing = new ExportedMap();
    function addToMissing(id, revId) {
      if (!missing.has(id)) {
        missing.set(id, { missing: [] });
      }
      missing.get(id).missing.push(revId);
    }
    function processDoc(id, rev_tree) {
      var missingForId = req[id].slice(0);
      traverseRevTree(rev_tree, function(isLeaf, pos, revHash, ctx, opts2) {
        var rev = pos + "-" + revHash;
        var idx = missingForId.indexOf(rev);
        if (idx === -1) {
          return;
        }
        missingForId.splice(idx, 1);
        if (opts2.status !== "available") {
          addToMissing(id, rev);
        }
      });
      missingForId.forEach(function(rev) {
        addToMissing(id, rev);
      });
    }
    ids.map(function(id) {
      this._getRevisionTree(id, function(err, rev_tree) {
        if (err && err.status === 404 && err.message === "missing") {
          missing.set(id, { missing: req[id] });
        } else if (err) {
          return callback(err);
        } else {
          processDoc(id, rev_tree);
        }
        if (++count === ids.length) {
          var missingObj = {};
          missing.forEach(function(value, key) {
            missingObj[key] = value;
          });
          return callback(null, missingObj);
        }
      });
    }, this);
  });
  AbstractPouchDB.prototype.bulkGet = adapterFun("bulkGet", function(opts, callback) {
    bulkGet(this, opts, callback);
  });
  AbstractPouchDB.prototype.compactDocument = adapterFun("compactDocument", function(docId, maxHeight, callback) {
    var self2 = this;
    this._getRevisionTree(docId, function(err, revTree) {
      if (err) {
        return callback(err);
      }
      var height = computeHeight(revTree);
      var candidates = [];
      var revs = [];
      Object.keys(height).forEach(function(rev) {
        if (height[rev] > maxHeight) {
          candidates.push(rev);
        }
      });
      traverseRevTree(revTree, function(isLeaf, pos, revHash, ctx, opts) {
        var rev = pos + "-" + revHash;
        if (opts.status === "available" && candidates.indexOf(rev) !== -1) {
          revs.push(rev);
        }
      });
      self2._doCompaction(docId, revs, callback);
    });
  });
  AbstractPouchDB.prototype.compact = adapterFun("compact", function(opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    var self2 = this;
    opts = opts || {};
    self2._compactionQueue = self2._compactionQueue || [];
    self2._compactionQueue.push({ opts, callback });
    if (self2._compactionQueue.length === 1) {
      doNextCompaction(self2);
    }
  });
  AbstractPouchDB.prototype._compact = function(opts, callback) {
    var self2 = this;
    var changesOpts = {
      return_docs: false,
      last_seq: opts.last_seq || 0
    };
    var promises = [];
    function onChange(row) {
      promises.push(self2.compactDocument(row.id, 0));
    }
    function onComplete(resp) {
      var lastSeq = resp.last_seq;
      Promise.all(promises).then(function() {
        return upsert(self2, "_local/compaction", function deltaFunc(doc) {
          if (!doc.last_seq || doc.last_seq < lastSeq) {
            doc.last_seq = lastSeq;
            return doc;
          }
          return false;
        });
      }).then(function() {
        callback(null, { ok: true });
      }).catch(callback);
    }
    self2.changes(changesOpts).on("change", onChange).on("complete", onComplete).on("error", callback);
  };
  AbstractPouchDB.prototype.get = adapterFun("get", function(id, opts, cb) {
    if (typeof opts === "function") {
      cb = opts;
      opts = {};
    }
    if (typeof id !== "string") {
      return cb(createError(INVALID_ID));
    }
    if (isLocalId(id) && typeof this._getLocal === "function") {
      return this._getLocal(id, cb);
    }
    var leaves = [], self2 = this;
    function finishOpenRevs() {
      var result = [];
      var count = leaves.length;
      if (!count) {
        return cb(null, result);
      }
      leaves.forEach(function(leaf) {
        self2.get(id, {
          rev: leaf,
          revs: opts.revs,
          latest: opts.latest,
          attachments: opts.attachments,
          binary: opts.binary
        }, function(err, doc) {
          if (!err) {
            var existing;
            for (var i2 = 0, l2 = result.length; i2 < l2; i2++) {
              if (result[i2].ok && result[i2].ok._rev === doc._rev) {
                existing = true;
                break;
              }
            }
            if (!existing) {
              result.push({ ok: doc });
            }
          } else {
            result.push({ missing: leaf });
          }
          count--;
          if (!count) {
            cb(null, result);
          }
        });
      });
    }
    if (opts.open_revs) {
      if (opts.open_revs === "all") {
        this._getRevisionTree(id, function(err, rev_tree) {
          if (err) {
            return cb(err);
          }
          leaves = collectLeaves(rev_tree).map(function(leaf) {
            return leaf.rev;
          });
          finishOpenRevs();
        });
      } else {
        if (Array.isArray(opts.open_revs)) {
          leaves = opts.open_revs;
          for (var i = 0; i < leaves.length; i++) {
            var l = leaves[i];
            if (!(typeof l === "string" && /^\d+-/.test(l))) {
              return cb(createError(INVALID_REV));
            }
          }
          finishOpenRevs();
        } else {
          return cb(createError(UNKNOWN_ERROR, "function_clause"));
        }
      }
      return;
    }
    return this._get(id, opts, function(err, result) {
      if (err) {
        err.docId = id;
        return cb(err);
      }
      var doc = result.doc;
      var metadata = result.metadata;
      var ctx = result.ctx;
      if (opts.conflicts) {
        var conflicts = collectConflicts(metadata);
        if (conflicts.length) {
          doc._conflicts = conflicts;
        }
      }
      if (isDeleted(metadata, doc._rev)) {
        doc._deleted = true;
      }
      if (opts.revs || opts.revs_info) {
        var splittedRev = doc._rev.split("-");
        var revNo = parseInt(splittedRev[0], 10);
        var revHash = splittedRev[1];
        var paths = rootToLeaf(metadata.rev_tree);
        var path = null;
        for (var i2 = 0; i2 < paths.length; i2++) {
          var currentPath = paths[i2];
          var hashIndex = currentPath.ids.map(function(x) {
            return x.id;
          }).indexOf(revHash);
          var hashFoundAtRevPos = hashIndex === revNo - 1;
          if (hashFoundAtRevPos || !path && hashIndex !== -1) {
            path = currentPath;
          }
        }
        if (!path) {
          err = new Error("invalid rev tree");
          err.docId = id;
          return cb(err);
        }
        var indexOfRev = path.ids.map(function(x) {
          return x.id;
        }).indexOf(doc._rev.split("-")[1]) + 1;
        var howMany = path.ids.length - indexOfRev;
        path.ids.splice(indexOfRev, howMany);
        path.ids.reverse();
        if (opts.revs) {
          doc._revisions = {
            start: path.pos + path.ids.length - 1,
            ids: path.ids.map(function(rev) {
              return rev.id;
            })
          };
        }
        if (opts.revs_info) {
          var pos = path.pos + path.ids.length;
          doc._revs_info = path.ids.map(function(rev) {
            pos--;
            return {
              rev: pos + "-" + rev.id,
              status: rev.opts.status
            };
          });
        }
      }
      if (opts.attachments && doc._attachments) {
        var attachments = doc._attachments;
        var count = Object.keys(attachments).length;
        if (count === 0) {
          return cb(null, doc);
        }
        Object.keys(attachments).forEach(function(key2) {
          this._getAttachment(doc._id, key2, attachments[key2], {
            rev: doc._rev,
            binary: opts.binary,
            ctx
          }, function(err2, data) {
            var att = doc._attachments[key2];
            att.data = data;
            delete att.stub;
            delete att.length;
            if (!--count) {
              cb(null, doc);
            }
          });
        }, self2);
      } else {
        if (doc._attachments) {
          for (var key in doc._attachments) {
            if (Object.prototype.hasOwnProperty.call(doc._attachments, key)) {
              doc._attachments[key].stub = true;
            }
          }
        }
        cb(null, doc);
      }
    });
  });
  AbstractPouchDB.prototype.getAttachment = adapterFun("getAttachment", function(docId, attachmentId, opts, callback) {
    var self2 = this;
    if (opts instanceof Function) {
      callback = opts;
      opts = {};
    }
    this._get(docId, opts, function(err, res) {
      if (err) {
        return callback(err);
      }
      if (res.doc._attachments && res.doc._attachments[attachmentId]) {
        opts.ctx = res.ctx;
        opts.binary = true;
        self2._getAttachment(docId, attachmentId, res.doc._attachments[attachmentId], opts, callback);
      } else {
        return callback(createError(MISSING_DOC));
      }
    });
  });
  AbstractPouchDB.prototype.allDocs = adapterFun("allDocs", function(opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    opts.skip = typeof opts.skip !== "undefined" ? opts.skip : 0;
    if (opts.start_key) {
      opts.startkey = opts.start_key;
    }
    if (opts.end_key) {
      opts.endkey = opts.end_key;
    }
    if ("keys" in opts) {
      if (!Array.isArray(opts.keys)) {
        return callback(new TypeError("options.keys must be an array"));
      }
      var incompatibleOpt = ["startkey", "endkey", "key"].filter(function(incompatibleOpt2) {
        return incompatibleOpt2 in opts;
      })[0];
      if (incompatibleOpt) {
        callback(createError(QUERY_PARSE_ERROR, "Query parameter `" + incompatibleOpt + "` is not compatible with multi-get"));
        return;
      }
      if (!isRemote(this)) {
        allDocsKeysParse(opts);
        if (opts.keys.length === 0) {
          return this._allDocs({ limit: 0 }, callback);
        }
      }
    }
    return this._allDocs(opts, callback);
  });
  AbstractPouchDB.prototype.changes = function(opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    opts.return_docs = "return_docs" in opts ? opts.return_docs : !opts.live;
    return new Changes$1(this, opts, callback);
  };
  AbstractPouchDB.prototype.close = adapterFun("close", function(callback) {
    this._closed = true;
    this.emit("closed");
    return this._close(callback);
  });
  AbstractPouchDB.prototype.info = adapterFun("info", function(callback) {
    var self2 = this;
    this._info(function(err, info) {
      if (err) {
        return callback(err);
      }
      info.db_name = info.db_name || self2.name;
      info.auto_compaction = !!(self2.auto_compaction && !isRemote(self2));
      info.adapter = self2.adapter;
      callback(null, info);
    });
  });
  AbstractPouchDB.prototype.id = adapterFun("id", function(callback) {
    return this._id(callback);
  });
  AbstractPouchDB.prototype.type = function() {
    return typeof this._type === "function" ? this._type() : this.adapter;
  };
  AbstractPouchDB.prototype.bulkDocs = adapterFun("bulkDocs", function(req, opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (Array.isArray(req)) {
      req = {
        docs: req
      };
    }
    if (!req || !req.docs || !Array.isArray(req.docs)) {
      return callback(createError(MISSING_BULK_DOCS));
    }
    for (var i = 0; i < req.docs.length; ++i) {
      if (typeof req.docs[i] !== "object" || Array.isArray(req.docs[i])) {
        return callback(createError(NOT_AN_OBJECT));
      }
    }
    var attachmentError;
    req.docs.forEach(function(doc) {
      if (doc._attachments) {
        Object.keys(doc._attachments).forEach(function(name) {
          attachmentError = attachmentError || attachmentNameError(name);
          if (!doc._attachments[name].content_type) {
            guardedConsole("warn", "Attachment", name, "on document", doc._id, "is missing content_type");
          }
        });
      }
    });
    if (attachmentError) {
      return callback(createError(BAD_REQUEST, attachmentError));
    }
    if (!("new_edits" in opts)) {
      if ("new_edits" in req) {
        opts.new_edits = req.new_edits;
      } else {
        opts.new_edits = true;
      }
    }
    var adapter = this;
    if (!opts.new_edits && !isRemote(adapter)) {
      req.docs.sort(compareByIdThenRev);
    }
    cleanDocs(req.docs);
    var ids = req.docs.map(function(doc) {
      return doc._id;
    });
    return this._bulkDocs(req, opts, function(err, res) {
      if (err) {
        return callback(err);
      }
      if (!opts.new_edits) {
        res = res.filter(function(x) {
          return x.error;
        });
      }
      if (!isRemote(adapter)) {
        for (var i2 = 0, l = res.length; i2 < l; i2++) {
          res[i2].id = res[i2].id || ids[i2];
        }
      }
      callback(null, res);
    });
  });
  AbstractPouchDB.prototype.registerDependentDatabase = adapterFun("registerDependentDatabase", function(dependentDb, callback) {
    var dbOptions = clone(this.__opts);
    if (this.__opts.view_adapter) {
      dbOptions.adapter = this.__opts.view_adapter;
    }
    var depDB = new this.constructor(dependentDb, dbOptions);
    function diffFun(doc) {
      doc.dependentDbs = doc.dependentDbs || {};
      if (doc.dependentDbs[dependentDb]) {
        return false;
      }
      doc.dependentDbs[dependentDb] = true;
      return doc;
    }
    upsert(this, "_local/_pouch_dependentDbs", diffFun).then(function() {
      callback(null, { db: depDB });
    }).catch(callback);
  });
  AbstractPouchDB.prototype.destroy = adapterFun("destroy", function(opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    var self2 = this;
    var usePrefix = "use_prefix" in self2 ? self2.use_prefix : true;
    function destroyDb() {
      self2._destroy(opts, function(err, resp) {
        if (err) {
          return callback(err);
        }
        self2._destroyed = true;
        self2.emit("destroyed");
        callback(null, resp || { "ok": true });
      });
    }
    if (isRemote(self2)) {
      return destroyDb();
    }
    self2.get("_local/_pouch_dependentDbs", function(err, localDoc) {
      if (err) {
        if (err.status !== 404) {
          return callback(err);
        } else {
          return destroyDb();
        }
      }
      var dependentDbs = localDoc.dependentDbs;
      var PouchDB2 = self2.constructor;
      var deletedMap = Object.keys(dependentDbs).map(function(name) {
        var trueName = usePrefix ? name.replace(new RegExp("^" + PouchDB2.prefix), "") : name;
        return new PouchDB2(trueName, self2.__opts).destroy();
      });
      Promise.all(deletedMap).then(destroyDb, callback);
    });
  });
  function TaskQueue() {
    this.isReady = false;
    this.failed = false;
    this.queue = [];
  }
  TaskQueue.prototype.execute = function() {
    var fun;
    if (this.failed) {
      while (fun = this.queue.shift()) {
        fun(this.failed);
      }
    } else {
      while (fun = this.queue.shift()) {
        fun();
      }
    }
  };
  TaskQueue.prototype.fail = function(err) {
    this.failed = err;
    this.execute();
  };
  TaskQueue.prototype.ready = function(db2) {
    this.isReady = true;
    this.db = db2;
    this.execute();
  };
  TaskQueue.prototype.addTask = function(fun) {
    this.queue.push(fun);
    if (this.failed) {
      this.execute();
    }
  };
  function parseAdapter(name, opts) {
    var match2 = name.match(/([a-z-]*):\/\/(.*)/);
    if (match2) {
      return {
        name: /https?/.test(match2[1]) ? match2[1] + "://" + match2[2] : match2[2],
        adapter: match2[1]
      };
    }
    var adapters = PouchDB.adapters;
    var preferredAdapters = PouchDB.preferredAdapters;
    var prefix = PouchDB.prefix;
    var adapterName = opts.adapter;
    if (!adapterName) {
      for (var i = 0; i < preferredAdapters.length; ++i) {
        adapterName = preferredAdapters[i];
        if (adapterName === "idb" && "websql" in adapters && hasLocalStorage() && localStorage["_pouch__websqldb_" + prefix + name]) {
          guardedConsole("log", 'PouchDB is downgrading "' + name + '" to WebSQL to avoid data loss, because it was already opened with WebSQL.');
          continue;
        }
        break;
      }
    }
    var adapter = adapters[adapterName];
    var usePrefix = adapter && "use_prefix" in adapter ? adapter.use_prefix : true;
    return {
      name: usePrefix ? prefix + name : name,
      adapter: adapterName
    };
  }
  function prepareForDestruction(self2) {
    function onDestroyed(from_constructor) {
      self2.removeListener("closed", onClosed);
      if (!from_constructor) {
        self2.constructor.emit("destroyed", self2.name);
      }
    }
    function onClosed() {
      self2.removeListener("destroyed", onDestroyed);
      self2.constructor.emit("unref", self2);
    }
    self2.once("destroyed", onDestroyed);
    self2.once("closed", onClosed);
    self2.constructor.emit("ref", self2);
  }
  (0, import_inherits.default)(PouchDB, AbstractPouchDB);
  function PouchDB(name, opts) {
    if (!(this instanceof PouchDB)) {
      return new PouchDB(name, opts);
    }
    var self2 = this;
    opts = opts || {};
    if (name && typeof name === "object") {
      opts = name;
      name = opts.name;
      delete opts.name;
    }
    if (opts.deterministic_revs === void 0) {
      opts.deterministic_revs = true;
    }
    this.__opts = opts = clone(opts);
    self2.auto_compaction = opts.auto_compaction;
    self2.prefix = PouchDB.prefix;
    if (typeof name !== "string") {
      throw new Error("Missing/invalid DB name");
    }
    var prefixedName = (opts.prefix || "") + name;
    var backend = parseAdapter(prefixedName, opts);
    opts.name = backend.name;
    opts.adapter = opts.adapter || backend.adapter;
    self2.name = name;
    self2._adapter = opts.adapter;
    PouchDB.emit("debug", ["adapter", "Picked adapter: ", opts.adapter]);
    if (!PouchDB.adapters[opts.adapter] || !PouchDB.adapters[opts.adapter].valid()) {
      throw new Error("Invalid Adapter: " + opts.adapter);
    }
    if (opts.view_adapter) {
      if (!PouchDB.adapters[opts.view_adapter] || !PouchDB.adapters[opts.view_adapter].valid()) {
        throw new Error("Invalid View Adapter: " + opts.view_adapter);
      }
    }
    AbstractPouchDB.call(self2);
    self2.taskqueue = new TaskQueue();
    self2.adapter = opts.adapter;
    PouchDB.adapters[opts.adapter].call(self2, opts, function(err) {
      if (err) {
        return self2.taskqueue.fail(err);
      }
      prepareForDestruction(self2);
      self2.emit("created", self2);
      PouchDB.emit("created", self2.name);
      self2.taskqueue.ready(self2);
    });
  }
  var a = typeof AbortController !== "undefined" ? AbortController : function() {
    return { abort: function() {
    } };
  };
  var f$1 = fetch;
  var h = Headers;
  PouchDB.adapters = {};
  PouchDB.preferredAdapters = [];
  PouchDB.prefix = "_pouch_";
  var eventEmitter = new import_events.default();
  function setUpEventEmitter(Pouch) {
    Object.keys(import_events.default.prototype).forEach(function(key) {
      if (typeof import_events.default.prototype[key] === "function") {
        Pouch[key] = eventEmitter[key].bind(eventEmitter);
      }
    });
    var destructListeners = Pouch._destructionListeners = new ExportedMap();
    Pouch.on("ref", function onConstructorRef(db2) {
      if (!destructListeners.has(db2.name)) {
        destructListeners.set(db2.name, []);
      }
      destructListeners.get(db2.name).push(db2);
    });
    Pouch.on("unref", function onConstructorUnref(db2) {
      if (!destructListeners.has(db2.name)) {
        return;
      }
      var dbList = destructListeners.get(db2.name);
      var pos = dbList.indexOf(db2);
      if (pos < 0) {
        return;
      }
      dbList.splice(pos, 1);
      if (dbList.length > 1) {
        destructListeners.set(db2.name, dbList);
      } else {
        destructListeners.delete(db2.name);
      }
    });
    Pouch.on("destroyed", function onConstructorDestroyed(name) {
      if (!destructListeners.has(name)) {
        return;
      }
      var dbList = destructListeners.get(name);
      destructListeners.delete(name);
      dbList.forEach(function(db2) {
        db2.emit("destroyed", true);
      });
    });
  }
  setUpEventEmitter(PouchDB);
  PouchDB.adapter = function(id, obj, addToPreferredAdapters) {
    if (obj.valid()) {
      PouchDB.adapters[id] = obj;
      if (addToPreferredAdapters) {
        PouchDB.preferredAdapters.push(id);
      }
    }
  };
  PouchDB.plugin = function(obj) {
    if (typeof obj === "function") {
      obj(PouchDB);
    } else if (typeof obj !== "object" || Object.keys(obj).length === 0) {
      throw new Error('Invalid plugin: got "' + obj + '", expected an object or a function');
    } else {
      Object.keys(obj).forEach(function(id) {
        PouchDB.prototype[id] = obj[id];
      });
    }
    if (this.__defaults) {
      PouchDB.__defaults = $inject_Object_assign({}, this.__defaults);
    }
    return PouchDB;
  };
  PouchDB.defaults = function(defaultOpts) {
    function PouchAlt(name, opts) {
      if (!(this instanceof PouchAlt)) {
        return new PouchAlt(name, opts);
      }
      opts = opts || {};
      if (name && typeof name === "object") {
        opts = name;
        name = opts.name;
        delete opts.name;
      }
      opts = $inject_Object_assign({}, PouchAlt.__defaults, opts);
      PouchDB.call(this, name, opts);
    }
    (0, import_inherits.default)(PouchAlt, PouchDB);
    PouchAlt.preferredAdapters = PouchDB.preferredAdapters.slice();
    Object.keys(PouchDB).forEach(function(key) {
      if (!(key in PouchAlt)) {
        PouchAlt[key] = PouchDB[key];
      }
    });
    PouchAlt.__defaults = $inject_Object_assign({}, this.__defaults, defaultOpts);
    return PouchAlt;
  };
  PouchDB.fetch = function(url, opts) {
    return f$1(url, opts);
  };
  var version = "7.3.0";
  function getFieldFromDoc(doc, parsedField) {
    var value = doc;
    for (var i = 0, len = parsedField.length; i < len; i++) {
      var key = parsedField[i];
      value = value[key];
      if (!value) {
        break;
      }
    }
    return value;
  }
  function compare$1(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
  }
  function parseField(fieldName) {
    var fields = [];
    var current = "";
    for (var i = 0, len = fieldName.length; i < len; i++) {
      var ch = fieldName[i];
      if (i > 0 && fieldName[i - 1] === "\\" && (ch === "$" || ch === ".")) {
        current = current.substring(0, current.length - 1) + ch;
      } else if (ch === ".") {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current);
    return fields;
  }
  var combinationFields = ["$or", "$nor", "$not"];
  function isCombinationalField(field) {
    return combinationFields.indexOf(field) > -1;
  }
  function getKey(obj) {
    return Object.keys(obj)[0];
  }
  function getValue(obj) {
    return obj[getKey(obj)];
  }
  function mergeAndedSelectors(selectors) {
    var res = {};
    var first = { $or: true, $nor: true };
    selectors.forEach(function(selector) {
      Object.keys(selector).forEach(function(field) {
        var matcher = selector[field];
        if (typeof matcher !== "object") {
          matcher = { $eq: matcher };
        }
        if (isCombinationalField(field)) {
          if (matcher instanceof Array) {
            if (first[field]) {
              first[field] = false;
              res[field] = matcher;
              return;
            }
            var entries = [];
            res[field].forEach(function(existing) {
              Object.keys(matcher).forEach(function(key) {
                var m = matcher[key];
                var longest = Math.max(Object.keys(existing).length, Object.keys(m).length);
                var merged = mergeAndedSelectors([existing, m]);
                if (Object.keys(merged).length <= longest) {
                  return;
                }
                entries.push(merged);
              });
            });
            res[field] = entries;
          } else {
            res[field] = mergeAndedSelectors([matcher]);
          }
        } else {
          var fieldMatchers = res[field] = res[field] || {};
          Object.keys(matcher).forEach(function(operator) {
            var value = matcher[operator];
            if (operator === "$gt" || operator === "$gte") {
              return mergeGtGte(operator, value, fieldMatchers);
            } else if (operator === "$lt" || operator === "$lte") {
              return mergeLtLte(operator, value, fieldMatchers);
            } else if (operator === "$ne") {
              return mergeNe(value, fieldMatchers);
            } else if (operator === "$eq") {
              return mergeEq(value, fieldMatchers);
            } else if (operator === "$regex") {
              return mergeRegex(value, fieldMatchers);
            }
            fieldMatchers[operator] = value;
          });
        }
      });
    });
    return res;
  }
  function mergeGtGte(operator, value, fieldMatchers) {
    if (typeof fieldMatchers.$eq !== "undefined") {
      return;
    }
    if (typeof fieldMatchers.$gte !== "undefined") {
      if (operator === "$gte") {
        if (value > fieldMatchers.$gte) {
          fieldMatchers.$gte = value;
        }
      } else {
        if (value >= fieldMatchers.$gte) {
          delete fieldMatchers.$gte;
          fieldMatchers.$gt = value;
        }
      }
    } else if (typeof fieldMatchers.$gt !== "undefined") {
      if (operator === "$gte") {
        if (value > fieldMatchers.$gt) {
          delete fieldMatchers.$gt;
          fieldMatchers.$gte = value;
        }
      } else {
        if (value > fieldMatchers.$gt) {
          fieldMatchers.$gt = value;
        }
      }
    } else {
      fieldMatchers[operator] = value;
    }
  }
  function mergeLtLte(operator, value, fieldMatchers) {
    if (typeof fieldMatchers.$eq !== "undefined") {
      return;
    }
    if (typeof fieldMatchers.$lte !== "undefined") {
      if (operator === "$lte") {
        if (value < fieldMatchers.$lte) {
          fieldMatchers.$lte = value;
        }
      } else {
        if (value <= fieldMatchers.$lte) {
          delete fieldMatchers.$lte;
          fieldMatchers.$lt = value;
        }
      }
    } else if (typeof fieldMatchers.$lt !== "undefined") {
      if (operator === "$lte") {
        if (value < fieldMatchers.$lt) {
          delete fieldMatchers.$lt;
          fieldMatchers.$lte = value;
        }
      } else {
        if (value < fieldMatchers.$lt) {
          fieldMatchers.$lt = value;
        }
      }
    } else {
      fieldMatchers[operator] = value;
    }
  }
  function mergeNe(value, fieldMatchers) {
    if ("$ne" in fieldMatchers) {
      fieldMatchers.$ne.push(value);
    } else {
      fieldMatchers.$ne = [value];
    }
  }
  function mergeEq(value, fieldMatchers) {
    delete fieldMatchers.$gt;
    delete fieldMatchers.$gte;
    delete fieldMatchers.$lt;
    delete fieldMatchers.$lte;
    delete fieldMatchers.$ne;
    fieldMatchers.$eq = value;
  }
  function mergeRegex(value, fieldMatchers) {
    if ("$regex" in fieldMatchers) {
      fieldMatchers.$regex.push(value);
    } else {
      fieldMatchers.$regex = [value];
    }
  }
  function mergeAndedSelectorsNested(obj) {
    for (var prop in obj) {
      if (Array.isArray(obj)) {
        for (var i in obj) {
          if (obj[i]["$and"]) {
            obj[i] = mergeAndedSelectors(obj[i]["$and"]);
          }
        }
      }
      var value = obj[prop];
      if (typeof value === "object") {
        mergeAndedSelectorsNested(value);
      }
    }
    return obj;
  }
  function isAndInSelector(obj, isAnd) {
    for (var prop in obj) {
      if (prop === "$and") {
        isAnd = true;
      }
      var value = obj[prop];
      if (typeof value === "object") {
        isAnd = isAndInSelector(value, isAnd);
      }
    }
    return isAnd;
  }
  function massageSelector(input) {
    var result = clone(input);
    var wasAnded = false;
    if (isAndInSelector(result, false)) {
      result = mergeAndedSelectorsNested(result);
      if ("$and" in result) {
        result = mergeAndedSelectors(result["$and"]);
      }
      wasAnded = true;
    }
    ["$or", "$nor"].forEach(function(orOrNor) {
      if (orOrNor in result) {
        result[orOrNor].forEach(function(subSelector) {
          var fields2 = Object.keys(subSelector);
          for (var i2 = 0; i2 < fields2.length; i2++) {
            var field2 = fields2[i2];
            var matcher2 = subSelector[field2];
            if (typeof matcher2 !== "object" || matcher2 === null) {
              subSelector[field2] = { $eq: matcher2 };
            }
          }
        });
      }
    });
    if ("$not" in result) {
      result["$not"] = mergeAndedSelectors([result["$not"]]);
    }
    var fields = Object.keys(result);
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var matcher = result[field];
      if (typeof matcher !== "object" || matcher === null) {
        matcher = { $eq: matcher };
      } else if (!wasAnded) {
        if ("$ne" in matcher) {
          matcher.$ne = [matcher.$ne];
        }
        if ("$regex" in matcher) {
          matcher.$regex = [matcher.$regex];
        }
      }
      result[field] = matcher;
    }
    return result;
  }
  function pad(str, padWith, upToLength) {
    var padding = "";
    var targetLength = upToLength - str.length;
    while (padding.length < targetLength) {
      padding += padWith;
    }
    return padding;
  }
  function padLeft(str, padWith, upToLength) {
    var padding = pad(str, padWith, upToLength);
    return padding + str;
  }
  var MIN_MAGNITUDE = -324;
  var MAGNITUDE_DIGITS = 3;
  var SEP = "";
  function collate(a2, b) {
    if (a2 === b) {
      return 0;
    }
    a2 = normalizeKey(a2);
    b = normalizeKey(b);
    var ai = collationIndex(a2);
    var bi = collationIndex(b);
    if (ai - bi !== 0) {
      return ai - bi;
    }
    switch (typeof a2) {
      case "number":
        return a2 - b;
      case "boolean":
        return a2 < b ? -1 : 1;
      case "string":
        return stringCollate(a2, b);
    }
    return Array.isArray(a2) ? arrayCollate(a2, b) : objectCollate(a2, b);
  }
  function normalizeKey(key) {
    switch (typeof key) {
      case "undefined":
        return null;
      case "number":
        if (key === Infinity || key === -Infinity || isNaN(key)) {
          return null;
        }
        return key;
      case "object":
        var origKey = key;
        if (Array.isArray(key)) {
          var len = key.length;
          key = new Array(len);
          for (var i = 0; i < len; i++) {
            key[i] = normalizeKey(origKey[i]);
          }
        } else if (key instanceof Date) {
          return key.toJSON();
        } else if (key !== null) {
          key = {};
          for (var k in origKey) {
            if (Object.prototype.hasOwnProperty.call(origKey, k)) {
              var val = origKey[k];
              if (typeof val !== "undefined") {
                key[k] = normalizeKey(val);
              }
            }
          }
        }
    }
    return key;
  }
  function indexify(key) {
    if (key !== null) {
      switch (typeof key) {
        case "boolean":
          return key ? 1 : 0;
        case "number":
          return numToIndexableString(key);
        case "string":
          return key.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
        case "object":
          var isArray2 = Array.isArray(key);
          var arr = isArray2 ? key : Object.keys(key);
          var i = -1;
          var len = arr.length;
          var result = "";
          if (isArray2) {
            while (++i < len) {
              result += toIndexableString(arr[i]);
            }
          } else {
            while (++i < len) {
              var objKey = arr[i];
              result += toIndexableString(objKey) + toIndexableString(key[objKey]);
            }
          }
          return result;
      }
    }
    return "";
  }
  function toIndexableString(key) {
    var zero = "\0";
    key = normalizeKey(key);
    return collationIndex(key) + SEP + indexify(key) + zero;
  }
  function parseNumber2(str, i) {
    var originalIdx = i;
    var num;
    var zero = str[i] === "1";
    if (zero) {
      num = 0;
      i++;
    } else {
      var neg = str[i] === "0";
      i++;
      var numAsString = "";
      var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
      var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
      if (neg) {
        magnitude = -magnitude;
      }
      i += MAGNITUDE_DIGITS;
      while (true) {
        var ch = str[i];
        if (ch === "\0") {
          break;
        } else {
          numAsString += ch;
        }
        i++;
      }
      numAsString = numAsString.split(".");
      if (numAsString.length === 1) {
        num = parseInt(numAsString, 10);
      } else {
        num = parseFloat(numAsString[0] + "." + numAsString[1]);
      }
      if (neg) {
        num = num - 10;
      }
      if (magnitude !== 0) {
        num = parseFloat(num + "e" + magnitude);
      }
    }
    return { num, length: i - originalIdx };
  }
  function pop(stack, metaStack) {
    var obj = stack.pop();
    if (metaStack.length) {
      var lastMetaElement = metaStack[metaStack.length - 1];
      if (obj === lastMetaElement.element) {
        metaStack.pop();
        lastMetaElement = metaStack[metaStack.length - 1];
      }
      var element2 = lastMetaElement.element;
      var lastElementIndex = lastMetaElement.index;
      if (Array.isArray(element2)) {
        element2.push(obj);
      } else if (lastElementIndex === stack.length - 2) {
        var key = stack.pop();
        element2[key] = obj;
      } else {
        stack.push(obj);
      }
    }
  }
  function parseIndexableString(str) {
    var stack = [];
    var metaStack = [];
    var i = 0;
    while (true) {
      var collationIndex2 = str[i++];
      if (collationIndex2 === "\0") {
        if (stack.length === 1) {
          return stack.pop();
        } else {
          pop(stack, metaStack);
          continue;
        }
      }
      switch (collationIndex2) {
        case "1":
          stack.push(null);
          break;
        case "2":
          stack.push(str[i] === "1");
          i++;
          break;
        case "3":
          var parsedNum = parseNumber2(str, i);
          stack.push(parsedNum.num);
          i += parsedNum.length;
          break;
        case "4":
          var parsedStr = "";
          while (true) {
            var ch = str[i];
            if (ch === "\0") {
              break;
            }
            parsedStr += ch;
            i++;
          }
          parsedStr = parsedStr.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, "");
          stack.push(parsedStr);
          break;
        case "5":
          var arrayElement = { element: [], index: stack.length };
          stack.push(arrayElement.element);
          metaStack.push(arrayElement);
          break;
        case "6":
          var objElement = { element: {}, index: stack.length };
          stack.push(objElement.element);
          metaStack.push(objElement);
          break;
        default:
          throw new Error("bad collationIndex or unexpectedly reached end of input: " + collationIndex2);
      }
    }
  }
  function arrayCollate(a2, b) {
    var len = Math.min(a2.length, b.length);
    for (var i = 0; i < len; i++) {
      var sort = collate(a2[i], b[i]);
      if (sort !== 0) {
        return sort;
      }
    }
    return a2.length === b.length ? 0 : a2.length > b.length ? 1 : -1;
  }
  function stringCollate(a2, b) {
    return a2 === b ? 0 : a2 > b ? 1 : -1;
  }
  function objectCollate(a2, b) {
    var ak = Object.keys(a2), bk = Object.keys(b);
    var len = Math.min(ak.length, bk.length);
    for (var i = 0; i < len; i++) {
      var sort = collate(ak[i], bk[i]);
      if (sort !== 0) {
        return sort;
      }
      sort = collate(a2[ak[i]], b[bk[i]]);
      if (sort !== 0) {
        return sort;
      }
    }
    return ak.length === bk.length ? 0 : ak.length > bk.length ? 1 : -1;
  }
  function collationIndex(x) {
    var id = ["boolean", "number", "string", "object"];
    var idx = id.indexOf(typeof x);
    if (~idx) {
      if (x === null) {
        return 1;
      }
      if (Array.isArray(x)) {
        return 5;
      }
      return idx < 3 ? idx + 2 : idx + 3;
    }
    if (Array.isArray(x)) {
      return 5;
    }
  }
  function numToIndexableString(num) {
    if (num === 0) {
      return "1";
    }
    var expFormat = num.toExponential().split(/e\+?/);
    var magnitude = parseInt(expFormat[1], 10);
    var neg = num < 0;
    var result = neg ? "0" : "2";
    var magForComparison = (neg ? -magnitude : magnitude) - MIN_MAGNITUDE;
    var magString = padLeft(magForComparison.toString(), "0", MAGNITUDE_DIGITS);
    result += SEP + magString;
    var factor = Math.abs(parseFloat(expFormat[0]));
    if (neg) {
      factor = 10 - factor;
    }
    var factorStr = factor.toFixed(20);
    factorStr = factorStr.replace(/\.?0+$/, "");
    result += SEP + factorStr;
    return result;
  }
  function createFieldSorter(sort) {
    function getFieldValuesAsArray(doc) {
      return sort.map(function(sorting) {
        var fieldName = getKey(sorting);
        var parsedField = parseField(fieldName);
        var docFieldValue = getFieldFromDoc(doc, parsedField);
        return docFieldValue;
      });
    }
    return function(aRow, bRow) {
      var aFieldValues = getFieldValuesAsArray(aRow.doc);
      var bFieldValues = getFieldValuesAsArray(bRow.doc);
      var collation = collate(aFieldValues, bFieldValues);
      if (collation !== 0) {
        return collation;
      }
      return compare$1(aRow.doc._id, bRow.doc._id);
    };
  }
  function filterInMemoryFields(rows, requestDef, inMemoryFields) {
    rows = rows.filter(function(row) {
      return rowFilter(row.doc, requestDef.selector, inMemoryFields);
    });
    if (requestDef.sort) {
      var fieldSorter = createFieldSorter(requestDef.sort);
      rows = rows.sort(fieldSorter);
      if (typeof requestDef.sort[0] !== "string" && getValue(requestDef.sort[0]) === "desc") {
        rows = rows.reverse();
      }
    }
    if ("limit" in requestDef || "skip" in requestDef) {
      var skip = requestDef.skip || 0;
      var limit = ("limit" in requestDef ? requestDef.limit : rows.length) + skip;
      rows = rows.slice(skip, limit);
    }
    return rows;
  }
  function rowFilter(doc, selector, inMemoryFields) {
    return inMemoryFields.every(function(field) {
      var matcher = selector[field];
      var parsedField = parseField(field);
      var docFieldValue = getFieldFromDoc(doc, parsedField);
      if (isCombinationalField(field)) {
        return matchCominationalSelector(field, matcher, doc);
      }
      return matchSelector(matcher, doc, parsedField, docFieldValue);
    });
  }
  function matchSelector(matcher, doc, parsedField, docFieldValue) {
    if (!matcher) {
      return true;
    }
    if (typeof matcher === "object") {
      return Object.keys(matcher).every(function(maybeUserOperator) {
        var userValue = matcher[maybeUserOperator];
        if (maybeUserOperator.indexOf("$") === 0) {
          return match(maybeUserOperator, doc, userValue, parsedField, docFieldValue);
        } else {
          var subParsedField = parseField(maybeUserOperator);
          if (docFieldValue === void 0 && typeof userValue !== "object" && subParsedField.length > 0) {
            return false;
          }
          var subDocFieldValue = getFieldFromDoc(docFieldValue, subParsedField);
          if (typeof userValue === "object") {
            return matchSelector(userValue, doc, parsedField, subDocFieldValue);
          }
          return match("$eq", doc, userValue, subParsedField, subDocFieldValue);
        }
      });
    }
    return matcher === docFieldValue;
  }
  function matchCominationalSelector(field, matcher, doc) {
    if (field === "$or") {
      return matcher.some(function(orMatchers) {
        return rowFilter(doc, orMatchers, Object.keys(orMatchers));
      });
    }
    if (field === "$not") {
      return !rowFilter(doc, matcher, Object.keys(matcher));
    }
    return !matcher.find(function(orMatchers) {
      return rowFilter(doc, orMatchers, Object.keys(orMatchers));
    });
  }
  function match(userOperator, doc, userValue, parsedField, docFieldValue) {
    if (!matchers[userOperator]) {
      throw new Error('unknown operator "' + userOperator + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
    }
    return matchers[userOperator](doc, userValue, parsedField, docFieldValue);
  }
  function fieldExists(docFieldValue) {
    return typeof docFieldValue !== "undefined" && docFieldValue !== null;
  }
  function fieldIsNotUndefined(docFieldValue) {
    return typeof docFieldValue !== "undefined";
  }
  function modField(docFieldValue, userValue) {
    if (typeof docFieldValue !== "number" || parseInt(docFieldValue, 10) !== docFieldValue) {
      return false;
    }
    var divisor = userValue[0];
    var mod = userValue[1];
    return docFieldValue % divisor === mod;
  }
  function arrayContainsValue(docFieldValue, userValue) {
    return userValue.some(function(val) {
      if (docFieldValue instanceof Array) {
        return docFieldValue.some(function(docFieldValueItem) {
          return collate(val, docFieldValueItem) === 0;
        });
      }
      return collate(val, docFieldValue) === 0;
    });
  }
  function arrayContainsAllValues(docFieldValue, userValue) {
    return userValue.every(function(val) {
      return docFieldValue.some(function(docFieldValueItem) {
        return collate(val, docFieldValueItem) === 0;
      });
    });
  }
  function arraySize(docFieldValue, userValue) {
    return docFieldValue.length === userValue;
  }
  function regexMatch(docFieldValue, userValue) {
    var re2 = new RegExp(userValue);
    return re2.test(docFieldValue);
  }
  function typeMatch(docFieldValue, userValue) {
    switch (userValue) {
      case "null":
        return docFieldValue === null;
      case "boolean":
        return typeof docFieldValue === "boolean";
      case "number":
        return typeof docFieldValue === "number";
      case "string":
        return typeof docFieldValue === "string";
      case "array":
        return docFieldValue instanceof Array;
      case "object":
        return {}.toString.call(docFieldValue) === "[object Object]";
    }
  }
  var matchers = {
    "$elemMatch": function(doc, userValue, parsedField, docFieldValue) {
      if (!Array.isArray(docFieldValue)) {
        return false;
      }
      if (docFieldValue.length === 0) {
        return false;
      }
      if (typeof docFieldValue[0] === "object") {
        return docFieldValue.some(function(val) {
          return rowFilter(val, userValue, Object.keys(userValue));
        });
      }
      return docFieldValue.some(function(val) {
        return matchSelector(userValue, doc, parsedField, val);
      });
    },
    "$allMatch": function(doc, userValue, parsedField, docFieldValue) {
      if (!Array.isArray(docFieldValue)) {
        return false;
      }
      if (docFieldValue.length === 0) {
        return false;
      }
      if (typeof docFieldValue[0] === "object") {
        return docFieldValue.every(function(val) {
          return rowFilter(val, userValue, Object.keys(userValue));
        });
      }
      return docFieldValue.every(function(val) {
        return matchSelector(userValue, doc, parsedField, val);
      });
    },
    "$eq": function(doc, userValue, parsedField, docFieldValue) {
      return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) === 0;
    },
    "$gte": function(doc, userValue, parsedField, docFieldValue) {
      return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) >= 0;
    },
    "$gt": function(doc, userValue, parsedField, docFieldValue) {
      return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) > 0;
    },
    "$lte": function(doc, userValue, parsedField, docFieldValue) {
      return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) <= 0;
    },
    "$lt": function(doc, userValue, parsedField, docFieldValue) {
      return fieldIsNotUndefined(docFieldValue) && collate(docFieldValue, userValue) < 0;
    },
    "$exists": function(doc, userValue, parsedField, docFieldValue) {
      if (userValue) {
        return fieldIsNotUndefined(docFieldValue);
      }
      return !fieldIsNotUndefined(docFieldValue);
    },
    "$mod": function(doc, userValue, parsedField, docFieldValue) {
      return fieldExists(docFieldValue) && modField(docFieldValue, userValue);
    },
    "$ne": function(doc, userValue, parsedField, docFieldValue) {
      return userValue.every(function(neValue) {
        return collate(docFieldValue, neValue) !== 0;
      });
    },
    "$in": function(doc, userValue, parsedField, docFieldValue) {
      return fieldExists(docFieldValue) && arrayContainsValue(docFieldValue, userValue);
    },
    "$nin": function(doc, userValue, parsedField, docFieldValue) {
      return fieldExists(docFieldValue) && !arrayContainsValue(docFieldValue, userValue);
    },
    "$size": function(doc, userValue, parsedField, docFieldValue) {
      return fieldExists(docFieldValue) && Array.isArray(docFieldValue) && arraySize(docFieldValue, userValue);
    },
    "$all": function(doc, userValue, parsedField, docFieldValue) {
      return Array.isArray(docFieldValue) && arrayContainsAllValues(docFieldValue, userValue);
    },
    "$regex": function(doc, userValue, parsedField, docFieldValue) {
      return fieldExists(docFieldValue) && typeof docFieldValue == "string" && userValue.every(function(regexValue) {
        return regexMatch(docFieldValue, regexValue);
      });
    },
    "$type": function(doc, userValue, parsedField, docFieldValue) {
      return typeMatch(docFieldValue, userValue);
    }
  };
  function matchesSelector(doc, selector) {
    if (typeof selector !== "object") {
      throw new Error("Selector error: expected a JSON object");
    }
    selector = massageSelector(selector);
    var row = {
      "doc": doc
    };
    var rowsMatched = filterInMemoryFields([row], { "selector": selector }, Object.keys(selector));
    return rowsMatched && rowsMatched.length === 1;
  }
  function evalFilter(input) {
    return scopeEval('"use strict";\nreturn ' + input + ";", {});
  }
  function evalView(input) {
    var code = [
      "return function(doc) {",
      '  "use strict";',
      "  var emitted = false;",
      "  var emit = function (a, b) {",
      "    emitted = true;",
      "  };",
      "  var view = " + input + ";",
      "  view(doc);",
      "  if (emitted) {",
      "    return true;",
      "  }",
      "};"
    ].join("\n");
    return scopeEval(code, {});
  }
  function validate2(opts, callback) {
    if (opts.selector) {
      if (opts.filter && opts.filter !== "_selector") {
        var filterName = typeof opts.filter === "string" ? opts.filter : "function";
        return callback(new Error('selector invalid for filter "' + filterName + '"'));
      }
    }
    callback();
  }
  function normalize(opts) {
    if (opts.view && !opts.filter) {
      opts.filter = "_view";
    }
    if (opts.selector && !opts.filter) {
      opts.filter = "_selector";
    }
    if (opts.filter && typeof opts.filter === "string") {
      if (opts.filter === "_view") {
        opts.view = normalizeDesignDocFunctionName(opts.view);
      } else {
        opts.filter = normalizeDesignDocFunctionName(opts.filter);
      }
    }
  }
  function shouldFilter(changesHandler2, opts) {
    return opts.filter && typeof opts.filter === "string" && !opts.doc_ids && !isRemote(changesHandler2.db);
  }
  function filter(changesHandler2, opts) {
    var callback = opts.complete;
    if (opts.filter === "_view") {
      if (!opts.view || typeof opts.view !== "string") {
        var err = createError(BAD_REQUEST, "`view` filter parameter not found or invalid.");
        return callback(err);
      }
      var viewName = parseDesignDocFunctionName(opts.view);
      changesHandler2.db.get("_design/" + viewName[0], function(err2, ddoc) {
        if (changesHandler2.isCancelled) {
          return callback(null, { status: "cancelled" });
        }
        if (err2) {
          return callback(generateErrorFromResponse(err2));
        }
        var mapFun = ddoc && ddoc.views && ddoc.views[viewName[1]] && ddoc.views[viewName[1]].map;
        if (!mapFun) {
          return callback(createError(MISSING_DOC, ddoc.views ? "missing json key: " + viewName[1] : "missing json key: views"));
        }
        opts.filter = evalView(mapFun);
        changesHandler2.doChanges(opts);
      });
    } else if (opts.selector) {
      opts.filter = function(doc) {
        return matchesSelector(doc, opts.selector);
      };
      changesHandler2.doChanges(opts);
    } else {
      var filterName = parseDesignDocFunctionName(opts.filter);
      changesHandler2.db.get("_design/" + filterName[0], function(err2, ddoc) {
        if (changesHandler2.isCancelled) {
          return callback(null, { status: "cancelled" });
        }
        if (err2) {
          return callback(generateErrorFromResponse(err2));
        }
        var filterFun = ddoc && ddoc.filters && ddoc.filters[filterName[1]];
        if (!filterFun) {
          return callback(createError(MISSING_DOC, ddoc && ddoc.filters ? "missing json key: " + filterName[1] : "missing json key: filters"));
        }
        opts.filter = evalFilter(filterFun);
        changesHandler2.doChanges(opts);
      });
    }
  }
  function applyChangesFilterPlugin(PouchDB2) {
    PouchDB2._changesFilterPlugin = {
      validate: validate2,
      normalize,
      shouldFilter,
      filter
    };
  }
  PouchDB.plugin(applyChangesFilterPlugin);
  PouchDB.version = version;
  function toObject(array) {
    return array.reduce(function(obj, item) {
      obj[item] = true;
      return obj;
    }, {});
  }
  var reservedWords = toObject([
    "_id",
    "_rev",
    "_access",
    "_attachments",
    "_deleted",
    "_revisions",
    "_revs_info",
    "_conflicts",
    "_deleted_conflicts",
    "_local_seq",
    "_rev_tree",
    "_replication_id",
    "_replication_state",
    "_replication_state_time",
    "_replication_state_reason",
    "_replication_stats",
    "_removed"
  ]);
  var dataWords = toObject([
    "_access",
    "_attachments",
    "_replication_id",
    "_replication_state",
    "_replication_state_time",
    "_replication_state_reason",
    "_replication_stats"
  ]);
  function parseRevisionInfo(rev) {
    if (!/^\d+-/.test(rev)) {
      return createError(INVALID_REV);
    }
    var idx = rev.indexOf("-");
    var left = rev.substring(0, idx);
    var right = rev.substring(idx + 1);
    return {
      prefix: parseInt(left, 10),
      id: right
    };
  }
  function makeRevTreeFromRevisions(revisions, opts) {
    var pos = revisions.start - revisions.ids.length + 1;
    var revisionIds = revisions.ids;
    var ids = [revisionIds[0], opts, []];
    for (var i = 1, len = revisionIds.length; i < len; i++) {
      ids = [revisionIds[i], { status: "missing" }, [ids]];
    }
    return [{
      pos,
      ids
    }];
  }
  function parseDoc(doc, newEdits, dbOpts) {
    if (!dbOpts) {
      dbOpts = {
        deterministic_revs: true
      };
    }
    var nRevNum;
    var newRevId;
    var revInfo;
    var opts = { status: "available" };
    if (doc._deleted) {
      opts.deleted = true;
    }
    if (newEdits) {
      if (!doc._id) {
        doc._id = uuid();
      }
      newRevId = rev$$1(doc, dbOpts.deterministic_revs);
      if (doc._rev) {
        revInfo = parseRevisionInfo(doc._rev);
        if (revInfo.error) {
          return revInfo;
        }
        doc._rev_tree = [{
          pos: revInfo.prefix,
          ids: [revInfo.id, { status: "missing" }, [[newRevId, opts, []]]]
        }];
        nRevNum = revInfo.prefix + 1;
      } else {
        doc._rev_tree = [{
          pos: 1,
          ids: [newRevId, opts, []]
        }];
        nRevNum = 1;
      }
    } else {
      if (doc._revisions) {
        doc._rev_tree = makeRevTreeFromRevisions(doc._revisions, opts);
        nRevNum = doc._revisions.start;
        newRevId = doc._revisions.ids[0];
      }
      if (!doc._rev_tree) {
        revInfo = parseRevisionInfo(doc._rev);
        if (revInfo.error) {
          return revInfo;
        }
        nRevNum = revInfo.prefix;
        newRevId = revInfo.id;
        doc._rev_tree = [{
          pos: nRevNum,
          ids: [newRevId, opts, []]
        }];
      }
    }
    invalidIdError(doc._id);
    doc._rev = nRevNum + "-" + newRevId;
    var result = { metadata: {}, data: {} };
    for (var key in doc) {
      if (Object.prototype.hasOwnProperty.call(doc, key)) {
        var specialKey = key[0] === "_";
        if (specialKey && !reservedWords[key]) {
          var error = createError(DOC_VALIDATION, key);
          error.message = DOC_VALIDATION.message + ": " + key;
          throw error;
        } else if (specialKey && !dataWords[key]) {
          result.metadata[key.slice(1)] = doc[key];
        } else {
          result.data[key] = doc[key];
        }
      }
    }
    return result;
  }
  function parseBase64(data) {
    try {
      return thisAtob(data);
    } catch (e) {
      var err = createError(BAD_ARG, "Attachment is not a valid base64 string");
      return { error: err };
    }
  }
  function preprocessString(att, blobType, callback) {
    var asBinary = parseBase64(att.data);
    if (asBinary.error) {
      return callback(asBinary.error);
    }
    att.length = asBinary.length;
    if (blobType === "blob") {
      att.data = binStringToBluffer(asBinary, att.content_type);
    } else if (blobType === "base64") {
      att.data = thisBtoa(asBinary);
    } else {
      att.data = asBinary;
    }
    binaryMd5(asBinary, function(result) {
      att.digest = "md5-" + result;
      callback();
    });
  }
  function preprocessBlob(att, blobType, callback) {
    binaryMd5(att.data, function(md5) {
      att.digest = "md5-" + md5;
      att.length = att.data.size || att.data.length || 0;
      if (blobType === "binary") {
        blobToBinaryString(att.data, function(binString) {
          att.data = binString;
          callback();
        });
      } else if (blobType === "base64") {
        blobToBase64(att.data, function(b64) {
          att.data = b64;
          callback();
        });
      } else {
        callback();
      }
    });
  }
  function preprocessAttachment(att, blobType, callback) {
    if (att.stub) {
      return callback();
    }
    if (typeof att.data === "string") {
      preprocessString(att, blobType, callback);
    } else {
      preprocessBlob(att, blobType, callback);
    }
  }
  function preprocessAttachments(docInfos, blobType, callback) {
    if (!docInfos.length) {
      return callback();
    }
    var docv = 0;
    var overallErr;
    docInfos.forEach(function(docInfo) {
      var attachments = docInfo.data && docInfo.data._attachments ? Object.keys(docInfo.data._attachments) : [];
      var recv = 0;
      if (!attachments.length) {
        return done();
      }
      function processedAttachment(err) {
        overallErr = err;
        recv++;
        if (recv === attachments.length) {
          done();
        }
      }
      for (var key in docInfo.data._attachments) {
        if (Object.prototype.hasOwnProperty.call(docInfo.data._attachments, key)) {
          preprocessAttachment(docInfo.data._attachments[key], blobType, processedAttachment);
        }
      }
    });
    function done() {
      docv++;
      if (docInfos.length === docv) {
        if (overallErr) {
          callback(overallErr);
        } else {
          callback();
        }
      }
    }
  }
  function updateDoc(revLimit, prev, docInfo, results, i, cb, writeDoc, newEdits) {
    if (revExists(prev.rev_tree, docInfo.metadata.rev) && !newEdits) {
      results[i] = docInfo;
      return cb();
    }
    var previousWinningRev = prev.winningRev || winningRev(prev);
    var previouslyDeleted = "deleted" in prev ? prev.deleted : isDeleted(prev, previousWinningRev);
    var deleted = "deleted" in docInfo.metadata ? docInfo.metadata.deleted : isDeleted(docInfo.metadata);
    var isRoot = /^1-/.test(docInfo.metadata.rev);
    if (previouslyDeleted && !deleted && newEdits && isRoot) {
      var newDoc = docInfo.data;
      newDoc._rev = previousWinningRev;
      newDoc._id = docInfo.metadata.id;
      docInfo = parseDoc(newDoc, newEdits);
    }
    var merged = merge(prev.rev_tree, docInfo.metadata.rev_tree[0], revLimit);
    var inConflict = newEdits && (previouslyDeleted && deleted && merged.conflicts !== "new_leaf" || !previouslyDeleted && merged.conflicts !== "new_leaf" || previouslyDeleted && !deleted && merged.conflicts === "new_branch");
    if (inConflict) {
      var err = createError(REV_CONFLICT);
      results[i] = err;
      return cb();
    }
    var newRev = docInfo.metadata.rev;
    docInfo.metadata.rev_tree = merged.tree;
    docInfo.stemmedRevs = merged.stemmedRevs || [];
    if (prev.rev_map) {
      docInfo.metadata.rev_map = prev.rev_map;
    }
    var winningRev$$1 = winningRev(docInfo.metadata);
    var winningRevIsDeleted = isDeleted(docInfo.metadata, winningRev$$1);
    var delta = previouslyDeleted === winningRevIsDeleted ? 0 : previouslyDeleted < winningRevIsDeleted ? -1 : 1;
    var newRevIsDeleted;
    if (newRev === winningRev$$1) {
      newRevIsDeleted = winningRevIsDeleted;
    } else {
      newRevIsDeleted = isDeleted(docInfo.metadata, newRev);
    }
    writeDoc(docInfo, winningRev$$1, winningRevIsDeleted, newRevIsDeleted, true, delta, i, cb);
  }
  function rootIsMissing(docInfo) {
    return docInfo.metadata.rev_tree[0].ids[1].status === "missing";
  }
  function processDocs(revLimit, docInfos, api, fetchedDocs, tx, results, writeDoc, opts, overallCallback) {
    revLimit = revLimit || 1e3;
    function insertDoc(docInfo, resultsIdx, callback) {
      var winningRev$$1 = winningRev(docInfo.metadata);
      var deleted = isDeleted(docInfo.metadata, winningRev$$1);
      if ("was_delete" in opts && deleted) {
        results[resultsIdx] = createError(MISSING_DOC, "deleted");
        return callback();
      }
      var inConflict = newEdits && rootIsMissing(docInfo);
      if (inConflict) {
        var err = createError(REV_CONFLICT);
        results[resultsIdx] = err;
        return callback();
      }
      var delta = deleted ? 0 : 1;
      writeDoc(docInfo, winningRev$$1, deleted, deleted, false, delta, resultsIdx, callback);
    }
    var newEdits = opts.new_edits;
    var idsToDocs = new ExportedMap();
    var docsDone = 0;
    var docsToDo = docInfos.length;
    function checkAllDocsDone() {
      if (++docsDone === docsToDo && overallCallback) {
        overallCallback();
      }
    }
    docInfos.forEach(function(currentDoc, resultsIdx) {
      if (currentDoc._id && isLocalId(currentDoc._id)) {
        var fun = currentDoc._deleted ? "_removeLocal" : "_putLocal";
        api[fun](currentDoc, { ctx: tx }, function(err, res) {
          results[resultsIdx] = err || res;
          checkAllDocsDone();
        });
        return;
      }
      var id = currentDoc.metadata.id;
      if (idsToDocs.has(id)) {
        docsToDo--;
        idsToDocs.get(id).push([currentDoc, resultsIdx]);
      } else {
        idsToDocs.set(id, [[currentDoc, resultsIdx]]);
      }
    });
    idsToDocs.forEach(function(docs, id) {
      var numDone = 0;
      function docWritten() {
        if (++numDone < docs.length) {
          nextDoc();
        } else {
          checkAllDocsDone();
        }
      }
      function nextDoc() {
        var value = docs[numDone];
        var currentDoc = value[0];
        var resultsIdx = value[1];
        if (fetchedDocs.has(id)) {
          updateDoc(revLimit, fetchedDocs.get(id), currentDoc, results, resultsIdx, docWritten, writeDoc, newEdits);
        } else {
          var merged = merge([], currentDoc.metadata.rev_tree[0], revLimit);
          currentDoc.metadata.rev_tree = merged.tree;
          currentDoc.stemmedRevs = merged.stemmedRevs || [];
          insertDoc(currentDoc, resultsIdx, docWritten);
        }
      }
      nextDoc();
    });
  }
  var ADAPTER_VERSION = 5;
  var DOC_STORE = "document-store";
  var BY_SEQ_STORE = "by-sequence";
  var ATTACH_STORE = "attach-store";
  var ATTACH_AND_SEQ_STORE = "attach-seq-store";
  var META_STORE = "meta-store";
  var LOCAL_STORE = "local-store";
  var DETECT_BLOB_SUPPORT_STORE = "detect-blob-support";
  function safeJsonParse(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return import_vuvuzela.default.parse(str);
    }
  }
  function safeJsonStringify(json) {
    try {
      return JSON.stringify(json);
    } catch (e) {
      return import_vuvuzela.default.stringify(json);
    }
  }
  function idbError(callback) {
    return function(evt) {
      var message = "unknown_error";
      if (evt.target && evt.target.error) {
        message = evt.target.error.name || evt.target.error.message;
      }
      callback(createError(IDB_ERROR, message, evt.type));
    };
  }
  function encodeMetadata(metadata, winningRev2, deleted) {
    return {
      data: safeJsonStringify(metadata),
      winningRev: winningRev2,
      deletedOrLocal: deleted ? "1" : "0",
      seq: metadata.seq,
      id: metadata.id
    };
  }
  function decodeMetadata(storedObject) {
    if (!storedObject) {
      return null;
    }
    var metadata = safeJsonParse(storedObject.data);
    metadata.winningRev = storedObject.winningRev;
    metadata.deleted = storedObject.deletedOrLocal === "1";
    metadata.seq = storedObject.seq;
    return metadata;
  }
  function decodeDoc(doc) {
    if (!doc) {
      return doc;
    }
    var idx = doc._doc_id_rev.lastIndexOf(":");
    doc._id = doc._doc_id_rev.substring(0, idx - 1);
    doc._rev = doc._doc_id_rev.substring(idx + 1);
    delete doc._doc_id_rev;
    return doc;
  }
  function readBlobData(body, type, asBlob, callback) {
    if (asBlob) {
      if (!body) {
        callback(createBlob([""], { type }));
      } else if (typeof body !== "string") {
        callback(body);
      } else {
        callback(b64ToBluffer(body, type));
      }
    } else {
      if (!body) {
        callback("");
      } else if (typeof body !== "string") {
        readAsBinaryString(body, function(binary) {
          callback(thisBtoa(binary));
        });
      } else {
        callback(body);
      }
    }
  }
  function fetchAttachmentsIfNecessary(doc, opts, txn, cb) {
    var attachments = Object.keys(doc._attachments || {});
    if (!attachments.length) {
      return cb && cb();
    }
    var numDone = 0;
    function checkDone() {
      if (++numDone === attachments.length && cb) {
        cb();
      }
    }
    function fetchAttachment(doc2, att) {
      var attObj = doc2._attachments[att];
      var digest = attObj.digest;
      var req = txn.objectStore(ATTACH_STORE).get(digest);
      req.onsuccess = function(e) {
        attObj.body = e.target.result.body;
        checkDone();
      };
    }
    attachments.forEach(function(att) {
      if (opts.attachments && opts.include_docs) {
        fetchAttachment(doc, att);
      } else {
        doc._attachments[att].stub = true;
        checkDone();
      }
    });
  }
  function postProcessAttachments(results, asBlob) {
    return Promise.all(results.map(function(row) {
      if (row.doc && row.doc._attachments) {
        var attNames = Object.keys(row.doc._attachments);
        return Promise.all(attNames.map(function(att) {
          var attObj = row.doc._attachments[att];
          if (!("body" in attObj)) {
            return;
          }
          var body = attObj.body;
          var type = attObj.content_type;
          return new Promise(function(resolve) {
            readBlobData(body, type, asBlob, function(data) {
              row.doc._attachments[att] = $inject_Object_assign(pick(attObj, ["digest", "content_type"]), { data });
              resolve();
            });
          });
        }));
      }
    }));
  }
  function compactRevs(revs, docId, txn) {
    var possiblyOrphanedDigests = [];
    var seqStore = txn.objectStore(BY_SEQ_STORE);
    var attStore = txn.objectStore(ATTACH_STORE);
    var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
    var count = revs.length;
    function checkDone() {
      count--;
      if (!count) {
        deleteOrphanedAttachments();
      }
    }
    function deleteOrphanedAttachments() {
      if (!possiblyOrphanedDigests.length) {
        return;
      }
      possiblyOrphanedDigests.forEach(function(digest) {
        var countReq = attAndSeqStore.index("digestSeq").count(IDBKeyRange.bound(digest + "::", digest + "::\uFFFF", false, false));
        countReq.onsuccess = function(e) {
          var count2 = e.target.result;
          if (!count2) {
            attStore.delete(digest);
          }
        };
      });
    }
    revs.forEach(function(rev) {
      var index = seqStore.index("_doc_id_rev");
      var key = docId + "::" + rev;
      index.getKey(key).onsuccess = function(e) {
        var seq = e.target.result;
        if (typeof seq !== "number") {
          return checkDone();
        }
        seqStore.delete(seq);
        var cursor = attAndSeqStore.index("seq").openCursor(IDBKeyRange.only(seq));
        cursor.onsuccess = function(event) {
          var cursor2 = event.target.result;
          if (cursor2) {
            var digest = cursor2.value.digestSeq.split("::")[0];
            possiblyOrphanedDigests.push(digest);
            attAndSeqStore.delete(cursor2.primaryKey);
            cursor2.continue();
          } else {
            checkDone();
          }
        };
      };
    });
  }
  function openTransactionSafely(idb, stores, mode) {
    try {
      return {
        txn: idb.transaction(stores, mode)
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }
  var changesHandler = new Changes();
  function idbBulkDocs(dbOpts, req, opts, api, idb, callback) {
    var docInfos = req.docs;
    var txn;
    var docStore;
    var bySeqStore;
    var attachStore;
    var attachAndSeqStore;
    var metaStore;
    var docInfoError;
    var metaDoc;
    for (var i = 0, len = docInfos.length; i < len; i++) {
      var doc = docInfos[i];
      if (doc._id && isLocalId(doc._id)) {
        continue;
      }
      doc = docInfos[i] = parseDoc(doc, opts.new_edits, dbOpts);
      if (doc.error && !docInfoError) {
        docInfoError = doc;
      }
    }
    if (docInfoError) {
      return callback(docInfoError);
    }
    var allDocsProcessed = false;
    var docCountDelta = 0;
    var results = new Array(docInfos.length);
    var fetchedDocs = new ExportedMap();
    var preconditionErrored = false;
    var blobType = api._meta.blobSupport ? "blob" : "base64";
    preprocessAttachments(docInfos, blobType, function(err) {
      if (err) {
        return callback(err);
      }
      startTransaction();
    });
    function startTransaction() {
      var stores = [
        DOC_STORE,
        BY_SEQ_STORE,
        ATTACH_STORE,
        LOCAL_STORE,
        ATTACH_AND_SEQ_STORE,
        META_STORE
      ];
      var txnResult = openTransactionSafely(idb, stores, "readwrite");
      if (txnResult.error) {
        return callback(txnResult.error);
      }
      txn = txnResult.txn;
      txn.onabort = idbError(callback);
      txn.ontimeout = idbError(callback);
      txn.oncomplete = complete;
      docStore = txn.objectStore(DOC_STORE);
      bySeqStore = txn.objectStore(BY_SEQ_STORE);
      attachStore = txn.objectStore(ATTACH_STORE);
      attachAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
      metaStore = txn.objectStore(META_STORE);
      metaStore.get(META_STORE).onsuccess = function(e) {
        metaDoc = e.target.result;
        updateDocCountIfReady();
      };
      verifyAttachments(function(err) {
        if (err) {
          preconditionErrored = true;
          return callback(err);
        }
        fetchExistingDocs();
      });
    }
    function onAllDocsProcessed() {
      allDocsProcessed = true;
      updateDocCountIfReady();
    }
    function idbProcessDocs() {
      processDocs(dbOpts.revs_limit, docInfos, api, fetchedDocs, txn, results, writeDoc, opts, onAllDocsProcessed);
    }
    function updateDocCountIfReady() {
      if (!metaDoc || !allDocsProcessed) {
        return;
      }
      metaDoc.docCount += docCountDelta;
      metaStore.put(metaDoc);
    }
    function fetchExistingDocs() {
      if (!docInfos.length) {
        return;
      }
      var numFetched = 0;
      function checkDone() {
        if (++numFetched === docInfos.length) {
          idbProcessDocs();
        }
      }
      function readMetadata(event) {
        var metadata = decodeMetadata(event.target.result);
        if (metadata) {
          fetchedDocs.set(metadata.id, metadata);
        }
        checkDone();
      }
      for (var i2 = 0, len2 = docInfos.length; i2 < len2; i2++) {
        var docInfo = docInfos[i2];
        if (docInfo._id && isLocalId(docInfo._id)) {
          checkDone();
          continue;
        }
        var req2 = docStore.get(docInfo.metadata.id);
        req2.onsuccess = readMetadata;
      }
    }
    function complete() {
      if (preconditionErrored) {
        return;
      }
      changesHandler.notify(api._meta.name);
      callback(null, results);
    }
    function verifyAttachment(digest, callback2) {
      var req2 = attachStore.get(digest);
      req2.onsuccess = function(e) {
        if (!e.target.result) {
          var err = createError(MISSING_STUB, "unknown stub attachment with digest " + digest);
          err.status = 412;
          callback2(err);
        } else {
          callback2();
        }
      };
    }
    function verifyAttachments(finish) {
      var digests = [];
      docInfos.forEach(function(docInfo) {
        if (docInfo.data && docInfo.data._attachments) {
          Object.keys(docInfo.data._attachments).forEach(function(filename) {
            var att = docInfo.data._attachments[filename];
            if (att.stub) {
              digests.push(att.digest);
            }
          });
        }
      });
      if (!digests.length) {
        return finish();
      }
      var numDone = 0;
      var err;
      function checkDone() {
        if (++numDone === digests.length) {
          finish(err);
        }
      }
      digests.forEach(function(digest) {
        verifyAttachment(digest, function(attErr) {
          if (attErr && !err) {
            err = attErr;
          }
          checkDone();
        });
      });
    }
    function writeDoc(docInfo, winningRev$$1, winningRevIsDeleted, newRevIsDeleted, isUpdate, delta, resultsIdx, callback2) {
      docInfo.metadata.winningRev = winningRev$$1;
      docInfo.metadata.deleted = winningRevIsDeleted;
      var doc2 = docInfo.data;
      doc2._id = docInfo.metadata.id;
      doc2._rev = docInfo.metadata.rev;
      if (newRevIsDeleted) {
        doc2._deleted = true;
      }
      var hasAttachments = doc2._attachments && Object.keys(doc2._attachments).length;
      if (hasAttachments) {
        return writeAttachments(docInfo, winningRev$$1, winningRevIsDeleted, isUpdate, resultsIdx, callback2);
      }
      docCountDelta += delta;
      updateDocCountIfReady();
      finishDoc(docInfo, winningRev$$1, winningRevIsDeleted, isUpdate, resultsIdx, callback2);
    }
    function finishDoc(docInfo, winningRev$$1, winningRevIsDeleted, isUpdate, resultsIdx, callback2) {
      var doc2 = docInfo.data;
      var metadata = docInfo.metadata;
      doc2._doc_id_rev = metadata.id + "::" + metadata.rev;
      delete doc2._id;
      delete doc2._rev;
      function afterPutDoc(e) {
        var revsToDelete = docInfo.stemmedRevs || [];
        if (isUpdate && api.auto_compaction) {
          revsToDelete = revsToDelete.concat(compactTree(docInfo.metadata));
        }
        if (revsToDelete && revsToDelete.length) {
          compactRevs(revsToDelete, docInfo.metadata.id, txn);
        }
        metadata.seq = e.target.result;
        var metadataToStore = encodeMetadata(metadata, winningRev$$1, winningRevIsDeleted);
        var metaDataReq = docStore.put(metadataToStore);
        metaDataReq.onsuccess = afterPutMetadata;
      }
      function afterPutDocError(e) {
        e.preventDefault();
        e.stopPropagation();
        var index = bySeqStore.index("_doc_id_rev");
        var getKeyReq = index.getKey(doc2._doc_id_rev);
        getKeyReq.onsuccess = function(e2) {
          var putReq2 = bySeqStore.put(doc2, e2.target.result);
          putReq2.onsuccess = afterPutDoc;
        };
      }
      function afterPutMetadata() {
        results[resultsIdx] = {
          ok: true,
          id: metadata.id,
          rev: metadata.rev
        };
        fetchedDocs.set(docInfo.metadata.id, docInfo.metadata);
        insertAttachmentMappings(docInfo, metadata.seq, callback2);
      }
      var putReq = bySeqStore.put(doc2);
      putReq.onsuccess = afterPutDoc;
      putReq.onerror = afterPutDocError;
    }
    function writeAttachments(docInfo, winningRev$$1, winningRevIsDeleted, isUpdate, resultsIdx, callback2) {
      var doc2 = docInfo.data;
      var numDone = 0;
      var attachments = Object.keys(doc2._attachments);
      function collectResults() {
        if (numDone === attachments.length) {
          finishDoc(docInfo, winningRev$$1, winningRevIsDeleted, isUpdate, resultsIdx, callback2);
        }
      }
      function attachmentSaved() {
        numDone++;
        collectResults();
      }
      attachments.forEach(function(key) {
        var att = docInfo.data._attachments[key];
        if (!att.stub) {
          var data = att.data;
          delete att.data;
          att.revpos = parseInt(winningRev$$1, 10);
          var digest = att.digest;
          saveAttachment(digest, data, attachmentSaved);
        } else {
          numDone++;
          collectResults();
        }
      });
    }
    function insertAttachmentMappings(docInfo, seq, callback2) {
      var attsAdded = 0;
      var attsToAdd = Object.keys(docInfo.data._attachments || {});
      if (!attsToAdd.length) {
        return callback2();
      }
      function checkDone() {
        if (++attsAdded === attsToAdd.length) {
          callback2();
        }
      }
      function add(att) {
        var digest = docInfo.data._attachments[att].digest;
        var req2 = attachAndSeqStore.put({
          seq,
          digestSeq: digest + "::" + seq
        });
        req2.onsuccess = checkDone;
        req2.onerror = function(e) {
          e.preventDefault();
          e.stopPropagation();
          checkDone();
        };
      }
      for (var i2 = 0; i2 < attsToAdd.length; i2++) {
        add(attsToAdd[i2]);
      }
    }
    function saveAttachment(digest, data, callback2) {
      var getKeyReq = attachStore.count(digest);
      getKeyReq.onsuccess = function(e) {
        var count = e.target.result;
        if (count) {
          return callback2();
        }
        var newAtt = {
          digest,
          body: data
        };
        var putReq = attachStore.put(newAtt);
        putReq.onsuccess = callback2;
      };
    }
  }
  function runBatchedCursor(objectStore, keyRange, descending, batchSize, onBatch) {
    if (batchSize === -1) {
      batchSize = 1e3;
    }
    var useGetAll = typeof objectStore.getAll === "function" && typeof objectStore.getAllKeys === "function" && batchSize > 1 && !descending;
    var keysBatch;
    var valuesBatch;
    var pseudoCursor;
    function onGetAll(e) {
      valuesBatch = e.target.result;
      if (keysBatch) {
        onBatch(keysBatch, valuesBatch, pseudoCursor);
      }
    }
    function onGetAllKeys(e) {
      keysBatch = e.target.result;
      if (valuesBatch) {
        onBatch(keysBatch, valuesBatch, pseudoCursor);
      }
    }
    function continuePseudoCursor() {
      if (!keysBatch.length) {
        return onBatch();
      }
      var lastKey = keysBatch[keysBatch.length - 1];
      var newKeyRange;
      if (keyRange && keyRange.upper) {
        try {
          newKeyRange = IDBKeyRange.bound(lastKey, keyRange.upper, true, keyRange.upperOpen);
        } catch (e) {
          if (e.name === "DataError" && e.code === 0) {
            return onBatch();
          }
        }
      } else {
        newKeyRange = IDBKeyRange.lowerBound(lastKey, true);
      }
      keyRange = newKeyRange;
      keysBatch = null;
      valuesBatch = null;
      objectStore.getAll(keyRange, batchSize).onsuccess = onGetAll;
      objectStore.getAllKeys(keyRange, batchSize).onsuccess = onGetAllKeys;
    }
    function onCursor(e) {
      var cursor = e.target.result;
      if (!cursor) {
        return onBatch();
      }
      onBatch([cursor.key], [cursor.value], cursor);
    }
    if (useGetAll) {
      pseudoCursor = { "continue": continuePseudoCursor };
      objectStore.getAll(keyRange, batchSize).onsuccess = onGetAll;
      objectStore.getAllKeys(keyRange, batchSize).onsuccess = onGetAllKeys;
    } else if (descending) {
      objectStore.openCursor(keyRange, "prev").onsuccess = onCursor;
    } else {
      objectStore.openCursor(keyRange).onsuccess = onCursor;
    }
  }
  function getAll(objectStore, keyRange, onSuccess) {
    if (typeof objectStore.getAll === "function") {
      objectStore.getAll(keyRange).onsuccess = onSuccess;
      return;
    }
    var values = [];
    function onCursor(e) {
      var cursor = e.target.result;
      if (cursor) {
        values.push(cursor.value);
        cursor.continue();
      } else {
        onSuccess({
          target: {
            result: values
          }
        });
      }
    }
    objectStore.openCursor(keyRange).onsuccess = onCursor;
  }
  function allDocsKeys(keys2, docStore, onBatch) {
    var valuesBatch = new Array(keys2.length);
    var count = 0;
    keys2.forEach(function(key, index) {
      docStore.get(key).onsuccess = function(event) {
        if (event.target.result) {
          valuesBatch[index] = event.target.result;
        } else {
          valuesBatch[index] = { key, error: "not_found" };
        }
        count++;
        if (count === keys2.length) {
          onBatch(keys2, valuesBatch, {});
        }
      };
    });
  }
  function createKeyRange(start, end, inclusiveEnd, key, descending) {
    try {
      if (start && end) {
        if (descending) {
          return IDBKeyRange.bound(end, start, !inclusiveEnd, false);
        } else {
          return IDBKeyRange.bound(start, end, false, !inclusiveEnd);
        }
      } else if (start) {
        if (descending) {
          return IDBKeyRange.upperBound(start);
        } else {
          return IDBKeyRange.lowerBound(start);
        }
      } else if (end) {
        if (descending) {
          return IDBKeyRange.lowerBound(end, !inclusiveEnd);
        } else {
          return IDBKeyRange.upperBound(end, !inclusiveEnd);
        }
      } else if (key) {
        return IDBKeyRange.only(key);
      }
    } catch (e) {
      return { error: e };
    }
    return null;
  }
  function idbAllDocs(opts, idb, callback) {
    var start = "startkey" in opts ? opts.startkey : false;
    var end = "endkey" in opts ? opts.endkey : false;
    var key = "key" in opts ? opts.key : false;
    var keys2 = "keys" in opts ? opts.keys : false;
    var skip = opts.skip || 0;
    var limit = typeof opts.limit === "number" ? opts.limit : -1;
    var inclusiveEnd = opts.inclusive_end !== false;
    var keyRange;
    var keyRangeError;
    if (!keys2) {
      keyRange = createKeyRange(start, end, inclusiveEnd, key, opts.descending);
      keyRangeError = keyRange && keyRange.error;
      if (keyRangeError && !(keyRangeError.name === "DataError" && keyRangeError.code === 0)) {
        return callback(createError(IDB_ERROR, keyRangeError.name, keyRangeError.message));
      }
    }
    var stores = [DOC_STORE, BY_SEQ_STORE, META_STORE];
    if (opts.attachments) {
      stores.push(ATTACH_STORE);
    }
    var txnResult = openTransactionSafely(idb, stores, "readonly");
    if (txnResult.error) {
      return callback(txnResult.error);
    }
    var txn = txnResult.txn;
    txn.oncomplete = onTxnComplete;
    txn.onabort = idbError(callback);
    var docStore = txn.objectStore(DOC_STORE);
    var seqStore = txn.objectStore(BY_SEQ_STORE);
    var metaStore = txn.objectStore(META_STORE);
    var docIdRevIndex = seqStore.index("_doc_id_rev");
    var results = [];
    var docCount;
    var updateSeq;
    metaStore.get(META_STORE).onsuccess = function(e) {
      docCount = e.target.result.docCount;
    };
    if (opts.update_seq) {
      getMaxUpdateSeq(seqStore, function(e) {
        if (e.target.result && e.target.result.length > 0) {
          updateSeq = e.target.result[0];
        }
      });
    }
    function getMaxUpdateSeq(objectStore, onSuccess) {
      function onCursor(e) {
        var cursor = e.target.result;
        var maxKey = void 0;
        if (cursor && cursor.key) {
          maxKey = cursor.key;
        }
        return onSuccess({
          target: {
            result: [maxKey]
          }
        });
      }
      objectStore.openCursor(null, "prev").onsuccess = onCursor;
    }
    function fetchDocAsynchronously(metadata, row, winningRev$$1) {
      var key2 = metadata.id + "::" + winningRev$$1;
      docIdRevIndex.get(key2).onsuccess = function onGetDoc(e) {
        row.doc = decodeDoc(e.target.result) || {};
        if (opts.conflicts) {
          var conflicts = collectConflicts(metadata);
          if (conflicts.length) {
            row.doc._conflicts = conflicts;
          }
        }
        fetchAttachmentsIfNecessary(row.doc, opts, txn);
      };
    }
    function allDocsInner(winningRev$$1, metadata) {
      var row = {
        id: metadata.id,
        key: metadata.id,
        value: {
          rev: winningRev$$1
        }
      };
      var deleted = metadata.deleted;
      if (deleted) {
        if (keys2) {
          results.push(row);
          row.value.deleted = true;
          row.doc = null;
        }
      } else if (skip-- <= 0) {
        results.push(row);
        if (opts.include_docs) {
          fetchDocAsynchronously(metadata, row, winningRev$$1);
        }
      }
    }
    function processBatch(batchValues) {
      for (var i = 0, len = batchValues.length; i < len; i++) {
        if (results.length === limit) {
          break;
        }
        var batchValue = batchValues[i];
        if (batchValue.error && keys2) {
          results.push(batchValue);
          continue;
        }
        var metadata = decodeMetadata(batchValue);
        var winningRev$$1 = metadata.winningRev;
        allDocsInner(winningRev$$1, metadata);
      }
    }
    function onBatch(batchKeys, batchValues, cursor) {
      if (!cursor) {
        return;
      }
      processBatch(batchValues);
      if (results.length < limit) {
        cursor.continue();
      }
    }
    function onGetAll(e) {
      var values = e.target.result;
      if (opts.descending) {
        values = values.reverse();
      }
      processBatch(values);
    }
    function onResultsReady() {
      var returnVal = {
        total_rows: docCount,
        offset: opts.skip,
        rows: results
      };
      if (opts.update_seq && updateSeq !== void 0) {
        returnVal.update_seq = updateSeq;
      }
      callback(null, returnVal);
    }
    function onTxnComplete() {
      if (opts.attachments) {
        postProcessAttachments(results, opts.binary).then(onResultsReady);
      } else {
        onResultsReady();
      }
    }
    if (keyRangeError || limit === 0) {
      return;
    }
    if (keys2) {
      return allDocsKeys(opts.keys, docStore, onBatch);
    }
    if (limit === -1) {
      return getAll(docStore, keyRange, onGetAll);
    }
    runBatchedCursor(docStore, keyRange, opts.descending, limit + skip, onBatch);
  }
  function checkBlobSupport(txn) {
    return new Promise(function(resolve) {
      var blob$$1 = createBlob([""]);
      var req = txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob$$1, "key");
      req.onsuccess = function() {
        var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
        var matchedEdge = navigator.userAgent.match(/Edge\//);
        resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
      };
      req.onerror = txn.onabort = function(e) {
        e.preventDefault();
        e.stopPropagation();
        resolve(false);
      };
    }).catch(function() {
      return false;
    });
  }
  function countDocs(txn, cb) {
    var index = txn.objectStore(DOC_STORE).index("deletedOrLocal");
    index.count(IDBKeyRange.only("0")).onsuccess = function(e) {
      cb(e.target.result);
    };
  }
  var running = false;
  var queue = [];
  function tryCode(fun, err, res, PouchDB2) {
    try {
      fun(err, res);
    } catch (err2) {
      PouchDB2.emit("error", err2);
    }
  }
  function applyNext() {
    if (running || !queue.length) {
      return;
    }
    running = true;
    queue.shift()();
  }
  function enqueueTask(action, callback, PouchDB2) {
    queue.push(function runAction() {
      action(function runCallback(err, res) {
        tryCode(callback, err, res, PouchDB2);
        running = false;
        (0, import_immediate.default)(function runNext() {
          applyNext(PouchDB2);
        });
      });
    });
    applyNext();
  }
  function changes(opts, api, dbName, idb) {
    opts = clone(opts);
    if (opts.continuous) {
      var id = dbName + ":" + uuid();
      changesHandler.addListener(dbName, id, api, opts);
      changesHandler.notify(dbName);
      return {
        cancel: function() {
          changesHandler.removeListener(dbName, id);
        }
      };
    }
    var docIds = opts.doc_ids && new ExportedSet(opts.doc_ids);
    opts.since = opts.since || 0;
    var lastSeq = opts.since;
    var limit = "limit" in opts ? opts.limit : -1;
    if (limit === 0) {
      limit = 1;
    }
    var results = [];
    var numResults = 0;
    var filter2 = filterChange(opts);
    var docIdsToMetadata = new ExportedMap();
    var txn;
    var bySeqStore;
    var docStore;
    var docIdRevIndex;
    function onBatch(batchKeys, batchValues, cursor) {
      if (!cursor || !batchKeys.length) {
        return;
      }
      var winningDocs = new Array(batchKeys.length);
      var metadatas = new Array(batchKeys.length);
      function processMetadataAndWinningDoc(metadata, winningDoc) {
        var change = opts.processChange(winningDoc, metadata, opts);
        lastSeq = change.seq = metadata.seq;
        var filtered = filter2(change);
        if (typeof filtered === "object") {
          return Promise.reject(filtered);
        }
        if (!filtered) {
          return Promise.resolve();
        }
        numResults++;
        if (opts.return_docs) {
          results.push(change);
        }
        if (opts.attachments && opts.include_docs) {
          return new Promise(function(resolve) {
            fetchAttachmentsIfNecessary(winningDoc, opts, txn, function() {
              postProcessAttachments([change], opts.binary).then(function() {
                resolve(change);
              });
            });
          });
        } else {
          return Promise.resolve(change);
        }
      }
      function onBatchDone() {
        var promises = [];
        for (var i = 0, len = winningDocs.length; i < len; i++) {
          if (numResults === limit) {
            break;
          }
          var winningDoc = winningDocs[i];
          if (!winningDoc) {
            continue;
          }
          var metadata = metadatas[i];
          promises.push(processMetadataAndWinningDoc(metadata, winningDoc));
        }
        Promise.all(promises).then(function(changes2) {
          for (var i2 = 0, len2 = changes2.length; i2 < len2; i2++) {
            if (changes2[i2]) {
              opts.onChange(changes2[i2]);
            }
          }
        }).catch(opts.complete);
        if (numResults !== limit) {
          cursor.continue();
        }
      }
      var numDone = 0;
      batchValues.forEach(function(value, i) {
        var doc = decodeDoc(value);
        var seq = batchKeys[i];
        fetchWinningDocAndMetadata(doc, seq, function(metadata, winningDoc) {
          metadatas[i] = metadata;
          winningDocs[i] = winningDoc;
          if (++numDone === batchKeys.length) {
            onBatchDone();
          }
        });
      });
    }
    function onGetMetadata(doc, seq, metadata, cb) {
      if (metadata.seq !== seq) {
        return cb();
      }
      if (metadata.winningRev === doc._rev) {
        return cb(metadata, doc);
      }
      var docIdRev = doc._id + "::" + metadata.winningRev;
      var req = docIdRevIndex.get(docIdRev);
      req.onsuccess = function(e) {
        cb(metadata, decodeDoc(e.target.result));
      };
    }
    function fetchWinningDocAndMetadata(doc, seq, cb) {
      if (docIds && !docIds.has(doc._id)) {
        return cb();
      }
      var metadata = docIdsToMetadata.get(doc._id);
      if (metadata) {
        return onGetMetadata(doc, seq, metadata, cb);
      }
      docStore.get(doc._id).onsuccess = function(e) {
        metadata = decodeMetadata(e.target.result);
        docIdsToMetadata.set(doc._id, metadata);
        onGetMetadata(doc, seq, metadata, cb);
      };
    }
    function finish() {
      opts.complete(null, {
        results,
        last_seq: lastSeq
      });
    }
    function onTxnComplete() {
      if (!opts.continuous && opts.attachments) {
        postProcessAttachments(results).then(finish);
      } else {
        finish();
      }
    }
    var objectStores = [DOC_STORE, BY_SEQ_STORE];
    if (opts.attachments) {
      objectStores.push(ATTACH_STORE);
    }
    var txnResult = openTransactionSafely(idb, objectStores, "readonly");
    if (txnResult.error) {
      return opts.complete(txnResult.error);
    }
    txn = txnResult.txn;
    txn.onabort = idbError(opts.complete);
    txn.oncomplete = onTxnComplete;
    bySeqStore = txn.objectStore(BY_SEQ_STORE);
    docStore = txn.objectStore(DOC_STORE);
    docIdRevIndex = bySeqStore.index("_doc_id_rev");
    var keyRange = opts.since && !opts.descending ? IDBKeyRange.lowerBound(opts.since, true) : null;
    runBatchedCursor(bySeqStore, keyRange, opts.descending, limit, onBatch);
  }
  var cachedDBs = new ExportedMap();
  var blobSupportPromise;
  var openReqList = new ExportedMap();
  function IdbPouch(opts, callback) {
    var api = this;
    enqueueTask(function(thisCallback) {
      init2(api, opts, thisCallback);
    }, callback, api.constructor);
  }
  function init2(api, opts, callback) {
    var dbName = opts.name;
    var idb = null;
    var idbGlobalFailureError = null;
    api._meta = null;
    function enrichCallbackError(callback2) {
      return function(error, result) {
        if (error && error instanceof Error && !error.reason) {
          if (idbGlobalFailureError) {
            error.reason = idbGlobalFailureError;
          }
        }
        callback2(error, result);
      };
    }
    function createSchema(db2) {
      var docStore = db2.createObjectStore(DOC_STORE, { keyPath: "id" });
      db2.createObjectStore(BY_SEQ_STORE, { autoIncrement: true }).createIndex("_doc_id_rev", "_doc_id_rev", { unique: true });
      db2.createObjectStore(ATTACH_STORE, { keyPath: "digest" });
      db2.createObjectStore(META_STORE, { keyPath: "id", autoIncrement: false });
      db2.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
      docStore.createIndex("deletedOrLocal", "deletedOrLocal", { unique: false });
      db2.createObjectStore(LOCAL_STORE, { keyPath: "_id" });
      var attAndSeqStore = db2.createObjectStore(ATTACH_AND_SEQ_STORE, { autoIncrement: true });
      attAndSeqStore.createIndex("seq", "seq");
      attAndSeqStore.createIndex("digestSeq", "digestSeq", { unique: true });
    }
    function addDeletedOrLocalIndex(txn, callback2) {
      var docStore = txn.objectStore(DOC_STORE);
      docStore.createIndex("deletedOrLocal", "deletedOrLocal", { unique: false });
      docStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          var metadata = cursor.value;
          var deleted = isDeleted(metadata);
          metadata.deletedOrLocal = deleted ? "1" : "0";
          docStore.put(metadata);
          cursor.continue();
        } else {
          callback2();
        }
      };
    }
    function createLocalStoreSchema(db2) {
      db2.createObjectStore(LOCAL_STORE, { keyPath: "_id" }).createIndex("_doc_id_rev", "_doc_id_rev", { unique: true });
    }
    function migrateLocalStore(txn, cb) {
      var localStore = txn.objectStore(LOCAL_STORE);
      var docStore = txn.objectStore(DOC_STORE);
      var seqStore = txn.objectStore(BY_SEQ_STORE);
      var cursor = docStore.openCursor();
      cursor.onsuccess = function(event) {
        var cursor2 = event.target.result;
        if (cursor2) {
          var metadata = cursor2.value;
          var docId = metadata.id;
          var local = isLocalId(docId);
          var rev = winningRev(metadata);
          if (local) {
            var docIdRev = docId + "::" + rev;
            var start = docId + "::";
            var end = docId + "::~";
            var index = seqStore.index("_doc_id_rev");
            var range = IDBKeyRange.bound(start, end, false, false);
            var seqCursor = index.openCursor(range);
            seqCursor.onsuccess = function(e) {
              seqCursor = e.target.result;
              if (!seqCursor) {
                docStore.delete(cursor2.primaryKey);
                cursor2.continue();
              } else {
                var data = seqCursor.value;
                if (data._doc_id_rev === docIdRev) {
                  localStore.put(data);
                }
                seqStore.delete(seqCursor.primaryKey);
                seqCursor.continue();
              }
            };
          } else {
            cursor2.continue();
          }
        } else if (cb) {
          cb();
        }
      };
    }
    function addAttachAndSeqStore(db2) {
      var attAndSeqStore = db2.createObjectStore(ATTACH_AND_SEQ_STORE, { autoIncrement: true });
      attAndSeqStore.createIndex("seq", "seq");
      attAndSeqStore.createIndex("digestSeq", "digestSeq", { unique: true });
    }
    function migrateAttsAndSeqs(txn, callback2) {
      var seqStore = txn.objectStore(BY_SEQ_STORE);
      var attStore = txn.objectStore(ATTACH_STORE);
      var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
      var req2 = attStore.count();
      req2.onsuccess = function(e) {
        var count = e.target.result;
        if (!count) {
          return callback2();
        }
        seqStore.openCursor().onsuccess = function(e2) {
          var cursor = e2.target.result;
          if (!cursor) {
            return callback2();
          }
          var doc = cursor.value;
          var seq = cursor.primaryKey;
          var atts = Object.keys(doc._attachments || {});
          var digestMap = {};
          for (var j = 0; j < atts.length; j++) {
            var att = doc._attachments[atts[j]];
            digestMap[att.digest] = true;
          }
          var digests = Object.keys(digestMap);
          for (j = 0; j < digests.length; j++) {
            var digest = digests[j];
            attAndSeqStore.put({
              seq,
              digestSeq: digest + "::" + seq
            });
          }
          cursor.continue();
        };
      };
    }
    function migrateMetadata(txn) {
      function decodeMetadataCompat(storedObject) {
        if (!storedObject.data) {
          storedObject.deleted = storedObject.deletedOrLocal === "1";
          return storedObject;
        }
        return decodeMetadata(storedObject);
      }
      var bySeqStore = txn.objectStore(BY_SEQ_STORE);
      var docStore = txn.objectStore(DOC_STORE);
      var cursor = docStore.openCursor();
      cursor.onsuccess = function(e) {
        var cursor2 = e.target.result;
        if (!cursor2) {
          return;
        }
        var metadata = decodeMetadataCompat(cursor2.value);
        metadata.winningRev = metadata.winningRev || winningRev(metadata);
        function fetchMetadataSeq() {
          var start = metadata.id + "::";
          var end = metadata.id + "::\uFFFF";
          var req2 = bySeqStore.index("_doc_id_rev").openCursor(IDBKeyRange.bound(start, end));
          var metadataSeq = 0;
          req2.onsuccess = function(e2) {
            var cursor3 = e2.target.result;
            if (!cursor3) {
              metadata.seq = metadataSeq;
              return onGetMetadataSeq();
            }
            var seq = cursor3.primaryKey;
            if (seq > metadataSeq) {
              metadataSeq = seq;
            }
            cursor3.continue();
          };
        }
        function onGetMetadataSeq() {
          var metadataToStore = encodeMetadata(metadata, metadata.winningRev, metadata.deleted);
          var req2 = docStore.put(metadataToStore);
          req2.onsuccess = function() {
            cursor2.continue();
          };
        }
        if (metadata.seq) {
          return onGetMetadataSeq();
        }
        fetchMetadataSeq();
      };
    }
    api._remote = false;
    api.type = function() {
      return "idb";
    };
    api._id = toPromise(function(callback2) {
      callback2(null, api._meta.instanceId);
    });
    api._bulkDocs = function idb_bulkDocs(req2, reqOpts, callback2) {
      idbBulkDocs(opts, req2, reqOpts, api, idb, enrichCallbackError(callback2));
    };
    api._get = function idb_get(id, opts2, callback2) {
      var doc;
      var metadata;
      var err;
      var txn = opts2.ctx;
      if (!txn) {
        var txnResult = openTransactionSafely(idb, [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], "readonly");
        if (txnResult.error) {
          return callback2(txnResult.error);
        }
        txn = txnResult.txn;
      }
      function finish() {
        callback2(err, { doc, metadata, ctx: txn });
      }
      txn.objectStore(DOC_STORE).get(id).onsuccess = function(e) {
        metadata = decodeMetadata(e.target.result);
        if (!metadata) {
          err = createError(MISSING_DOC, "missing");
          return finish();
        }
        var rev;
        if (!opts2.rev) {
          rev = metadata.winningRev;
          var deleted = isDeleted(metadata);
          if (deleted) {
            err = createError(MISSING_DOC, "deleted");
            return finish();
          }
        } else {
          rev = opts2.latest ? latest(opts2.rev, metadata) : opts2.rev;
        }
        var objectStore = txn.objectStore(BY_SEQ_STORE);
        var key = metadata.id + "::" + rev;
        objectStore.index("_doc_id_rev").get(key).onsuccess = function(e2) {
          doc = e2.target.result;
          if (doc) {
            doc = decodeDoc(doc);
          }
          if (!doc) {
            err = createError(MISSING_DOC, "missing");
            return finish();
          }
          finish();
        };
      };
    };
    api._getAttachment = function(docId, attachId, attachment, opts2, callback2) {
      var txn;
      if (opts2.ctx) {
        txn = opts2.ctx;
      } else {
        var txnResult = openTransactionSafely(idb, [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], "readonly");
        if (txnResult.error) {
          return callback2(txnResult.error);
        }
        txn = txnResult.txn;
      }
      var digest = attachment.digest;
      var type = attachment.content_type;
      txn.objectStore(ATTACH_STORE).get(digest).onsuccess = function(e) {
        var body = e.target.result.body;
        readBlobData(body, type, opts2.binary, function(blobData) {
          callback2(null, blobData);
        });
      };
    };
    api._info = function idb_info(callback2) {
      var updateSeq;
      var docCount;
      var txnResult = openTransactionSafely(idb, [META_STORE, BY_SEQ_STORE], "readonly");
      if (txnResult.error) {
        return callback2(txnResult.error);
      }
      var txn = txnResult.txn;
      txn.objectStore(META_STORE).get(META_STORE).onsuccess = function(e) {
        docCount = e.target.result.docCount;
      };
      txn.objectStore(BY_SEQ_STORE).openCursor(null, "prev").onsuccess = function(e) {
        var cursor = e.target.result;
        updateSeq = cursor ? cursor.key : 0;
      };
      txn.oncomplete = function() {
        callback2(null, {
          doc_count: docCount,
          update_seq: updateSeq,
          idb_attachment_format: api._meta.blobSupport ? "binary" : "base64"
        });
      };
    };
    api._allDocs = function idb_allDocs(opts2, callback2) {
      idbAllDocs(opts2, idb, enrichCallbackError(callback2));
    };
    api._changes = function idbChanges(opts2) {
      return changes(opts2, api, dbName, idb);
    };
    api._close = function(callback2) {
      idb.close();
      cachedDBs.delete(dbName);
      callback2();
    };
    api._getRevisionTree = function(docId, callback2) {
      var txnResult = openTransactionSafely(idb, [DOC_STORE], "readonly");
      if (txnResult.error) {
        return callback2(txnResult.error);
      }
      var txn = txnResult.txn;
      var req2 = txn.objectStore(DOC_STORE).get(docId);
      req2.onsuccess = function(event) {
        var doc = decodeMetadata(event.target.result);
        if (!doc) {
          callback2(createError(MISSING_DOC));
        } else {
          callback2(null, doc.rev_tree);
        }
      };
    };
    api._doCompaction = function(docId, revs, callback2) {
      var stores = [
        DOC_STORE,
        BY_SEQ_STORE,
        ATTACH_STORE,
        ATTACH_AND_SEQ_STORE
      ];
      var txnResult = openTransactionSafely(idb, stores, "readwrite");
      if (txnResult.error) {
        return callback2(txnResult.error);
      }
      var txn = txnResult.txn;
      var docStore = txn.objectStore(DOC_STORE);
      docStore.get(docId).onsuccess = function(event) {
        var metadata = decodeMetadata(event.target.result);
        traverseRevTree(metadata.rev_tree, function(isLeaf, pos, revHash, ctx, opts2) {
          var rev = pos + "-" + revHash;
          if (revs.indexOf(rev) !== -1) {
            opts2.status = "missing";
          }
        });
        compactRevs(revs, docId, txn);
        var winningRev$$1 = metadata.winningRev;
        var deleted = metadata.deleted;
        txn.objectStore(DOC_STORE).put(encodeMetadata(metadata, winningRev$$1, deleted));
      };
      txn.onabort = idbError(callback2);
      txn.oncomplete = function() {
        callback2();
      };
    };
    api._getLocal = function(id, callback2) {
      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], "readonly");
      if (txnResult.error) {
        return callback2(txnResult.error);
      }
      var tx = txnResult.txn;
      var req2 = tx.objectStore(LOCAL_STORE).get(id);
      req2.onerror = idbError(callback2);
      req2.onsuccess = function(e) {
        var doc = e.target.result;
        if (!doc) {
          callback2(createError(MISSING_DOC));
        } else {
          delete doc["_doc_id_rev"];
          callback2(null, doc);
        }
      };
    };
    api._putLocal = function(doc, opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      delete doc._revisions;
      var oldRev = doc._rev;
      var id = doc._id;
      if (!oldRev) {
        doc._rev = "0-1";
      } else {
        doc._rev = "0-" + (parseInt(oldRev.split("-")[1], 10) + 1);
      }
      var tx = opts2.ctx;
      var ret;
      if (!tx) {
        var txnResult = openTransactionSafely(idb, [LOCAL_STORE], "readwrite");
        if (txnResult.error) {
          return callback2(txnResult.error);
        }
        tx = txnResult.txn;
        tx.onerror = idbError(callback2);
        tx.oncomplete = function() {
          if (ret) {
            callback2(null, ret);
          }
        };
      }
      var oStore = tx.objectStore(LOCAL_STORE);
      var req2;
      if (oldRev) {
        req2 = oStore.get(id);
        req2.onsuccess = function(e) {
          var oldDoc = e.target.result;
          if (!oldDoc || oldDoc._rev !== oldRev) {
            callback2(createError(REV_CONFLICT));
          } else {
            var req3 = oStore.put(doc);
            req3.onsuccess = function() {
              ret = { ok: true, id: doc._id, rev: doc._rev };
              if (opts2.ctx) {
                callback2(null, ret);
              }
            };
          }
        };
      } else {
        req2 = oStore.add(doc);
        req2.onerror = function(e) {
          callback2(createError(REV_CONFLICT));
          e.preventDefault();
          e.stopPropagation();
        };
        req2.onsuccess = function() {
          ret = { ok: true, id: doc._id, rev: doc._rev };
          if (opts2.ctx) {
            callback2(null, ret);
          }
        };
      }
    };
    api._removeLocal = function(doc, opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      var tx = opts2.ctx;
      if (!tx) {
        var txnResult = openTransactionSafely(idb, [LOCAL_STORE], "readwrite");
        if (txnResult.error) {
          return callback2(txnResult.error);
        }
        tx = txnResult.txn;
        tx.oncomplete = function() {
          if (ret) {
            callback2(null, ret);
          }
        };
      }
      var ret;
      var id = doc._id;
      var oStore = tx.objectStore(LOCAL_STORE);
      var req2 = oStore.get(id);
      req2.onerror = idbError(callback2);
      req2.onsuccess = function(e) {
        var oldDoc = e.target.result;
        if (!oldDoc || oldDoc._rev !== doc._rev) {
          callback2(createError(MISSING_DOC));
        } else {
          oStore.delete(id);
          ret = { ok: true, id, rev: "0-0" };
          if (opts2.ctx) {
            callback2(null, ret);
          }
        }
      };
    };
    api._destroy = function(opts2, callback2) {
      changesHandler.removeAllListeners(dbName);
      var openReq = openReqList.get(dbName);
      if (openReq && openReq.result) {
        openReq.result.close();
        cachedDBs.delete(dbName);
      }
      var req2 = indexedDB.deleteDatabase(dbName);
      req2.onsuccess = function() {
        openReqList.delete(dbName);
        if (hasLocalStorage() && dbName in localStorage) {
          delete localStorage[dbName];
        }
        callback2(null, { "ok": true });
      };
      req2.onerror = idbError(callback2);
    };
    var cached = cachedDBs.get(dbName);
    if (cached) {
      idb = cached.idb;
      api._meta = cached.global;
      return (0, import_immediate.default)(function() {
        callback(null, api);
      });
    }
    var req = indexedDB.open(dbName, ADAPTER_VERSION);
    openReqList.set(dbName, req);
    req.onupgradeneeded = function(e) {
      var db2 = e.target.result;
      if (e.oldVersion < 1) {
        return createSchema(db2);
      }
      var txn = e.currentTarget.transaction;
      if (e.oldVersion < 3) {
        createLocalStoreSchema(db2);
      }
      if (e.oldVersion < 4) {
        addAttachAndSeqStore(db2);
      }
      var migrations = [
        addDeletedOrLocalIndex,
        migrateLocalStore,
        migrateAttsAndSeqs,
        migrateMetadata
      ];
      var i = e.oldVersion;
      function next() {
        var migration = migrations[i - 1];
        i++;
        if (migration) {
          migration(txn, next);
        }
      }
      next();
    };
    req.onsuccess = function(e) {
      idb = e.target.result;
      idb.onversionchange = function() {
        idb.close();
        cachedDBs.delete(dbName);
      };
      idb.onabort = function(e2) {
        guardedConsole("error", "Database has a global failure", e2.target.error);
        idbGlobalFailureError = e2.target.error;
        idb.close();
        cachedDBs.delete(dbName);
      };
      var txn = idb.transaction([
        META_STORE,
        DETECT_BLOB_SUPPORT_STORE,
        DOC_STORE
      ], "readwrite");
      var storedMetaDoc = false;
      var metaDoc;
      var docCount;
      var blobSupport;
      var instanceId;
      function completeSetup() {
        if (typeof blobSupport === "undefined" || !storedMetaDoc) {
          return;
        }
        api._meta = {
          name: dbName,
          instanceId,
          blobSupport
        };
        cachedDBs.set(dbName, {
          idb,
          global: api._meta
        });
        callback(null, api);
      }
      function storeMetaDocIfReady() {
        if (typeof docCount === "undefined" || typeof metaDoc === "undefined") {
          return;
        }
        var instanceKey = dbName + "_id";
        if (instanceKey in metaDoc) {
          instanceId = metaDoc[instanceKey];
        } else {
          metaDoc[instanceKey] = instanceId = uuid();
        }
        metaDoc.docCount = docCount;
        txn.objectStore(META_STORE).put(metaDoc);
      }
      txn.objectStore(META_STORE).get(META_STORE).onsuccess = function(e2) {
        metaDoc = e2.target.result || { id: META_STORE };
        storeMetaDocIfReady();
      };
      countDocs(txn, function(count) {
        docCount = count;
        storeMetaDocIfReady();
      });
      if (!blobSupportPromise) {
        blobSupportPromise = checkBlobSupport(txn);
      }
      blobSupportPromise.then(function(val) {
        blobSupport = val;
        completeSetup();
      });
      txn.oncomplete = function() {
        storedMetaDoc = true;
        completeSetup();
      };
      txn.onabort = idbError(callback);
    };
    req.onerror = function(e) {
      var msg = e.target.error && e.target.error.message;
      if (!msg) {
        msg = "Failed to open indexedDB, are you in private browsing mode?";
      } else if (msg.indexOf("stored database is a higher version") !== -1) {
        msg = new Error('This DB was created with the newer "indexeddb" adapter, but you are trying to open it with the older "idb" adapter');
      }
      guardedConsole("error", msg);
      callback(createError(IDB_ERROR, msg));
    };
  }
  IdbPouch.valid = function() {
    try {
      return typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
    } catch (e) {
      return false;
    }
  };
  function IDBPouch(PouchDB2) {
    PouchDB2.adapter("idb", IdbPouch, true);
  }
  function pool(promiseFactories, limit) {
    return new Promise(function(resolve, reject) {
      var running2 = 0;
      var current = 0;
      var done = 0;
      var len = promiseFactories.length;
      var err;
      function runNext() {
        running2++;
        promiseFactories[current++]().then(onSuccess, onError);
      }
      function doNext() {
        if (++done === len) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        } else {
          runNextBatch();
        }
      }
      function onSuccess() {
        running2--;
        doNext();
      }
      function onError(thisErr) {
        running2--;
        err = err || thisErr;
        doNext();
      }
      function runNextBatch() {
        while (running2 < limit && current < len) {
          runNext();
        }
      }
      runNextBatch();
    });
  }
  var CHANGES_BATCH_SIZE = 25;
  var MAX_SIMULTANEOUS_REVS = 50;
  var CHANGES_TIMEOUT_BUFFER = 5e3;
  var DEFAULT_HEARTBEAT = 1e4;
  var supportsBulkGetMap = {};
  function readAttachmentsAsBlobOrBuffer(row) {
    var doc = row.doc || row.ok;
    var atts = doc && doc._attachments;
    if (!atts) {
      return;
    }
    Object.keys(atts).forEach(function(filename) {
      var att = atts[filename];
      att.data = b64ToBluffer(att.data, att.content_type);
    });
  }
  function encodeDocId(id) {
    if (/^_design/.test(id)) {
      return "_design/" + encodeURIComponent(id.slice(8));
    }
    if (/^_local/.test(id)) {
      return "_local/" + encodeURIComponent(id.slice(7));
    }
    return encodeURIComponent(id);
  }
  function preprocessAttachments$1(doc) {
    if (!doc._attachments || !Object.keys(doc._attachments)) {
      return Promise.resolve();
    }
    return Promise.all(Object.keys(doc._attachments).map(function(key) {
      var attachment = doc._attachments[key];
      if (attachment.data && typeof attachment.data !== "string") {
        return new Promise(function(resolve) {
          blobToBase64(attachment.data, resolve);
        }).then(function(b64) {
          attachment.data = b64;
        });
      }
    }));
  }
  function hasUrlPrefix(opts) {
    if (!opts.prefix) {
      return false;
    }
    var protocol = parseUri(opts.prefix).protocol;
    return protocol === "http" || protocol === "https";
  }
  function getHost(name, opts) {
    if (hasUrlPrefix(opts)) {
      var dbName = opts.name.substr(opts.prefix.length);
      var prefix = opts.prefix.replace(/\/?$/, "/");
      name = prefix + encodeURIComponent(dbName);
    }
    var uri = parseUri(name);
    if (uri.user || uri.password) {
      uri.auth = { username: uri.user, password: uri.password };
    }
    var parts = uri.path.replace(/(^\/|\/$)/g, "").split("/");
    uri.db = parts.pop();
    if (uri.db.indexOf("%") === -1) {
      uri.db = encodeURIComponent(uri.db);
    }
    uri.path = parts.join("/");
    return uri;
  }
  function genDBUrl(opts, path) {
    return genUrl(opts, opts.db + "/" + path);
  }
  function genUrl(opts, path) {
    var pathDel = !opts.path ? "" : "/";
    return opts.protocol + "://" + opts.host + (opts.port ? ":" + opts.port : "") + "/" + opts.path + pathDel + path;
  }
  function paramsToStr(params) {
    return "?" + Object.keys(params).map(function(k) {
      return k + "=" + encodeURIComponent(params[k]);
    }).join("&");
  }
  function shouldCacheBust(opts) {
    var ua = typeof navigator !== "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "";
    var isIE = ua.indexOf("msie") !== -1;
    var isTrident = ua.indexOf("trident") !== -1;
    var isEdge = ua.indexOf("edge") !== -1;
    var isGET = !("method" in opts) || opts.method === "GET";
    return (isIE || isTrident || isEdge) && isGET;
  }
  function HttpPouch(opts, callback) {
    var api = this;
    var host = getHost(opts.name, opts);
    var dbUrl = genDBUrl(host, "");
    opts = clone(opts);
    var ourFetch = function(url, options) {
      options = options || {};
      options.headers = options.headers || new h();
      options.credentials = "include";
      if (opts.auth || host.auth) {
        var nAuth = opts.auth || host.auth;
        var str = nAuth.username + ":" + nAuth.password;
        var token = thisBtoa(unescape(encodeURIComponent(str)));
        options.headers.set("Authorization", "Basic " + token);
      }
      var headers = opts.headers || {};
      Object.keys(headers).forEach(function(key) {
        options.headers.append(key, headers[key]);
      });
      if (shouldCacheBust(options)) {
        url += (url.indexOf("?") === -1 ? "?" : "&") + "_nonce=" + Date.now();
      }
      var fetchFun = opts.fetch || f$1;
      return fetchFun(url, options);
    };
    function adapterFun$$1(name, fun) {
      return adapterFun(name, (0, import_argsarray.default)(function(args) {
        setup().then(function() {
          return fun.apply(this, args);
        }).catch(function(e) {
          var callback2 = args.pop();
          callback2(e);
        });
      })).bind(api);
    }
    function fetchJSON(url, options, callback2) {
      var result = {};
      options = options || {};
      options.headers = options.headers || new h();
      if (!options.headers.get("Content-Type")) {
        options.headers.set("Content-Type", "application/json");
      }
      if (!options.headers.get("Accept")) {
        options.headers.set("Accept", "application/json");
      }
      return ourFetch(url, options).then(function(response) {
        result.ok = response.ok;
        result.status = response.status;
        return response.json();
      }).then(function(json) {
        result.data = json;
        if (!result.ok) {
          result.data.status = result.status;
          var err = generateErrorFromResponse(result.data);
          if (callback2) {
            return callback2(err);
          } else {
            throw err;
          }
        }
        if (Array.isArray(result.data)) {
          result.data = result.data.map(function(v) {
            if (v.error || v.missing) {
              return generateErrorFromResponse(v);
            } else {
              return v;
            }
          });
        }
        if (callback2) {
          callback2(null, result.data);
        } else {
          return result;
        }
      });
    }
    var setupPromise;
    function setup() {
      if (opts.skip_setup) {
        return Promise.resolve();
      }
      if (setupPromise) {
        return setupPromise;
      }
      setupPromise = fetchJSON(dbUrl).catch(function(err) {
        if (err && err.status && err.status === 404) {
          explainError(404, "PouchDB is just detecting if the remote exists.");
          return fetchJSON(dbUrl, { method: "PUT" });
        } else {
          return Promise.reject(err);
        }
      }).catch(function(err) {
        if (err && err.status && err.status === 412) {
          return true;
        }
        return Promise.reject(err);
      });
      setupPromise.catch(function() {
        setupPromise = null;
      });
      return setupPromise;
    }
    (0, import_immediate.default)(function() {
      callback(null, api);
    });
    api._remote = true;
    api.type = function() {
      return "http";
    };
    api.id = adapterFun$$1("id", function(callback2) {
      ourFetch(genUrl(host, "")).then(function(response) {
        return response.json();
      }).catch(function() {
        return {};
      }).then(function(result) {
        var uuid$$1 = result && result.uuid ? result.uuid + host.db : genDBUrl(host, "");
        callback2(null, uuid$$1);
      });
    });
    api.compact = adapterFun$$1("compact", function(opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      opts2 = clone(opts2);
      fetchJSON(genDBUrl(host, "_compact"), { method: "POST" }).then(function() {
        function ping() {
          api.info(function(err, res) {
            if (res && !res.compact_running) {
              callback2(null, { ok: true });
            } else {
              setTimeout(ping, opts2.interval || 200);
            }
          });
        }
        ping();
      });
    });
    api.bulkGet = adapterFun("bulkGet", function(opts2, callback2) {
      var self2 = this;
      function doBulkGet(cb) {
        var params = {};
        if (opts2.revs) {
          params.revs = true;
        }
        if (opts2.attachments) {
          params.attachments = true;
        }
        if (opts2.latest) {
          params.latest = true;
        }
        fetchJSON(genDBUrl(host, "_bulk_get" + paramsToStr(params)), {
          method: "POST",
          body: JSON.stringify({ docs: opts2.docs })
        }).then(function(result) {
          if (opts2.attachments && opts2.binary) {
            result.data.results.forEach(function(res) {
              res.docs.forEach(readAttachmentsAsBlobOrBuffer);
            });
          }
          cb(null, result.data);
        }).catch(cb);
      }
      function doBulkGetShim() {
        var batchSize = MAX_SIMULTANEOUS_REVS;
        var numBatches = Math.ceil(opts2.docs.length / batchSize);
        var numDone = 0;
        var results = new Array(numBatches);
        function onResult(batchNum) {
          return function(err, res) {
            results[batchNum] = res.results;
            if (++numDone === numBatches) {
              callback2(null, { results: flatten(results) });
            }
          };
        }
        for (var i = 0; i < numBatches; i++) {
          var subOpts = pick(opts2, ["revs", "attachments", "binary", "latest"]);
          subOpts.docs = opts2.docs.slice(i * batchSize, Math.min(opts2.docs.length, (i + 1) * batchSize));
          bulkGet(self2, subOpts, onResult(i));
        }
      }
      var dbUrl2 = genUrl(host, "");
      var supportsBulkGet = supportsBulkGetMap[dbUrl2];
      if (typeof supportsBulkGet !== "boolean") {
        doBulkGet(function(err, res) {
          if (err) {
            supportsBulkGetMap[dbUrl2] = false;
            explainError(err.status, "PouchDB is just detecting if the remote supports the _bulk_get API.");
            doBulkGetShim();
          } else {
            supportsBulkGetMap[dbUrl2] = true;
            callback2(null, res);
          }
        });
      } else if (supportsBulkGet) {
        doBulkGet(callback2);
      } else {
        doBulkGetShim();
      }
    });
    api._info = function(callback2) {
      setup().then(function() {
        return ourFetch(genDBUrl(host, ""));
      }).then(function(response) {
        return response.json();
      }).then(function(info) {
        info.host = genDBUrl(host, "");
        callback2(null, info);
      }).catch(callback2);
    };
    api.fetch = function(path, options) {
      return setup().then(function() {
        var url = path.substring(0, 1) === "/" ? genUrl(host, path.substring(1)) : genDBUrl(host, path);
        return ourFetch(url, options);
      });
    };
    api.get = adapterFun$$1("get", function(id, opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      opts2 = clone(opts2);
      var params = {};
      if (opts2.revs) {
        params.revs = true;
      }
      if (opts2.revs_info) {
        params.revs_info = true;
      }
      if (opts2.latest) {
        params.latest = true;
      }
      if (opts2.open_revs) {
        if (opts2.open_revs !== "all") {
          opts2.open_revs = JSON.stringify(opts2.open_revs);
        }
        params.open_revs = opts2.open_revs;
      }
      if (opts2.rev) {
        params.rev = opts2.rev;
      }
      if (opts2.conflicts) {
        params.conflicts = opts2.conflicts;
      }
      if (opts2.update_seq) {
        params.update_seq = opts2.update_seq;
      }
      id = encodeDocId(id);
      function fetchAttachments(doc) {
        var atts = doc._attachments;
        var filenames = atts && Object.keys(atts);
        if (!atts || !filenames.length) {
          return;
        }
        function fetchData(filename) {
          var att = atts[filename];
          var path = encodeDocId(doc._id) + "/" + encodeAttachmentId(filename) + "?rev=" + doc._rev;
          return ourFetch(genDBUrl(host, path)).then(function(response) {
            if ("buffer" in response) {
              return response.buffer();
            } else {
              return response.blob();
            }
          }).then(function(blob) {
            if (opts2.binary) {
              var typeFieldDescriptor = Object.getOwnPropertyDescriptor(blob.__proto__, "type");
              if (!typeFieldDescriptor || typeFieldDescriptor.set) {
                blob.type = att.content_type;
              }
              return blob;
            }
            return new Promise(function(resolve) {
              blobToBase64(blob, resolve);
            });
          }).then(function(data) {
            delete att.stub;
            delete att.length;
            att.data = data;
          });
        }
        var promiseFactories = filenames.map(function(filename) {
          return function() {
            return fetchData(filename);
          };
        });
        return pool(promiseFactories, 5);
      }
      function fetchAllAttachments(docOrDocs) {
        if (Array.isArray(docOrDocs)) {
          return Promise.all(docOrDocs.map(function(doc) {
            if (doc.ok) {
              return fetchAttachments(doc.ok);
            }
          }));
        }
        return fetchAttachments(docOrDocs);
      }
      var url = genDBUrl(host, id + paramsToStr(params));
      fetchJSON(url).then(function(res) {
        return Promise.resolve().then(function() {
          if (opts2.attachments) {
            return fetchAllAttachments(res.data);
          }
        }).then(function() {
          callback2(null, res.data);
        });
      }).catch(function(e) {
        e.docId = id;
        callback2(e);
      });
    });
    api.remove = adapterFun$$1("remove", function(docOrId, optsOrRev, opts2, cb) {
      var doc;
      if (typeof optsOrRev === "string") {
        doc = {
          _id: docOrId,
          _rev: optsOrRev
        };
        if (typeof opts2 === "function") {
          cb = opts2;
          opts2 = {};
        }
      } else {
        doc = docOrId;
        if (typeof optsOrRev === "function") {
          cb = optsOrRev;
          opts2 = {};
        } else {
          cb = opts2;
          opts2 = optsOrRev;
        }
      }
      var rev = doc._rev || opts2.rev;
      var url = genDBUrl(host, encodeDocId(doc._id)) + "?rev=" + rev;
      fetchJSON(url, { method: "DELETE" }, cb).catch(cb);
    });
    function encodeAttachmentId(attachmentId) {
      return attachmentId.split("/").map(encodeURIComponent).join("/");
    }
    api.getAttachment = adapterFun$$1("getAttachment", function(docId, attachmentId, opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      var params = opts2.rev ? "?rev=" + opts2.rev : "";
      var url = genDBUrl(host, encodeDocId(docId)) + "/" + encodeAttachmentId(attachmentId) + params;
      var contentType;
      ourFetch(url, { method: "GET" }).then(function(response) {
        contentType = response.headers.get("content-type");
        if (!response.ok) {
          throw response;
        } else {
          if (typeof process !== "undefined" && !process.browser && typeof response.buffer === "function") {
            return response.buffer();
          } else {
            return response.blob();
          }
        }
      }).then(function(blob) {
        if (typeof process !== "undefined" && !process.browser) {
          blob.type = contentType;
        }
        callback2(null, blob);
      }).catch(function(err) {
        callback2(err);
      });
    });
    api.removeAttachment = adapterFun$$1("removeAttachment", function(docId, attachmentId, rev, callback2) {
      var url = genDBUrl(host, encodeDocId(docId) + "/" + encodeAttachmentId(attachmentId)) + "?rev=" + rev;
      fetchJSON(url, { method: "DELETE" }, callback2).catch(callback2);
    });
    api.putAttachment = adapterFun$$1("putAttachment", function(docId, attachmentId, rev, blob, type, callback2) {
      if (typeof type === "function") {
        callback2 = type;
        type = blob;
        blob = rev;
        rev = null;
      }
      var id = encodeDocId(docId) + "/" + encodeAttachmentId(attachmentId);
      var url = genDBUrl(host, id);
      if (rev) {
        url += "?rev=" + rev;
      }
      if (typeof blob === "string") {
        var binary;
        try {
          binary = thisAtob(blob);
        } catch (err) {
          return callback2(createError(BAD_ARG, "Attachment is not a valid base64 string"));
        }
        blob = binary ? binStringToBluffer(binary, type) : "";
      }
      fetchJSON(url, {
        headers: new h({ "Content-Type": type }),
        method: "PUT",
        body: blob
      }, callback2).catch(callback2);
    });
    api._bulkDocs = function(req, opts2, callback2) {
      req.new_edits = opts2.new_edits;
      setup().then(function() {
        return Promise.all(req.docs.map(preprocessAttachments$1));
      }).then(function() {
        return fetchJSON(genDBUrl(host, "_bulk_docs"), {
          method: "POST",
          body: JSON.stringify(req)
        }, callback2);
      }).catch(callback2);
    };
    api._put = function(doc, opts2, callback2) {
      setup().then(function() {
        return preprocessAttachments$1(doc);
      }).then(function() {
        return fetchJSON(genDBUrl(host, encodeDocId(doc._id)), {
          method: "PUT",
          body: JSON.stringify(doc)
        });
      }).then(function(result) {
        callback2(null, result.data);
      }).catch(function(err) {
        err.docId = doc && doc._id;
        callback2(err);
      });
    };
    api.allDocs = adapterFun$$1("allDocs", function(opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      opts2 = clone(opts2);
      var params = {};
      var body;
      var method = "GET";
      if (opts2.conflicts) {
        params.conflicts = true;
      }
      if (opts2.update_seq) {
        params.update_seq = true;
      }
      if (opts2.descending) {
        params.descending = true;
      }
      if (opts2.include_docs) {
        params.include_docs = true;
      }
      if (opts2.attachments) {
        params.attachments = true;
      }
      if (opts2.key) {
        params.key = JSON.stringify(opts2.key);
      }
      if (opts2.start_key) {
        opts2.startkey = opts2.start_key;
      }
      if (opts2.startkey) {
        params.startkey = JSON.stringify(opts2.startkey);
      }
      if (opts2.end_key) {
        opts2.endkey = opts2.end_key;
      }
      if (opts2.endkey) {
        params.endkey = JSON.stringify(opts2.endkey);
      }
      if (typeof opts2.inclusive_end !== "undefined") {
        params.inclusive_end = !!opts2.inclusive_end;
      }
      if (typeof opts2.limit !== "undefined") {
        params.limit = opts2.limit;
      }
      if (typeof opts2.skip !== "undefined") {
        params.skip = opts2.skip;
      }
      var paramStr = paramsToStr(params);
      if (typeof opts2.keys !== "undefined") {
        method = "POST";
        body = { keys: opts2.keys };
      }
      fetchJSON(genDBUrl(host, "_all_docs" + paramStr), {
        method,
        body: JSON.stringify(body)
      }).then(function(result) {
        if (opts2.include_docs && opts2.attachments && opts2.binary) {
          result.data.rows.forEach(readAttachmentsAsBlobOrBuffer);
        }
        callback2(null, result.data);
      }).catch(callback2);
    });
    api._changes = function(opts2) {
      var batchSize = "batch_size" in opts2 ? opts2.batch_size : CHANGES_BATCH_SIZE;
      opts2 = clone(opts2);
      if (opts2.continuous && !("heartbeat" in opts2)) {
        opts2.heartbeat = DEFAULT_HEARTBEAT;
      }
      var requestTimeout = "timeout" in opts2 ? opts2.timeout : 30 * 1e3;
      if ("timeout" in opts2 && opts2.timeout && requestTimeout - opts2.timeout < CHANGES_TIMEOUT_BUFFER) {
        requestTimeout = opts2.timeout + CHANGES_TIMEOUT_BUFFER;
      }
      if ("heartbeat" in opts2 && opts2.heartbeat && requestTimeout - opts2.heartbeat < CHANGES_TIMEOUT_BUFFER) {
        requestTimeout = opts2.heartbeat + CHANGES_TIMEOUT_BUFFER;
      }
      var params = {};
      if ("timeout" in opts2 && opts2.timeout) {
        params.timeout = opts2.timeout;
      }
      var limit = typeof opts2.limit !== "undefined" ? opts2.limit : false;
      var leftToFetch = limit;
      if (opts2.style) {
        params.style = opts2.style;
      }
      if (opts2.include_docs || opts2.filter && typeof opts2.filter === "function") {
        params.include_docs = true;
      }
      if (opts2.attachments) {
        params.attachments = true;
      }
      if (opts2.continuous) {
        params.feed = "longpoll";
      }
      if (opts2.seq_interval) {
        params.seq_interval = opts2.seq_interval;
      }
      if (opts2.conflicts) {
        params.conflicts = true;
      }
      if (opts2.descending) {
        params.descending = true;
      }
      if (opts2.update_seq) {
        params.update_seq = true;
      }
      if ("heartbeat" in opts2) {
        if (opts2.heartbeat) {
          params.heartbeat = opts2.heartbeat;
        }
      }
      if (opts2.filter && typeof opts2.filter === "string") {
        params.filter = opts2.filter;
      }
      if (opts2.view && typeof opts2.view === "string") {
        params.filter = "_view";
        params.view = opts2.view;
      }
      if (opts2.query_params && typeof opts2.query_params === "object") {
        for (var param_name in opts2.query_params) {
          if (Object.prototype.hasOwnProperty.call(opts2.query_params, param_name)) {
            params[param_name] = opts2.query_params[param_name];
          }
        }
      }
      var method = "GET";
      var body;
      if (opts2.doc_ids) {
        params.filter = "_doc_ids";
        method = "POST";
        body = { doc_ids: opts2.doc_ids };
      } else if (opts2.selector) {
        params.filter = "_selector";
        method = "POST";
        body = { selector: opts2.selector };
      }
      var controller = new a();
      var lastFetchedSeq;
      var fetchData = function(since, callback2) {
        if (opts2.aborted) {
          return;
        }
        params.since = since;
        if (typeof params.since === "object") {
          params.since = JSON.stringify(params.since);
        }
        if (opts2.descending) {
          if (limit) {
            params.limit = leftToFetch;
          }
        } else {
          params.limit = !limit || leftToFetch > batchSize ? batchSize : leftToFetch;
        }
        var url = genDBUrl(host, "_changes" + paramsToStr(params));
        var fetchOpts = {
          signal: controller.signal,
          method,
          body: JSON.stringify(body)
        };
        lastFetchedSeq = since;
        if (opts2.aborted) {
          return;
        }
        setup().then(function() {
          return fetchJSON(url, fetchOpts, callback2);
        }).catch(callback2);
      };
      var results = { results: [] };
      var fetched = function(err, res) {
        if (opts2.aborted) {
          return;
        }
        var raw_results_length = 0;
        if (res && res.results) {
          raw_results_length = res.results.length;
          results.last_seq = res.last_seq;
          var pending = null;
          var lastSeq = null;
          if (typeof res.pending === "number") {
            pending = res.pending;
          }
          if (typeof results.last_seq === "string" || typeof results.last_seq === "number") {
            lastSeq = results.last_seq;
          }
          var req = {};
          req.query = opts2.query_params;
          res.results = res.results.filter(function(c) {
            leftToFetch--;
            var ret = filterChange(opts2)(c);
            if (ret) {
              if (opts2.include_docs && opts2.attachments && opts2.binary) {
                readAttachmentsAsBlobOrBuffer(c);
              }
              if (opts2.return_docs) {
                results.results.push(c);
              }
              opts2.onChange(c, pending, lastSeq);
            }
            return ret;
          });
        } else if (err) {
          opts2.aborted = true;
          opts2.complete(err);
          return;
        }
        if (res && res.last_seq) {
          lastFetchedSeq = res.last_seq;
        }
        var finished = limit && leftToFetch <= 0 || res && raw_results_length < batchSize || opts2.descending;
        if (opts2.continuous && !(limit && leftToFetch <= 0) || !finished) {
          (0, import_immediate.default)(function() {
            fetchData(lastFetchedSeq, fetched);
          });
        } else {
          opts2.complete(null, results);
        }
      };
      fetchData(opts2.since || 0, fetched);
      return {
        cancel: function() {
          opts2.aborted = true;
          controller.abort();
        }
      };
    };
    api.revsDiff = adapterFun$$1("revsDiff", function(req, opts2, callback2) {
      if (typeof opts2 === "function") {
        callback2 = opts2;
        opts2 = {};
      }
      fetchJSON(genDBUrl(host, "_revs_diff"), {
        method: "POST",
        body: JSON.stringify(req)
      }, callback2).catch(callback2);
    });
    api._close = function(callback2) {
      callback2();
    };
    api._destroy = function(options, callback2) {
      fetchJSON(genDBUrl(host, ""), { method: "DELETE" }).then(function(json) {
        callback2(null, json);
      }).catch(function(err) {
        if (err.status === 404) {
          callback2(null, { ok: true });
        } else {
          callback2(err);
        }
      });
    };
  }
  HttpPouch.valid = function() {
    return true;
  };
  function HttpPouch$1(PouchDB2) {
    PouchDB2.adapter("http", HttpPouch, false);
    PouchDB2.adapter("https", HttpPouch, false);
  }
  function QueryParseError(message) {
    this.status = 400;
    this.name = "query_parse_error";
    this.message = message;
    this.error = true;
    try {
      Error.captureStackTrace(this, QueryParseError);
    } catch (e) {
    }
  }
  (0, import_inherits.default)(QueryParseError, Error);
  function NotFoundError(message) {
    this.status = 404;
    this.name = "not_found";
    this.message = message;
    this.error = true;
    try {
      Error.captureStackTrace(this, NotFoundError);
    } catch (e) {
    }
  }
  (0, import_inherits.default)(NotFoundError, Error);
  function BuiltInError(message) {
    this.status = 500;
    this.name = "invalid_value";
    this.message = message;
    this.error = true;
    try {
      Error.captureStackTrace(this, BuiltInError);
    } catch (e) {
    }
  }
  (0, import_inherits.default)(BuiltInError, Error);
  function promisedCallback(promise, callback) {
    if (callback) {
      promise.then(function(res) {
        (0, import_immediate.default)(function() {
          callback(null, res);
        });
      }, function(reason) {
        (0, import_immediate.default)(function() {
          callback(reason);
        });
      });
    }
    return promise;
  }
  function callbackify(fun) {
    return (0, import_argsarray.default)(function(args) {
      var cb = args.pop();
      var promise = fun.apply(this, args);
      if (typeof cb === "function") {
        promisedCallback(promise, cb);
      }
      return promise;
    });
  }
  function fin(promise, finalPromiseFactory) {
    return promise.then(function(res) {
      return finalPromiseFactory().then(function() {
        return res;
      });
    }, function(reason) {
      return finalPromiseFactory().then(function() {
        throw reason;
      });
    });
  }
  function sequentialize(queue2, promiseFactory) {
    return function() {
      var args = arguments;
      var that = this;
      return queue2.add(function() {
        return promiseFactory.apply(that, args);
      });
    };
  }
  function uniq(arr) {
    var theSet = new ExportedSet(arr);
    var result = new Array(theSet.size);
    var index = -1;
    theSet.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  function mapToKeysArray(map) {
    var result = new Array(map.size);
    var index = -1;
    map.forEach(function(value, key) {
      result[++index] = key;
    });
    return result;
  }
  function createBuiltInError(name) {
    var message = "builtin " + name + " function requires map values to be numbers or number arrays";
    return new BuiltInError(message);
  }
  function sum(values) {
    var result = 0;
    for (var i = 0, len = values.length; i < len; i++) {
      var num = values[i];
      if (typeof num !== "number") {
        if (Array.isArray(num)) {
          result = typeof result === "number" ? [result] : result;
          for (var j = 0, jLen = num.length; j < jLen; j++) {
            var jNum = num[j];
            if (typeof jNum !== "number") {
              throw createBuiltInError("_sum");
            } else if (typeof result[j] === "undefined") {
              result.push(jNum);
            } else {
              result[j] += jNum;
            }
          }
        } else {
          throw createBuiltInError("_sum");
        }
      } else if (typeof result === "number") {
        result += num;
      } else {
        result[0] += num;
      }
    }
    return result;
  }
  var log = guardedConsole.bind(null, "log");
  var isArray = Array.isArray;
  var toJSON = JSON.parse;
  function evalFunctionWithEval(func, emit) {
    return scopeEval("return (" + func.replace(/;\s*$/, "") + ");", {
      emit,
      sum,
      log,
      isArray,
      toJSON
    });
  }
  function TaskQueue$1() {
    this.promise = new Promise(function(fulfill) {
      fulfill();
    });
  }
  TaskQueue$1.prototype.add = function(promiseFactory) {
    this.promise = this.promise.catch(function() {
    }).then(function() {
      return promiseFactory();
    });
    return this.promise;
  };
  TaskQueue$1.prototype.finish = function() {
    return this.promise;
  };
  function stringify2(input) {
    if (!input) {
      return "undefined";
    }
    switch (typeof input) {
      case "function":
        return input.toString();
      case "string":
        return input.toString();
      default:
        return JSON.stringify(input);
    }
  }
  function createViewSignature(mapFun, reduceFun) {
    return stringify2(mapFun) + stringify2(reduceFun) + "undefined";
  }
  function createView(sourceDB, viewName, mapFun, reduceFun, temporary, localDocName2) {
    var viewSignature = createViewSignature(mapFun, reduceFun);
    var cachedViews;
    if (!temporary) {
      cachedViews = sourceDB._cachedViews = sourceDB._cachedViews || {};
      if (cachedViews[viewSignature]) {
        return cachedViews[viewSignature];
      }
    }
    var promiseForView = sourceDB.info().then(function(info) {
      var depDbName = info.db_name + "-mrview-" + (temporary ? "temp" : stringMd5(viewSignature));
      function diffFunction(doc) {
        doc.views = doc.views || {};
        var fullViewName = viewName;
        if (fullViewName.indexOf("/") === -1) {
          fullViewName = viewName + "/" + viewName;
        }
        var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};
        if (depDbs[depDbName]) {
          return;
        }
        depDbs[depDbName] = true;
        return doc;
      }
      return upsert(sourceDB, "_local/" + localDocName2, diffFunction).then(function() {
        return sourceDB.registerDependentDatabase(depDbName).then(function(res) {
          var db2 = res.db;
          db2.auto_compaction = true;
          var view = {
            name: depDbName,
            db: db2,
            sourceDB,
            adapter: sourceDB.adapter,
            mapFun,
            reduceFun
          };
          return view.db.get("_local/lastSeq").catch(function(err) {
            if (err.status !== 404) {
              throw err;
            }
          }).then(function(lastSeqDoc) {
            view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;
            if (cachedViews) {
              view.db.once("destroyed", function() {
                delete cachedViews[viewSignature];
              });
            }
            return view;
          });
        });
      });
    });
    if (cachedViews) {
      cachedViews[viewSignature] = promiseForView;
    }
    return promiseForView;
  }
  var persistentQueues = {};
  var tempViewQueue = new TaskQueue$1();
  var CHANGES_BATCH_SIZE$1 = 50;
  function parseViewName(name) {
    return name.indexOf("/") === -1 ? [name, name] : name.split("/");
  }
  function isGenOne(changes2) {
    return changes2.length === 1 && /^1-/.test(changes2[0].rev);
  }
  function emitError(db2, e) {
    try {
      db2.emit("error", e);
    } catch (err) {
      guardedConsole("error", "The user's map/reduce function threw an uncaught error.\nYou can debug this error by doing:\nmyDatabase.on('error', function (err) { debugger; });\nPlease double-check your map/reduce function.");
      guardedConsole("error", e);
    }
  }
  function createAbstractMapReduce(localDocName2, mapper2, reducer2, ddocValidator2) {
    function tryMap(db2, fun, doc) {
      try {
        fun(doc);
      } catch (e) {
        emitError(db2, e);
      }
    }
    function tryReduce(db2, fun, keys2, values, rereduce) {
      try {
        return { output: fun(keys2, values, rereduce) };
      } catch (e) {
        emitError(db2, e);
        return { error: e };
      }
    }
    function sortByKeyThenValue(x, y) {
      var keyCompare = collate(x.key, y.key);
      return keyCompare !== 0 ? keyCompare : collate(x.value, y.value);
    }
    function sliceResults(results, limit, skip) {
      skip = skip || 0;
      if (typeof limit === "number") {
        return results.slice(skip, limit + skip);
      } else if (skip > 0) {
        return results.slice(skip);
      }
      return results;
    }
    function rowToDocId(row) {
      var val = row.value;
      var docId = val && typeof val === "object" && val._id || row.id;
      return docId;
    }
    function readAttachmentsAsBlobOrBuffer2(res) {
      res.rows.forEach(function(row) {
        var atts = row.doc && row.doc._attachments;
        if (!atts) {
          return;
        }
        Object.keys(atts).forEach(function(filename) {
          var att = atts[filename];
          atts[filename].data = b64ToBluffer(att.data, att.content_type);
        });
      });
    }
    function postprocessAttachments(opts) {
      return function(res) {
        if (opts.include_docs && opts.attachments && opts.binary) {
          readAttachmentsAsBlobOrBuffer2(res);
        }
        return res;
      };
    }
    function addHttpParam(paramName, opts, params, asJson) {
      var val = opts[paramName];
      if (typeof val !== "undefined") {
        if (asJson) {
          val = encodeURIComponent(JSON.stringify(val));
        }
        params.push(paramName + "=" + val);
      }
    }
    function coerceInteger(integerCandidate) {
      if (typeof integerCandidate !== "undefined") {
        var asNumber = Number(integerCandidate);
        if (!isNaN(asNumber) && asNumber === parseInt(integerCandidate, 10)) {
          return asNumber;
        } else {
          return integerCandidate;
        }
      }
    }
    function coerceOptions(opts) {
      opts.group_level = coerceInteger(opts.group_level);
      opts.limit = coerceInteger(opts.limit);
      opts.skip = coerceInteger(opts.skip);
      return opts;
    }
    function checkPositiveInteger(number) {
      if (number) {
        if (typeof number !== "number") {
          return new QueryParseError('Invalid value for integer: "' + number + '"');
        }
        if (number < 0) {
          return new QueryParseError('Invalid value for positive integer: "' + number + '"');
        }
      }
    }
    function checkQueryParseError(options, fun) {
      var startkeyName = options.descending ? "endkey" : "startkey";
      var endkeyName = options.descending ? "startkey" : "endkey";
      if (typeof options[startkeyName] !== "undefined" && typeof options[endkeyName] !== "undefined" && collate(options[startkeyName], options[endkeyName]) > 0) {
        throw new QueryParseError("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
      } else if (fun.reduce && options.reduce !== false) {
        if (options.include_docs) {
          throw new QueryParseError("{include_docs:true} is invalid for reduce");
        } else if (options.keys && options.keys.length > 1 && !options.group && !options.group_level) {
          throw new QueryParseError("Multi-key fetches for reduce views must use {group: true}");
        }
      }
      ["group_level", "limit", "skip"].forEach(function(optionName) {
        var error = checkPositiveInteger(options[optionName]);
        if (error) {
          throw error;
        }
      });
    }
    function httpQuery(db2, fun, opts) {
      var params = [];
      var body;
      var method = "GET";
      var ok, status;
      addHttpParam("reduce", opts, params);
      addHttpParam("include_docs", opts, params);
      addHttpParam("attachments", opts, params);
      addHttpParam("limit", opts, params);
      addHttpParam("descending", opts, params);
      addHttpParam("group", opts, params);
      addHttpParam("group_level", opts, params);
      addHttpParam("skip", opts, params);
      addHttpParam("stale", opts, params);
      addHttpParam("conflicts", opts, params);
      addHttpParam("startkey", opts, params, true);
      addHttpParam("start_key", opts, params, true);
      addHttpParam("endkey", opts, params, true);
      addHttpParam("end_key", opts, params, true);
      addHttpParam("inclusive_end", opts, params);
      addHttpParam("key", opts, params, true);
      addHttpParam("update_seq", opts, params);
      params = params.join("&");
      params = params === "" ? "" : "?" + params;
      if (typeof opts.keys !== "undefined") {
        var MAX_URL_LENGTH = 2e3;
        var keysAsString = "keys=" + encodeURIComponent(JSON.stringify(opts.keys));
        if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {
          params += (params[0] === "?" ? "&" : "?") + keysAsString;
        } else {
          method = "POST";
          if (typeof fun === "string") {
            body = { keys: opts.keys };
          } else {
            fun.keys = opts.keys;
          }
        }
      }
      if (typeof fun === "string") {
        var parts = parseViewName(fun);
        return db2.fetch("_design/" + parts[0] + "/_view/" + parts[1] + params, {
          headers: new h({ "Content-Type": "application/json" }),
          method,
          body: JSON.stringify(body)
        }).then(function(response) {
          ok = response.ok;
          status = response.status;
          return response.json();
        }).then(function(result) {
          if (!ok) {
            result.status = status;
            throw generateErrorFromResponse(result);
          }
          result.rows.forEach(function(row) {
            if (row.value && row.value.error && row.value.error === "builtin_reduce_error") {
              throw new Error(row.reason);
            }
          });
          return result;
        }).then(postprocessAttachments(opts));
      }
      body = body || {};
      Object.keys(fun).forEach(function(key) {
        if (Array.isArray(fun[key])) {
          body[key] = fun[key];
        } else {
          body[key] = fun[key].toString();
        }
      });
      return db2.fetch("_temp_view" + params, {
        headers: new h({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify(body)
      }).then(function(response) {
        ok = response.ok;
        status = response.status;
        return response.json();
      }).then(function(result) {
        if (!ok) {
          result.status = status;
          throw generateErrorFromResponse(result);
        }
        return result;
      }).then(postprocessAttachments(opts));
    }
    function customQuery(db2, fun, opts) {
      return new Promise(function(resolve, reject) {
        db2._query(fun, opts, function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
      });
    }
    function customViewCleanup(db2) {
      return new Promise(function(resolve, reject) {
        db2._viewCleanup(function(err, res) {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
      });
    }
    function defaultsTo(value) {
      return function(reason) {
        if (reason.status === 404) {
          return value;
        } else {
          throw reason;
        }
      };
    }
    function getDocsToPersist(docId, view, docIdsToChangesAndEmits) {
      var metaDocId = "_local/doc_" + docId;
      var defaultMetaDoc = { _id: metaDocId, keys: [] };
      var docData = docIdsToChangesAndEmits.get(docId);
      var indexableKeysToKeyValues = docData[0];
      var changes2 = docData[1];
      function getMetaDoc() {
        if (isGenOne(changes2)) {
          return Promise.resolve(defaultMetaDoc);
        }
        return view.db.get(metaDocId).catch(defaultsTo(defaultMetaDoc));
      }
      function getKeyValueDocs(metaDoc) {
        if (!metaDoc.keys.length) {
          return Promise.resolve({ rows: [] });
        }
        return view.db.allDocs({
          keys: metaDoc.keys,
          include_docs: true
        });
      }
      function processKeyValueDocs(metaDoc, kvDocsRes) {
        var kvDocs = [];
        var oldKeys = new ExportedSet();
        for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {
          var row = kvDocsRes.rows[i];
          var doc = row.doc;
          if (!doc) {
            continue;
          }
          kvDocs.push(doc);
          oldKeys.add(doc._id);
          doc._deleted = !indexableKeysToKeyValues.has(doc._id);
          if (!doc._deleted) {
            var keyValue = indexableKeysToKeyValues.get(doc._id);
            if ("value" in keyValue) {
              doc.value = keyValue.value;
            }
          }
        }
        var newKeys = mapToKeysArray(indexableKeysToKeyValues);
        newKeys.forEach(function(key) {
          if (!oldKeys.has(key)) {
            var kvDoc = {
              _id: key
            };
            var keyValue2 = indexableKeysToKeyValues.get(key);
            if ("value" in keyValue2) {
              kvDoc.value = keyValue2.value;
            }
            kvDocs.push(kvDoc);
          }
        });
        metaDoc.keys = uniq(newKeys.concat(metaDoc.keys));
        kvDocs.push(metaDoc);
        return kvDocs;
      }
      return getMetaDoc().then(function(metaDoc) {
        return getKeyValueDocs(metaDoc).then(function(kvDocsRes) {
          return processKeyValueDocs(metaDoc, kvDocsRes);
        });
      });
    }
    function saveKeyValues(view, docIdsToChangesAndEmits, seq) {
      var seqDocId = "_local/lastSeq";
      return view.db.get(seqDocId).catch(defaultsTo({ _id: seqDocId, seq: 0 })).then(function(lastSeqDoc) {
        var docIds = mapToKeysArray(docIdsToChangesAndEmits);
        return Promise.all(docIds.map(function(docId) {
          return getDocsToPersist(docId, view, docIdsToChangesAndEmits);
        })).then(function(listOfDocsToPersist) {
          var docsToPersist = flatten(listOfDocsToPersist);
          lastSeqDoc.seq = seq;
          docsToPersist.push(lastSeqDoc);
          return view.db.bulkDocs({ docs: docsToPersist });
        });
      });
    }
    function getQueue(view) {
      var viewName = typeof view === "string" ? view : view.name;
      var queue2 = persistentQueues[viewName];
      if (!queue2) {
        queue2 = persistentQueues[viewName] = new TaskQueue$1();
      }
      return queue2;
    }
    function updateView(view, opts) {
      return sequentialize(getQueue(view), function() {
        return updateViewInQueue(view, opts);
      })();
    }
    function updateViewInQueue(view, opts) {
      var mapResults;
      var doc;
      function emit(key, value) {
        var output = { id: doc._id, key: normalizeKey(key) };
        if (typeof value !== "undefined" && value !== null) {
          output.value = normalizeKey(value);
        }
        mapResults.push(output);
      }
      var mapFun = mapper2(view.mapFun, emit);
      var currentSeq = view.seq || 0;
      function processChange2(docIdsToChangesAndEmits, seq) {
        return function() {
          return saveKeyValues(view, docIdsToChangesAndEmits, seq);
        };
      }
      let indexed_docs = 0;
      let progress = {
        view: view.name,
        indexed_docs
      };
      view.sourceDB.emit("indexing", progress);
      var queue2 = new TaskQueue$1();
      function processNextBatch() {
        return view.sourceDB.changes({
          return_docs: true,
          conflicts: true,
          include_docs: true,
          style: "all_docs",
          since: currentSeq,
          limit: opts.changes_batch_size
        }).then(processBatch);
      }
      function processBatch(response) {
        var results = response.results;
        if (!results.length) {
          return;
        }
        var docIdsToChangesAndEmits = createDocIdsToChangesAndEmits(results);
        queue2.add(processChange2(docIdsToChangesAndEmits, currentSeq));
        indexed_docs = indexed_docs + results.length;
        let progress2 = {
          view: view.name,
          last_seq: response.last_seq,
          results_count: results.length,
          indexed_docs
        };
        view.sourceDB.emit("indexing", progress2);
        if (results.length < opts.changes_batch_size) {
          return;
        }
        return processNextBatch();
      }
      function createDocIdsToChangesAndEmits(results) {
        var docIdsToChangesAndEmits = new ExportedMap();
        for (var i = 0, len = results.length; i < len; i++) {
          var change = results[i];
          if (change.doc._id[0] !== "_") {
            mapResults = [];
            doc = change.doc;
            if (!doc._deleted) {
              tryMap(view.sourceDB, mapFun, doc);
            }
            mapResults.sort(sortByKeyThenValue);
            var indexableKeysToKeyValues = createIndexableKeysToKeyValues(mapResults);
            docIdsToChangesAndEmits.set(change.doc._id, [
              indexableKeysToKeyValues,
              change.changes
            ]);
          }
          currentSeq = change.seq;
        }
        return docIdsToChangesAndEmits;
      }
      function createIndexableKeysToKeyValues(mapResults2) {
        var indexableKeysToKeyValues = new ExportedMap();
        var lastKey;
        for (var i = 0, len = mapResults2.length; i < len; i++) {
          var emittedKeyValue = mapResults2[i];
          var complexKey = [emittedKeyValue.key, emittedKeyValue.id];
          if (i > 0 && collate(emittedKeyValue.key, lastKey) === 0) {
            complexKey.push(i);
          }
          indexableKeysToKeyValues.set(toIndexableString(complexKey), emittedKeyValue);
          lastKey = emittedKeyValue.key;
        }
        return indexableKeysToKeyValues;
      }
      return processNextBatch().then(function() {
        return queue2.finish();
      }).then(function() {
        view.seq = currentSeq;
      });
    }
    function reduceView(view, results, options) {
      if (options.group_level === 0) {
        delete options.group_level;
      }
      var shouldGroup = options.group || options.group_level;
      var reduceFun = reducer2(view.reduceFun);
      var groups = [];
      var lvl = isNaN(options.group_level) ? Number.POSITIVE_INFINITY : options.group_level;
      results.forEach(function(e2) {
        var last = groups[groups.length - 1];
        var groupKey = shouldGroup ? e2.key : null;
        if (shouldGroup && Array.isArray(groupKey)) {
          groupKey = groupKey.slice(0, lvl);
        }
        if (last && collate(last.groupKey, groupKey) === 0) {
          last.keys.push([e2.key, e2.id]);
          last.values.push(e2.value);
          return;
        }
        groups.push({
          keys: [[e2.key, e2.id]],
          values: [e2.value],
          groupKey
        });
      });
      results = [];
      for (var i = 0, len = groups.length; i < len; i++) {
        var e = groups[i];
        var reduceTry = tryReduce(view.sourceDB, reduceFun, e.keys, e.values, false);
        if (reduceTry.error && reduceTry.error instanceof BuiltInError) {
          throw reduceTry.error;
        }
        results.push({
          value: reduceTry.error ? null : reduceTry.output,
          key: e.groupKey
        });
      }
      return { rows: sliceResults(results, options.limit, options.skip) };
    }
    function queryView(view, opts) {
      return sequentialize(getQueue(view), function() {
        return queryViewInQueue(view, opts);
      })();
    }
    function queryViewInQueue(view, opts) {
      var totalRows;
      var shouldReduce = view.reduceFun && opts.reduce !== false;
      var skip = opts.skip || 0;
      if (typeof opts.keys !== "undefined" && !opts.keys.length) {
        opts.limit = 0;
        delete opts.keys;
      }
      function fetchFromView(viewOpts2) {
        viewOpts2.include_docs = true;
        return view.db.allDocs(viewOpts2).then(function(res) {
          totalRows = res.total_rows;
          return res.rows.map(function(result) {
            if ("value" in result.doc && typeof result.doc.value === "object" && result.doc.value !== null) {
              var keys3 = Object.keys(result.doc.value).sort();
              var expectedKeys = ["id", "key", "value"];
              if (!(keys3 < expectedKeys || keys3 > expectedKeys)) {
                return result.doc.value;
              }
            }
            var parsedKeyAndDocId = parseIndexableString(result.doc._id);
            return {
              key: parsedKeyAndDocId[0],
              id: parsedKeyAndDocId[1],
              value: "value" in result.doc ? result.doc.value : null
            };
          });
        });
      }
      function onMapResultsReady(rows) {
        var finalResults;
        if (shouldReduce) {
          finalResults = reduceView(view, rows, opts);
        } else if (typeof opts.keys === "undefined") {
          finalResults = {
            total_rows: totalRows,
            offset: skip,
            rows
          };
        } else {
          finalResults = {
            total_rows: totalRows,
            offset: skip,
            rows: sliceResults(rows, opts.limit, opts.skip)
          };
        }
        if (opts.update_seq) {
          finalResults.update_seq = view.seq;
        }
        if (opts.include_docs) {
          var docIds = uniq(rows.map(rowToDocId));
          return view.sourceDB.allDocs({
            keys: docIds,
            include_docs: true,
            conflicts: opts.conflicts,
            attachments: opts.attachments,
            binary: opts.binary
          }).then(function(allDocsRes) {
            var docIdsToDocs = new ExportedMap();
            allDocsRes.rows.forEach(function(row) {
              docIdsToDocs.set(row.id, row.doc);
            });
            rows.forEach(function(row) {
              var docId = rowToDocId(row);
              var doc = docIdsToDocs.get(docId);
              if (doc) {
                row.doc = doc;
              }
            });
            return finalResults;
          });
        } else {
          return finalResults;
        }
      }
      if (typeof opts.keys !== "undefined") {
        var keys2 = opts.keys;
        var fetchPromises = keys2.map(function(key) {
          var viewOpts2 = {
            startkey: toIndexableString([key]),
            endkey: toIndexableString([key, {}])
          };
          if (opts.update_seq) {
            viewOpts2.update_seq = true;
          }
          return fetchFromView(viewOpts2);
        });
        return Promise.all(fetchPromises).then(flatten).then(onMapResultsReady);
      } else {
        var viewOpts = {
          descending: opts.descending
        };
        if (opts.update_seq) {
          viewOpts.update_seq = true;
        }
        var startkey;
        var endkey;
        if ("start_key" in opts) {
          startkey = opts.start_key;
        }
        if ("startkey" in opts) {
          startkey = opts.startkey;
        }
        if ("end_key" in opts) {
          endkey = opts.end_key;
        }
        if ("endkey" in opts) {
          endkey = opts.endkey;
        }
        if (typeof startkey !== "undefined") {
          viewOpts.startkey = opts.descending ? toIndexableString([startkey, {}]) : toIndexableString([startkey]);
        }
        if (typeof endkey !== "undefined") {
          var inclusiveEnd = opts.inclusive_end !== false;
          if (opts.descending) {
            inclusiveEnd = !inclusiveEnd;
          }
          viewOpts.endkey = toIndexableString(inclusiveEnd ? [endkey, {}] : [endkey]);
        }
        if (typeof opts.key !== "undefined") {
          var keyStart = toIndexableString([opts.key]);
          var keyEnd = toIndexableString([opts.key, {}]);
          if (viewOpts.descending) {
            viewOpts.endkey = keyStart;
            viewOpts.startkey = keyEnd;
          } else {
            viewOpts.startkey = keyStart;
            viewOpts.endkey = keyEnd;
          }
        }
        if (!shouldReduce) {
          if (typeof opts.limit === "number") {
            viewOpts.limit = opts.limit;
          }
          viewOpts.skip = skip;
        }
        return fetchFromView(viewOpts).then(onMapResultsReady);
      }
    }
    function httpViewCleanup(db2) {
      return db2.fetch("_view_cleanup", {
        headers: new h({ "Content-Type": "application/json" }),
        method: "POST"
      }).then(function(response) {
        return response.json();
      });
    }
    function localViewCleanup(db2) {
      return db2.get("_local/" + localDocName2).then(function(metaDoc) {
        var docsToViews = new ExportedMap();
        Object.keys(metaDoc.views).forEach(function(fullViewName) {
          var parts = parseViewName(fullViewName);
          var designDocName = "_design/" + parts[0];
          var viewName = parts[1];
          var views = docsToViews.get(designDocName);
          if (!views) {
            views = new ExportedSet();
            docsToViews.set(designDocName, views);
          }
          views.add(viewName);
        });
        var opts = {
          keys: mapToKeysArray(docsToViews),
          include_docs: true
        };
        return db2.allDocs(opts).then(function(res) {
          var viewsToStatus = {};
          res.rows.forEach(function(row) {
            var ddocName = row.key.substring(8);
            docsToViews.get(row.key).forEach(function(viewName) {
              var fullViewName = ddocName + "/" + viewName;
              if (!metaDoc.views[fullViewName]) {
                fullViewName = viewName;
              }
              var viewDBNames = Object.keys(metaDoc.views[fullViewName]);
              var statusIsGood = row.doc && row.doc.views && row.doc.views[viewName];
              viewDBNames.forEach(function(viewDBName) {
                viewsToStatus[viewDBName] = viewsToStatus[viewDBName] || statusIsGood;
              });
            });
          });
          var dbsToDelete = Object.keys(viewsToStatus).filter(function(viewDBName) {
            return !viewsToStatus[viewDBName];
          });
          var destroyPromises = dbsToDelete.map(function(viewDBName) {
            return sequentialize(getQueue(viewDBName), function() {
              return new db2.constructor(viewDBName, db2.__opts).destroy();
            })();
          });
          return Promise.all(destroyPromises).then(function() {
            return { ok: true };
          });
        });
      }, defaultsTo({ ok: true }));
    }
    function queryPromised(db2, fun, opts) {
      if (typeof db2._query === "function") {
        return customQuery(db2, fun, opts);
      }
      if (isRemote(db2)) {
        return httpQuery(db2, fun, opts);
      }
      var updateViewOpts = {
        changes_batch_size: db2.__opts.view_update_changes_batch_size || CHANGES_BATCH_SIZE$1
      };
      if (typeof fun !== "string") {
        checkQueryParseError(opts, fun);
        tempViewQueue.add(function() {
          var createViewPromise = createView(db2, "temp_view/temp_view", fun.map, fun.reduce, true, localDocName2);
          return createViewPromise.then(function(view) {
            return fin(updateView(view, updateViewOpts).then(function() {
              return queryView(view, opts);
            }), function() {
              return view.db.destroy();
            });
          });
        });
        return tempViewQueue.finish();
      } else {
        var fullViewName = fun;
        var parts = parseViewName(fullViewName);
        var designDocName = parts[0];
        var viewName = parts[1];
        return db2.get("_design/" + designDocName).then(function(doc) {
          var fun2 = doc.views && doc.views[viewName];
          if (!fun2) {
            throw new NotFoundError("ddoc " + doc._id + " has no view named " + viewName);
          }
          ddocValidator2(doc, viewName);
          checkQueryParseError(opts, fun2);
          var createViewPromise = createView(db2, fullViewName, fun2.map, fun2.reduce, false, localDocName2);
          return createViewPromise.then(function(view) {
            if (opts.stale === "ok" || opts.stale === "update_after") {
              if (opts.stale === "update_after") {
                (0, import_immediate.default)(function() {
                  updateView(view, updateViewOpts);
                });
              }
              return queryView(view, opts);
            } else {
              return updateView(view, updateViewOpts).then(function() {
                return queryView(view, opts);
              });
            }
          });
        });
      }
    }
    function abstractQuery(fun, opts, callback) {
      var db2 = this;
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      opts = opts ? coerceOptions(opts) : {};
      if (typeof fun === "function") {
        fun = { map: fun };
      }
      var promise = Promise.resolve().then(function() {
        return queryPromised(db2, fun, opts);
      });
      promisedCallback(promise, callback);
      return promise;
    }
    var abstractViewCleanup = callbackify(function() {
      var db2 = this;
      if (typeof db2._viewCleanup === "function") {
        return customViewCleanup(db2);
      }
      if (isRemote(db2)) {
        return httpViewCleanup(db2);
      }
      return localViewCleanup(db2);
    });
    return {
      query: abstractQuery,
      viewCleanup: abstractViewCleanup
    };
  }
  var builtInReduce = {
    _sum: function(keys2, values) {
      return sum(values);
    },
    _count: function(keys2, values) {
      return values.length;
    },
    _stats: function(keys2, values) {
      function sumsqr(values2) {
        var _sumsqr = 0;
        for (var i = 0, len = values2.length; i < len; i++) {
          var num = values2[i];
          _sumsqr += num * num;
        }
        return _sumsqr;
      }
      return {
        sum: sum(values),
        min: Math.min.apply(null, values),
        max: Math.max.apply(null, values),
        count: values.length,
        sumsqr: sumsqr(values)
      };
    }
  };
  function getBuiltIn(reduceFunString) {
    if (/^_sum/.test(reduceFunString)) {
      return builtInReduce._sum;
    } else if (/^_count/.test(reduceFunString)) {
      return builtInReduce._count;
    } else if (/^_stats/.test(reduceFunString)) {
      return builtInReduce._stats;
    } else if (/^_/.test(reduceFunString)) {
      throw new Error(reduceFunString + " is not a supported reduce function.");
    }
  }
  function mapper(mapFun, emit) {
    if (typeof mapFun === "function" && mapFun.length === 2) {
      var origMap = mapFun;
      return function(doc) {
        return origMap(doc, emit);
      };
    } else {
      return evalFunctionWithEval(mapFun.toString(), emit);
    }
  }
  function reducer(reduceFun) {
    var reduceFunString = reduceFun.toString();
    var builtIn = getBuiltIn(reduceFunString);
    if (builtIn) {
      return builtIn;
    } else {
      return evalFunctionWithEval(reduceFunString);
    }
  }
  function ddocValidator(ddoc, viewName) {
    var fun = ddoc.views && ddoc.views[viewName];
    if (typeof fun.map !== "string") {
      throw new NotFoundError("ddoc " + ddoc._id + " has no string view named " + viewName + ", instead found object of type: " + typeof fun.map);
    }
  }
  var localDocName = "mrviews";
  var abstract = createAbstractMapReduce(localDocName, mapper, reducer, ddocValidator);
  function query(fun, opts, callback) {
    return abstract.query.call(this, fun, opts, callback);
  }
  function viewCleanup(callback) {
    return abstract.viewCleanup.call(this, callback);
  }
  var mapreduce = {
    query,
    viewCleanup
  };
  function isGenOne$1(rev) {
    return /^1-/.test(rev);
  }
  function fileHasChanged(localDoc, remoteDoc, filename) {
    return !localDoc._attachments || !localDoc._attachments[filename] || localDoc._attachments[filename].digest !== remoteDoc._attachments[filename].digest;
  }
  function getDocAttachments(db2, doc) {
    var filenames = Object.keys(doc._attachments);
    return Promise.all(filenames.map(function(filename) {
      return db2.getAttachment(doc._id, filename, { rev: doc._rev });
    }));
  }
  function getDocAttachmentsFromTargetOrSource(target, src, doc) {
    var doCheckForLocalAttachments = isRemote(src) && !isRemote(target);
    var filenames = Object.keys(doc._attachments);
    if (!doCheckForLocalAttachments) {
      return getDocAttachments(src, doc);
    }
    return target.get(doc._id).then(function(localDoc) {
      return Promise.all(filenames.map(function(filename) {
        if (fileHasChanged(localDoc, doc, filename)) {
          return src.getAttachment(doc._id, filename);
        }
        return target.getAttachment(localDoc._id, filename);
      }));
    }).catch(function(error) {
      if (error.status !== 404) {
        throw error;
      }
      return getDocAttachments(src, doc);
    });
  }
  function createBulkGetOpts(diffs) {
    var requests = [];
    Object.keys(diffs).forEach(function(id) {
      var missingRevs = diffs[id].missing;
      missingRevs.forEach(function(missingRev) {
        requests.push({
          id,
          rev: missingRev
        });
      });
    });
    return {
      docs: requests,
      revs: true,
      latest: true
    };
  }
  function getDocs(src, target, diffs, state) {
    diffs = clone(diffs);
    var resultDocs = [], ok = true;
    function getAllDocs() {
      var bulkGetOpts = createBulkGetOpts(diffs);
      if (!bulkGetOpts.docs.length) {
        return;
      }
      return src.bulkGet(bulkGetOpts).then(function(bulkGetResponse) {
        if (state.cancelled) {
          throw new Error("cancelled");
        }
        return Promise.all(bulkGetResponse.results.map(function(bulkGetInfo) {
          return Promise.all(bulkGetInfo.docs.map(function(doc) {
            var remoteDoc = doc.ok;
            if (doc.error) {
              ok = false;
            }
            if (!remoteDoc || !remoteDoc._attachments) {
              return remoteDoc;
            }
            return getDocAttachmentsFromTargetOrSource(target, src, remoteDoc).then(function(attachments) {
              var filenames = Object.keys(remoteDoc._attachments);
              attachments.forEach(function(attachment, i) {
                var att = remoteDoc._attachments[filenames[i]];
                delete att.stub;
                delete att.length;
                att.data = attachment;
              });
              return remoteDoc;
            });
          }));
        })).then(function(results) {
          resultDocs = resultDocs.concat(flatten(results).filter(Boolean));
        });
      });
    }
    function hasAttachments(doc) {
      return doc._attachments && Object.keys(doc._attachments).length > 0;
    }
    function hasConflicts(doc) {
      return doc._conflicts && doc._conflicts.length > 0;
    }
    function fetchRevisionOneDocs(ids) {
      return src.allDocs({
        keys: ids,
        include_docs: true,
        conflicts: true
      }).then(function(res) {
        if (state.cancelled) {
          throw new Error("cancelled");
        }
        res.rows.forEach(function(row) {
          if (row.deleted || !row.doc || !isGenOne$1(row.value.rev) || hasAttachments(row.doc) || hasConflicts(row.doc)) {
            return;
          }
          if (row.doc._conflicts) {
            delete row.doc._conflicts;
          }
          resultDocs.push(row.doc);
          delete diffs[row.id];
        });
      });
    }
    function getRevisionOneDocs() {
      var ids = Object.keys(diffs).filter(function(id) {
        var missing = diffs[id].missing;
        return missing.length === 1 && isGenOne$1(missing[0]);
      });
      if (ids.length > 0) {
        return fetchRevisionOneDocs(ids);
      }
    }
    function returnResult() {
      return { ok, docs: resultDocs };
    }
    return Promise.resolve().then(getRevisionOneDocs).then(getAllDocs).then(returnResult);
  }
  var CHECKPOINT_VERSION = 1;
  var REPLICATOR = "pouchdb";
  var CHECKPOINT_HISTORY_SIZE = 5;
  var LOWEST_SEQ = 0;
  function updateCheckpoint(db2, id, checkpoint, session, returnValue) {
    return db2.get(id).catch(function(err) {
      if (err.status === 404) {
        if (db2.adapter === "http" || db2.adapter === "https") {
          explainError(404, "PouchDB is just checking if a remote checkpoint exists.");
        }
        return {
          session_id: session,
          _id: id,
          history: [],
          replicator: REPLICATOR,
          version: CHECKPOINT_VERSION
        };
      }
      throw err;
    }).then(function(doc) {
      if (returnValue.cancelled) {
        return;
      }
      if (doc.last_seq === checkpoint) {
        return;
      }
      doc.history = (doc.history || []).filter(function(item) {
        return item.session_id !== session;
      });
      doc.history.unshift({
        last_seq: checkpoint,
        session_id: session
      });
      doc.history = doc.history.slice(0, CHECKPOINT_HISTORY_SIZE);
      doc.version = CHECKPOINT_VERSION;
      doc.replicator = REPLICATOR;
      doc.session_id = session;
      doc.last_seq = checkpoint;
      return db2.put(doc).catch(function(err) {
        if (err.status === 409) {
          return updateCheckpoint(db2, id, checkpoint, session, returnValue);
        }
        throw err;
      });
    });
  }
  function Checkpointer(src, target, id, returnValue, opts) {
    this.src = src;
    this.target = target;
    this.id = id;
    this.returnValue = returnValue;
    this.opts = opts || {};
  }
  Checkpointer.prototype.writeCheckpoint = function(checkpoint, session) {
    var self2 = this;
    return this.updateTarget(checkpoint, session).then(function() {
      return self2.updateSource(checkpoint, session);
    });
  };
  Checkpointer.prototype.updateTarget = function(checkpoint, session) {
    if (this.opts.writeTargetCheckpoint) {
      return updateCheckpoint(this.target, this.id, checkpoint, session, this.returnValue);
    } else {
      return Promise.resolve(true);
    }
  };
  Checkpointer.prototype.updateSource = function(checkpoint, session) {
    if (this.opts.writeSourceCheckpoint) {
      var self2 = this;
      return updateCheckpoint(this.src, this.id, checkpoint, session, this.returnValue).catch(function(err) {
        if (isForbiddenError(err)) {
          self2.opts.writeSourceCheckpoint = false;
          return true;
        }
        throw err;
      });
    } else {
      return Promise.resolve(true);
    }
  };
  var comparisons = {
    "undefined": function(targetDoc, sourceDoc) {
      if (collate(targetDoc.last_seq, sourceDoc.last_seq) === 0) {
        return sourceDoc.last_seq;
      }
      return 0;
    },
    "1": function(targetDoc, sourceDoc) {
      return compareReplicationLogs(sourceDoc, targetDoc).last_seq;
    }
  };
  Checkpointer.prototype.getCheckpoint = function() {
    var self2 = this;
    if (self2.opts && self2.opts.writeSourceCheckpoint && !self2.opts.writeTargetCheckpoint) {
      return self2.src.get(self2.id).then(function(sourceDoc) {
        return sourceDoc.last_seq || LOWEST_SEQ;
      }).catch(function(err) {
        if (err.status !== 404) {
          throw err;
        }
        return LOWEST_SEQ;
      });
    }
    return self2.target.get(self2.id).then(function(targetDoc) {
      if (self2.opts && self2.opts.writeTargetCheckpoint && !self2.opts.writeSourceCheckpoint) {
        return targetDoc.last_seq || LOWEST_SEQ;
      }
      return self2.src.get(self2.id).then(function(sourceDoc) {
        if (targetDoc.version !== sourceDoc.version) {
          return LOWEST_SEQ;
        }
        var version2;
        if (targetDoc.version) {
          version2 = targetDoc.version.toString();
        } else {
          version2 = "undefined";
        }
        if (version2 in comparisons) {
          return comparisons[version2](targetDoc, sourceDoc);
        }
        return LOWEST_SEQ;
      }, function(err) {
        if (err.status === 404 && targetDoc.last_seq) {
          return self2.src.put({
            _id: self2.id,
            last_seq: LOWEST_SEQ
          }).then(function() {
            return LOWEST_SEQ;
          }, function(err2) {
            if (isForbiddenError(err2)) {
              self2.opts.writeSourceCheckpoint = false;
              return targetDoc.last_seq;
            }
            return LOWEST_SEQ;
          });
        }
        throw err;
      });
    }).catch(function(err) {
      if (err.status !== 404) {
        throw err;
      }
      return LOWEST_SEQ;
    });
  };
  function compareReplicationLogs(srcDoc, tgtDoc) {
    if (srcDoc.session_id === tgtDoc.session_id) {
      return {
        last_seq: srcDoc.last_seq,
        history: srcDoc.history
      };
    }
    return compareReplicationHistory(srcDoc.history, tgtDoc.history);
  }
  function compareReplicationHistory(sourceHistory, targetHistory) {
    var S = sourceHistory[0];
    var sourceRest = sourceHistory.slice(1);
    var T = targetHistory[0];
    var targetRest = targetHistory.slice(1);
    if (!S || targetHistory.length === 0) {
      return {
        last_seq: LOWEST_SEQ,
        history: []
      };
    }
    var sourceId = S.session_id;
    if (hasSessionId(sourceId, targetHistory)) {
      return {
        last_seq: S.last_seq,
        history: sourceHistory
      };
    }
    var targetId = T.session_id;
    if (hasSessionId(targetId, sourceRest)) {
      return {
        last_seq: T.last_seq,
        history: targetRest
      };
    }
    return compareReplicationHistory(sourceRest, targetRest);
  }
  function hasSessionId(sessionId, history) {
    var props = history[0];
    var rest = history.slice(1);
    if (!sessionId || history.length === 0) {
      return false;
    }
    if (sessionId === props.session_id) {
      return true;
    }
    return hasSessionId(sessionId, rest);
  }
  function isForbiddenError(err) {
    return typeof err.status === "number" && Math.floor(err.status / 100) === 4;
  }
  var STARTING_BACK_OFF = 0;
  function backOff(opts, returnValue, error, callback) {
    if (opts.retry === false) {
      returnValue.emit("error", error);
      returnValue.removeAllListeners();
      return;
    }
    if (typeof opts.back_off_function !== "function") {
      opts.back_off_function = defaultBackOff;
    }
    returnValue.emit("requestError", error);
    if (returnValue.state === "active" || returnValue.state === "pending") {
      returnValue.emit("paused", error);
      returnValue.state = "stopped";
      var backOffSet = function backoffTimeSet() {
        opts.current_back_off = STARTING_BACK_OFF;
      };
      var removeBackOffSetter = function removeBackOffTimeSet() {
        returnValue.removeListener("active", backOffSet);
      };
      returnValue.once("paused", removeBackOffSetter);
      returnValue.once("active", backOffSet);
    }
    opts.current_back_off = opts.current_back_off || STARTING_BACK_OFF;
    opts.current_back_off = opts.back_off_function(opts.current_back_off);
    setTimeout(callback, opts.current_back_off);
  }
  function sortObjectPropertiesByKey(queryParams) {
    return Object.keys(queryParams).sort(collate).reduce(function(result, key) {
      result[key] = queryParams[key];
      return result;
    }, {});
  }
  function generateReplicationId(src, target, opts) {
    var docIds = opts.doc_ids ? opts.doc_ids.sort(collate) : "";
    var filterFun = opts.filter ? opts.filter.toString() : "";
    var queryParams = "";
    var filterViewName = "";
    var selector = "";
    if (opts.selector) {
      selector = JSON.stringify(opts.selector);
    }
    if (opts.filter && opts.query_params) {
      queryParams = JSON.stringify(sortObjectPropertiesByKey(opts.query_params));
    }
    if (opts.filter && opts.filter === "_view") {
      filterViewName = opts.view.toString();
    }
    return Promise.all([src.id(), target.id()]).then(function(res) {
      var queryData = res[0] + res[1] + filterFun + filterViewName + queryParams + docIds + selector;
      return new Promise(function(resolve) {
        binaryMd5(queryData, resolve);
      });
    }).then(function(md5sum) {
      md5sum = md5sum.replace(/\//g, ".").replace(/\+/g, "_");
      return "_local/" + md5sum;
    });
  }
  function replicate(src, target, opts, returnValue, result) {
    var batches = [];
    var currentBatch;
    var pendingBatch = {
      seq: 0,
      changes: [],
      docs: []
    };
    var writingCheckpoint = false;
    var changesCompleted = false;
    var replicationCompleted = false;
    var last_seq = 0;
    var continuous = opts.continuous || opts.live || false;
    var batch_size = opts.batch_size || 100;
    var batches_limit = opts.batches_limit || 10;
    var style = opts.style || "all_docs";
    var changesPending = false;
    var doc_ids = opts.doc_ids;
    var selector = opts.selector;
    var repId;
    var checkpointer;
    var changedDocs = [];
    var session = uuid();
    result = result || {
      ok: true,
      start_time: new Date().toISOString(),
      docs_read: 0,
      docs_written: 0,
      doc_write_failures: 0,
      errors: []
    };
    var changesOpts = {};
    returnValue.ready(src, target);
    function initCheckpointer() {
      if (checkpointer) {
        return Promise.resolve();
      }
      return generateReplicationId(src, target, opts).then(function(res) {
        repId = res;
        var checkpointOpts = {};
        if (opts.checkpoint === false) {
          checkpointOpts = { writeSourceCheckpoint: false, writeTargetCheckpoint: false };
        } else if (opts.checkpoint === "source") {
          checkpointOpts = { writeSourceCheckpoint: true, writeTargetCheckpoint: false };
        } else if (opts.checkpoint === "target") {
          checkpointOpts = { writeSourceCheckpoint: false, writeTargetCheckpoint: true };
        } else {
          checkpointOpts = { writeSourceCheckpoint: true, writeTargetCheckpoint: true };
        }
        checkpointer = new Checkpointer(src, target, repId, returnValue, checkpointOpts);
      });
    }
    function writeDocs() {
      changedDocs = [];
      if (currentBatch.docs.length === 0) {
        return;
      }
      var docs = currentBatch.docs;
      var bulkOpts = { timeout: opts.timeout };
      return target.bulkDocs({ docs, new_edits: false }, bulkOpts).then(function(res) {
        if (returnValue.cancelled) {
          completeReplication();
          throw new Error("cancelled");
        }
        var errorsById = /* @__PURE__ */ Object.create(null);
        res.forEach(function(res2) {
          if (res2.error) {
            errorsById[res2.id] = res2;
          }
        });
        var errorsNo = Object.keys(errorsById).length;
        result.doc_write_failures += errorsNo;
        result.docs_written += docs.length - errorsNo;
        docs.forEach(function(doc) {
          var error = errorsById[doc._id];
          if (error) {
            result.errors.push(error);
            var errorName = (error.name || "").toLowerCase();
            if (errorName === "unauthorized" || errorName === "forbidden") {
              returnValue.emit("denied", clone(error));
            } else {
              throw error;
            }
          } else {
            changedDocs.push(doc);
          }
        });
      }, function(err) {
        result.doc_write_failures += docs.length;
        throw err;
      });
    }
    function finishBatch() {
      if (currentBatch.error) {
        throw new Error("There was a problem getting docs.");
      }
      result.last_seq = last_seq = currentBatch.seq;
      var outResult = clone(result);
      if (changedDocs.length) {
        outResult.docs = changedDocs;
        if (typeof currentBatch.pending === "number") {
          outResult.pending = currentBatch.pending;
          delete currentBatch.pending;
        }
        returnValue.emit("change", outResult);
      }
      writingCheckpoint = true;
      return checkpointer.writeCheckpoint(currentBatch.seq, session).then(function() {
        returnValue.emit("checkpoint", { "checkpoint": currentBatch.seq });
        writingCheckpoint = false;
        if (returnValue.cancelled) {
          completeReplication();
          throw new Error("cancelled");
        }
        currentBatch = void 0;
        getChanges();
      }).catch(function(err) {
        onCheckpointError(err);
        throw err;
      });
    }
    function getDiffs() {
      var diff = {};
      currentBatch.changes.forEach(function(change) {
        returnValue.emit("checkpoint", { "revs_diff": change });
        if (change.id === "_user/") {
          return;
        }
        diff[change.id] = change.changes.map(function(x) {
          return x.rev;
        });
      });
      return target.revsDiff(diff).then(function(diffs) {
        if (returnValue.cancelled) {
          completeReplication();
          throw new Error("cancelled");
        }
        currentBatch.diffs = diffs;
      });
    }
    function getBatchDocs() {
      return getDocs(src, target, currentBatch.diffs, returnValue).then(function(got) {
        currentBatch.error = !got.ok;
        got.docs.forEach(function(doc) {
          delete currentBatch.diffs[doc._id];
          result.docs_read++;
          currentBatch.docs.push(doc);
        });
      });
    }
    function startNextBatch() {
      if (returnValue.cancelled || currentBatch) {
        return;
      }
      if (batches.length === 0) {
        processPendingBatch(true);
        return;
      }
      currentBatch = batches.shift();
      returnValue.emit("checkpoint", { "start_next_batch": currentBatch.seq });
      getDiffs().then(getBatchDocs).then(writeDocs).then(finishBatch).then(startNextBatch).catch(function(err) {
        abortReplication("batch processing terminated with error", err);
      });
    }
    function processPendingBatch(immediate$$1) {
      if (pendingBatch.changes.length === 0) {
        if (batches.length === 0 && !currentBatch) {
          if (continuous && changesOpts.live || changesCompleted) {
            returnValue.state = "pending";
            returnValue.emit("paused");
          }
          if (changesCompleted) {
            completeReplication();
          }
        }
        return;
      }
      if (immediate$$1 || changesCompleted || pendingBatch.changes.length >= batch_size) {
        batches.push(pendingBatch);
        pendingBatch = {
          seq: 0,
          changes: [],
          docs: []
        };
        if (returnValue.state === "pending" || returnValue.state === "stopped") {
          returnValue.state = "active";
          returnValue.emit("active");
        }
        startNextBatch();
      }
    }
    function abortReplication(reason, err) {
      if (replicationCompleted) {
        return;
      }
      if (!err.message) {
        err.message = reason;
      }
      result.ok = false;
      result.status = "aborting";
      batches = [];
      pendingBatch = {
        seq: 0,
        changes: [],
        docs: []
      };
      completeReplication(err);
    }
    function completeReplication(fatalError) {
      if (replicationCompleted) {
        return;
      }
      if (returnValue.cancelled) {
        result.status = "cancelled";
        if (writingCheckpoint) {
          return;
        }
      }
      result.status = result.status || "complete";
      result.end_time = new Date().toISOString();
      result.last_seq = last_seq;
      replicationCompleted = true;
      if (fatalError) {
        fatalError = createError(fatalError);
        fatalError.result = result;
        var errorName = (fatalError.name || "").toLowerCase();
        if (errorName === "unauthorized" || errorName === "forbidden") {
          returnValue.emit("error", fatalError);
          returnValue.removeAllListeners();
        } else {
          backOff(opts, returnValue, fatalError, function() {
            replicate(src, target, opts, returnValue);
          });
        }
      } else {
        returnValue.emit("complete", result);
        returnValue.removeAllListeners();
      }
    }
    function onChange(change, pending, lastSeq) {
      if (returnValue.cancelled) {
        return completeReplication();
      }
      if (typeof pending === "number") {
        pendingBatch.pending = pending;
      }
      var filter2 = filterChange(opts)(change);
      if (!filter2) {
        return;
      }
      pendingBatch.seq = change.seq || lastSeq;
      pendingBatch.changes.push(change);
      returnValue.emit("checkpoint", { "pending_batch": pendingBatch.seq });
      (0, import_immediate.default)(function() {
        processPendingBatch(batches.length === 0 && changesOpts.live);
      });
    }
    function onChangesComplete(changes2) {
      changesPending = false;
      if (returnValue.cancelled) {
        return completeReplication();
      }
      if (changes2.results.length > 0) {
        changesOpts.since = changes2.results[changes2.results.length - 1].seq;
        getChanges();
        processPendingBatch(true);
      } else {
        var complete = function() {
          if (continuous) {
            changesOpts.live = true;
            getChanges();
          } else {
            changesCompleted = true;
          }
          processPendingBatch(true);
        };
        if (!currentBatch && changes2.results.length === 0) {
          writingCheckpoint = true;
          checkpointer.writeCheckpoint(changes2.last_seq, session).then(function() {
            writingCheckpoint = false;
            result.last_seq = last_seq = changes2.last_seq;
            complete();
          }).catch(onCheckpointError);
        } else {
          complete();
        }
      }
    }
    function onChangesError(err) {
      changesPending = false;
      if (returnValue.cancelled) {
        return completeReplication();
      }
      abortReplication("changes rejected", err);
    }
    function getChanges() {
      if (!(!changesPending && !changesCompleted && batches.length < batches_limit)) {
        return;
      }
      changesPending = true;
      function abortChanges() {
        changes2.cancel();
      }
      function removeListener() {
        returnValue.removeListener("cancel", abortChanges);
      }
      if (returnValue._changes) {
        returnValue.removeListener("cancel", returnValue._abortChanges);
        returnValue._changes.cancel();
      }
      returnValue.once("cancel", abortChanges);
      var changes2 = src.changes(changesOpts).on("change", onChange);
      changes2.then(removeListener, removeListener);
      changes2.then(onChangesComplete).catch(onChangesError);
      if (opts.retry) {
        returnValue._changes = changes2;
        returnValue._abortChanges = abortChanges;
      }
    }
    function startChanges() {
      initCheckpointer().then(function() {
        if (returnValue.cancelled) {
          completeReplication();
          return;
        }
        return checkpointer.getCheckpoint().then(function(checkpoint) {
          last_seq = checkpoint;
          changesOpts = {
            since: last_seq,
            limit: batch_size,
            batch_size,
            style,
            doc_ids,
            selector,
            return_docs: true
          };
          if (opts.filter) {
            if (typeof opts.filter !== "string") {
              changesOpts.include_docs = true;
            } else {
              changesOpts.filter = opts.filter;
            }
          }
          if ("heartbeat" in opts) {
            changesOpts.heartbeat = opts.heartbeat;
          }
          if ("timeout" in opts) {
            changesOpts.timeout = opts.timeout;
          }
          if (opts.query_params) {
            changesOpts.query_params = opts.query_params;
          }
          if (opts.view) {
            changesOpts.view = opts.view;
          }
          getChanges();
        });
      }).catch(function(err) {
        abortReplication("getCheckpoint rejected with ", err);
      });
    }
    function onCheckpointError(err) {
      writingCheckpoint = false;
      abortReplication("writeCheckpoint completed with error", err);
    }
    if (returnValue.cancelled) {
      completeReplication();
      return;
    }
    if (!returnValue._addedListeners) {
      returnValue.once("cancel", completeReplication);
      if (typeof opts.complete === "function") {
        returnValue.once("error", opts.complete);
        returnValue.once("complete", function(result2) {
          opts.complete(null, result2);
        });
      }
      returnValue._addedListeners = true;
    }
    if (typeof opts.since === "undefined") {
      startChanges();
    } else {
      initCheckpointer().then(function() {
        writingCheckpoint = true;
        return checkpointer.writeCheckpoint(opts.since, session);
      }).then(function() {
        writingCheckpoint = false;
        if (returnValue.cancelled) {
          completeReplication();
          return;
        }
        last_seq = opts.since;
        startChanges();
      }).catch(onCheckpointError);
    }
  }
  (0, import_inherits.default)(Replication, import_events.default);
  function Replication() {
    import_events.default.call(this);
    this.cancelled = false;
    this.state = "pending";
    var self2 = this;
    var promise = new Promise(function(fulfill, reject) {
      self2.once("complete", fulfill);
      self2.once("error", reject);
    });
    self2.then = function(resolve, reject) {
      return promise.then(resolve, reject);
    };
    self2.catch = function(reject) {
      return promise.catch(reject);
    };
    self2.catch(function() {
    });
  }
  Replication.prototype.cancel = function() {
    this.cancelled = true;
    this.state = "cancelled";
    this.emit("cancel");
  };
  Replication.prototype.ready = function(src, target) {
    var self2 = this;
    if (self2._readyCalled) {
      return;
    }
    self2._readyCalled = true;
    function onDestroy() {
      self2.cancel();
    }
    src.once("destroyed", onDestroy);
    target.once("destroyed", onDestroy);
    function cleanup() {
      src.removeListener("destroyed", onDestroy);
      target.removeListener("destroyed", onDestroy);
    }
    self2.once("complete", cleanup);
    self2.once("error", cleanup);
  };
  function toPouch(db2, opts) {
    var PouchConstructor = opts.PouchConstructor;
    if (typeof db2 === "string") {
      return new PouchConstructor(db2, opts);
    } else {
      return db2;
    }
  }
  function replicateWrapper(src, target, opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    if (typeof opts === "undefined") {
      opts = {};
    }
    if (opts.doc_ids && !Array.isArray(opts.doc_ids)) {
      throw createError(BAD_REQUEST, "`doc_ids` filter parameter is not a list.");
    }
    opts.complete = callback;
    opts = clone(opts);
    opts.continuous = opts.continuous || opts.live;
    opts.retry = "retry" in opts ? opts.retry : false;
    opts.PouchConstructor = opts.PouchConstructor || this;
    var replicateRet = new Replication(opts);
    var srcPouch = toPouch(src, opts);
    var targetPouch = toPouch(target, opts);
    replicate(srcPouch, targetPouch, opts, replicateRet);
    return replicateRet;
  }
  (0, import_inherits.default)(Sync, import_events.default);
  function sync(src, target, opts, callback) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    }
    if (typeof opts === "undefined") {
      opts = {};
    }
    opts = clone(opts);
    opts.PouchConstructor = opts.PouchConstructor || this;
    src = toPouch(src, opts);
    target = toPouch(target, opts);
    return new Sync(src, target, opts, callback);
  }
  function Sync(src, target, opts, callback) {
    var self2 = this;
    this.canceled = false;
    var optsPush = opts.push ? $inject_Object_assign({}, opts, opts.push) : opts;
    var optsPull = opts.pull ? $inject_Object_assign({}, opts, opts.pull) : opts;
    this.push = replicateWrapper(src, target, optsPush);
    this.pull = replicateWrapper(target, src, optsPull);
    this.pushPaused = true;
    this.pullPaused = true;
    function pullChange(change) {
      self2.emit("change", {
        direction: "pull",
        change
      });
    }
    function pushChange(change) {
      self2.emit("change", {
        direction: "push",
        change
      });
    }
    function pushDenied(doc) {
      self2.emit("denied", {
        direction: "push",
        doc
      });
    }
    function pullDenied(doc) {
      self2.emit("denied", {
        direction: "pull",
        doc
      });
    }
    function pushPaused() {
      self2.pushPaused = true;
      if (self2.pullPaused) {
        self2.emit("paused");
      }
    }
    function pullPaused() {
      self2.pullPaused = true;
      if (self2.pushPaused) {
        self2.emit("paused");
      }
    }
    function pushActive() {
      self2.pushPaused = false;
      if (self2.pullPaused) {
        self2.emit("active", {
          direction: "push"
        });
      }
    }
    function pullActive() {
      self2.pullPaused = false;
      if (self2.pushPaused) {
        self2.emit("active", {
          direction: "pull"
        });
      }
    }
    var removed = {};
    function removeAll(type) {
      return function(event, func) {
        var isChange = event === "change" && (func === pullChange || func === pushChange);
        var isDenied = event === "denied" && (func === pullDenied || func === pushDenied);
        var isPaused = event === "paused" && (func === pullPaused || func === pushPaused);
        var isActive = event === "active" && (func === pullActive || func === pushActive);
        if (isChange || isDenied || isPaused || isActive) {
          if (!(event in removed)) {
            removed[event] = {};
          }
          removed[event][type] = true;
          if (Object.keys(removed[event]).length === 2) {
            self2.removeAllListeners(event);
          }
        }
      };
    }
    if (opts.live) {
      this.push.on("complete", self2.pull.cancel.bind(self2.pull));
      this.pull.on("complete", self2.push.cancel.bind(self2.push));
    }
    function addOneListener(ee, event, listener) {
      if (ee.listeners(event).indexOf(listener) == -1) {
        ee.on(event, listener);
      }
    }
    this.on("newListener", function(event) {
      if (event === "change") {
        addOneListener(self2.pull, "change", pullChange);
        addOneListener(self2.push, "change", pushChange);
      } else if (event === "denied") {
        addOneListener(self2.pull, "denied", pullDenied);
        addOneListener(self2.push, "denied", pushDenied);
      } else if (event === "active") {
        addOneListener(self2.pull, "active", pullActive);
        addOneListener(self2.push, "active", pushActive);
      } else if (event === "paused") {
        addOneListener(self2.pull, "paused", pullPaused);
        addOneListener(self2.push, "paused", pushPaused);
      }
    });
    this.on("removeListener", function(event) {
      if (event === "change") {
        self2.pull.removeListener("change", pullChange);
        self2.push.removeListener("change", pushChange);
      } else if (event === "denied") {
        self2.pull.removeListener("denied", pullDenied);
        self2.push.removeListener("denied", pushDenied);
      } else if (event === "active") {
        self2.pull.removeListener("active", pullActive);
        self2.push.removeListener("active", pushActive);
      } else if (event === "paused") {
        self2.pull.removeListener("paused", pullPaused);
        self2.push.removeListener("paused", pushPaused);
      }
    });
    this.pull.on("removeListener", removeAll("pull"));
    this.push.on("removeListener", removeAll("push"));
    var promise = Promise.all([
      this.push,
      this.pull
    ]).then(function(resp) {
      var out = {
        push: resp[0],
        pull: resp[1]
      };
      self2.emit("complete", out);
      if (callback) {
        callback(null, out);
      }
      self2.removeAllListeners();
      return out;
    }, function(err) {
      self2.cancel();
      if (callback) {
        callback(err);
      } else {
        self2.emit("error", err);
      }
      self2.removeAllListeners();
      if (callback) {
        throw err;
      }
    });
    this.then = function(success, err) {
      return promise.then(success, err);
    };
    this.catch = function(err) {
      return promise.catch(err);
    };
  }
  Sync.prototype.cancel = function() {
    if (!this.canceled) {
      this.canceled = true;
      this.push.cancel();
      this.pull.cancel();
    }
  };
  function replication(PouchDB2) {
    PouchDB2.replicate = replicateWrapper;
    PouchDB2.sync = sync;
    Object.defineProperty(PouchDB2.prototype, "replicate", {
      get: function() {
        var self2 = this;
        if (typeof this.replicateMethods === "undefined") {
          this.replicateMethods = {
            from: function(other, opts, callback) {
              return self2.constructor.replicate(other, self2, opts, callback);
            },
            to: function(other, opts, callback) {
              return self2.constructor.replicate(self2, other, opts, callback);
            }
          };
        }
        return this.replicateMethods;
      }
    });
    PouchDB2.prototype.sync = function(dbName, opts, callback) {
      return this.constructor.sync(this, dbName, opts, callback);
    };
  }
  PouchDB.plugin(IDBPouch).plugin(HttpPouch$1).plugin(mapreduce).plugin(replication);
  var index_browser_es_default = PouchDB;

  // src/js/db/index.js
  var DB_NAME = "my_database";
  var db = new index_browser_es_default(DB_NAME);
  var dbChanges = {
    handlers: /* @__PURE__ */ new Set(),
    subscribe(handler) {
      this.handlers.add(handler);
    },
    unsubscribe(handler) {
      return this.handlers.delete(handler);
    },
    handle(change) {
      for (const handler of this.handlers) {
        handler(change);
      }
    }
  };
  db.changes({
    filter: function(doc) {
      return true;
    },
    since: "now",
    live: true,
    include_docs: true,
    conflicts: true
  }).on("change", (change) => dbChanges.handle(change)).on("error", function(err) {
    console.log(err);
  });

  // src/js/abit-form.js
  var svelte = document.getElementById("svelte");
  var app = new comp_default({
    target: svelte
  });
  (async () => {
    const eduProgs = await db.query("eduProgs");
    console.log(eduProgs);
    app.eduProgs = eduProgs.rows.map(({ key, value }) => ({
      code: key,
      specCode: value[0],
      specName: value[1],
      eduForm: value[2],
      baseEduLevel: value[3],
      finSource: value[4]
    }));
  })();
})();
//# sourceMappingURL=abit-form.js.map
