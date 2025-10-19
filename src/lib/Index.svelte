<script>
	import favicon from "../assets/favicon.svg";
  import Startmenu from "./Startmenu.svelte";

  let showMenu = $state(false);

  let setMenu = () => { showMenu = !showMenu };
  $effect(()=>{
    const params = new URLSearchParams(window.location.search);
    showMenu = ( params.get('showMenu') === "true")
  })

</script>

<div>
  <Startmenu show={showMenu} close={setMenu}/>
	<div class="welcome">
		<div class="logo-wrapper">
			<img src={favicon} alt="" loading="lazy" decoding="async" width="160" height="160"/>
		</div>
		<h1>Hieronymus's Tool Box</h1>
		<button class="start-button" onclick={setMenu}>Open the Tool Box now</button>
	</div>
</div>


<style>
  .welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  h1 {
    text-align: center;
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .start-button {
    background-color: var(--primary-color);
    border: none;
    color: var(--button-text);
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.2s ease-in-out;
  }

  .start-button:hover {
    background-color: var(--primary-hover);
    transform: scale(1.05);
  }


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


  .welcome img {
    width: clamp(80px, 20vw, 200px);
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
    animation: rotate 3s linear infinite;
  }

  .welcome img:hover {
    transform: scale(1.05);
  }

  .logo-wrapper {
    position: relative;
    display: inline-block;
    width: clamp(200px, 20vw, 300px);
    height: auto;
  }

  .logo-wrapper img {
    display: block;
    width: 80%;
    height: auto;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .logo-wrapper::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(circle at center,
      var(--logo-gradient-start) 0%,
      var(--logo-gradient-end) 70%);
    z-index: 1;
  }

  @keyframes rotate {
    0% {
        transform: rotate3d(1, 1, 0, 0deg);
      }
      25% {
        transform: rotate3d(1, 0, 0, 90deg);
      }
      50% {
        transform: rotate3d(0, 1, 0, 180deg);
      }
      75% {
        transform: rotate3d(0, 0, 1, 270deg);
      }
      100% {
        transform: rotate3d(1, 1, 0, 360deg);
      }
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.6rem;
    }

    .start-button {
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
    }
  }

</style>
