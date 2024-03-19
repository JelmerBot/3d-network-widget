<script>
  import { crossfade, scale } from "svelte/transition";
  import nodeIcon from "./assets/node.png";
  import edgeIcon from "./assets/edge.png";
  import layoutIcon from "./assets/layout.png";

  import NodeMenu from "./menu/NodeMenu.svelte";
  import EdgeMenu from "./menu/EdgeMenu.svelte";
  import LayoutMenu from "./menu/LayoutMenu.svelte";

  // --- Component props
  export let nodes = [];
  export let nodeMapping = {};
  export let edgeMapping = {};
  export let layoutSettings = {};

  // --- Menu state
  let visible = ""; // can be set to: '', 'node', 'edge', 'layout'.

  const [send, receive] = crossfade({
    duration: 200,
    fallback: scale,
  });
</script>

<!-- Scripts need to run even when they are not visible -->
<NodeMenu {nodes} bind:mapping={nodeMapping} bind:visible {send} {receive} />
<EdgeMenu bind:mapping={edgeMapping} bind:visible {send} {receive} />
<LayoutMenu bind:settings={layoutSettings} bind:visible {send} {receive} />

{#if visible === ""}
  <div id="menu-container">
    <button
      class="menu-button"
      in:receive={{ key: "node" }}
      out:send={{ key: "node" }}
      on:click={() => (visible = "node")}
    >
      <img src={nodeIcon} alt="A node icon." />
    </button>
    <button
      class="menu-button"
      in:receive={{ key: "edge" }}
      out:send={{ key: "edge" }}
      on:click={() => (visible = "edge")}
    >
      <img src={edgeIcon} alt="An edge icon." />
    </button>
    <button
      class="menu-button"
      in:receive={{ key: "layout" }}
      out:send={{ key: "layout" }}
      on:click={() => (visible = "layout")}
    >
      <img src={layoutIcon} alt="A layout icon." />
    </button>
  </div>
{/if}

<style>
  #menu-container {
    display: flex;
    flex-direction: column;
    width: 30px;
    height: 100px;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .menu-button {
    width: 30px;
    height: 30px;
    margin: 1px;
    padding: 1px;
    border-width: 2px;
    border-color: #888;
  }

  .menu-button img {
    width: 100%;
    height: 100%;
  }
</style>
