import { Component, OnInit} from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {
  public tasks: Array<Task>;
  public newTask: Task;
  public constructor (private taskService: TaskService) {
    this.newTask = new Task(null, '');
  }

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(
        tasks => this.tasks = tasks,
        error => alert('Internal server error')
      );
  }

  public createTask() {
    this.newTask.title = this.newTask.title.trim();
    if (!this.newTask.title) {
      alert('A tarefa deve ter um título');
    } else {
      this.taskService.createTask(this.newTask)
        .subscribe(
          (task) => {
            this.tasks.push(task);
          },
          () => alert('Error ao inserir tarefa')
        );
    }
  }
}
