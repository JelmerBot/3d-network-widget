<script>
  import { onDestroy } from "svelte";
  import ForceGraph3D from "3d-force-graph";

  // --- Export props
  export let nodes = [];
  export let edges = [];
  export let nodeMapping = {};
  export let edgeMapping = {};
  export let layoutSettings = {};

  // --- Static props
  const width = 700;
  const height = 500;

  // --- Graph Layout
  const graph = ForceGraph3D()
    .width(width)
    .height(height)
    .nodeLabel("label")
    .linkVisibility(false)
    .d3AlphaMin(3.15e-44) // 10,000 iterations
    .enableNodeDrag(false)
    .showNavInfo(false);

  // --- Rotation
  let rotation = null;
  let angle = 0;
  onDestroy(() => {
    if (rotation) {
      clearInterval(rotation);
    }
  });

  // --- Controls
  $: if (layoutSettings.enabled) {
    graph.linkVisibility(false).enableNavigationControls(false);
    if (!rotation) {
      rotation = setInterval(() => {
        graph.cameraPosition({
          x: layoutSettings.distance * Math.sin(angle),
          z: layoutSettings.distance * Math.cos(angle),
        });
        angle += Math.PI / 300;
      }, 33);
    }
  } else {
    graph.linkVisibility(true).enableNavigationControls(true);
    if (rotation) {
      clearInterval(rotation);
      rotation = null;
    }
  }

  // --- Mapping
  $: {
    graph.nodeColor(nodeMapping.color);
    graph.nodeRelSize(nodeMapping.size);
    graph.nodeOpacity(nodeMapping.opacity);
  }
  $: {
    graph.linkOpacity(edgeMapping.opacity);
    graph.linkWidth(edgeMapping.linkWidth);
  }
  $: graph.graphData({ nodes, links: edges });

  // --- Hack
  // Force a re-run of the handle resize to fix controls.
  setTimeout(() => graph.controls().handleResize(), 1000);
</script>

<div use:graph />
