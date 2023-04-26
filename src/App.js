import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import Filter from "./components/Filter";
import check from "./check.svg";
import { FaTimes, FaEdit, FaFilter } from "react-icons/fa";

function App() {
  // fetch todos from LStorage or empty arr
  const [ todos, setTodos ] = useState(() =>{
    const savedTodos = localStorage.getItem('todos');
    const initialTodos = JSON.parse(savedTodos);
    return initialTodos || [];
  });
  // states for open form, edit todos, filtered todos
  const [ openInput, setOpenInput ] = useState(false);
  const [ todoEdit, setTodoEdit ] = useState({
    todo: {},
    isEdit: false
  });
  const [ filteredTodos, setFilteredTodos ] = useState('all');
  // states for drag and drop functionality
  const [ dragStartIndex, setDragStartIndex ] = useState(null);
  const [ dragEndIndex, setDragEndIndex ] = useState(null);
  // const [ draggedOverIndex, setDraggedOverIndex ] = useState(null);

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
  function createToDoHandler( createdToDo, importance ){
    const newToDo ={
      id: uuidv4(),
      name: createdToDo,
      completed: false,
      importance: importance,
    }
    setTodos([newToDo, ...todos]);
    setOpenInput(false);
  }
  // delete to do
  function deleteToDo(id){
    if(window.confirm('Are you sure you want to delete todo?')){
      setTodos(todos.filter((todo) => todo.id !== id ));
    }
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
  function updateTodos(id, updatedTodo, importance){
    setTodos( todos.map( todo => todo.id === id ? { ...todo, name: updatedTodo, importance: importance }  : todo ) );

    setOpenInput(false);

    setTodoEdit({
      todo: {},
      isEdit: false
    });
  }

  // filter todos
  function filterToDos( selectedImportance ){
    setFilteredTodos(selectedImportance);  
  }

  const selectedToDos = todos.filter( todo =>{
    if( filteredTodos !== 'all' ){
      return todo.importance === filteredTodos;
    } else {
      return todos;
    }
  })

  // drag and drop functionality
  function handleDragStart(e, index) {
    setDragStartIndex(index);
  }

  function handleDragEnter(e, index) {
    e.preventDefault();
  }

  function handleDragEnd(e, index) {
    setDragEndIndex(index);
  }

  useEffect(() => {
    if (dragStartIndex !== null && dragEndIndex !== null) {
      const newTodos = [...todos];
      const [removedTodo] = newTodos.splice(dragStartIndex, 1);
      newTodos.splice(dragEndIndex, 0, removedTodo);
      setTodos(newTodos);
      setDragStartIndex(null);
      setDragEndIndex(null);
    }
  }, [dragStartIndex, dragEndIndex, todos]);



  return (
    <div className="App">
      <main>
        <h1>my todos</h1>
        <Filter filterToDos={filterToDos} selected={filteredTodos} />
        {selectedToDos.length === 0 ? <p>Nothing to do yet!</p> : 
          <ul className="todo-ul">
            {selectedToDos.map( (todo, index)=> {
              return (
              <li className={`todo-li ${todo.importance === 'a' ? 'todo-li-a' : todo.importance === 'b' ? 'todo-li-b' : todo.importance === 'c' ? 'todo-li-c' : ''} ${dragStartIndex ? 'drag-start' : ''}`} key={todo.id} draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={(e) => handleDragEnter(e, index)} onDrop={(e) => handleDragEnd(e, index)}>
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
        <p><strong style={{fontSize: '1.35rem'}}>+</strong> to add a todo, <strong>click</strong> on it to toggle completed, <FaEdit style={{transform: 'translateY(0.15rem)'}}/> to edit it, <FaTimes style={{transform: 'translateY(0.2rem)'}}/> to delete it <br /> <FaFilter style={{transform: 'translateY(0.2rem)'}}/> to filter todos, <strong>drag and drop</strong> todos to rearrange them <small>(only in 'all' mode)</small></p>
        <p className="created-by">created by <a href="https://marjan-zivkovic.com/" target="_blank" rel="noreferrer">marjan</a></p>
      </footer>
    </div>
  );
}

export default App;
