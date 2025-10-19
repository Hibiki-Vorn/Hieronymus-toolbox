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
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    position: fixed;
    display: inline-block;
    background: var(--grey);
}

.content {
    top: 50%;
    left: 50%;
    padding: 10px;
    position: absolute;
    border-radius: 20px;
    display: inline-block;
    transform: translate(-50%, -50%);
    background-color: var(--bg-color);
}

.header > button {
    top: 0;
    right: 0;
    padding: 0;
    margin: 15px;
    cursor: pointer;
    position: absolute;
    background: transparent;
}

.header > .title {
    top: 0;
    left: 0;
    margin: 15px;
    cursor: pointer;
    position: absolute;
}

.header {
    height: 2rem;
    display: block;
}
</style>