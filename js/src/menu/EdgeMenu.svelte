<script>
  // --- Internal state
  let width = 1;
  let opacity = 0.15;

  // Component properties
  export let visible;
  export let send;
  export let receive;
  export let mapping = { width, opacity };
  $: mapping = { width, opacity };
</script>

{#if visible == "edge"}
  <div
    class="mapping-container"
    in:receive={{ key: "edge" }}
    out:send={{ key: "edge" }}
  >
    <buttton class="close-button" on:click={() => (visible = "")}>
      <span>&times;</span>
    </buttton>

    <span>Width:</span>
    <input type="number" bind:value={width} />
    <span>Opacity:</span>
    <input type="range" min="0" max="1" step="0.01" bind:value={opacity} />
  </div>
{/if}

<style>
  .mapping-container {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 240px;
    margin: 5px;
    padding: 5px;
    border: 2px solid #eee;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }

  .close-button {
    background-color: #eee;
    position: absolute;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    right: 1%;
    top: 1%;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
  }

  .close-button span {
    top: -1px;
    display: inline;
    position: relative;
  }

  input[type="number"] {
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    height: 25px;
    padding-left: 2px;
  }

  input {
    font-family: Arial;
    font-size: 13px;
    line-height: normal;
    margin: 1px;
    padding: 1px;
  }
</style>
