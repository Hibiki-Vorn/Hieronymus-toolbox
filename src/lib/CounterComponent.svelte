<script>

  const { CounterName } = $props()

  let count = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<div>
  <span class="text">Count of "{CounterName}" is {count}</span><button onclick={increment}>Count</button>
  
</div>

<style>
  .text {
    padding: 20px;
    font-weight:900;
  }
</style>