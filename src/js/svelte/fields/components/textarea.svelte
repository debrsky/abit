<script>
  export let title = 'Наименование';
  export let value;
  export let size = 20;
</script>

<div class="field">
  <label>
    <span class="field__title">{title}</span>
    <textarea bind:value cols={size} />
  </label>
</div>
