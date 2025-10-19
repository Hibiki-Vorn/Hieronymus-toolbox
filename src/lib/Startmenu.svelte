<script>
// @ts-nocheck

  import Modal from './Modal.svelte';
  import { pages } from '../miniApp_list.js';
  import { onMount } from 'svelte';

  export let show = false;
  export let close = null;

  let loadedPages = [];

  const showMenu = ( new URLSearchParams(window.location.search) ).get('showMenu') === "true"

  onMount(async () => {
    loadedPages = await Promise.all(
      pages.map(async page => {
        const iconModule = await page.icon();
        return { ...page, iconUrl: iconModule.default };
      })
    )

    if (!showMenu) {
      loadedPages.shift()
    }else {
      close = () => window.location.href = "/"
    }
  })
</script>

<Modal show={show} close={close} title="Select a Tool">
  <ol>
    {#each loadedPages as page}
      <li>
        <a href={page.router}>
          <div class="box">
            <img src={page.iconUrl} alt={page.name} />
            <p>{page.name}</p>
          </div>
        </a>
      </li>
    {/each}
  </ol>
</Modal>

<style>
    ol {
        list-style: none;
        width: 15em;
        padding: 1rem;
        margin: 0;
    }

    li {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;
        color: var(--text-color);
        font-size: 1.2rem;
    }

    a:hover {
        text-decoration: underline;
    }

    img {
        border-radius: 10px;
        height: 50px;
        width: 50px;
    }

    .box {
        background-color: var(--grey);
        border-radius: 15px;
        padding: 10%;
    }

    p {
        margin: 0;
    }

</style>