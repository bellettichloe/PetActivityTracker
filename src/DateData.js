import { selectedPet } from "./UsersData";
import { updateActivityData } from "./UsersData";
import { writable, get } from "svelte/store";

export let currentDate = writable(new Date());

export function getCurrentDate() {
  let value;
  currentDate.subscribe(date => value = date)(); // Unsubscribe immediately after retrieving value
  return new Date(value); // Ensure the returned value is a Date object
}

export function calculateAge(dob) {
    const birthDate = new Date(dob);
    const ageDiff = get(currentDate) - birthDate;
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  export function changeDate(direction) {
    const newDate = new Date(get(currentDate));
    newDate.setDate(newDate.getDate() + direction); // Move date forward or backward
    currentDate.set(newDate); // Update the writable store with the new date
    
    if(selectedPet){
      updateActivityData(newDate);
    }
  }
  

  