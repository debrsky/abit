<script>
  export let title;
  export let value;
</script>

<div class="field field--checkbox">
  <label>
    <input class="field__value" type="checkbox" bind:checked={value} />
    {#if title}
      <span class="field__title">{title}</span>
    {/if}
  </label>
</div>

<style>
  label {
    cursor: pointer;
  }
</style>
