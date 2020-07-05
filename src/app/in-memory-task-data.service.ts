import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()

export class InMemoryTaskDataService implements InMemoryDbService {
  public createDb() {
    const tasks = [
      { id: 1, title: 'Comprar um novo celular'},
      { id: 2, title: 'Apostar na loteria'},
      { id: 3, title: 'Mandar o notebook para o reparo'},
      { id: 4, title: 'Realizar o planejamento do dia'},
      { id: 5, title: 'Fazer reunião comercial'},
      { id: 6, title: 'Adicionar novas tarefas'}
    ];

    return { tasks };
  }
}
