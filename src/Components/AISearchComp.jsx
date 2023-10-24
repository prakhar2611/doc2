import React, { use, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import axios from "axios";
import { Button, Flex, Input, Spin } from "antd";
import { SendOutlined, LoadingOutlined,SearchOutlined } from '@ant-design/icons'
import { RocketIcon } from "@radix-ui/react-icons";
import { Heading, IconButton, TextField } from "@radix-ui/themes";
import { SideEditor } from "../Pages/SideEditor";
import parseNodeToPlainText from "../Utils/parser.js";
import { Provider } from 'react-redux';
import store from '../Utils/store';

export function onGoapicall() {
    const preData = JSON.parse(localStorage.getItem('novel__content'))

    const data = parseNodeToPlainText(preData)

    
    const req = {
        'data': JSON.stringify(data)
    }
    console.log("httng ai api : ", JSON.stringify(req))
    axios.post(`http://localhost:9005/docs/api/generate`, JSON.stringify(req), {
        headers: {
            'Content-Type': 'application/json',

        },
    })
        .then((response) => {
            console.log("response : ", response.data)

            const d = { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": response.data.reply }] }] }

            // const existingComponent = ediotrRef.current.querySelector('.dynamic-component');
            // if (existingComponent) {
            //     ReactDOM.unmountComponentAtNode(existingComponent); // Unmount the React component first
            //     console.log("Removing exsting Node")

            //     existingComponent.remove();
            // }
            const container = document.getElementById('SideEditor');

            const root = createRoot(container);
            root.render(
                <Provider store={store}>
                    <SideEditor sd={d} />
                </Provider>);

            const preData = JSON.parse(localStorage.getItem('SideEditor'))

            localStorage.setItem('SideEditor', JSON.stringify(d));

            // window.location.reload();



        })
        .catch(error => { return console.error(error) });
}

export function AIOpenSearch({ ediotrRef }) {

    function onapicall(currentInput) {
        const req = {
            'query': currentInput,
        }
        console.log("httng ai api : ", JSON.stringify(req))
        axios.put(`http://10.120.17.34:5000/api/hrdocs/query`, JSON.stringify(req), {
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then((response) => {
                console.log(response.data)
                const preData = JSON.parse(localStorage.getItem('SideEditor'))
                if (preData != null) {
                    const question = { "type": "paragraph", "content": [{ "type": "text", "text": currentInput }] }
                    const answer = { "type": "paragraph", "content": [{ "type": "text", "text": response.data.result }] }
                    preData.content.push(question)
                    preData.content.push(answer)
                    localStorage.setItem('SideEditor', JSON.stringify(preData));

                } else {
                    const d = { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": currentInput }] }, { "type": "paragraph", "content": [{ "type": "text", "text": response.data.result }] }] }
                    localStorage.setItem('SideEditor', JSON.stringify(d));
                }
                window.location.reload();



            })
            .catch(error => { return console.error(error) });
    }

   

    const [currentInput, setcurrentInput] = useState('')
    return (
        <div className="flex flex-col place-items-center gap-3 ">

            <Heading >ASK OMNIA</Heading>
            <div className="flex flex-row gap-2">
                <TextField.Input
                    className='min-w-[100ch]'
                    color="indigo"
                    variant="soft"
                    placeholder="Ask About redBus"
                    onChange={(e) => setcurrentInput(e.target.value)}
                />
        <Button onClick={() => onapicall(currentInput)} shape="circle" icon={<SearchOutlined  />} />


            </div>

        

           
        </div>
    )
}