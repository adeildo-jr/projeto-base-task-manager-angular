import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { Task } from './task.model';

@Injectable()

export class TaskService {
  public taskUrl = 'api/tasks';
  public headers = new Headers({
    'Content-type': 'application/json'
  });

  public constructor(private http: Http) { }

  public getAll(): Observable<Task[]> {
    return this.http.get(this.taskUrl)
      .catch(this.handleError)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportant(): Observable <Task[]> {
    return this.getAll()
      .catch(this.handleError)
      .map(tasks => tasks.slice(0, 3));
  }

  public create(task: Task): Observable <Task> {
    const url = this.taskUrl;
    const body = JSON.stringify(task);

    return this.http.post(url, body, {headers: this.headers})
      .catch(this.handleError)
      .map(response => response.json().data as Task);
  }

  public getById(id: number): Observable <Task> {
    const url = `${this.taskUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleError)
      .map((response: Response) => response.json().data as Task);
  }

  public delete(id: number): Observable <null> {
    const url = `${this.taskUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .catch(this.handleError)
      .map(() => null );
  }

  public update(task: Task): Observable<Task> {
    const url = `${this.taskUrl}/${task.id}`;
    const body = JSON.stringify(task);

    return this.http.put(url, body, {headers: this.headers})
      .catch(this.handleError)
      .map(() => task);
  }

  public searchByTitle(term: string): Observable <Task[]> {
    const url = `${this.taskUrl}?title=${term}`;

    return this.http.get(url)
      .catch(this.handleError)
      .map((response: Response) => response.json().data as Task[]);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
