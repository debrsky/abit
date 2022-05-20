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
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge2(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element2) {
        return cloneUnlessOtherwiseSpecified(element2, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge2;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge2;
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
    function deepmerge2(target, source, options) {
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
    deepmerge2.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge2(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge2;
    module.exports = deepmerge_1;
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
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
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
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
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
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
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
      block = create_each_block2(key, child_ctx);
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
function init(component, options, instance4, create_fragment4, not_equal, props, append_styles2, dirty = [-1]) {
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
  $$.ctx = instance4 ? instance4(component, options.props || {}, (i, ret, ...rest) => {
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
  $$.fragment = create_fragment4 ? create_fragment4($$.ctx) : false;
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

// src/js/svelte/applications.svelte
var import_deepmerge = __toESM(require_cjs(), 1);

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

// src/js/svelte/applications.svelte
function add_css2(target) {
  append_styles(target, "svelte-1xd4wor", "article.svelte-1xd4wor.svelte-1xd4wor{border:1px solid black;width:fit-content;padding:0.25em;display:flex;gap:1ch}.edu-prog-button.svelte-1xd4wor.svelte-1xd4wor{cursor:pointer}.edu-prog-button.svelte-1xd4wor.svelte-1xd4wor:active{transform:scale(0.9)}table.applications.svelte-1xd4wor.svelte-1xd4wor{border-collapse:collapse}table.applications.svelte-1xd4wor th.svelte-1xd4wor{font-size:x-small;padding:0 0.5ch}.cell.svelte-1xd4wor.svelte-1xd4wor{display:flex;place-content:center;place-items:center}table.applications.svelte-1xd4wor td.svelte-1xd4wor,table.applications.svelte-1xd4wor th.svelte-1xd4wor{border-top:1px solid darkgrey;border-bottom:1px solid darkgrey}table.svelte-1xd4wor th.svelte-1xd4wor{background-color:lightgrey}");
}
function get_each_context(ctx, list, i) {
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
function create_if_block3(ctx) {
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
      attr(button, "class", "badge edu-prog-button svelte-1xd4wor");
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
  let if_block = ctx[23] && create_if_block3(ctx);
  return {
    c() {
      td = element("td");
      div = element("div");
      if (if_block)
        if_block.c();
      attr(div, "class", "cell svelte-1xd4wor");
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
          if_block = create_if_block3(ctx2);
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
function create_each_block(key_1, ctx) {
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
      attr(div0, "class", "cell svelte-1xd4wor");
      attr(td0, "class", "svelte-1xd4wor");
      attr(div1, "class", "cell svelte-1xd4wor");
      attr(td1, "class", "svelte-1xd4wor");
      attr(div2, "class", "cell svelte-1xd4wor");
      attr(td2, "class", "svelte-1xd4wor");
      attr(div3, "class", "cell svelte-1xd4wor");
      attr(td3, "class", "svelte-1xd4wor");
      attr(div4, "class", "cell svelte-1xd4wor");
      attr(td4, "class", "svelte-1xd4wor");
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
function create_fragment3(ctx) {
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
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      article = element("article");
      section0 = element("section");
      table0 = element("table");
      thead0 = element("thead");
      thead0.innerHTML = `<tr><th colspan="3" class="svelte-1xd4wor">\u0431\u044E\u0434\u0436\u0435\u0442</th> 
          <th colspan="3" class="svelte-1xd4wor">\u0432\u043D\u0435\u0431\u044E\u0434\u0436\u0435\u0442</th></tr>`;
      t3 = space();
      tbody0 = element("tbody");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t4 = space();
      section1 = element("section");
      table1 = element("table");
      thead1 = element("thead");
      thead1.innerHTML = `<tr><th class="svelte-1xd4wor"></th> 
          <th class="svelte-1xd4wor">\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F<br/>\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430</th> 
          <th class="svelte-1xd4wor">\u041E\u0446\u0435\u043D\u043A\u0430 \u043F\u043E<br/>\u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u043E\u043C\u0443<br/>\u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443</th> 
          <th class="svelte-1xd4wor">\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442</th> 
          <th class="svelte-1xd4wor">\u0421\u043F\u0440\u044F\u0442\u0430\u0442\u044C?</th></tr>`;
      t16 = space();
      tbody1 = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(table0, "class", "svelte-1xd4wor");
      attr(table1, "class", "applications svelte-1xd4wor");
      set_style(section1, "order", "-1");
      attr(article, "class", "svelte-1xd4wor");
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
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each1_lookup, tbody1, outro_and_destroy_block, create_each_block, null, get_each_context);
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
var L_9 = "9 \u043A\u043B\u0430\u0441\u0441\u043E\u0432";
var L_11 = "11 \u043A\u043B\u0430\u0441\u0441\u043E\u0432";
var FULL_TIME = "\u043E\u0447\u043D\u0430\u044F";
var ABSENTIA = "\u0437\u0430\u043E\u0447\u043D\u0430\u044F";
var FREE = "\u0431\u044E\u0434\u0436\u0435\u0442";
var PAID = "\u0432\u043D\u0435\u0431\u044E\u0434\u0436\u0435\u0442";
var finSource = null;
var baseEduLevel = null;
var eduForm = null;
function instance3($$self, $$props, $$invalidate) {
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
    const app = (0, import_deepmerge.default)(defaultApplication, application);
    $$invalidate(0, applications = [app, ...applications].sort((a, b) => {
      if (a.eduProg < b.eduProg)
        return -1;
      if (a.eduProg > b.eduProg)
        return 1;
      return 0;
    }));
  }
  function removeApplication(application) {
    $$invalidate(0, applications = applications.filter((app) => application.eduProg !== app.eduProg));
  }
  function findEduProg(specCode, eduForm2, baseEduLevel2, finSource2) {
    return eduProgs.find((eduProg) => eduProg.specCode === specCode && eduProg.eduForm === eduForm2 && eduProg.baseEduLevel === baseEduLevel2 && eduProg.finSource === finSource2);
  }
  const func = (eduProg, app) => app.eduProg === eduProg.code;
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
      applications.forEach((app, i) => {
        if (i !== idx)
          app.priority = false;
      });
      $$invalidate(0, applications);
      return;
    }
    if (!applications.some((app) => app.priority)) {
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
        if (applications.length > 0 && !applications.some((app) => app.priority)) {
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
    init(this, options, instance3, create_fragment3, safe_not_equal, { applications: 0, eduProgs: 4 }, add_css2);
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
export {
  applications_default as default
};
//# sourceMappingURL=applications.js.map
