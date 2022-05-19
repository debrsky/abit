<script>
  // TODO https://github.com/nosir/cleave.js

  export let title = 'Наименование';
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
  <label>
    <span>{title}</span>
    <input type="text" bind:value={rawValue} {size} />
  </label>
</div>
