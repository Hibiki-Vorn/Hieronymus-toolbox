<script>
  import { flip } from "svelte/animate";

  let textContent = $state("");
  let list = $state(window.localStorage.getItem("todolist") ? JSON.parse(window.localStorage.getItem("todolist")) : []);

  const increment = () => {
    if (textContent === "") {
      alert(`${textContent} cannot be empty`)
      return;
    }

    if (list.some(item => item.text === textContent)) {
      alert(`${textContent} has already exsit`)
      return;
    }

    list.push({ text: textContent, checked: false });
    textContent = "";

  };

  const decrement = (index) => {
    list.splice(index, 1);
  };

  const sortList = (array) => {
    let n = array.length;
    for (let i = n - 2; i >= 0; i--) {
      if (array[i].checked) {
        let j = i;
        while (j + 1 < n && !array[j + 1].checked) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          j++;
        }
      }
    }
  };

  $effect(() => {
    if (list.some(item => item.checked)) {
      sortList(list)
    }
    window.localStorage.setItem("todolist", JSON.stringify(list))
  });
</script>

<div class="contain">
  <h2>This is a ToDo list</h2>
  <div>
    <input
      type="text"
      placeholder="Please enter your todo item"
      bind:value={textContent}
      onkeydown={(e) => e.key === "Enter" && increment()}
    />
    <button class="add" onclick={increment}>Add</button>
  </div>
  <div class="container">
    {#if list.length === 0}
      <span>You have no item yet</span>
    {/if}
    {#each list as { text, checked }, index (text)}
      <span animate:flip class="item">
        <input
          type="checkbox"
          bind:checked={list[index].checked}
        />
        <span class="text">{text}</span>
        <button onclick={() => decrement(index)}>❌</button>
      </span>
    {/each}
  </div>
</div>

<style>
.contain {
  width: 100%;
  align-self: center;
  align-items: center;
  margin: auto;
}

div {
  width: 100%;
  max-width: 500px;
}

.add {
  background-color: #0070f3;
}

.text {
  overflow: auto;
}

input[type="text"] {
  width: 60%;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
}

input[type="text"]:focus {
  border-color: #0070f3;
  box-shadow: 0 0 5px rgba(0, 112, 243, 0.3);
}

.container {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: var(--text-color);
}

.item {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 12px;
  border-bottom: var(--bg-color) 1px solid;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 0.5rem;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

input[type="checkbox"] {
  margin-right: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.item > input:checked {
  opacity: 0.6;
  text-decoration: line-through;
}

.item button {
  margin-left: auto;
  border: red 1px solid;
  background-color: #fff;
}

.item button:hover {
  box-shadow: #ff2600 0px 0px 8px 0px;
  background-color: #fff;
}

@media (max-width: 600px) {
  input[type="text"] {
    margin-left: 0.5rem;
    width: 60%;
  }

  button {
    margin-left: 0;
  }
}
</style>
