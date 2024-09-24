<script>
  import { getCurrentDate } from "./DateData";
  import { changeDate } from "./DateData";

  
</script>

<style></style>
<h2 class="title">Displayed Date</h2>
        <button on:click={() => changeDate(-1)}>&lt;</button>
        <span>{getCurrentDate().toDateString()}</span>
        <button on:click={() => changeDate(1)}>&gt;</button>