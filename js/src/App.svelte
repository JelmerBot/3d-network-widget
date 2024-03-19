<script>
  import Menu from "./Menu.svelte";
  import Network from "./Network.svelte";
  import Legends from "./Legends.svelte";

  // --- Component properties
  export let model;

  // --- Extract network
  const nodes = model.get("nodes");
  let edges = model.get("edges");
  model.on("change:edges", () => {
    edges = model.get("edges");
  });

  // --- Mapping
  let nodeMapping = {};
  let edgeMapping = {};
  let layoutSettings = {};
</script>

<div>
  <Network {nodes} {edges} {nodeMapping} {edgeMapping} {layoutSettings} />
  <Menu {nodes} bind:nodeMapping bind:edgeMapping bind:layoutSettings />
  <Legends {nodeMapping} />
</div>
