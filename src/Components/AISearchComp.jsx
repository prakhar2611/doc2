import { useState } from "react"
import axios from "axios";
import { Button, Input } from "antd";
function onapicall (currentInput) {

    const req = {
        'query' : currentInput
    }
    console.log("httng ai api : ",JSON.stringify(req))
  axios.put(`http://10.120.17.10:5000/api/hrdocs/query`,JSON.stringify(req),{
            headers: {           
                'Content-Type': 'application/json',
            },        
        })
        .then((response) => {
            console.log(response.data)
            const d = {"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":response.data.result}]}]}
            localStorage.setItem('SideEditor', JSON.stringify(d));
            window.location.reload();

        })
        .catch(error => {return console.error(error)});
}

export function AIOpenSearch() {

    const[currentInput,setcurrentInput] = useState('')
    return(
        <div style={{

        }}>
             <Input style={{ 'width': '30rem' }} onChange={(e) => setcurrentInput(e.target.value)} />
    <Button style={{ 'backgroundColor': 'blue' }} onClick={() => onapicall(currentInput)}> Search </Button>
        </div>
    )
}