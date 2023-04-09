import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import check from "./check.svg";
import { FaTimes, FaEdit } from "react-icons/fa";

function App() {
  // fetch todos from LStorage or empty arr
  const [ todos, setTodos ] = useState(() =>{
    const savedTodos = localStorage.getItem('todos');
    const initialTodos = JSON.parse(savedTodos);
    return initialTodos || [];
  });
  // states for open form and edit todos
  const [ openInput, setOpenInput ] = useState(false);
  const [ todoEdit, setTodoEdit ] = useState({
    todo: {},
    isEdit: false
  });

  // saving to LS on every state change
  useEffect(() =>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // open and close form functions
  function openFormHandler(){
    setOpenInput(true);
  }
  function closeForm(){
    setOpenInput(false);
  }
  // create ne todo function
  function createToDoHandler( createdToDo ){
    const newToDo ={
      id: uuidv4(),
      name: createdToDo,
      completed: false
    }
    setTodos([newToDo, ...todos]);
    setOpenInput(false);
  }
  // delete to do
  function deleteToDo(id){
    setTodos(todos.filter((todo) => todo.id !== id ));
  }

  // edit todo
  function editToDo( todo ){
    setTodoEdit({
      todo,
      isEdit: true
    });
    setOpenInput(true);
  }

  // toggle completed class
  function toggleCompleteTodo(id){
    setTodos(todos.map( todo =>{
        if( todo.id === id ){
          return {
            ...todo, completed: !todo.completed
          }
        }
        return todo;
      })
    );
  }

  // update todos with edited todo
  function updateTodos(id, updatedTodo){
    setTodos( todos.map( todo => todo.id === id ? { ...todo, name: updatedTodo }  : todo ) );

    setOpenInput(false);

    setTodoEdit({
      todo: {},
      isEdit: false
    });
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
                <button onClick={() => editToDo(todo)}><FaEdit /></button>
                <button onClick={() => deleteToDo(todo.id)}><FaTimes /></button>
              </li>)
            })}
          </ul>
        }
        {openInput && <Form  onCreateToDO={createToDoHandler}  closeForm={closeForm} todoEdit={todoEdit} setTodoEdit={setTodoEdit} updateTodos={updateTodos}/>}
        <Button  onOpenForm={openFormHandler} />                         
      </main>
      <footer>
        <p><strong>+</strong> to add a todo, <strong>click</strong> on it to toggle completed, <FaEdit style={{transform: 'translateY(0.15rem)'}}/> to edit it, <FaTimes style={{transform: 'translateY(0.2rem)'}}/> to delete it</p>
        <p className="created-by">created by <a href="https://marjan-zivkovic.com/" target="_blank" rel="noreferrer">marjan</a></p>
      </footer>
    </div>
  );
}

export default App;
