<script>
  let count = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<div>
  <h1>Counter</h1>
  <button onclick={increment}>
    <h2>count is {count}</h2>
  </button>
</div>

<style>
  h2 {
    margin: 0;
    padding: 0;
  }
</style>