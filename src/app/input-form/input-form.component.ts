import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  selectedOptions: string[] = [];
  selectedCount: number = 0;
  userInput: string = '';
  workoutInput: string[] = [];
  timeInput: string = '';
  users: { userInput: string, workoutInput: string[], timeInput: string }[] = [];
  filteredItems: { userInput: string, workoutInput: string[], timeInput: string }[] = [];
  searchText: string = '';
  searchWorkout: string = '';
  workoutOptions: string[] = ['Yoga', 'Running', 'Swimming', 'Cycling', 'Gym'];

  // Pagination
  pageSize: number = 5;
  currentPage: number = 1;
  
  constructor() {
    this.filteredItems = this.users;
  }

  onSubmit() {
    if (this.userInput && this.workoutInput.length && this.timeInput) {
      this.users.push({ userInput: this.userInput, workoutInput: this.workoutInput, timeInput: this.timeInput });
      this.userInput = '';
      this.workoutInput = [];
      this.timeInput = '';
      this.filterItems();  // Update filtered items after adding a new user
    }
  }

  updateSelectedCount(event: any): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.workoutInput = Array.from(selectedOptions).map(option => option.value);
    this.selectedCount = this.workoutInput.length;
    console.log(this.selectedCount);
  }

  filterItems() {
    this.filteredItems = this.users.filter(user =>
      user.userInput.toLowerCase().includes(this.searchText.toLowerCase()) &&
      user.workoutInput.some(workout => workout.toLowerCase().includes(this.searchWorkout.toLowerCase()))
    );
  }
}
