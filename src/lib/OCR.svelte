<script>
    // @ts-nocheck
    import Tesseract from "tesseract.js";
    Tesseract.recognize();
    let textOCR = $state("");
    let progress = $state(0);
    let progressState = $state("");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    const getImage = () => {
        input.click();
        input.onchange = async (e) => {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files?.[0]);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            }).then((uri) => {
                Tesseract.recognize(uri, ["eng", "chi_sim"], {
                    logger: (info) => {
                        progressState = info.status;
                        progress = info.progress;
                    },
                }).then((result) => {
                    textOCR = result.data.text;
                });
            });
        };
    };

    const clear = () => {
        textOCR = "";
        progress = 0;
        progressState = "";
    };
</script>

<div class="container">
    {#if progress === 0}
        <span>This is an OCR app</span>
        <button onclick={getImage}>Upload Image</button>
    {:else if progress !== 1}
        <div>{progressState}</div>
        <progress value={progress} max="1"></progress>
    {:else if textOCR !== ""}
        <div class="result">
            <div>
                This is result
                <button onclick={clear}>Clear</button>
            </div>
            {textOCR}
        </div>
    {/if}
</div>

<style>
    .result {
        padding-bottom: 25px;
        text-align: justify;
        height: 80%;
        overflow: auto;
    }

    span {
        font-weight: 900;
        font-size: larger;
    }

    progress {
        margin-top: 10px;
        height: 15px;
        appearance: none;
        border-radius: 15px;
    }
</style>
