<script>
  export let title = "Наименование";
  export let value;
  export let size = 20;
</script>
<div class="field">
  <label>
    <span>{title}</span>
    <textarea bind:value={value} cols={size}></textarea>
  </label>
</div>