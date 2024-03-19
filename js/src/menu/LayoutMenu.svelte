<script>
  export let visible;
  export let send;
  export let receive;

  let enabled = true;
  let distance = 3500;

  export let settings = { enabled, distance };
  $: settings = { enabled, distance };
</script>

{#if visible === "layout"}
  <div
    class="mapping-container"
    in:receive={{ key: "layout" }}
    out:send={{ key: "layout" }}
  >
    <buttton class="close-button" on:click={() => (visible = "")}>
      <span>&times;</span>
    </buttton>
    <label class="half">
      <input type="checkbox" bind:checked={enabled} />
      enable
    </label>
    <label class="half">
      distance
      <input type="number" bind:value={distance} />
    </label>
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
    background-color: #fff;
    border-radius: 5px;
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
</style>
