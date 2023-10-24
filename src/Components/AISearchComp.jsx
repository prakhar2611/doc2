import React, { use, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import axios from "axios";
import { Button, Flex, Input, Radio, Spin } from "antd";
import { SendOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
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


            localStorage.setItem('SideEditor', JSON.stringify(d));

            // window.location.reload();



        })
        .catch(error => { return console.error(error) });
}

export function AIOpenSearch({ ediotrRef }) {

    function onapicall(currentInput) {
        const preData = JSON.parse(localStorage.getItem('novel__content'))
        const data = parseNodeToPlainText(preData)

        const req = {
            'query': currentInput,
            'prd': true,
            'summarise': false,
            'text': { data }
        }
        console.log("httng ai api : ", JSON.stringify(req))
        axios.put(`http://192.168.0.107:5000/api/hrdocs/query`, JSON.stringify(req), {
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

                    const container = document.getElementById('SideEditor');

                    const root = createRoot(container);
                    root.render(
                        <Provider store={store}>
                            <SideEditor sd={answer} />
                        </Provider>);

                    localStorage.setItem('SideEditor', JSON.stringify(answer));

                } else {
                    const answer = { "type": "paragraph", "content": [{ "type": "text", "text": response.data.result }] }

                    // const d = { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": currentInput }] }, { "type": "paragraph", "content": [{ "type": "text", "text": response.data.result }] }] }
                    const container = document.getElementById('SideEditor');

                    const root = createRoot(container);
                    root.render(
                        <Provider store={store}>
                            <SideEditor sd={answer} />
                        </Provider>);

                    localStorage.setItem('SideEditor', JSON.stringify(answer));
                }



            })
            .catch(error => { return console.error(error) });
    }



    const [currentInput, setcurrentInput] = useState('')

    const texts = ['PRODUCT', 'TECH', 'FINANCE', 'redBus'];

    function AISearchBgBlur() {
        return (
            <div className="relative md:min-w-[150ch] md:min-h-[30ch]">
                {/* Pseudo-element for blurred background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/redbus2.jpg')", filter: "blur(2px)" }}
                ></div>

                <div className="relative">

                    <div className="flex flex-col p-4 place-items-center gap-3 ">
                        <div className=' gap-2 place-content-center min-h-[10ch]'>
                            <Heading >ASK ABOUT</Heading>
                            <AutoScroll texts={texts} />
                        </div>

                        <div className="flex flex-row gap-2">
                            <TextField.Input
                                
                                className='min-w-[20vh] md:min-w-[80vh]'
                                color="sky"
                                variant="classic"
                                placeholder="Ask About redBus"
                                onChange={(e) => setcurrentInput(e.target.value)}
                            />
                            <Button onClick={() => onapicall(currentInput)} shape="circle" icon={<SearchOutlined />} />
                        </div>

                        <Radio.Group >
                            {texts.map((text, index) => (
                                <Radio value={text}><Heading size={"2"}>{text}</Heading></Radio>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <AISearchBgBlur />
    )
}


function AutoScroll({ texts }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);  // This will change the text every 1.5 seconds to give time for the fade transition

        return () => clearInterval(interval);  // Clear the interval when the component is unmounted
    }, [texts]);

    return (
        <div >
            {texts.map((text, index) => (
                <div
                    //   key={index} 
                    //   className={`transition-opacity duration-1000 ${currentIndex === index ? 'opacity-100' : 'opacity-0'} absolute`}
                    key={index}
                    className={`transition-all duration-1000 ease-in-out transform ${currentIndex === index ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} absolute w-full`}
                >
                    <Heading size={"8"} color='red'>{text}</Heading>
                </div>
            ))}
        </div>
    );
};



