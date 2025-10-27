<script>
// @ts-nocheck

    import CounterComponent from "./CounterComponent.svelte";

    let counterList = []
    let CounterName = ""

    let addCounter = () => {
        counterList = [...counterList, CounterName]
        CounterName = ""
    }
</script>

<div class="main">
  <h1>Counter</h1>
  <input style="height: 25px;" type="text" name="" placeholder="Enter the Counter's name" bind:value={CounterName}/>
  <button onclick={addCounter}>Add</button>
  <hr/>
  <div class="grid-container">
    {#each counterList as item}
      <CounterComponent CounterName={item}/>
    {/each}
    {#if counterList.length === 0}
      <div>You have no counter yet</div>
    {/if}
  </div>
</div>

<style>
  input[type="text"] {
    background: var(--bg-color);
    color: var(--text-color);
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: auto auto;
  }
</style>