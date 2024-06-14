import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TodoList from "./TodoList";

const MainBlock = () => {

  const [text, setText] = useState('');
  const {userId} = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  //получить todo из базы
  const getTodo = useCallback(async () => {
    try {
      await axios.get("/api/todo", {
        headers: {
          "Content-Type": "aplications/json"
        },
        params: {userId},
      })

      .then((response) => setTodos(response.data))
    }
    catch(e){
      console.log(e)
    }
  }, [userId])


  //создать Todo
  const createTodo = useCallback(async () => {
    if (!text) return null;
    try {
      await axios
        .post(
          "/api/todo/add",
          { text, userId },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setTodos([...todos], response.data);
          setText("");
          getTodo();
        });
    } catch (error) {
      console.log(error);
    }
  }, [text, userId, todos, getTodo]);

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  const removeTodos = useCallback(async (id) => {
    try {
      await axios
        .delete(
          `/api/todo/delete/${id}`,
          { id },
          { headers: { "Content-Type": "aplication/json" } }
        )
        .then(() => getTodo());
    } catch (error) {
      console.log(error);
    }
  }, [getTodo]);

  const markAsComplete = useCallback(async (id) => {
    try{
      await axios
      .put(`/api/todo/complete/${id}`, {}, {
        headers: {"Content-Type": "aplication/json"}
      })
      .then(() => getTodo())

    }catch(e){
      console.log(e)
    }
  })

  return (
    <div>
      <h2 className="m-5">Добавить задачу</h2>
    <form onSubmit={(e) => e.preventDefault()}>
       <div className="input-group mb-3 w-50 mx-5">
        <input
          type="text"
          className="form-control "
          placeholder="Задача"
          aria-label="Задача"
          aria-describedby="button-addon2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={createTodo}
        >
          Добавить
        </button>
      </div>
    </form>
     <hr/>
     <TodoList todos={todos} removeTodos={removeTodos} markAsComplete={markAsComplete}/>
    </div>
  );
};

export default MainBlock;
