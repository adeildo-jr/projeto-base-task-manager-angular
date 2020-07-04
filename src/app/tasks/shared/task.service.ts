import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Task } from './task.model';

const TASKS: Array<Task> = [
  { id: 1, title: 'Fazer tarefa 1'},
  { id: 2, title: 'Fazer tarefa 2'},
  { id: 3, title: 'Fazer tarefa 3'},
  { id: 4, title: 'Fazer tarefa 4'},
  { id: 5, title: 'Fazer tarefa 4'},
  { id: 6, title: 'Fazer tarefa 5'}
];

@Injectable()

export class TaskService {
  public taskUrl = 'api/tasks';

  public constructor(private http: Http) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.taskUrl)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportantTaks(): Observable <Task[]> {
    return this.getTasks()
      .map(tasks => tasks.slice(0, 3));
  }

  public getTask(id: number): Observable <Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get(url)
      .map((response: Response) => response.json().data as Task);
  }
}
