<script>
  import Swatches from "./legends/Swatches.svelte";
  import ColorLegend from "./legends/ColorLegend.svelte";

  export let nodeMapping = null;
</script>

<div class="legends">
  {#if nodeMapping.colorTitle}
    {#if nodeMapping.colorType === "cat"}
      <Swatches scale={nodeMapping.colorScale} title={nodeMapping.colorTitle} />
    {:else}
      <ColorLegend
        scale={nodeMapping.colorScale}
        title={nodeMapping.colorTitle}
      />
    {/if}
  {/if}
</div>

<style>
  .legends {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    width: 320px;
    color: rgb(50, 50, 50);
  }
</style>
