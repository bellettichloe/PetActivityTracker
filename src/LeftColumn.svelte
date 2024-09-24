<script>
  import { selectPet } from "./UsersData";
  import { selectedPet } from "./UsersData";
  import { confirmDeletePet } from "./UsersData";
  import { addPet } from "./UsersData";
  import { pets } from "./UsersData";
  import { setUsername } from "./UsersData";
  import { setPetList } from "./UsersData";
  import { get, writable } from "svelte/store";
  import { currentDate } from "./DateData";

  let petList = get(pets);
  let newPetName = "";
  let newPetSpecies = "";
  let newPetDOB = "";
  let newPetPhoto = null;
  let behaviors = writable([]);
  let addPetMessage = "";
  let showAddPetModal = false;
  let showModal = true;
  let inputUsername = "";

  $:getAllNotableBehaviors($selectedPet);

  export function getUsername() {
    showModal = false;
    setUsername(inputUsername);
    setPetList();
  }
  function openAddPetModal() {
    showAddPetModal = true;
    addPetMessage = ""; // Reset message
  }

  export function cancelAddPet() {
    showAddPetModal = false;
    addPetMessage = "";
  }

  function doAddPet() {
    showAddPetModal = false;
    addPet(newPetName, newPetSpecies, newPetDOB, newPetPhoto);
  }
  function deletePet(selectedPet) {
    confirmDeletePet(selectedPet);
  }

  function doSelectPet(pet) {
    selectPet(pet);
  }

  // Function to get all past notable behaviors for the selected pet
  function getAllNotableBehaviors(selected) {
    const pet = selected;
    if (pet && pet.activities) {
       behaviors.set(Object.entries(pet.activities)
       .filter(([date, activity]) => activity.behaviors)
       .map(([date, activity]) => ({
        date,
        behaviors: activity.behaviors 
      })));
      return behaviors;
    }
    behaviors.set([]);
    return behaviors; // Return an empty array if no pet is selected or no activities
  }
</script>

<modal>
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
        <button on:click={getUsername}>Submit</button>
      </div>
    </div>
  {/if}
  {#if showAddPetModal}
    <div class="modal">
      <div class="modal-content">
        <h1 class="title">Add New Pet</h1>
        <p>
          Pet Name: <input
            type="text"
            bind:value={newPetName}
            placeholder="Pet Name"
          />
        </p>
        <p>
          Pet Species: <input
            type="text"
            bind:value={newPetSpecies}
            placeholder="Pet Species"
          />
        </p>
        <p>
          Date of Birth: <input
            type="date"
            bind:value={newPetDOB}
            placeholder="Date of Birth"
          />
        </p>
        <p>
          Picture: <input
            type="file"
            accept="image/*"
            on:change={(e) => {
              newPetPhoto = e.target.files[0];
            }}
          />
        </p>
        <button on:click={doAddPet}>OK</button>
        <button on:click={cancelAddPet}>Cancel</button>
        {#if addPetMessage}
          <p>{addPetMessage}</p>
        {/if}
      </div>
    </div>
  {/if}
</modal>
<div class="left-column column">
  <div class="box">
    <div class="header">
      <h2 class="pet-title">Pet List</h2>
    </div>
    <div class="pet-list">
      <p>
        {#each $pets as pet}
          <li class="pet-item" on:click={() => doSelectPet(pet)}>
            {pet.name}
          </li>
        {/each}
      </p>
    </div>
    <buttons>
      <button type="button" id="modify-pets" on:click={() => openAddPetModal()}
        >Add Pet</button
      >
      <button on:click={() => deletePet($selectedPet)}>Delete Pet</button
      ></buttons
    >
    {#if $selectedPet}
    <h2 class='behaviors-title'>Past Notable Behaviors</h2>
    <div class="scrollable-list">
      {#each $behaviors as { date, behaviors }}
        <div class="behavior-item">
          <strong>{date}:</strong> {behaviors}
        </div>
      {/each}
    </div>
    {/if}
</div>

</div>

<style>
  .behaviors-title{
    font-family: "Courier New", Courier, monospace;
    margin-top:15px;
    margin-bottom: 0;
  }
.scrollable-list {
    height: 200px; /* Set a max height */
    overflow-y: auto; /* Enable vertical scrolling */
    border: 1px solid #ccc; /* Optional: add a border */
    padding: 10px; /* Optional: add some padding */
    border-radius: 5px; /* Optional: round the corners */
    background-color: #f9f9f9; /* Optional: background color */
    font-family: "Courier New", Courier, monospace;
    text-align: left;

  }

  .behavior-item {
    margin: 5px 0; /* Space between each behavior item */
  }
  .pet-item {
    cursor: pointer;
    margin: 8px 0;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    border: #f0c4c4;
    background-color: #ff6b6b;
    border-radius: 8px;

    list-style-type: none; /* Remove bullet points */
  }

  .pet-item:hover {
    background: #f0c4c4;
  }

  .column {
    height: 100vh;
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: white;
    color:black;

    font-family:'Courier New', Courier, monospace;
    
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
    color: #ff6b6b;
    font-family: "Courier New", Courier, monospace;

  }
  .modal-content {
    background: white;
    padding: 32px;
    border-radius: 32px;
    text-align: center;
    font-size: 15px;
    color: #ff6b6b;
    font-family: "Courier New", Courier, monospace;

  }
  .modal-content p {
    font-weight: bold;
    text-align: left;
    color: #ff6b6b;
    font-family: "Courier New", Courier, monospace;

  }
  h1 {
    color: #ff6b6b;
    text-align: left;
    font-size: 20px;
    margin-bottom: 26px;
  }
  input {
    width: 100%;
    margin: 5px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #ff6b6b;

  }
  buttons {
    align-content: left;
    padding: 8px;
    margin: 5px;
    font-family: "Courier New", Courier, monospace;
  }
  .pet-title {
    font-size: 36px;
    color: #ff6b6b;
    margin-bottom: 0;
    text-decoration: underline;
    font-family: "Courier New", Courier, monospace;
  }
  .pet-item {
    text-align: center;
    font-size: 20px;
    color: white;
    font-family: "Courier New", Courier, monospace;
  }
  .pet-list {
    height: 200px;
    font-family: "Courier New", Courier, monospace;
    overflow-y:scroll;
  }
</style>
