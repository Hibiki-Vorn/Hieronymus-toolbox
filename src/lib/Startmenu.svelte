<script>
  import Modal from './Modal.svelte';

  import qricon from '../assets/qr.png'
  import baricon from '../assets/barcode.svg';
  import tilisticon from '../assets/list-check.svg'
  import counter from '../assets/square-1.svg'

  export let show = false;
  export let close = null;
</script>


<Modal show = { show } close={close} title="Select a Tool">
    <ol>
        <li>
            <a href="/Counter">
                <div class="box">
                    <img src={counter} alt="">
                    <p>Counter</p>
                </div>
            </a>
        </li>
        <li>
            <a href="/TodoList">
                <div class="box">
                    <img src={tilisticon} alt="">
                    <p>Todo List</p>
                </div>
            </a>
        </li>
        <li>
            <a href="/QRcode">
                <div class="box">
                    <img src={qricon} alt="">
                    <p>QR code Generation</p>
                
            </div></a>                
        </li>
        <li>
            <a href="/Barcode">
                <div class="box">
                    <img src={baricon} alt="">
                    <p>Bar Code Generation</p>
                </div>
            </a>
        </li>
    </ol>
</Modal>


<style>
    ol {
        list-style: none;
        width: 15em;
        padding: 1rem;
        margin: 0;
    }

    li {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;
        color: var(--text-color);
        font-size: 1.2rem;
    }

    a:hover {
        text-decoration: underline;
    }

    img {
        border-radius: 10px;
        height: 50px;
        width: 50px;
    }

    .box {
        background-color: var(--grey);
        border-radius: 15px;
        padding: 10%;
    }

    p {
        margin: 0;
    }

</style>