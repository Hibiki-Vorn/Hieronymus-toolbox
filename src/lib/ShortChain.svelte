<script>
    let inputURL = $state("");
    let resultURL = $state("");

    const getShortChain = () => {
        fetch("https://sc.3ns76ymur.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: inputURL,
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                resultURL = data;
                console.log(data);
            });
    };
</script>

<h2>Short Chain Maker</h2>
<input type="url" name="" id="" bind:value={inputURL} placeholder="please enter a long url"/>
<button onclick={getShortChain}>Shrink</button>
{#if resultURL !== ""}
    <div class="shortchain">
        <div>Your short chain is</div>
        <a href={"https://sc.3ns76ymur.workers.dev/" + resultURL}>
            https://sc.3ns76ymur.workers.dev/{resultURL}
        </a>
    </div>
{/if}

<style>
    .shortchain {
        font-weight: bolder;
        text-align: left;
    }
</style>
