<script>
  import Header from "./Header.svelte";
  import LeftColumn from "./LeftColumn.svelte";
  import MiddleColumn from "./MiddleColumn.svelte";
  import RightColumn from "./RightColumn.svelte";
  import { selectedPet } from "./UsersData";
</script>

<div class="layout">
  <div class="header"><Header/></div>
  <div1 class="left-column"><LeftColumn /></div1>
  <div2 class="middle-column"><MiddleColumn /></div2>
  <div3 class="right-column"><RightColumn/></div3>
</div>

<style>
  .layout {
  width: 100vw;
  text-align: center;

  display: grid;
  grid:
    "header header header" auto
    "leftSide body rightSide" 1fr
    / 25% 50% 25%;
  padding: 8px;
  background: linear-gradient(to right, #f8e1d4, #f5f3d1);

}


  .header {
    grid-area: header;
  }
  .left-column {
    grid-area: leftSide;
    width:100%;
  }
  .middle-column {
    grid-area: body;
  }
  .right-column {
    grid-area: rightSide;
  }
</style>
