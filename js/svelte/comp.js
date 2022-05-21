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
    const match = v?.match?.(re);
    if (match) {
      let [, dd, mm, yyyy] = match;
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
  append_styles(target, "svelte-1jjui1x", "article.svelte-1jjui1x.svelte-1jjui1x{border:1px solid black;width:fit-content;padding:0.25em;display:flex;gap:1ch}table.edu-progs.svelte-1jjui1x th.svelte-1jjui1x{font-size:x-small}.edu-prog-button.svelte-1jjui1x.svelte-1jjui1x{cursor:pointer}.edu-prog-button.svelte-1jjui1x.svelte-1jjui1x:active{transform:scale(0.9)}table.applications.svelte-1jjui1x.svelte-1jjui1x{border-collapse:collapse}table.applications.svelte-1jjui1x th.svelte-1jjui1x{font-size:x-small;padding:0 0.5ch}table.applications.svelte-1jjui1x th.svelte-1jjui1x:first-child{width:6ch}.cell.svelte-1jjui1x.svelte-1jjui1x{display:flex;place-content:center;place-items:center}table.applications.svelte-1jjui1x td.svelte-1jjui1x,table.applications.svelte-1jjui1x th.svelte-1jjui1x{border-top:1px solid darkgrey;border-bottom:1px solid darkgrey}table.svelte-1jjui1x th.svelte-1jjui1x{background-color:lightgrey}");
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
      attr(button, "class", "badge edu-prog-button svelte-1jjui1x");
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
      attr(div, "class", "cell svelte-1jjui1x");
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
      attr(div0, "class", "cell svelte-1jjui1x");
      attr(td0, "class", "svelte-1jjui1x");
      attr(div1, "class", "cell svelte-1jjui1x");
      attr(td1, "class", "svelte-1jjui1x");
      attr(div2, "class", "cell svelte-1jjui1x");
      attr(td2, "class", "svelte-1jjui1x");
      attr(div3, "class", "cell svelte-1jjui1x");
      attr(td3, "class", "svelte-1jjui1x");
      attr(div4, "class", "cell svelte-1jjui1x");
      attr(td4, "class", "svelte-1jjui1x");
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
      thead0.innerHTML = `<tr><th colspan="3" class="svelte-1jjui1x">\u0431\u044E\u0434\u0436\u0435\u0442</th> 
          <th colspan="3" class="svelte-1jjui1x">\u0432\u043D\u0435\u0431\u044E\u0434\u0436\u0435\u0442</th></tr>`;
      t3 = space();
      tbody0 = element("tbody");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t4 = space();
      section1 = element("section");
      table1 = element("table");
      thead1 = element("thead");
      thead1.innerHTML = `<tr><th class="svelte-1jjui1x"></th> 
          <th class="svelte-1jjui1x">\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F<br/>\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430</th> 
          <th class="svelte-1jjui1x">\u041E\u0446\u0435\u043D\u043A\u0430 \u043F\u043E<br/>\u043F\u0440\u043E\u0444\u0438\u043B\u044C\u043D\u043E\u043C\u0443<br/>\u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0443</th> 
          <th class="svelte-1jjui1x">\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442</th> 
          <th class="svelte-1jjui1x">\u0421\u043F\u0440\u044F\u0442\u0430\u0442\u044C?</th></tr>`;
      t16 = space();
      tbody1 = element("tbody");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(table0, "class", "edu-progs svelte-1jjui1x");
      attr(table1, "class", "applications svelte-1jjui1x");
      set_style(section1, "order", "-1");
      attr(article, "class", "svelte-1jjui1x");
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
  append_styles(target, "svelte-121c971", "#debug.svelte-121c971{display:none}#debug.svelte-121c971:target{display:block;font-size:xx-small}");
}
function create_fragment8(ctx) {
  let form;
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
  let t18_value = ctx[3].join(", ") + "";
  let t18;
  let t19;
  let button0;
  let t21;
  let button1;
  let t23;
  let button2;
  let t25;
  let pre1;
  let t26_value = JSON.stringify(ctx[0], null, 4) + "";
  let t26;
  let current;
  let mounted;
  let dispose;
  function dateinput_value_binding(value) {
    ctx[6](value);
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
    ctx[7](value);
  }
  let text0_props = { title: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F \u0418\u043C\u044F \u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E", size: 50 };
  if (ctx[0].fio !== void 0) {
    text0_props.value = ctx[0].fio;
  }
  text0 = new text_default({ props: text0_props });
  binding_callbacks.push(() => bind(text0, "value", text0_value_binding));
  function select0_value_binding(value) {
    ctx[8](value);
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
    ctx[9](value);
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
    ctx[10](value);
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
    ctx[11](value);
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
    ctx[12](value);
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
    ctx[13](value);
  }
  let checkbox0_props = { title: "\u041F\u043E\u0434\u043B\u0438\u043D\u043D\u0438\u043A \u0430\u0442\u0442\u0435\u0441\u0442\u0430\u0442\u0430" };
  if (ctx[0].hasEduCertOriginal !== void 0) {
    checkbox0_props.value = ctx[0].hasEduCertOriginal;
  }
  checkbox0 = new checkbox_default({ props: checkbox0_props });
  binding_callbacks.push(() => bind(checkbox0, "value", checkbox0_value_binding));
  function checkbox1_value_binding(value) {
    ctx[14](value);
  }
  let checkbox1_props = { title: "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0430\u044F \u0441\u043F\u0440\u0430\u0432\u043A\u0430" };
  if (ctx[0].hasMedicalCert !== void 0) {
    checkbox1_props.value = ctx[0].hasMedicalCert;
  }
  checkbox1 = new checkbox_default({ props: checkbox1_props });
  binding_callbacks.push(() => bind(checkbox1, "value", checkbox1_value_binding));
  function checkbox2_value_binding(value) {
    ctx[15](value);
  }
  let checkbox2_props = { title: "\u0424\u043B\u044E\u043E\u0440\u043E\u0433\u0440\u0430\u0444\u0438\u044F" };
  if (ctx[0].hasFluoro !== void 0) {
    checkbox2_props.value = ctx[0].hasFluoro;
  }
  checkbox2 = new checkbox_default({ props: checkbox2_props });
  binding_callbacks.push(() => bind(checkbox2, "value", checkbox2_value_binding));
  function checkbox3_value_binding(value) {
    ctx[16](value);
  }
  let checkbox3_props = { title: "\u041F\u0440\u0438\u0432\u0438\u0432\u043A\u0438" };
  if (ctx[0].hasVaccine !== void 0) {
    checkbox3_props.value = ctx[0].hasVaccine;
  }
  checkbox3 = new checkbox_default({ props: checkbox3_props });
  binding_callbacks.push(() => bind(checkbox3, "value", checkbox3_value_binding));
  function select2_value_binding(value) {
    ctx[17](value);
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
    ctx[18](value);
  }
  let text1_props = { title: "\u0410\u0434\u0440\u0435\u0441", size: 50 };
  if (ctx[0].address !== void 0) {
    text1_props.value = ctx[0].address;
  }
  text1 = new text_default({ props: text1_props });
  binding_callbacks.push(() => bind(text1, "value", text1_value_binding));
  function text2_value_binding(value) {
    ctx[19](value);
  }
  let text2_props = { title: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", size: 15 };
  if (ctx[0].tel !== void 0) {
    text2_props.value = ctx[0].tel;
  }
  text2 = new text_default({ props: text2_props });
  binding_callbacks.push(() => bind(text2, "value", text2_value_binding));
  function text3_value_binding(value) {
    ctx[20](value);
  }
  let text3_props = { title: "\u0428\u043A\u043E\u043B\u0430", size: 70 };
  if (ctx[0].school !== void 0) {
    text3_props.value = ctx[0].school;
  }
  text3 = new text_default({ props: text3_props });
  binding_callbacks.push(() => bind(text3, "value", text3_value_binding));
  function text4_value_binding(value) {
    ctx[21](value);
  }
  let text4_props = { title: "\u0413\u043E\u0434 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0448\u043A\u043E\u043B\u044B", size: 10 };
  if (ctx[0].schoolYear !== void 0) {
    text4_props.value = ctx[0].schoolYear;
  }
  text4 = new text_default({ props: text4_props });
  binding_callbacks.push(() => bind(text4, "value", text4_value_binding));
  function textarea_value_binding(value) {
    ctx[22](value);
  }
  let textarea_props = { title: "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435", size: 97 };
  if (ctx[0].memo !== void 0) {
    textarea_props.value = ctx[0].memo;
  }
  textarea = new textarea_default({ props: textarea_props });
  binding_callbacks.push(() => bind(textarea, "value", textarea_value_binding));
  function applications_applications_binding(value) {
    ctx[23](value);
  }
  let applications_props = { eduProgs: ctx[1] };
  if (ctx[0].applications !== void 0) {
    applications_props.applications = ctx[0].applications;
  }
  applications = new applications_default({ props: applications_props });
  binding_callbacks.push(() => bind(applications, "applications", applications_applications_binding));
  return {
    c() {
      form = element("form");
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
      button0 = element("button");
      button0.textContent = "\u2714\uFE0F \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044C";
      t21 = space();
      button1 = element("button");
      button1.textContent = "\u{1F4D1} \u0414\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
      t23 = space();
      button2 = element("button");
      button2.textContent = "\u274C \u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0431\u0435\u0437 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F";
      t25 = space();
      pre1 = element("pre");
      t26 = text(t26_value);
      attr(div0, "class", "field-container");
      attr(div1, "class", "field-container");
      attr(div2, "class", "field-container");
      attr(div3, "class", "field-container");
      attr(div4, "class", "field-container");
      attr(div5, "class", "field-container");
      attr(div6, "class", "field-container");
      attr(button0, "class", "button button--primary");
      attr(button0, "type", "submit");
      attr(button1, "class", "button button--secondary");
      attr(button1, "type", "button");
      attr(button2, "class", "button button--secondary");
      attr(button2, "type", "button");
      attr(pre1, "id", "debug");
      attr(pre1, "class", "svelte-121c971");
    },
    m(target, anchor) {
      insert(target, form, anchor);
      append(form, div0);
      mount_component(dateinput, div0, null);
      append(div0, t0);
      mount_component(text0, div0, null);
      append(div0, t1);
      mount_component(select0, div0, null);
      append(form, t2);
      append(form, div1);
      mount_component(select1, div1, null);
      append(div1, t3);
      mount_component(numeric0, div1, null);
      append(div1, t4);
      mount_component(numeric1, div1, null);
      append(div1, t5);
      mount_component(numeric2, div1, null);
      append(form, t6);
      append(form, div2);
      mount_component(checkbox0, div2, null);
      append(div2, t7);
      mount_component(checkbox1, div2, null);
      append(div2, t8);
      mount_component(checkbox2, div2, null);
      append(div2, t9);
      mount_component(checkbox3, div2, null);
      append(form, t10);
      append(form, div3);
      mount_component(select2, div3, null);
      append(div3, t11);
      mount_component(text1, div3, null);
      append(div3, t12);
      mount_component(text2, div3, null);
      append(form, t13);
      append(form, div4);
      mount_component(text3, div4, null);
      append(div4, t14);
      mount_component(text4, div4, null);
      append(form, t15);
      append(form, div5);
      mount_component(textarea, div5, null);
      append(form, t16);
      append(form, div6);
      mount_component(applications, div6, null);
      append(form, t17);
      append(form, pre0);
      append(pre0, t18);
      append(form, t19);
      append(form, button0);
      append(form, t21);
      append(form, button1);
      append(form, t23);
      append(form, button2);
      insert(target, t25, anchor);
      insert(target, pre1, anchor);
      append(pre1, t26);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button1, "click", ctx[24]),
          listen(button2, "click", ctx[25]),
          listen(form, "submit", prevent_default(ctx[26]))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const dateinput_changes = {};
      if (!updating_value && dirty & 1) {
        updating_value = true;
        dateinput_changes.value = ctx2[0].regDate;
        add_flush_callback(() => updating_value = false);
      }
      dateinput.$set(dateinput_changes);
      const text0_changes = {};
      if (!updating_value_1 && dirty & 1) {
        updating_value_1 = true;
        text0_changes.value = ctx2[0].fio;
        add_flush_callback(() => updating_value_1 = false);
      }
      text0.$set(text0_changes);
      const select0_changes = {};
      if (!updating_value_2 && dirty & 1) {
        updating_value_2 = true;
        select0_changes.value = ctx2[0].gender;
        add_flush_callback(() => updating_value_2 = false);
      }
      select0.$set(select0_changes);
      const select1_changes = {};
      if (!updating_value_3 && dirty & 1) {
        updating_value_3 = true;
        select1_changes.value = ctx2[0].baseEduLevel;
        add_flush_callback(() => updating_value_3 = false);
      }
      select1.$set(select1_changes);
      const numeric0_changes = {};
      if (!updating_value_4 && dirty & 1) {
        updating_value_4 = true;
        numeric0_changes.value = ctx2[0].certScore;
        add_flush_callback(() => updating_value_4 = false);
      }
      numeric0.$set(numeric0_changes);
      const numeric1_changes = {};
      if (!updating_value_5 && dirty & 1) {
        updating_value_5 = true;
        numeric1_changes.value = ctx2[0].extraScore;
        add_flush_callback(() => updating_value_5 = false);
      }
      numeric1.$set(numeric1_changes);
      const numeric2_changes = {};
      if (!updating_value_6 && dirty & 1) {
        updating_value_6 = true;
        numeric2_changes.value = ctx2[0].totalScore;
        add_flush_callback(() => updating_value_6 = false);
      }
      numeric2.$set(numeric2_changes);
      const checkbox0_changes = {};
      if (!updating_value_7 && dirty & 1) {
        updating_value_7 = true;
        checkbox0_changes.value = ctx2[0].hasEduCertOriginal;
        add_flush_callback(() => updating_value_7 = false);
      }
      checkbox0.$set(checkbox0_changes);
      const checkbox1_changes = {};
      if (!updating_value_8 && dirty & 1) {
        updating_value_8 = true;
        checkbox1_changes.value = ctx2[0].hasMedicalCert;
        add_flush_callback(() => updating_value_8 = false);
      }
      checkbox1.$set(checkbox1_changes);
      const checkbox2_changes = {};
      if (!updating_value_9 && dirty & 1) {
        updating_value_9 = true;
        checkbox2_changes.value = ctx2[0].hasFluoro;
        add_flush_callback(() => updating_value_9 = false);
      }
      checkbox2.$set(checkbox2_changes);
      const checkbox3_changes = {};
      if (!updating_value_10 && dirty & 1) {
        updating_value_10 = true;
        checkbox3_changes.value = ctx2[0].hasVaccine;
        add_flush_callback(() => updating_value_10 = false);
      }
      checkbox3.$set(checkbox3_changes);
      const select2_changes = {};
      if (!updating_value_11 && dirty & 1) {
        updating_value_11 = true;
        select2_changes.value = ctx2[0].needDorm;
        add_flush_callback(() => updating_value_11 = false);
      }
      select2.$set(select2_changes);
      const text1_changes = {};
      if (!updating_value_12 && dirty & 1) {
        updating_value_12 = true;
        text1_changes.value = ctx2[0].address;
        add_flush_callback(() => updating_value_12 = false);
      }
      text1.$set(text1_changes);
      const text2_changes = {};
      if (!updating_value_13 && dirty & 1) {
        updating_value_13 = true;
        text2_changes.value = ctx2[0].tel;
        add_flush_callback(() => updating_value_13 = false);
      }
      text2.$set(text2_changes);
      const text3_changes = {};
      if (!updating_value_14 && dirty & 1) {
        updating_value_14 = true;
        text3_changes.value = ctx2[0].school;
        add_flush_callback(() => updating_value_14 = false);
      }
      text3.$set(text3_changes);
      const text4_changes = {};
      if (!updating_value_15 && dirty & 1) {
        updating_value_15 = true;
        text4_changes.value = ctx2[0].schoolYear;
        add_flush_callback(() => updating_value_15 = false);
      }
      text4.$set(text4_changes);
      const textarea_changes = {};
      if (!updating_value_16 && dirty & 1) {
        updating_value_16 = true;
        textarea_changes.value = ctx2[0].memo;
        add_flush_callback(() => updating_value_16 = false);
      }
      textarea.$set(textarea_changes);
      const applications_changes = {};
      if (dirty & 2)
        applications_changes.eduProgs = ctx2[1];
      if (!updating_applications && dirty & 1) {
        updating_applications = true;
        applications_changes.applications = ctx2[0].applications;
        add_flush_callback(() => updating_applications = false);
      }
      applications.$set(applications_changes);
      if ((!current || dirty & 8) && t18_value !== (t18_value = ctx2[3].join(", ") + ""))
        set_data(t18, t18_value);
      if ((!current || dirty & 1) && t26_value !== (t26_value = JSON.stringify(ctx2[0], null, 4) + ""))
        set_data(t26, t26_value);
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
      if (detaching)
        detach(t25);
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
    apps: { baseEduLevel: null },
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
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text0_value_binding(value) {
    if ($$self.$$.not_equal(data.fio, value)) {
      data.fio = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function select0_value_binding(value) {
    if ($$self.$$.not_equal(data.gender, value)) {
      data.gender = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function select1_value_binding(value) {
    if ($$self.$$.not_equal(data.baseEduLevel, value)) {
      data.baseEduLevel = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function numeric0_value_binding(value) {
    if ($$self.$$.not_equal(data.certScore, value)) {
      data.certScore = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function numeric1_value_binding(value) {
    if ($$self.$$.not_equal(data.extraScore, value)) {
      data.extraScore = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function numeric2_value_binding(value) {
    if ($$self.$$.not_equal(data.totalScore, value)) {
      data.totalScore = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function checkbox0_value_binding(value) {
    if ($$self.$$.not_equal(data.hasEduCertOriginal, value)) {
      data.hasEduCertOriginal = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function checkbox1_value_binding(value) {
    if ($$self.$$.not_equal(data.hasMedicalCert, value)) {
      data.hasMedicalCert = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function checkbox2_value_binding(value) {
    if ($$self.$$.not_equal(data.hasFluoro, value)) {
      data.hasFluoro = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function checkbox3_value_binding(value) {
    if ($$self.$$.not_equal(data.hasVaccine, value)) {
      data.hasVaccine = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function select2_value_binding(value) {
    if ($$self.$$.not_equal(data.needDorm, value)) {
      data.needDorm = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text1_value_binding(value) {
    if ($$self.$$.not_equal(data.address, value)) {
      data.address = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text2_value_binding(value) {
    if ($$self.$$.not_equal(data.tel, value)) {
      data.tel = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text3_value_binding(value) {
    if ($$self.$$.not_equal(data.school, value)) {
      data.school = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text4_value_binding(value) {
    if ($$self.$$.not_equal(data.schoolYear, value)) {
      data.schoolYear = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function textarea_value_binding(value) {
    if ($$self.$$.not_equal(data.memo, value)) {
      data.memo = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function applications_applications_binding(value) {
    if ($$self.$$.not_equal(data.applications, value)) {
      data.applications = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  const click_handler = () => {
    close({ ok: true, cmd: "duplicate" });
  };
  const click_handler_1 = () => {
    close({ ok: false });
  };
  const submit_handler = () => close({ ok: true });
  $$self.$$set = ($$props2) => {
    if ("eduProgs" in $$props2)
      $$invalidate(1, eduProgs = $$props2.eduProgs);
    if ("close" in $$props2)
      $$invalidate(2, close = $$props2.close);
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      $: {
        $$invalidate(0, data = setDataValue(data));
      }
    }
    if ($$self.$$.dirty & 49) {
      $: {
        $$invalidate(4, certScore = parseNumber(data.certScore));
        $$invalidate(5, extraScore = parseNumber(data.extraScore));
        $$invalidate(0, data.totalScore = parseFloat(((Number.isFinite(certScore) ? certScore : 0) + (Number.isFinite(extraScore) ? extraScore : 0)).toFixed(6)), data);
      }
    }
    if ($$self.$$.dirty & 1) {
      $: {
        $$invalidate(3, tags = Array.from(data?.memo.matchAll(/#([a-zA-Z0-9_a-яА-ЯёЁ]+)/g) || [], (tag) => tag[1]));
      }
    }
    if ($$self.$$.dirty & 1) {
      $: {
        setScoreValues(data.certScore, data.extraScore);
      }
    }
  };
  return [
    data,
    eduProgs,
    close,
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
    click_handler_1,
    submit_handler
  ];
}
var Comp = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance8, create_fragment8, safe_not_equal, { eduProgs: 1, close: 2, data: 0 }, add_css3);
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
export {
  comp_default as default
};
//# sourceMappingURL=comp.js.map
