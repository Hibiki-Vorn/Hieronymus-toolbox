<script>
    import QRCode from 'qrcode';
    import Modal from './Modal.svelte';

    let img = null
    let content = ""
    let conf = {
        width: 600,
        margin: 1,
        color: {
            dark: "#000",
            light: "#fff"
        },
        errorCorrectionLevel: "H",
        scale: 1,

    }

    const generate = () => {
        QRCode.toDataURL(content, conf).then(url=>img=url)
        
    }

</script>


<div class="qrcode-container">
    <h2>QR code Generation</h2>
    <div>
        <ol>
            <li>
                <textarea name="" id="" bind:value={content} placeholder="content for the QR code"></textarea>
            </li>
            <li>
                <label for="width">width</label>
                <input bind:value={conf.width} type="number" name="width" id="">
            </li>
            <li>
                <label for="margin">margin</label>
                <input bind:value={conf.margin} type="number" name="margin" id="">
            </li>
            <li>
                <label for="color.dark">foreground color</label>
                <input bind:value={conf.color.dark} type="color" name="color.dark" id="">
            </li>
            <li>
                <label for="color.light">background color</label>
                <input bind:value={conf.color.light} type="color" name="color.light" id="">
            </li>
            <li>
                <label for="errorCorrectionLevel">errorCorrectionLevel</label>
                <select bind:value={conf.errorCorrectionLevel} name="errorCorrectionLevel" id="">
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="H">H</option>
                </select>
            </li>
            <li>
                <label for="scale">scale</label>
                <input bind:value={conf.scale} type="number" name="scale" id="">
            </li>
            <li>
                <button onclick={generate}>Generate QRcode</button>
            </li>
        </ol>
    </div>
    <Modal title="OR generated successfully" show={img !== null} close={()=>{img = null}}><img src={img} alt=""></Modal>
    
</div>

<style>
    .qrcode-container {
        width: 80%;
        max-width: 1000px;
        min-width: 150px;
        margin: 0 auto;
    }

    .qrcode-container, textarea {
        width: 100%;
        height: auto;
    }

    li{
        text-align: left;
    }

    input, textarea {
        background: var(--bg-color);
        color: var(--text-color);
    }
</style>