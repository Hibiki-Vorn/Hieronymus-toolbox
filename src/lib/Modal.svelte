<script>
    const { show = false, close = () => {}, title = "Title", children } = $props();

    let pos = $state({ x: 0, y: 0 });
    let offset = { x: 0, y: 0 };
    let dragging = false;
    let modalRef = $state(null)

    function handleMouseDown(event) {
        dragging = true;
        offset.x = event.clientX - pos.x;
        offset.y = event.clientY - pos.y;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(event) {
        if (dragging) {
        pos.x = event.clientX - offset.x;
        pos.y = event.clientY - offset.y;
        }
    }

    function handleMouseUp() {
        dragging = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }

    $effect(()=>{
        if (show && modalRef) {
            modalRef.focus();
        }
    })

</script>

{#if show}
    <div class="mask">
        <div
        class="content"
        bind:this={modalRef}
        role="dialog"
        tabindex="0"
        style="transform: translate(calc(-50% + {pos.x}px), calc(-50% + {pos.y}px));"
        >
        <div role="dialog" tabindex="0" class="header" onmousedown={handleMouseDown}>
            <span class="title">{title}</span>
            <button onclick={()=>{close()}}>❌</button>
        </div>
        <hr />
        <div class="container">
            {@render children?.()}
        </div>
        </div>
    </div>
{/if}

<style>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background: var(--grey, rgba(0, 0, 0, 0.5));
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 10px;
        border-radius: 20px;
        background-color: var(--bg-color, white);
        min-width: 300px;
        max-width: 80vw;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .header {
        height: 2rem;
        user-select: none;
        cursor: move;
        position: relative;
        overflow: hidden;
    }

    .header > .title {
        float: left;
        font-weight: bold;
    }

    .header > button {
        float: right;
        background: transparent;
        margin: 0;
        padding: 0;
        border: none;
        cursor: pointer;
        font-size: 1rem;
    }

    .header > button:hover {
        font-size: 1.2rem;
    }

    .container {
        max-height: calc(80vh - 60px);
        align-items: center;
        overflow: auto;
        padding: 10px;
    }
</style>