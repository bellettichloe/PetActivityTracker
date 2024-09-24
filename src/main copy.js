import './app.css'
import App from './App.svelte'
import LeftColumn from './LeftColumn.svelte';

export const writable = {};

const app = new App({
  target: document.getElementById('app'),
})

export default app
