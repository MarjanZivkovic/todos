import { useState, useEffect } from "react";

function Form({ onCreateToDO, closeForm, todoEdit, setTodoEdit, updateTodos }){
    const [ enteredTodo, setEnteredTodo ] = useState('');
    const [ importance, setImportance ] = useState('');
    const [ btnDisabled, setBtnDisabled ] = useState(true);

    // side effect to get edited todo
    useEffect(() =>{
        if(todoEdit.isEdit === true){
            setEnteredTodo(todoEdit.todo.name);
            setImportance(todoEdit.todo.importance);
            setBtnDisabled(false);
        }
    }, [todoEdit]);

    // update state with user's input
    function handleChange(e){
        if(e.target.value !== ''){
            setBtnDisabled(false);
        }
        setEnteredTodo(e.target.value);
    }
    // update selected importance
    function selectImportance(e){
        setImportance(e.target.value);
    }

    // on form submission either create or edit todo
    function submitHandler(e){
        e.preventDefault();

        if(enteredTodo.trim().length > 0){
            if( todoEdit.isEdit === true ){
                updateTodos( todoEdit.todo.id, enteredTodo, importance  )
            } else {
                onCreateToDO(enteredTodo, importance);
            }

            setEnteredTodo('');
            setBtnDisabled(true);
        }
    }
    // closing form on click outside
    function closeHandler(e){
        if(e.target.classList.contains('form-container')){
           closeForm();
           setTodoEdit({
            todo: {},
            isEdit: false
          });    
        }
    }

    return (
        <div className="form-container" onClick={closeHandler}>
            <form onSubmit={submitHandler}>
                {todoEdit.isEdit ? <h2>Edit todo!</h2> : <h2>Add new todo!</h2> }
                <div className="form-group">
                    <input type="text" onChange={handleChange} value={enteredTodo} autoFocus/>
                    <div className="importance-select">
                        <label htmlFor="importance-select">Select importance:</label>
                        <select value={importance} id="importance-select" onChange={selectImportance}>
                            <option value=""></option>
                            <option value="a">A - must be done</option>
                            <option value="b">B - should be done</option>
                            <option value="c">C - would be nice to do</option>
                        </select>
                    </div>
                    <button  type="submit" disabled={btnDisabled}>{ todoEdit.isEdit ? 'Save' : 'Add' }</button>
                </div>
            </form>
        </div>
    );
}

export default Form;