<script>
  import Modal from './Modal.svelte';

  export let show = false;
  export let close = null;
</script>

<div>
    <Modal show = { show } close={close} title="Select a Tool">
        <ol>
            <li><a href="/Counter"> ➕ Counter</a></li>
            <li><a href="/TodoList"> ✅ TodoList</a></li>
        </ol>
    </Modal>
</div>

<style>
    ol {
        list-style: none;
        padding: 1rem;
        margin: 0;
    }

    li {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;
        color: var(--primary-color);
        font-size: 1.2rem;
    }

    a:hover {
        text-decoration: underline;
    }

</style>