import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import check from "./check.svg"

function App() {
  const [ todos, setTodos ] = useState(() =>{
    const savedTodos = localStorage.getItem('todos');
    const initialTodos = JSON.parse(savedTodos);
    return initialTodos || [];
  });
  const [ openInput, setOpenInput ] = useState(false);

  useEffect(() =>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  function openFormHandler(){
    setOpenInput(true);
  }

  function closeForm(){
    setOpenInput(false);
  }

  function createToDoHandler( createdToDo ){
    const newToDo ={
      id: uuidv4(),
      name: createdToDo,
      completed: false
    }
    setTodos([newToDo, ...todos]);
    setOpenInput(false);
  }

  function deleteToDo(id){
    setTodos(todos.filter((todo) => todo.id !== id ));
  }

  function toggleCompleteTodo(id){
    setTodos(todos.map( todo =>{
        if( todo.id === id ){
          return {
            ...todo, completed: !todo.completed
          }
        }
        return todo;
      })
    )
  }

  return (
    <div className="App">
      <main>
        <h1>my todos</h1>
        {todos.length === 0 ? <p>Nothing to do yet!</p> : 
          <ul className="todo-ul">
            {todos.map( todo => {
              return (
              <li className="todo-li" key={todo.id}>
                <span className="check-img">{todo.completed ? <img src={check} alt="check mark"/> : null}</span>
                <span className={todo.completed ? 'completed' : ''} onClick={() => toggleCompleteTodo(todo.id)}>{todo.name}</span> 
                <button onClick={() => deleteToDo(todo.id)}>x</button>
              </li>)
            })}
          </ul>
        }
        {openInput && <Form  onCreateToDO={createToDoHandler}  closeForm={closeForm}/>}
        <Button  onOpenForm={openFormHandler} />                          
      </main>
      <footer>
        <p><strong>+</strong> to add a todo, <strong>click</strong> on it to toggle completed, <strong>x</strong> to delete it</p>
      </footer>
    </div>
  );
}

export default App;
