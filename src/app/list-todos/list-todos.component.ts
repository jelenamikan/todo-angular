import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';

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

  constructor(private todoService: TodoDataService) { }

  ngOnInit(): void {
    this.refreshTodoList();
  }

  refreshTodoList(){
    this.todoService.retrieveAllTodos("jecapereca").subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    //console.log('delete todo ' + id);
    this.todoService.deleteTodo("jecapereca", id).subscribe(
      response => {
        //console.log(response);
        this.message = "You have successfuly deleted Todo " + id;
        this.refreshTodoList();
      }
    )
  }

}
