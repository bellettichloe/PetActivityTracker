<script>
  import { selectedPet, username, usersData } from "./UsersData";
  import { currentDate } from "./DateData";
  import { changeDate } from "./DateData";
  import { calculateAge } from "./DateData";

  let accountCreationDate;
  $: {
    let user = usersData.find((user) => user.owner === $username); // Use reactive $username
    accountCreationDate = user ? user.accountCreationDate : null; // Get the account creation date
    if (accountCreationDate) {
      accountCreationDate = accountCreationDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long", // 'short' for abbreviated month
        year: "numeric",
      });
    }
  }
</script>


<div class="right-column">
  <div class="user-info">
    <h2 class="welcome-message">Welcome {$username}!</h2>
    <p><strong>Account Creation:</strong> {accountCreationDate}</p>
  </div>

  <div class="displayed-date">
    <h2 class="title">Displayed Date</h2>
    <button on:click={() => changeDate(-1)}>&lt;</button>
    <span>{$currentDate.toDateString()}</span>
    <button on:click={() => changeDate(1)}>&gt;</button>
  </div>
  <div class="pet-data">
    {#if $selectedPet}
      <div class="pet-data">
        <h3>{$selectedPet.name}</h3>
        {#if $selectedPet.photo}
          <img class='pet-photo'
          src={$selectedPet.photo.startsWith('blob') ? $selectedPet.photo : `${$selectedPet.photo}`} 
            alt={`Photo of ${$selectedPet.name}`}
            style="max-width: auto; border-radius: 5px;"
          />
        {/if}

        <p>
          <strong>Age:</strong>
          {calculateAge($selectedPet.dateOfBirth)} years
        </p>
        <p><strong>Species:</strong> {$selectedPet.species}</p>
        <p>
          <strong>Days Tracked for {$selectedPet.name}:</strong>
          {Object.keys($selectedPet.activities).length -1} days
        </p>
      </div>
    {/if}
  </div>
</div>

<style>
  .right-column {
    height: 100vh;
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: white;
    font-family:'Courier New', Courier, monospace;
    
  }
  .pet-photo {
    height:100%;
  }
  .user-info {
    max-height: 20%;
    margin-bottom: 20px;
    color:black;

  }
  .welcome-message {
    font-size: 36px;
    margin-bottom: 0;
    
    
  }
  .displayed-date{
    max-height: 30%;
    color:black;

    
  }
  .pet-data{
    max-height: 50%;
    display: block;
    color: #ff6b6b;
  }

  .title {
    text-align: center;
    margin-bottom: 10px;
    color: #ff6b6b;
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
    font-size: 36px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 0px;
  }

  .pet-data {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #ff6b6b;
    

  }

  p {
    gap: 0;
    margin: 0;
  }
</style>
