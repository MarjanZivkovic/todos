import { useState } from "react";

function Form({ onCreateToDO, closeForm }){
    const [ enteredTodo, setEnteredTodo ] = useState('');
    const [ btnDisabled, setBtnDisabled ] = useState(true);

    function handleChange(e){
        if(e.target.value !== ''){
            setBtnDisabled(false);
        }
        setEnteredTodo(e.target.value);
    }

    function submitHandler(e){
        e.preventDefault();
        if(enteredTodo.trim().length > 0){
            onCreateToDO(enteredTodo);
        }
        setEnteredTodo('');
    }

    function closeHandler(e){
        if(e.target.classList.contains('form-container')){
           closeForm();
        }
    }

    return (
        <div className="form-container" onClick={closeHandler}>
            <form onSubmit={submitHandler}>
                <h2>Add new todo!</h2>
                <div className="form-group">
                    <input type="text" onChange={handleChange} value={enteredTodo} autoFocus/>
                    <button  type="submit" disabled={btnDisabled}>Add</button>
                </div>
            </form>
        </div>
    );
}

export default Form;