<script>
// @ts-nocheck
import { mount, onMount } from 'svelte';
import Checkbox from './lib/Checkbox.svelte';
import Window from './lib/Window.svelte';
import { pages, getComponentByPathname } from './miniApp_list';
import Index from './lib/Index.svelte';
import Startmenu from './lib/Startmenu.svelte';

let Components = $state([]);
let icon = $state([]);
let title = $state([]);
let key = 0;
let _404 = $state(false);
let _404_message = $state("");
let showMenu = $state(false)
let lightTheme = $state(window.localStorage.getItem("lightMode"))

const toggleTheme = (newTheme) => {
  const theme = newTheme
  window.localStorage.setItem("lightMode", theme)
  lightTheme = ( window.localStorage.getItem("lightMode") === "true" )
  document.body.dataset.lightTheme = lightTheme
  return newTheme
}

const switchTheme = () => {
  if (document.body.dataset.lightTheme === "true") {
    document.body.dataset.lightTheme = "false"
  } else {
    document.body.dataset.lightTheme = "true"
  }
}

window.addEventListener("load", () => {
  toggleTheme(window.localStorage.getItem("lightMode"))
})

async function loadComponent(p) {

    const loader = p.source

    if (!loader) {
      return;
    }

    try {
      const module = await loader();
      const iconModule = await p.icon();
      let component = {
        id: key,
        content: module.default,
        icon: iconModule.default,
        title: p.name
      }
      key++
      Components = [... Components, component]
      window.component = Components
    } catch (error) {
      _404 = true;
      _404_message = "Error loading component ";
    }
  }

  onMount(()=>{
    const pathname = window.location.pathname;
    if (pathname === "/") return;
    const component = getComponentByPathname(pathname);
    if (component) {
      loadComponent(component);
    }
  })
</script>

<header class="navbar">
  <div class="left-group">
    <div class="mobile-hidden">
      <button class="brand" onclick={()=>{showMenu=true}}>
        <div class="minilogo"></div> Tool Box
      </button>
    </div>
  </div>
  <div class="theme-button">
    <Checkbox 
      title=""
      activeContent="🌙"
      inactiveContent="☀️"
      activedBackgroundcolor="black"
      onclick={switchTheme} 
      checked={window.localStorage.getItem("lightMode") !== "true"}/>
  </div>
</header>
<Startmenu show={showMenu} close={()=>{showMenu = false}} popup={(r)=>{loadComponent(r)}}/>
<main class="content">
  {#if Components.length !== 0}
    {#each Components as Component, index (Component.id)}
    <Window icon={Component.icon} title={Component.title} show={true} mask={false} close={()=>{Components = Components.filter((_, i) => i !== index)}}>
      <Component.content/>
    </Window>
    {/each}
  {:else}
    <Index setMenu={()=>{showMenu=true}}/>
  {/if}
</main>

<style>

  button {
    border: none;
    color: var(--button-text);
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    transform: scale(1.05);
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: var(--navbar-bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    box-shadow: 0 2px 8px var(--navbar-shadow);
    z-index: 10;
    transition: background 0.3s, box-shadow 0.3s;
  }

  .left-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand {
    font-weight: bold;
    color: var(--text-color);
    background-color: var(--bg-color);
    font-size: 1.2rem;
  }


  .theme-button {
    background: none;
    padding: 0.5rem 1rem 1;
    margin-right: 1.5rem;
    font-size: 1rem;
    transition: 0.2s;
    color: inherit;
  }


  .content {
    width: 100%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 1rem;
    transition: background 0.3s, box-shadow 0.3s;
  }

  @media (max-width: 700px) {
    .brand {
      background: transparent;
      padding-left: 0;
    }
  }

  .minilogo {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("/favicon.svg");
    background-size: cover;
    background-position: center;
    display: inline-block;
    margin-right: 0rem;
    margin-bottom: 0.2rem;
    vertical-align: middle;
  }

</style>
