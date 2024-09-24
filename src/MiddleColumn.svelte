<script>
  import { activityData, selectedPet } from "./UsersData.js";
  import { saveActivity } from "./UsersData.js";
  import { displaySaveMessage } from "./UsersData.js";
  import { currentDate } from "./DateData.js";
  import { savedActivityData } from "./UsersData.js";
  import { get, writable } from "svelte/store";

  let saved = writable({
    activityLevel: "",
    appetite: "",
    bathroomHabits: "",
    sleep: "",
    behaviors: "",
  });
  let showModal = false;
  function showSaveMessage() {
    return displaySaveMessage();
  }

  function handleSaveActivity(event) {
    event.preventDefault();
    saveActivity();
    let saved = get(savedActivityData);

    showModal = true;

    setTimeout(() => {
      showModal = false;
    }, 3000);
  }
  function closeModal() {
    showModal = false;
  }
</script>

<modal>
  {#if showModal}
    <div class="modal">
      <div class="modal-content">
        <br />
        <p1>Saved Activity Data</p1>
        <br />
        <p2>
          {$currentDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long", // 'short' for abbreviated month
            year: "numeric",
          })}
          <p2>
            <p>
              <strong>Activity Level:</strong>
              {$savedActivityData.activityLevel}
            </p>
            <p><strong>Appetite:</strong> {$savedActivityData.appetite}</p>
            <p>
              <strong>Bathroom Habits:</strong>
              {$savedActivityData.bathroomHabits}
            </p>
            <p><strong>Sleep:</strong> {$savedActivityData.sleep}</p>
            <p><strong>Behaviors:</strong> {$savedActivityData.behaviors}</p>
            <br />
            <button on:click={closeModal}>Close</button>
          </p2></p2
        >
      </div>
    </div>
  {/if}
</modal>
<div class="middle-column column">
  {#if $selectedPet}
    <h class="form-title">
      <h1 class="pet-name">{$selectedPet.name}</h1>
      <h1 class="current-date">
        <strong>Date: </strong>
        <div class="date">
          {$currentDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long", // 'short' for abbreviated month
            year: "numeric",
          })}
        </div>
      </h1>
    </h>

    {#if $activityData}
      <form on:submit={handleSaveActivity}>
        <div class="data-title">
          Activity Level:
          <select
            class="activity-level"
            bind:value={$activityData.activityLevel}
          >
            <option value="">Select</option>
            <option value="Insane">Insane</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
            <option value="Dead">Dead</option>
          </select>
        </div>
        <div class="data-title">
          Appetite:
          <select bind:value={$activityData.appetite}>
            <option value="">Select</option>
            <option value="Starved">Starved</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
            <option value="Very Low">Starving</option>
          </select>
        </div>
        <div class="data-title">
          Bathroom Habits:
          <select bind:value={$activityData.bathroomHabits}>
            <option value="">Select</option>
            <option value="Normal">Normal</option>
            <option value="Abnormal">Abnormal</option>
          </select>
        </div>
        <div class="data-title">
          Sleep:
          <select bind:value={$activityData.sleep}>
            <option value="">Select</option>
            <option value="Slept all day">Slept all day</option>
            <option value="Normal">Normal</option>
            <option value="Did not sleep much">Did not sleep much</option>
          </select>
        </div>
        <div class="notable-behaviors-text">
          Notable Behaviors:
          <input
            class="notable-behaviors"
            type="text"
            bind:value={$activityData.behaviors}
            placeholder="Enter behaviors"
          />
        </div>
        <br />
        <button type="submit"> Save Activity</button>
      </form>
    {/if}
  {:else}
    <p class="message">Please select a pet to view activities.</p>
  {/if}
</div>

<style>
  .column {
    text-align: center;

    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    background: white;
  }

  .middle-column {
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: "Courier New", Courier, monospace;
  }

  p {
    text-align: center;
    font-family: "Courier New", Courier, monospace;
    margin:0;
  }
  h {
    text-align: center;
    color: black;
  }
  .form-title {
    font-weight: lighter;
    color: black;
  }
  .pet-name {
    font-family: "Courier New", Courier, monospace;

    font-size: 32px;
    margin: 0;
    color: black;
  }
  .data-title {
    font-weight: bold;
    text-align: left;
    width: auto;
    display: grid;
    color: black;
  }

  .current-date {
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size: 22px;
    font-family: "Courier New", Courier, monospace;
    margin-top: 0;
    font-weight: lighter;
    color: black;
  }
  .date {
    margin-left: 5px; /* Adds a little spacing between "Date:" and the actual date */

    font-size: 20px;
    color: black;
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

  input,
  select {
    width: auto;
    margin: 5px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-family: "Courier New", Courier, monospace;
  }
  .activity-level {
    display: auto;
  }
  .notable-behaviors {
    text-align: top;
    width: 95%;
    height: 10vw;
    font-family: "Courier New", Courier, monospace;
  }
  .notable-behaviors-text {
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    color: black;
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
    text-align: left;
    color: black;
    font-family: "Courier New", Courier, monospace;
  }
  p1 {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 0px;
  }
  p2 {
    margin-top: 0;
    font-size: 20px;
  }
</style>
