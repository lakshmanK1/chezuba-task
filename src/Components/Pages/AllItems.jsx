import React from 'react'
import Items from '../Items'

function AllItems() {
    const [items, setItems] =  React.useState([]);

    const fetchAvailableItems = () => {
        fetch('https://chezuba-task-render-server.onrender.com/items').then((response)=>{
            if(response.ok){
                return response.json()
            }
        }).then((res)=>{
            setItems(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    React.useEffect(()=>{
       fetchAvailableItems();
    },[])

  return (
    <React.Fragment>
        <Items items={items ? items : undefined}/>
    </React.Fragment>
  )
}

export default AllItems