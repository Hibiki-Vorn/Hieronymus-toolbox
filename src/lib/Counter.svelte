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

<div>
  <h1>Counter</h1>
  <input style="height: 25px;" type="text" name="" placeholder="Enter the Counter's name" bind:value={CounterName}/>
  <button onclick={addCounter}>Add Counter</button>
  <hr/>
  <ul>
    {#each counterList as item}
        <li><CounterComponent CounterName={item}/></li>
    {/each}
  </ul>
</div>

<style>
  input[type="text"] {
    background: var(--bg-color);
    color: var(--text-color);
  }
</style>