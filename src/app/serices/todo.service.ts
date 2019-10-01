import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':"application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl:string =  'https://jsonplaceholder.typicode.com/todos';
  todosLimit:string = '?_limit=5';
  

  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {
    // return [
    //   {
    //     id:1,
    //     title:'Todo1',
    //     completed:false
    //   },
    //   {
    //     id:2,
    //     title:'Todo2',
    //     completed:true
    //   },
    //   {
    //     id:3,
    //     title:'Todo3',
    //     completed:false
    //   }
    // ]
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // toggle completed
  toggleCompleted(todo:Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url,todo,httpOptions);
  }

  //delete todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.delete<Todo>(url, httpOptions);
  }

  //add todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
