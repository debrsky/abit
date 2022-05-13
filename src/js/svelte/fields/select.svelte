<script>
  export let title = 'Наименование';
  export let options = [];
  export let size;
  export let value;
</script>

<div class="field">
  <label>
    <span>{title}</span>
    <select style={size ? `width: ${size}ch;` : ''} bind:value>
      {#each Object.entries(options) as [value, title] (value)}
        <option {value}>{title}</option>
      {/each}
    </select>
  </label>
</div>
