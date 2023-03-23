function Button({ onOpenForm }){
    
    return(
        <div className="btn-container">
            <button title="Add todo" className="main-btn" onClick={onOpenForm}>+</button>
        </div>
    );
}

export default Button;