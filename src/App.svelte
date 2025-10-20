<script>
// @ts-nocheck
import { onMount } from 'svelte';
import Checkbox from './lib/Checkbox.svelte';
import Window from './lib/Window.svelte';
import { pages, routes } from './miniApp_list';

let Component = $state(null);
let icon = $state(null);
let _404 = $state(false);
let _404_message = $state("");
let lightTheme = $state(window.localStorage.getItem("lightMode"))

const toggleTheme = (newTheme) => {
  const theme = newTheme.toString()
  window.localStorage.setItem("lightMode", theme)
  lightTheme = ( window.localStorage.getItem("lightMode") === "true")
  document.body.dataset.lightTheme = lightTheme.toString()
  return newTheme
}

window.addEventListener("load", () => {
  toggleTheme(window.localStorage.getItem("lightMode"))
})

onMount(() => {
  (async () => {
    const path = window.location.pathname.replace(/-./g, m => m[1].toUpperCase());
    const loader = routes[path]

    const pageInfo = pages.find(p => p.router.replace(/-./g, m => m[1].toUpperCase()) === path)

    if (!loader) {
      _404 = true;
      _404_message = `Component for path "${window.location.pathname}" not found.`;
      return;
    }

    try {
      const module = await loader();
      Component = module.default;
      const iconModule = await pageInfo.icon();
      icon = iconModule.default || iconModule;
    } catch (error) {
      _404 = true;
      _404_message = `Error loading component for path "${window.location.pathname}"`;
    }
  })();
})
</script>

<header class="navbar">
  <div class="left-group">
    <div class="mobile-hidden">
      <a href="/?showMenu=true">
        <button class="brand">
          <div class="minilogo"></div> Tool Box
        </button>
      </a>
    </div>
  </div>
  <div class="theme-button">
    <Checkbox 
      title=""
      activeContent="🌙"
      inactiveContent="☀️"
      activedBackgroundcolor="black"
      onclick={toggleTheme} 
      checked={window.localStorage.getItem("lightMode") !== "true"}/>
  </div>
</header>

<main class="content">
  {#if Component}
    {#if window.location.pathname === "/"}
      <Component/>
    {:else}
      <Window icon={icon} title={window.location.pathname.slice(1)} show={true} mask={false} close={()=>{window.location.pathname = "/"}}>
        <Component/>
      </Window>
    {/if}
  {/if}

  {#if _404}
    <h1>404 Not Found</h1>
    <p>{_404_message}</p>
  {/if}
</main>

<style>

  button {
    background-color: var(--bg-color);
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
