import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { Task } from './task.model';

@Injectable()

export class TaskService {
  public taskUrl = 'api/tasks';

  public constructor(private http: Http) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.taskUrl)
      .catch(this.handleError)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportantTasks(): Observable <Task[]> {
    return this.getTasks()
      .catch(this.handleError)
      .map(tasks => tasks.slice(0, 3));
  }

  public getTask(id: number): Observable <Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get(url)
      .catch(this.handleError)
      .map((response: Response) => response.json().data as Task);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
