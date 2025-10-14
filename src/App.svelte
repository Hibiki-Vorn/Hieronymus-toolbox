<script>
	import Counter from "./lib/Counter.svelte";
	import Todolist from "./lib/Todolist.svelte";

	let active = [false, true, true];
	const switchtag = (i) => {
		active = active.map((_, index) => index !== i);
	};

	let started = false;
	let showMenu = false;

  const reset = () => {
    started = false;
	  showMenu = false;
  }

	const start = () => {
		started = !started;
	};
</script>

{#if !started}
	<div class="welcome">
		<h1>Hieronymus's Toolbox</h1>
		<button class="start-button" onclick={start}>Start</button>
	</div>
{:else}
	<!-- 顶部导航栏 -->
	<header class="navbar">
		<div class="left-group">
			<div class="brand"><button onclick={reset}>🧰 Toolbox</button></div>

			<!-- 桌面端菜单 -->
			<nav class="nav-links">
				<button
					class:selected={!active[1]}
					onclick={() => switchtag(1)}
				>Counter</button>
				<button
					class:selected={!active[2]}
					onclick={() => switchtag(2)}
				>Todolist</button>
			</nav>
		</div>

		<!-- 手机端菜单按钮 -->
		<button class="menu-toggle" onclick={() => (showMenu = !showMenu)}>
			☰
		</button>

		<!-- 手机端菜单展开 -->
		{#if showMenu}
			<div class="mobile-menu">
				<button
					class:selected={!active[1]}
					onclick={() => { switchtag(0); showMenu = false; }}
				>Counter</button>
				<button
					class:selected={!active[2]}
					onclick={() => { switchtag(1); showMenu = false; }}
				>Todolist</button>
			</div>
		{/if}
	</header>

	<!-- 主体内容区 -->
	<main class="content">
		<div hidden={active[0]}>Please Select a tag from menu</div>
		<div hidden={active[1]}><Counter /></div>
		<div hidden={active[2]}><Todolist /></div>
	</main>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		background: #fafafa;
		color: #333;
	}

	/* 欢迎页 */
	.welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}

	h1 {
		text-align: center;
		color: #ff3e00;
		font-size: 2rem;
		margin-bottom: 1.5rem;
	}

	.start-button {
		background-color: #ff3e00;
		border: none;
		color: white;
		padding: 0.8rem 1.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
		font-size: 1.1rem;
		transition: all 0.2s ease-in-out;
	}
	.start-button:hover {
		background-color: #e03400;
		transform: scale(1.05);
	}

	/* 顶部导航栏 */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.left-group {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.brand {
		font-weight: bold;
		color: #ff3e00;
		font-size: 1.2rem;
	}

	.nav-links {
		display: flex;
		gap: 0.8rem;
	}

	.nav-links button,
	.mobile-menu button {
		background: none;
		border: 2px solid transparent;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-size: 1rem;
		transition: 0.2s;
	}

	.nav-links button:hover,
	.mobile-menu button:hover {
		background: #fff4ef;
	}

	.nav-links button.selected,
	.mobile-menu button.selected {
		border-color: #ff3e00;
		color: #ff3e00;
		font-weight: 600;
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		font-size: 1.8rem;
		cursor: pointer;
		color: #ff3e00;
	}

	/* 手机端菜单 */
	.mobile-menu {
		position: absolute;
		top: 60px;
		right: 0;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0.5rem 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		border-bottom-left-radius: 0.75rem;
	}

	/* 主体内容 */
	.content {
		margin-top: 80px;
		padding: 1rem;
		width: 100%;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* --- 响应式 --- */
	@media (max-width: 700px) {
		.nav-links {
			display: none;
		}
		.menu-toggle {
			display: block;
		}
	}
</style>
