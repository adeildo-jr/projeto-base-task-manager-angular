import {AfterViewInit, Component} from '@angular/core';
import * as Feather from 'feather-icons';

import { Task } from './tasks/shared/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit {
  title = 'Gerenciador de Tarefas';
  task: Task = new Task(21, 'Enviar orçamento');
  task2: Task = new Task(23, 'Enviar Presente');

  ngAfterViewInit() {
    Feather.replace();
  }
}
