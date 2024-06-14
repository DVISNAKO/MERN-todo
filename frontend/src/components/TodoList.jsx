import React from "react";

const TodoList = ({todos, removeTodos, markAsComplete}) => {

const completedStyle = {
    color: 'red',
    textDecoration: 'line-through'
}

return (
    <div className="container m-4">
      <h3>Список задач</h3>

{todos.map((todo, index) => (
    <div  className="d-flex m-3 gap-4">
        <p>{index +1}</p>
        <h4 className="w-50" style={todo.completed ? completedStyle : {}}>{todo.text}</h4>
        <i className="material-icons" onClick={() => markAsComplete(todo._id)}>check</i>
        <i className="material-icons " onClick={()=> removeTodos(todo._id)}>delete</i>
      </div>
))}
      
    </div>
  );
};

export default TodoList;
