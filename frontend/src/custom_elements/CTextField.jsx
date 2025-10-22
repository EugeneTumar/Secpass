import { useState } from "react";


function CTextField({placeholder = '', name = '', ref}) {

    return ( 
    <div className="flex flex-col w-fit static max-w-80">
        {name!=''||name!=null?
        <label htmlFor="input" className="text-custom-3 font-bold relative top-3 mb-2 p-1 w-fit text-sm">{name}</label>
        :null}
        <input ref={ref} type="text" placeholder={placeholder} name="input" className="p-2 text-sm rounded-md border-solid border-2 border-custom-3 focus:outline-none bg-opacity-5 bg-custom-1"/>
    </div>
    );
}

export default CTextField;