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
function empty() {
  return text("");
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
function init(component, options, instance7, create_fragment8, not_equal, props, append_styles2, dirty = [-1]) {
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
  $$.ctx = instance7 ? instance7(component, options.props || {}, (i, ret, ...rest) => {
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
        each_value = Object.entries(ctx2[1]);
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

// src/js/svelte/controls.svelte
function add_css2(target) {
  append_styles(target, "svelte-ugc9b9", "table.svelte-ugc9b9.svelte-ugc9b9{width:100%;border-collapse:collapse}table.svelte-ugc9b9 td.svelte-ugc9b9{border:1px solid lightgrey;height:5em}table.svelte-ugc9b9 td.svelte-ugc9b9:nth-child(2){vertical-align:middle;text-align:center}.fcontainer.svelte-ugc9b9.svelte-ugc9b9{display:flex;place-content:center;place-items:center;width:100%;height:100%}");
}
function create_fragment7(ctx) {
  let table;
  let tbody;
  let tr0;
  let td0;
  let t1;
  let td1;
  let div0;
  let text_1;
  let t2;
  let tr1;
  let td2;
  let t4;
  let td3;
  let div1;
  let textarea;
  let t5;
  let tr2;
  let td4;
  let t7;
  let td5;
  let div2;
  let numeric;
  let t8;
  let tr3;
  let td6;
  let t10;
  let td7;
  let div3;
  let dateinput;
  let t11;
  let tr4;
  let td8;
  let t13;
  let td9;
  let div4;
  let checkbox;
  let t14;
  let tr5;
  let td10;
  let t16;
  let td11;
  let div5;
  let select;
  let current;
  text_1 = new text_default({ props: { title: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } });
  textarea = new textarea_default({ props: { title: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } });
  numeric = new number_default({ props: { title: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } });
  dateinput = new date_default({ props: { title: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } });
  checkbox = new checkbox_default({ props: { title: "\u043D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" } });
  select = new select_default({
    props: {
      title: "\u041E\u0431\u0449\u0435\u0436\u0438\u0442\u0438\u0435",
      options: {
        "0": "\u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F",
        "1": "\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F",
        "2": "\u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u043E\u0435"
      }
    }
  });
  return {
    c() {
      table = element("table");
      tbody = element("tbody");
      tr0 = element("tr");
      td0 = element("td");
      td0.textContent = "Text";
      t1 = space();
      td1 = element("td");
      div0 = element("div");
      create_component(text_1.$$.fragment);
      t2 = space();
      tr1 = element("tr");
      td2 = element("td");
      td2.textContent = "Textarea";
      t4 = space();
      td3 = element("td");
      div1 = element("div");
      create_component(textarea.$$.fragment);
      t5 = space();
      tr2 = element("tr");
      td4 = element("td");
      td4.textContent = "Numeric";
      t7 = space();
      td5 = element("td");
      div2 = element("div");
      create_component(numeric.$$.fragment);
      t8 = space();
      tr3 = element("tr");
      td6 = element("td");
      td6.textContent = "DateInput";
      t10 = space();
      td7 = element("td");
      div3 = element("div");
      create_component(dateinput.$$.fragment);
      t11 = space();
      tr4 = element("tr");
      td8 = element("td");
      td8.textContent = "Checkbox";
      t13 = space();
      td9 = element("td");
      div4 = element("div");
      create_component(checkbox.$$.fragment);
      t14 = space();
      tr5 = element("tr");
      td10 = element("td");
      td10.textContent = "Select";
      t16 = space();
      td11 = element("td");
      div5 = element("div");
      create_component(select.$$.fragment);
      attr(td0, "class", "svelte-ugc9b9");
      attr(div0, "class", "fcontainer svelte-ugc9b9");
      attr(td1, "class", "svelte-ugc9b9");
      attr(td2, "class", "svelte-ugc9b9");
      attr(div1, "class", "fcontainer svelte-ugc9b9");
      attr(td3, "class", "svelte-ugc9b9");
      attr(td4, "class", "svelte-ugc9b9");
      attr(div2, "class", "fcontainer svelte-ugc9b9");
      attr(td5, "class", "svelte-ugc9b9");
      attr(td6, "class", "svelte-ugc9b9");
      attr(div3, "class", "fcontainer svelte-ugc9b9");
      attr(td7, "class", "svelte-ugc9b9");
      attr(td8, "class", "svelte-ugc9b9");
      attr(div4, "class", "fcontainer svelte-ugc9b9");
      attr(td9, "class", "svelte-ugc9b9");
      attr(td10, "class", "svelte-ugc9b9");
      attr(div5, "class", "fcontainer svelte-ugc9b9");
      attr(td11, "class", "svelte-ugc9b9");
      attr(table, "class", "svelte-ugc9b9");
    },
    m(target, anchor) {
      insert(target, table, anchor);
      append(table, tbody);
      append(tbody, tr0);
      append(tr0, td0);
      append(tr0, t1);
      append(tr0, td1);
      append(td1, div0);
      mount_component(text_1, div0, null);
      append(tbody, t2);
      append(tbody, tr1);
      append(tr1, td2);
      append(tr1, t4);
      append(tr1, td3);
      append(td3, div1);
      mount_component(textarea, div1, null);
      append(tbody, t5);
      append(tbody, tr2);
      append(tr2, td4);
      append(tr2, t7);
      append(tr2, td5);
      append(td5, div2);
      mount_component(numeric, div2, null);
      append(tbody, t8);
      append(tbody, tr3);
      append(tr3, td6);
      append(tr3, t10);
      append(tr3, td7);
      append(td7, div3);
      mount_component(dateinput, div3, null);
      append(tbody, t11);
      append(tbody, tr4);
      append(tr4, td8);
      append(tr4, t13);
      append(tr4, td9);
      append(td9, div4);
      mount_component(checkbox, div4, null);
      append(tbody, t14);
      append(tbody, tr5);
      append(tr5, td10);
      append(tr5, t16);
      append(tr5, td11);
      append(td11, div5);
      mount_component(select, div5, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(text_1.$$.fragment, local);
      transition_in(textarea.$$.fragment, local);
      transition_in(numeric.$$.fragment, local);
      transition_in(dateinput.$$.fragment, local);
      transition_in(checkbox.$$.fragment, local);
      transition_in(select.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(text_1.$$.fragment, local);
      transition_out(textarea.$$.fragment, local);
      transition_out(numeric.$$.fragment, local);
      transition_out(dateinput.$$.fragment, local);
      transition_out(checkbox.$$.fragment, local);
      transition_out(select.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(table);
      destroy_component(text_1);
      destroy_component(textarea);
      destroy_component(numeric);
      destroy_component(dateinput);
      destroy_component(checkbox);
      destroy_component(select);
    }
  };
}
var Controls = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment7, safe_not_equal, {}, add_css2);
  }
};
var controls_default = Controls;
export {
  controls_default as default
};
//# sourceMappingURL=controls.js.map
