import { useRef, useState } from 'react';
import { Input } from '@rewind-ui/core';
import { TextField, Box, Callout } from "@radix-ui/themes";


function CInput(props) { 
    const { textFieldRef } = props;
    const [value, SetValue] = useState('');

    const handleInputChange = (event) => {
        SetValue(event.target.value);
      };

    return (
        <Box maxWidth="200px" >
            
            <TextField.Root 
            placeholder={props.placeholder} 
            ref={textFieldRef}  
            radius="large" 
            value={value}
            onChange={handleInputChange}/>
        </Box>
    )
}

export default CInput
