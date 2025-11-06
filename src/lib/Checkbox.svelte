<script>

    import { onMount } from "svelte";

    let { checked, onclick, activeContent, inactiveContent, activedBackgroundcolor } = $props();
    let _this = {}

    let checkstate = $state(false)

    const onchecked = () => {
        onclick(checkstate)
    }

    onMount(() => {

        checkstate = checked

        if (activeContent) {
            _this.style.setProperty("--active-content", `"${activeContent}"`)
        }
        if (inactiveContent) {
            _this.style.setProperty("--inactive-content", `"${inactiveContent}"`)
        }
        if (activedBackgroundcolor) {
            _this.style.setProperty("--active-color", `"${activedBackgroundcolor}"`)
        }
    })

</script>

<div class="checkbox-container" bind:this={_this}>
    <label class="switch">
        <input type="checkbox" onclick={onchecked} bind:checked={checkstate}/>
        <span class="slider"></span>
    </label>
</div>

<style>
    .checkbox-container {
        --active-content: "";
        --inactive-content: "";
        display: inline-block;
        position: relative;
    }
    .switch {
        position: relative;
        display: inline-block;
        cursor: pointer;
        width: 60px;
        height: 34px;
    }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgb(207, 207, 207);
        transition: background-color 0.3s;
        border-radius: 34px;
    }
    .slider::before {
        position: absolute;
        content: var(--inactive-content);
        height: 26px;
        width: 26px;
        left: 4px;
        top: 4px;
        background-color: white;
        transition: transform 0.3s;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }
    input:checked + .slider {
        background-color: #8a8787c0;
    }
    input:checked + .slider::before {
        transform: translateX(26px);
        content: var(--active-content);
        background-color: black;
    }
</style>