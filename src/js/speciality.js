import SpecGrid from './svelte/blocks/speciality-grid.svelte';
import SpecTable from './svelte/blocks/speciality-table.svelte';

const specGrid = new SpecGrid({
  target: document.getElementById('speciality-grid')
});

const specTable = new SpecTable({
  target: document.getElementById('speciality-table')
});

console.log(specGrid, specTable);
