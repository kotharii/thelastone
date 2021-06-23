import React from "react";
import "./Imagelinkform.css";
const Imagelinkform =({ oninputchange, onbuttonsubmit }) => {
    return (
        <div>
           <p className="f3">
               {"This masterpiece will detect your beautiful faces. Give it a try!"}
           </p>
           <div className='center'>
               <div className='form center pa4 br3 shadow-5'>
                <input onChange={oninputchange} type="text" className='f4 pa2 w-70 center'/>
                <button onClick={onbuttonsubmit} style={{marginLeft: "5px"}}className="pointer w-30 grow f4 link ph3 pv2 dib white bg-light-purple br-pill">Detect Face</button>
               </div>
           </div>
        </div>
    );
}
export default Imagelinkform;