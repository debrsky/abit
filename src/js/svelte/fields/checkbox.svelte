<script>
  export let title = "Наименование";
  export let value;

</script>
<div class="field">
  <label>
    <input type="checkbox" bind:checked={value}>
    <span>{title}</span>
  </label>
</div>
