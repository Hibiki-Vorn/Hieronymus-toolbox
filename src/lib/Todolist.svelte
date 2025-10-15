<script>
  import { flip } from "svelte/animate";

  let textContent = $state("");
  let list = $state(window.localStorage.getItem("todolist") ? JSON.parse(window.localStorage.getItem("todolist")) : []);

  const increment = () => {
    if (textContent.trim()) {
      list.push({ text: textContent.trim(), checked: false });
      textContent = "";
    }
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
    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        sortList(list);
        break;
      }
    }
    window.localStorage.setItem("todolist", JSON.stringify(list));
  });
</script>

<div>
  <h1>This is a ToDo list</h1>
  <div>
    <input
      type="text"
      placeholder="Please enter your todo item"
      bind:value={textContent}
      onkeydown={(e) => e.key === "Enter" && increment()}
    />
    <button onclick={increment}>Add</button>
  </div>
  <ul>
    {#each list as { text, checked }, index (text)}
      <li animate:flip>
        <input
          type="checkbox"
          bind:checked={list[index].checked}
        />
        {text}
        <button onclick={() => decrement(index)}>❌</button>
      </li>
    {/each}
  </ul>
</div>

<style>

div {
  width: 100%;
  max-width: 500px;
}

/* 输入框和按钮 */
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

button {
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  border: none;
  border-radius: 8px;
  background: #0070f3;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #005dc1;
}

/* 列表样式 */
ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: var(--text-color);
}

li {
  margin-bottom: 0.5rem;
  padding: 0.75rem 2.4rem;
  display: flex;
  align-items: center;
  border-radius: 12px;
  border-bottom: var(--bg-color) 1px solid;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

/* hover 效果 */
li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* 勾选后的样式 */
input[type="checkbox"] {
  margin-right: 1rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

li > input:checked {
  opacity: 0.6;
  text-decoration: line-through;
}

/* 删除按钮 */
li button {
  margin-left: auto;
  border: red 1px solid;
  background-color: #fff;
}

li button:hover {
  box-shadow: #ff2600 0px 0px 8px 0px;
  background-color: #fff;
}

/* 响应式 */
@media (max-width: 600px) {
  input[type="text"] {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  button {
    width: 48%;
    margin-left: 0;
  }

  div > div {
    display: flex;
    flex-direction: column;
  }

  li {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
