<script>
  // TODO https://github.com/nosir/cleave.js

  export let title;
  export let value;
  export let size = 20;

  let rawValue;

  // to avoid svelte(cyclical-reactive-declaration)
  const setRawValue = (v) => {
    rawValue = (v || '').toString().replace('.', ',');
  };
  const setValue = (r) => {
    const v = Number((r || '').toString().replace(',', '.'));
    if (Number.isFinite(v)) {
      value = v;
    } else {
      value = r;
    }
  };

  setRawValue(value);

  $: setRawValue(value);
  $: setValue(rawValue);
</script>

<div class="field">
  {#if title}
    <label>
      <span class="field__title">{title}</span>
      <input
        class="field__value"
        type="text"
        bind:value={rawValue}
        style={size ? `width: ${size}ch;` : false}
      />
    </label>
  {:else}
    <input
      class="field__value"
      type="text"
      bind:value={rawValue}
      style={size ? `width: ${size}ch;` : false}
    />
  {/if}
</div>
