<script>
  export let title;
  export let value;
  export let size = 20;
</script>

<div class="field">
  {#if title}
    <label>
      <span class="field__title">{title}</span>
      <input
        class="field__value"
        type="text"
        bind:value
        style={size ? `width: ${size}ch;` : false}
      />
    </label>
  {:else}
    <input
      class="field__value"
      type="text"
      bind:value
      style={size ? `width: ${size}ch;` : false}
    />
  {/if}
</div>
