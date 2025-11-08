<script>
    import BarCode from 'jsbarcode';
    import Modal from './Modal.svelte';
    import { Base64 } from "js-base64";

    let content = ""
    let container = null
    let svg = null
    let img = ""
    let conf = {
        format: "CODE128",
        lineColor: "#000000",
        width: 2,
        height: 100,
        displayValue: true,
        text: "Custom Text",
        fontOptions: "bold",
        font: "monospace",
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 5,
        fontSize: 20,
        background: "#ffffff",
        margin: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        valid: (valid) => {
            if (!valid) {
                window.alert("Invalid barcode input")
                throw new Error(JSON.stringify(valid));
            }
        }
    }

    const generate = () => {
        try {
            BarCode(svg, content, conf)
        } catch (error) {
            return 
        }

        img = "data:image/svg+xml;base64," + Base64.encode(container.innerHTML)
    }

</script>


<div class="barcode-container">
    <h2>Barcode Generation</h2>
    <div>
        <ol>
        <li>
            <textarea bind:value={content} placeholder="content for the barcode"></textarea>
        </li>
        <li>
            <label for="format">format</label>
            <select bind:value={conf.format} name="format" id="format">
                <option value="CODE128">CODE128</option>
                <option value="EAN13">EAN13</option>
                <option value="UPC">UPC</option>
                <option value="CODE39">CODE39</option>
                <option value="ITF">ITF</option>
                <option value="MSI">MSI</option>
                <option value="Pharmacode">Pharmacode</option>
            </select>
        </li>
        <li>
            <label for="width">width</label>
            <input bind:value={conf.width} type="number" name="width" id="width">
        </li>
        <li>
            <label for="height">height</label>
            <input bind:value={conf.height} type="number" name="height" id="height">
        </li>
        <li>
            <label for="text">text</label>
            <input bind:value={conf.text} type="text" name="text" id="height">
        </li>
        <li>
            <label for="margin">margin</label>
            <input bind:value={conf.margin} type="number" name="margin" id="margin">
        </li>
        <li>
            <label for="lineColor">line color</label>
            <input bind:value={conf.lineColor} type="color" name="lineColor" id="lineColor">
        </li>
        <li>
            <label for="background">background color</label>
            <input bind:value={conf.background} type="color" name="background" id="background">
        </li>
        <li>
            <label for="displayValue">display value</label>
            <input bind:checked={conf.displayValue} type="checkbox" name="displayValue" id="displayValue">
        </li>
        <li>
            <label for="fontSize">font size</label>
            <input bind:value={conf.fontSize} type="number" name="fontSize" id="fontSize">
        </li>
        <li>
            <label for="textPosition">text position</label>
            <select bind:value={conf.textPosition} name="textPosition" id="textPosition">
            <option value="bottom">bottom</option>
            <option value="top">top</option>
            </select>
        </li>
        <li>
            <label for="textAlign">text align</label>
            <select bind:value={conf.textAlign} name="textAlign" id="textAlign">
            <option value="center">center</option>
            <option value="left">left</option>
            <option value="right">right</option>
            </select>
        </li>
        <li>
            <br/>
            <button onclick={generate}>Generate Barcode</button>
        </li>
        </ol>
    </div>
    <div style="display: none;" bind:this={container}><svg bind:this={svg}></svg></div>
    <Modal show={img !== ""} close={()=>{img = ""}}><img src={img} alt=""/></Modal>
</div>

   

<style>
    .barcode-container {
        width: 80%;
        max-width: 1000px;
        min-width: 150px;
        margin-bottom: 3rem;
    }

    .barcode-container, textarea {
        width: 100%;
        height: auto;
    }

    li{
        text-align: left;
        overflow: hidden;
    }

    input, textarea {
        background: var(--bg-color);
        color: var(--text-color);
    }

    textarea {
        width: 96%;
    }

    label {
        float: left;
    }

    input, select {
        float: right;
    }
    
    ol {
        padding: 0;
    }
</style>