import { useEffect, useState } from 'react';
import { getSecpassList } from "../../scripts/secpass" ;
import AddItemAlert from './AddItemAlert';
import ItemAlert from './ItemAlert';

function SecpassList() { 
  const [count, setCount] = useState(0);
  const increaseCount = () => setCount(count + 1);
    const [secpasses, SetSecpasses] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getSecpassList()
                SetSecpasses(data);
            } catch (error) {
                console.error("Load Sespasses Error:", error);
            }
        };
        fetchData(); 
    }, [count]);

    return (
        <div className="p-2">
            <div className='w-screen overflow-hidden'> 
                {secpasses!=null?secpasses.map(
                    element => 
                    <ItemAlert
                        rerenderCallback={increaseCount} 
                        key={element.secpass} 
                        item={element}>
                    </ItemAlert>):null}
            <AddItemAlert className="float-left" rerenderCallback={increaseCount} ></AddItemAlert>
            </div>
        </div>
    )
}

export default SecpassList