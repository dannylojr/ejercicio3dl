import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: string[] = [];
  @Output() tasksChange = new EventEmitter<string[]>();

  stateTasks: boolean[] = [];
  filtered: boolean = false; 
  newTask: string = '';

  constructor() {
    this.stateTasks = new Array(this.tasks.length).fill(false);
  }

  deleteTask(index: number) {
    const taskToRemove = this.tasks[index];
    this.tasks.splice(index, 1);
    this.stateTasks.splice(index, 1);
    this.tasksChange.emit(this.tasks); // Emitimos el cambio de tareas
    this.triggerExplosionEffect(taskToRemove);
  }

  checkTask(index: number) {
    this.stateTasks[index] = !this.stateTasks[index];
  }

  filterCompletedTasks() {
    this.filtered = !this.filtered;
  }

  getFilteredTasks() {
    return this.filtered ? this.tasks.filter((_, index) => this.stateTasks[index]) : this.tasks;
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.stateTasks.push(false);
      this.newTask = '';
      this.tasksChange.emit(this.tasks); // Emitimos el cambio de tareas
    }
  }

  private triggerExplosionEffect(task: string) {
    console.log(`¡Explosión! Tarea eliminada: ${task}`);
    // Aquí se podría agregar lógica para mostrar el efecto visual
  }
}