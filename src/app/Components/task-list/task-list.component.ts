import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: string[] = [];
  @Output() tasksChange = new EventEmitter<string[]>();

  stateTasks: boolean[] = []; // Estado de cada tarea (completada o incompleta)
  newTask: string = '';       // Tarea nueva para añadir

  // Filtros de visibilidad
  showCompleted: boolean = true; // Mostrar tareas completas
  showIncomplete: boolean = true; // Mostrar tareas incompletas

  constructor() {
    this.stateTasks = this.tasks.map(() => false); // Inicialmente todas las tareas están incompletas
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.stateTasks.push(false);  // Nueva tarea está incompleta por defecto
      this.newTask = '';
      this.tasksChange.emit(this.tasks);
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.stateTasks.splice(index, 1); // También eliminamos el estado de la tarea
    this.tasksChange.emit(this.tasks);
  }

  toggleComplete(index: number) {
    this.stateTasks[index] = !this.stateTasks[index]; // Cambia el estado de la tarea (completa/incompleta)
    this.tasksChange.emit(this.tasks);
  }

  // Funciones de filtro
  showCompletedTasks() {
    this.showCompleted = true;
    this.showIncomplete = false;
  }

  showIncompleteTasks() {
    this.showCompleted = false;
    this.showIncomplete = true;
  }

  showAllTasks() {
    this.showCompleted = true;
    this.showIncomplete = true;
  }

  // Función para determinar si la tarea debe mostrarse según el filtro
  shouldShowTask(index: number): boolean {
    const isCompleted = this.stateTasks[index];

    if (this.showCompleted && this.showIncomplete) {
      return true;  // Mostrar todas las tareas
    }

    if (this.showCompleted && isCompleted) {
      return true;  // Mostrar solo las tareas completadas
    }

    if (this.showIncomplete && !isCompleted) {
      return true;  // Mostrar solo las tareas incompletas
    }

    return false; // No mostrar la tarea
  }

  // Función para asegurarse de que los checkboxes no se vean afectados
  isChecked(index: number): boolean {
    return this.stateTasks[index];
  }
}
