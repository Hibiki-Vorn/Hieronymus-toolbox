<script>
    let { checked, onclick, title } = $props();

    $effect(() => {
        onclick(checked)
    });

</script>

<div class="checkbox-container">
    <span class="fake-title">{title}</span>
    <span class="title">{title}</span>
    <label class="switch">
        <input type="checkbox" bind:checked={checked}/>
        <span class="slider"></span>
    </label>
</div>

<style>
    .checkbox-container {
        display: inline-block;
        position: relative;
    }
    .fake-title {
        height: 34px;
        line-height: 34px;
        vertical-align: middle;
        user-select: none;
        visibility: hidden;
    }
    
    .title {
        position: absolute;
        top: 8px;
        left: -2px;

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
        background-color: #ccc;
        transition: background-color 0.3s;
        border-radius: 34px;
    }
    .slider::before {
        position: absolute;
        content: "☀️";
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
        background-color: gray;
    }
    input:checked + .slider::before {
        transform: translateX(26px);
        background-color: black;
        content: "🌙";
    }
</style>