import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Todo {
  constructor(public id: number, public description: string, public done: boolean, public targetDate: Date){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

   todos: Todo[]
   message: string
  //   new Todo(1, 'Learn Angular', false, new Date()),
  //   new Todo(2, 'Learn Spring', false, new Date()),
  //   new Todo(3, 'Get a job', false, new Date())
  // ]

  constructor(private todoService: TodoDataService, private router: Router, private basicAuthService: BasicAuthenticationService) { }

  ngOnInit(): void {
    this.refreshTodoList();
  }

  refreshTodoList(){
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if(basicAuthHeaderString && username){
      this.todoService.retrieveAllTodos(username).subscribe(
        response => {
          console.log(response);
          this.todos = response;
        }
      )
    }
  }

  deleteTodo(id){
    //console.log('delete todo ' + id);
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if(basicAuthHeaderString && username){
    this.todoService.deleteTodo(username, id).subscribe(
      response => {
        //console.log(response);
        this.message = "You have successfuly deleted Todo " + id;
        this.refreshTodoList();
      }
    )
    }
  }

  updateTodo(id){
    console.log('update todo ' + id);
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }

}
