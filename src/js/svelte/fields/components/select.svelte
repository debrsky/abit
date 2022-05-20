<script>
  export let title = 'Наименование';
  export let options = [];
  export let hasEmptyOption = false;
  export let size;
  export let value;
</script>

<div class="field">
  <label>
    <span class="field__title">{title}</span>
    <select
      class="field__value"
      style={size ? `width: ${size}ch;` : ''}
      bind:value
    >
      {#if hasEmptyOption}
        <option value={null} />
      {/if}
      {#each Object.entries(options) as [value, title] (value)}
        <option {value}>{title}</option>
      {/each}
    </select>
  </label>
</div>
