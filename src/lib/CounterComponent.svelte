<script>
  const { CounterName } = $props()

  let count = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<span class="text">{CounterName}</span>
<button onclick={increment}>{count}</button>

<style>
  .text {
    padding: 20px;
    font-weight:900;
    overflow: auto;
  }
</style>