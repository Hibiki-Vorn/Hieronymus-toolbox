<script>
// @ts-nocheck

  import Modal from './Modal.svelte';
  import { pages } from '../miniApp_list.js';
  import { onMount } from 'svelte';

  let { show = false, close = ()=>{}, popup=()=>{}} = $props()

  let loadedPages = $state([]);

  const showMenu = ( new URLSearchParams(window.location.search) ).get('showMenu') === "true"

  onMount(async () => {
    loadedPages = await Promise.all(
      pages.map(async page => {
        const iconModule = await page.icon();
        return { ...page, iconUrl: iconModule.default };
      })
    )
  })
</script>

<Modal show={show} close={close} title="Select a Tool">
  <ol>
    {#each loadedPages as page}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <li onclick={()=>{popup(page);close()}}>
        <div class="box">
          <img src={page.iconUrl} alt={page.name} />
          <p>{page.name}</p>
        </div>
        
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
        text-decoration: none;
        color: var(--text-color);
        margin: 0.5rem 0;
        font-size: 1.2rem;
    }

    li:hover {
        text-decoration: underline;
    }

    img {
        border-radius: 16px;
        background-color: black;
        padding: 5px;
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