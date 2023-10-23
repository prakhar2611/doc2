import { Heading } from "@radix-ui/themes";
import { Button, Flex, Input, Select } from "antd";
import { useSelector } from "react-redux";
import React, { use, useState } from 'react';
import { saveFile } from "../apis/DocsApi";
import { AIOpenSearch } from "./AISearchComp";

function SaveComponent() {

    const [currinputfile, setcurrinputfile] = useState()

    function onSave() {
        // const items = JSON.parse(localStorage.getItem('items'))
        const y = localStorage.getItem('novel__content');
        saveFile(JSON.stringify(y), currinputfile, "NewFolder")
        window.location.reload();

    }

    return (
        <Flex gap={'1rem'}>
            <Input style={{ 'width': '15rem' }} disabled={false} onChange={(e) => setcurrinputfile(e.target.value)} />
            <Button style={{ 'backgroundColor': 'grey' }} onClick={() => onSave()}> Save </Button>
        </Flex>
    )
}

export function TitleComp({ filename, issaveenable, currfoldername }) {


    const folderList = useSelector((state) => state.directory.value.folderList);
    const [selectedFolder, setselectedFolder] = useState()

    return (
        <div style={{
            display : 'flex',
            flexDirection : 'row',
            gap : '25rem'
        }}>
            <Flex 
            style={{
                gap : '2rem'
            }}>
                <Heading size="6">{filename}</Heading>
                <Select value={currfoldername} options={folderList} onSelect={(x) => { setselectedFolder(x) }} ></Select>
                {(issaveenable) && <SaveComponent />}
            </Flex>

        </div>
    )
}