<script>
    export let show = false;
    export let close = null;
    export let title = "Title";

</script>

{#if show}
<div class="mask">
    <div class="content">
        <div class="header">
            <span class="title">{title}</span>
            {#if close === null}
                <button onclick={()=>{}}>X</button>
            {:else}
                <button onclick={close}>❌</button>
            {/if}
        </div>
        <hr/>
            <slot></slot>

    </div>
    
</div>
{/if}
<style>

.mask {
    position: fixed; /* 固定在视口上 */
    top: 0;
    left: 0;
    width: 100vw; /* 占满整个视口宽度 */
    height: 100vh; /* 占满整个视口高度 */
    background: rgba(134, 115, 115, 0.562); /* 半透明黑色背景，可自行调整 */
    z-index: 9999; /* 确保在最上层 */
    display: inline-block;
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    background-color: var(--bg-color);
    border-radius: 20px;
    padding: 10px;
}

.header > button {
    position: absolute;
    margin: 15px;
    right: 0;
    top: 0;
    padding: 0;
    cursor: pointer;
}

.header > .title {
    margin: 15px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
}

.header {
    display: block;
    height: 2rem;
}
</style>