<script>
// @ts-nocheck
  import { onMount } from 'svelte';
	import favicon from "./assets/favicon.svg";

  let Component = $state(null);
  let _404 = $state(false);
  let _404_message = $state("");

  const LazyComponentRouterList = {
    '/': () => import('./lib/Index.svelte'),
    '/Counter': () => import('./lib/Counter.svelte'),
    '/TodoList': () => import('./lib/Todolist.svelte'),
  };

  onMount(() => {
    (async function loadComponent() {
      try {
        const module = await LazyComponentRouterList[window.location.pathname]();
        Component = module.default;
      } catch (error) {
        _404 = true;
        _404_message = `Component for path "${window.location.pathname}" not found.`;
      }
    })();
  });

	const toggleTheme = () => {
		const currentTheme = document.body.getAttribute("dark-theme");
		const newTheme = currentTheme === "true" ? "false" : "true";
		document.body.setAttribute("dark-theme", newTheme);
		localStorage.setItem("dark-theme", newTheme);
	};

</script>

<div>

	<header class="navbar">
		<div class="left-group">
			<div class="mobile-hidden">
        <a href="/">
          <button class="brand"><div class="minilogo"></div> Tool Box</button>
        </a>
      </div>
    </div>
		<button class="theme-button" onclick={toggleTheme}>Day/Night</button>
	</header>

	<main class="content">
    {#if Component}
      <Component/>
    {/if}
    {#if _404}
      <h1>404 Not Found</h1>
      <p>{_404_message}</p>
    {/if}
	</main>
</div>

<style>

  :global(button) {
    background-color: var(--bg-color);
    border: none;
    color: var(--button-text);
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease-in-out;
  }

  :global(button:hover) {
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
    border: 2px solid transparent;
    border-color: var(--primary-hover);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-right: 1.5rem;
    cursor: pointer;
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
