import { useState } from "react";
import type { BoardTypes } from "@/types/BoardTypes";


const initialColumns = [
    { id: "1", title: "To Do", tasks: [] },
    { id: "2", title: "In Progress", tasks: [] },
    { id: "3", title: "Done", tasks: [] },
  ];




 


export function Board () {
    const [board, setBoard] = useState<BoardTypes[]>(initialColumns);
    const [inputValue, setInputValue] = useState('');


    function AddTask () {
        setBoard(prevBoard => [...prevBoard, inputValue])
    }
    


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setInputValue(''); 
        
    };

    return (
        <>
        <div>
            <div>{board.map((item) => (<div key={item.id}>{item.title}</div>))}</div>
        <form className="combo-form" onSubmit={handleSubmit}>
        <input
        type="text"
        className="combo-input"
        placeholder="Search or enter text..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="combo-button" onClick={AddTask}>
            Submit
        </button>
        </form>
        </div>
        </>
    )
}
