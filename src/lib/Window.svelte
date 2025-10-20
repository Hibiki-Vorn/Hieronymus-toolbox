<script>
  const { show = false, icon = null , close = () => {}, title = "Title", children } = $props();

  let pos = $state({ x: 0, y: 0 });
  let size = $state({ width: 400, height: 400 });
  let offset = { x: 0, y: 0 };
  let dragging = false;
  let resizing = false;
  let resizeDir = "";
  let start = { x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 };
  let modalRef = $state(null);

  if (window.innerWidth < 768) {
    // @ts-ignore
    size.width = window.innerWidth * 90/100
    // @ts-ignore
    size.height = window.innerHeight  * 82/100
    
  }

  function handleMouseDown(event) {
    dragging = true;
    offset.x = event.clientX - pos.x;
    offset.y = event.clientY - pos.y;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event) {
    if (dragging) {
      pos.x = event.clientX - offset.x;
      pos.y = event.clientY - offset.y;
    } else if (resizing) {
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;

      const minW = 200;
      const minH = 150;

      if (resizeDir.includes("e")) {
        size.width = Math.max(minW, start.width + dx);
        pos.x = start.posX + dx / 2;
      }
      if (resizeDir.includes("s")) {
        size.height = Math.max(minH, start.height + dy);
        pos.y = start.posY + dy / 2;
      }
      if (resizeDir.includes("w")) {
        const newWidth = Math.max(minW, start.width - dx);
        const delta = newWidth - start.width;
        size.width = newWidth;
        pos.x = start.posX + dx / 2;
      }
      if (resizeDir.includes("n")) {
        const newHeight = Math.max(minH, start.height - dy);
        const delta = newHeight - start.height;
        size.height = newHeight;
        pos.y = start.posY + dy / 2;
      }
    }
  }

  function handleMouseUp() {
    dragging = false;
    resizing = false;
    resizeDir = "";
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  function startResize(event, dir) {
    resizing = true;
    resizeDir = dir;
    start = {
      x: event.clientX,
      y: event.clientY,
      width: size.width,
      height: size.height,
      posX: pos.x,
      posY: pos.y,
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  $effect(() => {
    if (show && modalRef) modalRef.focus();
  });

  const ondestroy = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    close();
  };
</script>

{#if show}
  <div
    class="content"
    bind:this={modalRef}
    role="dialog"
    aria-modal="true"
    tabindex="0"
    style={`transform: translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px));
            width: ${size.width}px;
            height: ${size.height}px;`}
  >
    
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="header" onmousedown={handleMouseDown}>
      <span class="title">
        {#if icon}
          <img src={icon} alt="icon" class="window-icon"/>
        {/if}
        {title}
      </span>
      <button onclick={ondestroy}>❌</button>
    </div>
    <hr />
    <div class="container">
      {@render children?.()}
    </div>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle top" onmousedown={(e) => startResize(e, "n")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle bottom" onmousedown={(e) => startResize(e, "s")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle left" onmousedown={(e) => startResize(e, "w")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle right" onmousedown={(e) => startResize(e, "e")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle topleft" onmousedown={(e) => startResize(e, "nw")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle topright" onmousedown={(e) => startResize(e, "ne")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle bottomleft" onmousedown={(e) => startResize(e, "sw")}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle bottomright" onmousedown={(e) => startResize(e, "se")}></div>
  </div>
{/if}

<style>
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    background: var(--bg-color, white);
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(76, 105, 185, 0.61);
    min-width: 200px;
    min-height: 150px;
    overflow: hidden;
    user-select: none;
  }

  .window-icon {
    height: 1.5rem;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }

  .header {
    height: 2rem;
    user-select: none;
    cursor: move;
  }

  .header > .title {
    float: left;
    margin-top: 0.5rem;
    margin-left: 2.5rem;
    background: none;
    font-weight: bold;
  }

  .header > button {
    float: right;
    background: transparent;
    padding: 6px;
    margin-right: 2px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .container {
    height: calc(100% - 3rem);
    overflow: auto;
    padding: 10px;
  }

  /* 边缘拖拽区样式 */
  .resize-handle {
    position: absolute;
    background: transparent;
  }

  /* 四条边 */
  .resize-handle.top,
  .resize-handle.bottom {
    height: 6px;
    left: 0;
    right: 0;
    cursor: ns-resize;
  }
  .resize-handle.top { top: 0; }
  .resize-handle.bottom { bottom: 0; }

  .resize-handle.left,
  .resize-handle.right {
    width: 6px;
    top: 0;
    bottom: 0;
    cursor: ew-resize;
  }
  .resize-handle.left { left: 0; }
  .resize-handle.right { right: 0; }

  /* 四个角 */
  .resize-handle.topleft,
  .resize-handle.topright,
  .resize-handle.bottomleft,
  .resize-handle.bottomright {
    width: 12px;
    height: 12px;
  }
  .resize-handle.topleft {
    top: 0;
    left: 0;
    cursor: nwse-resize;
  }
  .resize-handle.topright {
    top: 0;
    right: 0;
    cursor: nesw-resize;
  }
  .resize-handle.bottomleft {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
  }
  .resize-handle.bottomright {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }

  /* 悬停时让边缘可见（可选） */
  .resize-handle:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  
</style>
