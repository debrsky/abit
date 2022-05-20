<script>
  export let title;
  export let value;
  export let change = () => {}; // TODO https://svelte.dev/examples/dom-event-forwarding
</script>

<div class="field field--checkbox">
  <label>
    <input
      class="field__value"
      type="checkbox"
      bind:checked={value}
      on:change={(e) => change(e.target.checked)}
    />
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
