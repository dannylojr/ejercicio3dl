import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './Components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  tasks: string[] = ["Despertarme a las 6", "Lavarme los dientes", "Bañarme", "Cambiarme", "Desayunar"];

  onTasksChange(updatedTasks: string[]) {
    this.tasks = updatedTasks;
  }
}
