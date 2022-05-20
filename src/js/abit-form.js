import FormSvelte from './svelte/comp.svelte';

const svelte = document.getElementById('svelte');

// eslint-disable-next-line no-unused-vars
const app = new FormSvelte({
  target: svelte
});
