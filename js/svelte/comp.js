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
function init(component, options, instance8, create_fragment8, not_equal, props, append_styles2, dirty = [-1]) {
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
  $$.ctx = instance8 ? instance8(component, options.props || {}, (i, ret, ...rest) => {
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
  $$.fragment = create_fragment8 ? create_fragment8($$.ctx) : false;
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

// src/js/svelte/fields/text.svelte
function create_fragment(ctx) {
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
      attr(input, "type", "text");
      attr(input, "size", ctx[2]);
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
        attr(input, "size", ctx2[2]);
      }
      if (dirty & 1 && input.value !== ctx2[0]) {
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
function instance($$self, $$props, $$invalidate) {
  let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
  let { value } = $$props;
  let { size = 20 } = $$props;
  function input_input_handler() {
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
  return [value, title, size, input_input_handler];
}
var Text = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { title: 1, value: 0, size: 2 });
  }
};
var text_default = Text;

// src/js/svelte/fields/decimal.svelte
function create_fragment2(ctx) {
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
      t0 = text(ctx[0]);
      t1 = space();
      input = element("input");
      attr(input, "type", "text");
      attr(input, "size", ctx[1]);
      attr(div, "class", "field");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, span);
      append(span, t0);
      append(label, t1);
      append(label, input);
      set_input_value(input, ctx[2]);
      if (!mounted) {
        dispose = listen(input, "input", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
      if (dirty & 2) {
        attr(input, "size", ctx2[1]);
      }
      if (dirty & 4 && input.value !== ctx2[2]) {
        set_input_value(input, ctx2[2]);
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
function instance2($$self, $$props, $$invalidate) {
  let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
  let { value } = $$props;
  let { size = 20 } = $$props;
  let rawValue;
  const setRawValue = (v) => {
    $$invalidate(2, rawValue = (v || "").toString().replace(".", ","));
  };
  const setValue = (r) => {
    const v = Number((r || "").toString().replace(",", "."));
    if (Number.isFinite(v)) {
      $$invalidate(3, value = v);
    } else {
      $$invalidate(3, value = r);
    }
  };
  setRawValue(value);
  function input_input_handler() {
    rawValue = this.value;
    $$invalidate(2, rawValue);
  }
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(0, title = $$props2.title);
    if ("value" in $$props2)
      $$invalidate(3, value = $$props2.value);
    if ("size" in $$props2)
      $$invalidate(1, size = $$props2.size);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        setRawValue(value);
    }
    if ($$self.$$.dirty & 4) {
      $:
        setValue(rawValue);
    }
  };
  return [title, size, rawValue, value, input_input_handler];
}
var Decimal = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, { title: 0, value: 3, size: 1 });
  }
};
var decimal_default = Decimal;

// src/js/svelte/fields/date.svelte
function create_fragment3(ctx) {
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
function instance3($$self, $$props, $$invalidate) {
  let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
  let { required } = $$props;
  let { value } = $$props;
  const setValue = (v) => {
    const match = v.match(re);
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
  setValue(value);
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
    init(this, options, instance3, create_fragment3, safe_not_equal, { title: 1, required: 2, value: 0 });
  }
};
var date_default = Date_1;

// src/js/svelte/fields/textarea.svelte
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

// src/js/svelte/fields/select.svelte
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[0] = list[i][0];
  child_ctx[3] = list[i][1];
  return child_ctx;
}
function create_each_block(key_1, ctx) {
  let option;
  let t_value = ctx[3] + "";
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
      if (dirty & 2 && t_value !== (t_value = ctx[3] + ""))
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
function create_fragment5(ctx) {
  let div;
  let label;
  let span;
  let t0;
  let t1;
  let select;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let select_style_value;
  let mounted;
  let dispose;
  let each_value = Object.entries(ctx[1]);
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
      t0 = text(ctx[3]);
      t1 = space();
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(select, "style", select_style_value = ctx[2] ? `width: ${ctx[2]}ch;` : "");
      if (ctx[0] === void 0)
        add_render_callback(() => ctx[4].call(select));
      attr(div, "class", "field");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, span);
      append(span, t0);
      append(label, t1);
      append(label, select);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }
      select_option(select, ctx[0]);
      if (!mounted) {
        dispose = listen(select, "change", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 8)
        set_data(t0, ctx2[3]);
      if (dirty & 2) {
        each_value = Object.entries(ctx2[1]);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, select, destroy_block, create_each_block, null, get_each_context);
      }
      if (dirty & 4 && select_style_value !== (select_style_value = ctx2[2] ? `width: ${ctx2[2]}ch;` : "")) {
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
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      mounted = false;
      dispose();
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
  let { options = [] } = $$props;
  let { size } = $$props;
  let { value } = $$props;
  function select_change_handler() {
    value = select_value(this);
    $$invalidate(0, value);
    $$invalidate(1, options);
  }
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(3, title = $$props2.title);
    if ("options" in $$props2)
      $$invalidate(1, options = $$props2.options);
    if ("size" in $$props2)
      $$invalidate(2, size = $$props2.size);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
  };
  return [value, options, size, title, select_change_handler];
}
var Select = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment5, safe_not_equal, { title: 3, options: 1, size: 2, value: 0 });
  }
};
var select_default = Select;

// src/js/svelte/fields/checkbox.svelte
function add_css(target) {
  append_styles(target, "svelte-11uojqh", "label.svelte-11uojqh{cursor:pointer}");
}
function create_fragment6(ctx) {
  let div;
  let label;
  let input;
  let t0;
  let span;
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      label = element("label");
      input = element("input");
      t0 = space();
      span = element("span");
      t1 = text(ctx[1]);
      attr(input, "type", "checkbox");
      attr(label, "class", "svelte-11uojqh");
      attr(div, "class", "field");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, input);
      input.checked = ctx[0];
      append(label, t0);
      append(label, span);
      append(span, t1);
      if (!mounted) {
        dispose = listen(input, "change", ctx[2]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        input.checked = ctx2[0];
      }
      if (dirty & 2)
        set_data(t1, ctx2[1]);
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
function instance6($$self, $$props, $$invalidate) {
  let { title = "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } = $$props;
  let { value } = $$props;
  function input_change_handler() {
    value = this.checked;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2)
      $$invalidate(1, title = $$props2.title);
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
  };
  return [value, title, input_change_handler];
}
var Checkbox = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment6, safe_not_equal, { title: 1, value: 0 }, add_css);
  }
};
var checkbox_default = Checkbox;

// src/js/svelte/comp.svelte
function add_css2(target) {
  append_styles(target, "svelte-oa4utg", ".checkbox-container.svelte-oa4utg{display:flex}#debug.svelte-oa4utg{display:none}#debug.svelte-oa4utg:target{display:block;font-size:xx-small}");
}
function create_fragment7(ctx) {
  let form;
  let dateinput;
  let updating_value;
  let t0;
  let text0;
  let updating_value_1;
  let t1;
  let select0;
  let updating_value_2;
  let t2;
  let decimal0;
  let updating_value_3;
  let t3;
  let decimal1;
  let updating_value_4;
  let t4;
  let text1;
  let updating_value_5;
  let t5;
  let div;
  let checkbox0;
  let updating_value_6;
  let t6;
  let checkbox1;
  let updating_value_7;
  let t7;
  let checkbox2;
  let updating_value_8;
  let t8;
  let checkbox3;
  let updating_value_9;
  let t9;
  let select1;
  let updating_value_10;
  let t10;
  let text2;
  let updating_value_11;
  let t11;
  let text3;
  let updating_value_12;
  let t12;
  let text4;
  let updating_value_13;
  let t13;
  let text5;
  let updating_value_14;
  let t14;
  let textarea;
  let updating_value_15;
  let t15;
  let pre0;
  let t16_value = ctx[3].join(", ") + "";
  let t16;
  let t17;
  let button0;
  let t19;
  let button1;
  let t21;
  let button2;
  let t23;
  let pre1;
  let t24_value = JSON.stringify(ctx[0], null, 4) + "";
  let t24;
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
  let text0_props = { title: "\u0424\u0418\u041E", size: 50 };
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
    options: { \u043C: "\u043C\u0443\u0436\u0441\u043A\u043E\u0439", \u0436: "\u0436\u0435\u043D\u0441\u043A\u0438\u0439" }
  };
  if (ctx[0].gender !== void 0) {
    select0_props.value = ctx[0].gender;
  }
  select0 = new select_default({ props: select0_props });
  binding_callbacks.push(() => bind(select0, "value", select0_value_binding));
  function decimal0_value_binding(value) {
    ctx[9](value);
  }
  let decimal0_props = { title: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0431\u0430\u043B\u043B \u0430\u0442\u0442\u0435\u0441\u0442\u0430\u0442\u0430", size: 5 };
  if (ctx[0].certScore !== void 0) {
    decimal0_props.value = ctx[0].certScore;
  }
  decimal0 = new decimal_default({ props: decimal0_props });
  binding_callbacks.push(() => bind(decimal0, "value", decimal0_value_binding));
  function decimal1_value_binding(value) {
    ctx[10](value);
  }
  let decimal1_props = { title: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B", size: 5 };
  if (ctx[0].extraScore !== void 0) {
    decimal1_props.value = ctx[0].extraScore;
  }
  decimal1 = new decimal_default({ props: decimal1_props });
  binding_callbacks.push(() => bind(decimal1, "value", decimal1_value_binding));
  function text1_value_binding(value) {
    ctx[11](value);
  }
  let text1_props = {
    title: "\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u043A\u043E\u043D\u043A\u0443\u0440\u0441\u043D\u044B\u0439 \u0431\u0430\u043B\u043B",
    size: 5,
    readonly: true
  };
  if (ctx[2] !== void 0) {
    text1_props.value = ctx[2];
  }
  text1 = new text_default({ props: text1_props });
  binding_callbacks.push(() => bind(text1, "value", text1_value_binding));
  function checkbox0_value_binding(value) {
    ctx[12](value);
  }
  let checkbox0_props = { title: "\u041F\u043E\u0434\u043B\u0438\u043D\u043D\u0438\u043A \u0430\u0442\u0442\u0435\u0441\u0442\u0430\u0442\u0430" };
  if (ctx[0].hasEduCertOriginal !== void 0) {
    checkbox0_props.value = ctx[0].hasEduCertOriginal;
  }
  checkbox0 = new checkbox_default({ props: checkbox0_props });
  binding_callbacks.push(() => bind(checkbox0, "value", checkbox0_value_binding));
  function checkbox1_value_binding(value) {
    ctx[13](value);
  }
  let checkbox1_props = { title: "\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0430\u044F \u0441\u043F\u0440\u0430\u0432\u043A\u0430" };
  if (ctx[0].hasMedicalCert !== void 0) {
    checkbox1_props.value = ctx[0].hasMedicalCert;
  }
  checkbox1 = new checkbox_default({ props: checkbox1_props });
  binding_callbacks.push(() => bind(checkbox1, "value", checkbox1_value_binding));
  function checkbox2_value_binding(value) {
    ctx[14](value);
  }
  let checkbox2_props = { title: "\u0424\u043B\u044E\u043E\u0440\u043E\u0433\u0440\u0430\u0444\u0438\u044F" };
  if (ctx[0].hasFluoro !== void 0) {
    checkbox2_props.value = ctx[0].hasFluoro;
  }
  checkbox2 = new checkbox_default({ props: checkbox2_props });
  binding_callbacks.push(() => bind(checkbox2, "value", checkbox2_value_binding));
  function checkbox3_value_binding(value) {
    ctx[15](value);
  }
  let checkbox3_props = { title: "\u041F\u0440\u0438\u0432\u0438\u0432\u043A\u0438" };
  if (ctx[0].hasVaccine !== void 0) {
    checkbox3_props.value = ctx[0].hasVaccine;
  }
  checkbox3 = new checkbox_default({ props: checkbox3_props });
  binding_callbacks.push(() => bind(checkbox3, "value", checkbox3_value_binding));
  function select1_value_binding(value) {
    ctx[16](value);
  }
  let select1_props = {
    title: "\u041E\u0431\u0449\u0435\u0436\u0438\u0442\u0438\u0435",
    options: {
      "0": "\u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F",
      "1": "\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F",
      "2": "\u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u043E\u0435"
    }
  };
  if (ctx[0].needDorm !== void 0) {
    select1_props.value = ctx[0].needDorm;
  }
  select1 = new select_default({ props: select1_props });
  binding_callbacks.push(() => bind(select1, "value", select1_value_binding));
  function text2_value_binding(value) {
    ctx[17](value);
  }
  let text2_props = { title: "\u0410\u0434\u0440\u0435\u0441", size: 50 };
  if (ctx[0].address !== void 0) {
    text2_props.value = ctx[0].address;
  }
  text2 = new text_default({ props: text2_props });
  binding_callbacks.push(() => bind(text2, "value", text2_value_binding));
  function text3_value_binding(value) {
    ctx[18](value);
  }
  let text3_props = { title: "\u0428\u043A\u043E\u043B\u0430", size: 50 };
  if (ctx[0].school !== void 0) {
    text3_props.value = ctx[0].school;
  }
  text3 = new text_default({ props: text3_props });
  binding_callbacks.push(() => bind(text3, "value", text3_value_binding));
  function text4_value_binding(value) {
    ctx[19](value);
  }
  let text4_props = { title: "\u0413\u043E\u0434 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0448\u043A\u043E\u043B\u044B", size: 5 };
  if (ctx[0].schoolYear !== void 0) {
    text4_props.value = ctx[0].schoolYear;
  }
  text4 = new text_default({ props: text4_props });
  binding_callbacks.push(() => bind(text4, "value", text4_value_binding));
  function text5_value_binding(value) {
    ctx[20](value);
  }
  let text5_props = { title: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", size: 50 };
  if (ctx[0].tel !== void 0) {
    text5_props.value = ctx[0].tel;
  }
  text5 = new text_default({ props: text5_props });
  binding_callbacks.push(() => bind(text5, "value", text5_value_binding));
  function textarea_value_binding(value) {
    ctx[21](value);
  }
  let textarea_props = { title: "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435", size: 50 };
  if (ctx[0].memo !== void 0) {
    textarea_props.value = ctx[0].memo;
  }
  textarea = new textarea_default({ props: textarea_props });
  binding_callbacks.push(() => bind(textarea, "value", textarea_value_binding));
  return {
    c() {
      form = element("form");
      create_component(dateinput.$$.fragment);
      t0 = space();
      create_component(text0.$$.fragment);
      t1 = space();
      create_component(select0.$$.fragment);
      t2 = space();
      create_component(decimal0.$$.fragment);
      t3 = space();
      create_component(decimal1.$$.fragment);
      t4 = space();
      create_component(text1.$$.fragment);
      t5 = space();
      div = element("div");
      create_component(checkbox0.$$.fragment);
      t6 = space();
      create_component(checkbox1.$$.fragment);
      t7 = space();
      create_component(checkbox2.$$.fragment);
      t8 = space();
      create_component(checkbox3.$$.fragment);
      t9 = space();
      create_component(select1.$$.fragment);
      t10 = space();
      create_component(text2.$$.fragment);
      t11 = space();
      create_component(text3.$$.fragment);
      t12 = space();
      create_component(text4.$$.fragment);
      t13 = space();
      create_component(text5.$$.fragment);
      t14 = space();
      create_component(textarea.$$.fragment);
      t15 = space();
      pre0 = element("pre");
      t16 = text(t16_value);
      t17 = space();
      button0 = element("button");
      button0.textContent = "\u2714\uFE0F \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044C";
      t19 = space();
      button1 = element("button");
      button1.textContent = "\u{1F4D1} \u0414\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
      t21 = space();
      button2 = element("button");
      button2.textContent = "\u274C \u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0431\u0435\u0437 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F";
      t23 = space();
      pre1 = element("pre");
      t24 = text(t24_value);
      attr(div, "class", "checkbox-container svelte-oa4utg");
      attr(button0, "class", "button button--primary");
      attr(button0, "type", "submit");
      attr(button1, "class", "button button--secondary");
      attr(button1, "type", "button");
      attr(button2, "class", "button button--secondary");
      attr(button2, "type", "button");
      attr(pre1, "id", "debug");
      attr(pre1, "class", "svelte-oa4utg");
    },
    m(target, anchor) {
      insert(target, form, anchor);
      mount_component(dateinput, form, null);
      append(form, t0);
      mount_component(text0, form, null);
      append(form, t1);
      mount_component(select0, form, null);
      append(form, t2);
      mount_component(decimal0, form, null);
      append(form, t3);
      mount_component(decimal1, form, null);
      append(form, t4);
      mount_component(text1, form, null);
      append(form, t5);
      append(form, div);
      mount_component(checkbox0, div, null);
      append(div, t6);
      mount_component(checkbox1, div, null);
      append(div, t7);
      mount_component(checkbox2, div, null);
      append(div, t8);
      mount_component(checkbox3, div, null);
      append(form, t9);
      mount_component(select1, form, null);
      append(form, t10);
      mount_component(text2, form, null);
      append(form, t11);
      mount_component(text3, form, null);
      append(form, t12);
      mount_component(text4, form, null);
      append(form, t13);
      mount_component(text5, form, null);
      append(form, t14);
      mount_component(textarea, form, null);
      append(form, t15);
      append(form, pre0);
      append(pre0, t16);
      append(form, t17);
      append(form, button0);
      append(form, t19);
      append(form, button1);
      append(form, t21);
      append(form, button2);
      insert(target, t23, anchor);
      insert(target, pre1, anchor);
      append(pre1, t24);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button1, "click", ctx[22]),
          listen(button2, "click", ctx[23]),
          listen(form, "submit", prevent_default(ctx[24]))
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
      const decimal0_changes = {};
      if (!updating_value_3 && dirty & 1) {
        updating_value_3 = true;
        decimal0_changes.value = ctx2[0].certScore;
        add_flush_callback(() => updating_value_3 = false);
      }
      decimal0.$set(decimal0_changes);
      const decimal1_changes = {};
      if (!updating_value_4 && dirty & 1) {
        updating_value_4 = true;
        decimal1_changes.value = ctx2[0].extraScore;
        add_flush_callback(() => updating_value_4 = false);
      }
      decimal1.$set(decimal1_changes);
      const text1_changes = {};
      if (!updating_value_5 && dirty & 4) {
        updating_value_5 = true;
        text1_changes.value = ctx2[2];
        add_flush_callback(() => updating_value_5 = false);
      }
      text1.$set(text1_changes);
      const checkbox0_changes = {};
      if (!updating_value_6 && dirty & 1) {
        updating_value_6 = true;
        checkbox0_changes.value = ctx2[0].hasEduCertOriginal;
        add_flush_callback(() => updating_value_6 = false);
      }
      checkbox0.$set(checkbox0_changes);
      const checkbox1_changes = {};
      if (!updating_value_7 && dirty & 1) {
        updating_value_7 = true;
        checkbox1_changes.value = ctx2[0].hasMedicalCert;
        add_flush_callback(() => updating_value_7 = false);
      }
      checkbox1.$set(checkbox1_changes);
      const checkbox2_changes = {};
      if (!updating_value_8 && dirty & 1) {
        updating_value_8 = true;
        checkbox2_changes.value = ctx2[0].hasFluoro;
        add_flush_callback(() => updating_value_8 = false);
      }
      checkbox2.$set(checkbox2_changes);
      const checkbox3_changes = {};
      if (!updating_value_9 && dirty & 1) {
        updating_value_9 = true;
        checkbox3_changes.value = ctx2[0].hasVaccine;
        add_flush_callback(() => updating_value_9 = false);
      }
      checkbox3.$set(checkbox3_changes);
      const select1_changes = {};
      if (!updating_value_10 && dirty & 1) {
        updating_value_10 = true;
        select1_changes.value = ctx2[0].needDorm;
        add_flush_callback(() => updating_value_10 = false);
      }
      select1.$set(select1_changes);
      const text2_changes = {};
      if (!updating_value_11 && dirty & 1) {
        updating_value_11 = true;
        text2_changes.value = ctx2[0].address;
        add_flush_callback(() => updating_value_11 = false);
      }
      text2.$set(text2_changes);
      const text3_changes = {};
      if (!updating_value_12 && dirty & 1) {
        updating_value_12 = true;
        text3_changes.value = ctx2[0].school;
        add_flush_callback(() => updating_value_12 = false);
      }
      text3.$set(text3_changes);
      const text4_changes = {};
      if (!updating_value_13 && dirty & 1) {
        updating_value_13 = true;
        text4_changes.value = ctx2[0].schoolYear;
        add_flush_callback(() => updating_value_13 = false);
      }
      text4.$set(text4_changes);
      const text5_changes = {};
      if (!updating_value_14 && dirty & 1) {
        updating_value_14 = true;
        text5_changes.value = ctx2[0].tel;
        add_flush_callback(() => updating_value_14 = false);
      }
      text5.$set(text5_changes);
      const textarea_changes = {};
      if (!updating_value_15 && dirty & 1) {
        updating_value_15 = true;
        textarea_changes.value = ctx2[0].memo;
        add_flush_callback(() => updating_value_15 = false);
      }
      textarea.$set(textarea_changes);
      if ((!current || dirty & 8) && t16_value !== (t16_value = ctx2[3].join(", ") + ""))
        set_data(t16, t16_value);
      if ((!current || dirty & 1) && t24_value !== (t24_value = JSON.stringify(ctx2[0], null, 4) + ""))
        set_data(t24, t24_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(dateinput.$$.fragment, local);
      transition_in(text0.$$.fragment, local);
      transition_in(select0.$$.fragment, local);
      transition_in(decimal0.$$.fragment, local);
      transition_in(decimal1.$$.fragment, local);
      transition_in(text1.$$.fragment, local);
      transition_in(checkbox0.$$.fragment, local);
      transition_in(checkbox1.$$.fragment, local);
      transition_in(checkbox2.$$.fragment, local);
      transition_in(checkbox3.$$.fragment, local);
      transition_in(select1.$$.fragment, local);
      transition_in(text2.$$.fragment, local);
      transition_in(text3.$$.fragment, local);
      transition_in(text4.$$.fragment, local);
      transition_in(text5.$$.fragment, local);
      transition_in(textarea.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dateinput.$$.fragment, local);
      transition_out(text0.$$.fragment, local);
      transition_out(select0.$$.fragment, local);
      transition_out(decimal0.$$.fragment, local);
      transition_out(decimal1.$$.fragment, local);
      transition_out(text1.$$.fragment, local);
      transition_out(checkbox0.$$.fragment, local);
      transition_out(checkbox1.$$.fragment, local);
      transition_out(checkbox2.$$.fragment, local);
      transition_out(checkbox3.$$.fragment, local);
      transition_out(select1.$$.fragment, local);
      transition_out(text2.$$.fragment, local);
      transition_out(text3.$$.fragment, local);
      transition_out(text4.$$.fragment, local);
      transition_out(text5.$$.fragment, local);
      transition_out(textarea.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(form);
      destroy_component(dateinput);
      destroy_component(text0);
      destroy_component(select0);
      destroy_component(decimal0);
      destroy_component(decimal1);
      destroy_component(text1);
      destroy_component(checkbox0);
      destroy_component(checkbox1);
      destroy_component(checkbox2);
      destroy_component(checkbox3);
      destroy_component(select1);
      destroy_component(text2);
      destroy_component(text3);
      destroy_component(text4);
      destroy_component(text5);
      destroy_component(textarea);
      if (detaching)
        detach(t23);
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
function instance7($$self, $$props, $$invalidate) {
  let certScore;
  let extraScore;
  let totalScore;
  let tags;
  let { close = () => {
  } } = $$props;
  let { data = {
    type: "abit",
    regDate: "2.3.21",
    fio: "\u041D\u0438\u044F\u0437\u043E\u0432\u0430 \u041C\u0430\u0440\u0438\u043D\u0430 \u0420\u043E\u043C\u0430\u043D\u043E\u0432\u043D\u0430",
    gender: "\u0436",
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
      }
    ],
    _id: "86d77d0c-ea1d-47ca-95a4-ba9f828b424a"
  } } = $$props;
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
  function decimal0_value_binding(value) {
    if ($$self.$$.not_equal(data.certScore, value)) {
      data.certScore = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function decimal1_value_binding(value) {
    if ($$self.$$.not_equal(data.extraScore, value)) {
      data.extraScore = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text1_value_binding(value) {
    totalScore = value;
    $$invalidate(2, totalScore), $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
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
  function select1_value_binding(value) {
    if ($$self.$$.not_equal(data.needDorm, value)) {
      data.needDorm = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function text2_value_binding(value) {
    if ($$self.$$.not_equal(data.address, value)) {
      data.address = value;
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
  function text5_value_binding(value) {
    if ($$self.$$.not_equal(data.tel, value)) {
      data.tel = value;
      $$invalidate(0, data), $$invalidate(4, certScore), $$invalidate(5, extraScore);
    }
  }
  function textarea_value_binding(value) {
    if ($$self.$$.not_equal(data.memo, value)) {
      data.memo = value;
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
    if ("close" in $$props2)
      $$invalidate(1, close = $$props2.close);
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 49) {
      $: {
        $$invalidate(4, certScore = parseNumber(data.certScore));
        $$invalidate(5, extraScore = parseNumber(data.extraScore));
        $$invalidate(0, data.totalScore = parseFloat(((Number.isFinite(certScore) ? certScore : 0) + (Number.isFinite(extraScore) ? extraScore : 0)).toFixed(6)), data);
        $$invalidate(2, totalScore = Number.isFinite(data.totalScore) ? data.totalScore.toString().replace(".", ",") : 0);
      }
    }
    if ($$self.$$.dirty & 1) {
      $: {
        $$invalidate(3, tags = Array.from(data?.memo.matchAll(/#([a-zA-Z0-9_a-яА-ЯёЁ]+)/g) || [], (tag) => tag[1]));
      }
    }
  };
  return [
    data,
    close,
    totalScore,
    tags,
    certScore,
    extraScore,
    dateinput_value_binding,
    text0_value_binding,
    select0_value_binding,
    decimal0_value_binding,
    decimal1_value_binding,
    text1_value_binding,
    checkbox0_value_binding,
    checkbox1_value_binding,
    checkbox2_value_binding,
    checkbox3_value_binding,
    select1_value_binding,
    text2_value_binding,
    text3_value_binding,
    text4_value_binding,
    text5_value_binding,
    textarea_value_binding,
    click_handler,
    click_handler_1,
    submit_handler
  ];
}
var Comp = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance7, create_fragment7, safe_not_equal, { close: 1, data: 0 }, add_css2);
  }
  get close() {
    return this.$$.ctx[1];
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
