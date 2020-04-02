import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number
  todo: Todo

  constructor(private todoService: TodoDataService, private route: ActivatedRoute,
    private router: Router, private basicAuthService: BasicAuthenticationService) { }

  ngOnInit(): void {
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, "", false, new Date());
    if (this.id != -1) {
      if (basicAuthHeaderString && username) {
        this.todoService.retrieveTodo(username, this.id).subscribe(
          data => {
            this.todo = data
          }
        )
      }
    }
  }

  saveTodo() {
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if (this.id == -1) {
      if (basicAuthHeaderString && username) {
        this.todoService.addTodo(username, this.todo).subscribe(
          data => {
            console.log(data)
            this.router.navigate(['todos'])
          }
        )
      }
    } else {
      if (basicAuthHeaderString && username) {
        this.todoService.updateTodo(username, this.id, this.todo).subscribe(
          data => {
            console.log(data)
            this.router.navigate(['todos'])
          }
        )
      }
    }
    console.log(this.todo);
  }

}
