import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const savedTheme = (localStorage.getItem("dark-theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)).toString()
document.body.setAttribute("dark-theme", savedTheme);
localStorage.setItem("dark-theme", savedTheme);

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
