<script>
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) alert("你的浏览器不支持 WebGL，无法显示 Live2D 模型");
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
<iframe src="https://live2d-widget-5o0.pages.dev/" frameborder="0"/>

<style>
    iframe {
        height: calc( 100% - 10px );
        width: 100%;
    }
</style>