<script>
  export let title;
  export let value;
  export let size = 20;
  export let readonly;
  export let min;
  export let max;
  export let step;
</script>

<div class="field">
  {#if title}
    <label>
      <span class="field__title">{title}</span>
      <input
        class="field__value"
        type="number"
        bind:value
        {min}
        {max}
        {step}
        style={size ? `width: ${size + 2}ch;` : false}
        {readonly}
      />
    </label>
  {:else}
    <input
      class="field__value"
      type="number"
      bind:value
      {min}
      {max}
      {step}
      style={size ? `width: ${size + 2}ch;` : false}
    />
  {/if}
</div>
