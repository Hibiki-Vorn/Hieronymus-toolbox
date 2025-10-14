<script>
  // 使用 $state 声明响应式变量
  let textContent = $state("");
  let list = $state([
    { text: "任务 0", checked: false },
    { text: "任务 1", checked: false },
    { text: "任务 2", checked: false },
    { text: "任务 3", checked: false },
    { text: "任务 4", checked: false },
  ]);

  // 添加新任务
  const increment = () => {
    if (textContent.trim()) {
      list.push({ text: textContent.trim(), checked: false });
      textContent = "";
    }
  };

  // 删除指定索引的任务
  const decrement = (index) => {
    list.splice(index, 1);
  };

  // 切换任务的勾选状态
  const toggleChecked = (index) => {
    list[index].checked = !list[index].checked;
  };

  // 排序任务列表：已勾选的任务排在未勾选的任务之后
  const sortedList = () => [
    ...list.filter((item) => !item.checked),
    ...list.filter((item) => item.checked),
  ];
</script>

<div>
  <div>
    <input
      placeholder="添加任务"
      bind:value={textContent}
      onkeydown={(e) => e.key === "Enter" && increment()}
    />
    <button onclick={increment}>添加</button>
  </div>
  <ul>
    {#each sortedList() as { text, checked }, index (text)}
      <li>
        <input
          type="checkbox"
          checked={checked}
          onclick={() => toggleChecked(index)}
        />
        {text}
        <button onclick={() => decrement(index)}>删除</button>
      </li>
    {/each}
  </ul>
</div>
