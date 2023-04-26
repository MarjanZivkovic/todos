import { FaFilter } from "react-icons/fa";


function Filter({ filterToDos, selected }){
    function catchOptionValue(e){
        filterToDos(e.target.value);
    }

    return (
        <div className="filter-div">
            <label htmlFor="filter-todos"><FaFilter /></label>
            <select id="filter-todos" value={selected} onChange={catchOptionValue}>
                <option value="all">all</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
            </select>
        </div>
    );
}

export default Filter;