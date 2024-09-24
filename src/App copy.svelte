<script>
  import Header from "./Header.svelte";
  import LeftColumn from "./LeftColumn.svelte";
  import { showAddPetModal } from "./PetData";
  import { calculateDaysTracked } from "./PetData";
    import MiddleColumn from "./MiddleColumn.svelte";
  import { DisplayAddPetModal } from "./PetData";
  export let username = "User";
  export let inputUsername = "";
  export const accountCreationDate = new Date('0022-01-20');
  
  export let showModal = true;

  function setUsername() {
    if (inputUsername) {
      username = inputUsername;
      showModal = false;
    }
  }
</script>


{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <h2>Enter Your Username</h2>
      <input
        type="text"
        id="usernameInput"
        bind:value={inputUsername}
        placeholder="Username"
      />
      <button on:click={setUsername}>Submit</button>
    </div>
  </div>
{/if}


<Header></Header>
<body>
  <div class="container">
    <LeftColumn>div</LeftColumn>

    <MiddleColumn></MiddleColumn>
    
  </div>
</body>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    display: grid;
    gap: 10px;
    font-family: "Arial", sans-serif;
    color: #333;
    background: linear-gradient(to right, #f8e1d4, #f5f3d1);
    text-align: center;
  }
  .container {
    display: inline-flex;
    padding: 8px;
    text-align: center;
    width: 100%;
  }
  .column {
    text-align: center;

    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    background: white;
    height: 100%;
    width: 100%;
  }
  .left-column {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .middle-column {
    width: 50%;
  }
  .right-column {
    width: 25%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .header,
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .pet-item {
    cursor: pointer;
    margin: 8px 0;
    padding: 8px;
    font-weight: bold;
    font-size: 24px;
    text-align: left;
    border: #f0c4c4;
    list-style-type: none; /* Remove bullet points */
  }

  .pet-item:hover {
    background: #f0c4c4;
  }
  input,
  select {
    width: 100%;
    margin: 5px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #ff6b6b;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  button:hover {
    background-color: #ff4c4c;
  }

  h2 {
    color: #ff6b6b;
    text-align: center;
  }
  h3 {
    font-size: 26px;
    margin-top: 50px;
    margin-bottom: 0;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

</style>
