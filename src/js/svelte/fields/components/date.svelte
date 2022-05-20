<script>
  export let title = 'Наименование';
  export let required;
  export let value;

  const re = /^\s*(\d{1,2})[.,/-](\d{1,2})[.,/-](\d{2}|\d{4})\s*$/;

  const setValue = (v) => {
    const match = v?.match?.(re);
    if (match) {
      let [, dd, mm, yyyy] = match;
      if (yyyy.length == 2) yyyy = `20${yyyy}`;
      const valueStr = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
      if (!Number.isNaN(Date.parse(valueStr))) {
        value = valueStr;
      }
    }
  };

  // setValue(value);

  $: setValue(value);
</script>

<div class="field">
  <label>
    <span class="field__title">{title}</span>
    <input class="field__value" type="date" bind:value {required} />
  </label>
</div>
