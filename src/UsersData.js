import { currentDate, getCurrentDate } from "./DateData";
import { writable, get } from "svelte/store";

// user data
export let username = writable("User");
export let pets = writable([]);
export let usersData = [
  {
    owner: 'Chloe',
    accountCreationDate: new Date('09-01-2024'),
    pets: [
      {
        name: "Maggie",
        species: "Dog",
        dateOfBirth: "2020-01-01",
        photo: './maggie.png',
        activities: {
          "2024-09-17": {
            activityLevel: "Normal",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Played fetch."
          },
          "2024-09-16": {
            activityLevel: "High",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "Low",
            behaviors: "Chased a ball."
          },
          "2024-09-15": {
            activityLevel: "Normal",
            appetite: "Low",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Went for a walk."
          },
          "2024-09-14": {
            activityLevel: "Normal",
            appetite: "Low",
            bathroomHabits: "Abnormal",
            sleep: "Normal",
            behaviors: "Broke the glass door"
          },
          "2024-09-13": {
            activityLevel: "High",
            appetite: "Starved",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Locked herself in the closet and ate 2 pairs of shoes"
          },
          "2024-09-12": {
            activityLevel: "High",
            appetite: "Starved",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Locked herself in the closet and ate 2 pairs of shoes"
          },

        }
      },
      {
        name: "Mittens",
        species: "Cat",
        dateOfBirth: "2021-05-15",
        photo: "https://via.placeholder.com/150",
        activities: {
          "2024-09-17": {
            activityLevel: "Low",
            appetite: "Normal",
            bathroomHabits: "Abnormal",
            sleep: "Normal",
            behaviors: "Slept all day."
          },
          "2024-09-16": {
            activityLevel: "Normal",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "High",
            behaviors: "Watched birds."
          },
          "2024-09-15": {
            activityLevel: "Normal",
            appetite: "Low",
            bathroomHabits: "Abnormal",
            sleep: "Normal",
            behaviors: "Played with a toy."
          }
        }
      },
      {
        name: "Charlie",
        species: "Dog",
        dateOfBirth: "2022-03-20",
        photo: "https://via.placeholder.com/150",
        activities: {
          "2024-09-17": {
            activityLevel: "Normal",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Barked at a squirrel."
          },
          "2024-09-16": {
            activityLevel: "High",
            appetite: "High",
            bathroomHabits: "Normal",
            sleep: "Low",
            behaviors: "Ran in the yard."
          },
          "2024-09-15": {
            activityLevel: "Normal",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Played with a ball."
          }
        }
      },
      {
        name: "Luna",
        species: "Cat",
        dateOfBirth: "2020-08-10",
        photo: "https://via.placeholder.com/150",
        activities: {
          "2024-09-17": {
            activityLevel: "Low",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "High",
            behaviors: "Curled up in a sunny spot."
          },
          "2024-09-16": {
            activityLevel: "Normal",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Chased a laser pointer."
          },
          "2024-09-15": {
            activityLevel: "High",
            appetite: "Low",
            bathroomHabits: "Abnormal",
            sleep: "Low",
            behaviors: "Climbed the curtains."
          }
        }
      },
      {
        name: "Max",
        species: "Dog",
        dateOfBirth: "2019-11-25",
        photo: "https://via.placeholder.com/150",
        activities: {
          "2024-09-17": {
            activityLevel: "Normal",
            appetite: "High",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Enjoyed a long walk."
          },
          "2024-09-16": {
            activityLevel: "High",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "Low",
            behaviors: "Played with other dogs."
          },
          "2024-09-15": {
            activityLevel: "Normal",
            appetite: "Low",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Relaxed on the porch."
          }
        }
      },
      {
        name: "Bella",
        species: "Cat",
        dateOfBirth: "2018-12-30",
        photo: "https://via.placeholder.com/150",
        activities: {
          "2024-09-17": {
            activityLevel: "Low",
            appetite: "Normal",
            bathroomHabits: "Normal",
            sleep: "High",
            behaviors: "Slept on the couch."
          },
          "2024-09-16": {
            activityLevel: "Normal",
            appetite: "High",
            bathroomHabits: "Normal",
            sleep: "Normal",
            behaviors: "Played with yarn."
          },
          "2024-09-15": {
            activityLevel: "Normal",
            appetite: "Low",
            bathroomHabits: "Abnormal",
            sleep: "Normal",
            behaviors: "Watched the birds outside."
          }
        }
      }
    ]
  }
];

// pet data 
export let selectedPet = writable(null);
// activity data
export let showSaveMessage = writable(false);
export let savedActivityData = writable(null);
export let activityData = writable({
  activityLevel: "",
  appetite: "",
  bathroomHabits: "",
  sleep: "",
  behaviors: ""
});
// add pet modal stuff
export let showAddPetModal = false;
export let addPetMessage = '';

export function DisplayAddPetModal(value = true) {
  if (!showAddPetModal) {
    value = false;
  }
  else { value = true; }
  return value;
}

// Export arrow functions
export const getusersData = () => {
  const currentUsername = get(username); // Get the value of the store directly
  return usersData.find(user => user.owner === currentUsername);
};

export const returnUsername = () => {
  return get(username); // Get the value of the store directly
};

export const getPetList = () => get(pets);

export function setUsername(inputUsername) {
  if (!(usersData.find(user=>user.owner===inputUsername.owner))){
    const newUser = {
      owner: inputUsername,
      accountCreationDate: new Date(),
      pets:[]
    };
    usersData.push(newUser);
  }
  username.set(inputUsername); // Set the new username in the store
}

export const displaySaveMessage = () => get(showSaveMessage);

export const setPetList = () => {
  const currentUsername = get(username); // Get the value of the store directly
  const ownerData = usersData.find(user => user.owner === currentUsername);
  pets.set(ownerData ? ownerData.pets : []);
};

// Calculate number of days tracked
export function calculateDaysTracked() {
  const currentPet = get(selectedPet);
  if (!currentPet) return 0;
  return (Object.keys(currentPet.activities).length -1);
}
export function updateActivityData(date) {
  let currentPet = get(selectedPet);
  if (currentPet) {
    let currentDateStr = get(currentDate).toISOString().split('T')[0]; // Convert date to string format
    if (currentPet.activities && currentPet.activities[currentDateStr]) {
      // If activity exists for the current date, populate form fields
      activityData.set({
        activityLevel: currentPet.activities[currentDateStr].activityLevel,
        appetite: currentPet.activities[currentDateStr].appetite || "",
        bathroomHabits: currentPet.activities[currentDateStr].bathroomHabits || "",
        sleep: currentPet.activities[currentDateStr].sleep || "",
        behaviors: currentPet.activities[currentDateStr].behaviors || ""
      });
      savedActivityData.set(true);
    } else {
      // No activity for this date, reset the form fields
      activityData.set({
        activityLevel: "",
        appetite: "",
        bathroomHabits: "",
        sleep: "",
        behaviors: ""
      });
      savedActivityData.set(false);

    }
  }
}


export function saveActivity() {
  const currentPet = get(selectedPet);
  const currentActivityData = get(activityData); // Get the current values from the store
  if (currentPet) {
    currentPet.activities[get(currentDate).toISOString().split('T')[0]] = { ...currentActivityData };

    savedActivityData.set({ ...currentActivityData });
    showSaveMessage.set(true);

    // Reset activity data for the next entry
    activityData.set({
      activityLevel: "",
      appetite: "",
      bathroomHabits: "",
      sleep: "",
      behaviors: ""
    });

    // Trigger reactivity by updating the selectedPet writable store
    selectedPet.set(currentPet);

    // Hide the message after 3 seconds
    setTimeout(() => {
      showSaveMessage.set(false);
    }, 5000);
  }
}

export function addPet(newPetName, newPetSpecies, newPetDOB, newPetPhoto) {
  if (newPetName && newPetSpecies && newPetDOB && newPetPhoto) {
    let newPet = {
      name: newPetName,
      species: newPetSpecies,
      dateOfBirth: newPetDOB,
      photo: URL.createObjectURL(newPetPhoto),
      activities: {}
    };

    pets.update(currentPets => [...currentPets, newPet]);
    console.log(newPet)
    selectedPet.set(newPet)
    activityData.set({ activityLevel: "", appetite: "", bathroomHabits: "", sleep: "", behaviors: "" });
    newPetName = "";
    newPetSpecies = "";
    newPetDOB = "";
    newPetPhoto = null;
    addPetMessage = "New pet added!";
    showAddPetModal = false;

  }

}



export function confirmDeletePet(pet) {
  if (confirm(`Are you sure you want to delete ${pet.name}?`)) {
    deletePet(pet);
  }
}


function deletePet(pet) {
  pets.update(currentPets => currentPets.filter(p => p.name !== pet.name)); // Update the writable store
  selectedPet.set(null);
  activityData.set({ activityLevel: "", appetite: "", bathroomHabits: "", sleep: "", behaviors: "" });

  return get(pets); // Return the updated pets list
}

export function selectPet(pet) {
  selectedPet.set(pet);
  console.log(get(selectedPet).photo);
  
  const currentPet = get(selectedPet);
  if (!currentPet.activities[get(currentDate).toISOString().split('T')[0]]) {
    currentPet.activities[get(currentDate).toISOString().split('T')[0]] = { ...activityData };
  } else {
    activityData.set({ ...currentPet.activities[get(currentDate).toISOString().split('T')[0]] });

  }

  // Update the selectedPet store with modified activities

}