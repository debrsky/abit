<script>
  export let title = "Наименование";
  export let value;
  export let size = 20;
</script>
<div class="field">
  <label>
    <span>{title}</span>
    <input type="text" bind:value size={size}>
  </label>
</div>