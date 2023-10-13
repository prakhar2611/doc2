import { Heading } from "@radix-ui/themes";
import { Button, Input, Select } from "antd";
import { useSelector } from "react-redux";
import React, { use, useState } from 'react';
import { saveFile } from "../apis/DocsApi";

function SaveComponent() {
    
    const [currinputfile,setcurrinputfile] = useState()

    function onSave() {
        // const items = JSON.parse(localStorage.getItem('items'))
        const y = localStorage.getItem('novel__content');
        saveFile(JSON.stringify(y), currinputfile, "NewFolder")
        window.location.reload();
    
      }
    
    return (
    <div className='save'>
    <Input style={{ 'width': '30rem' }} disabled={false} onChange={(e) => setcurrinputfile(e.target.value)} />
    <Button style={{ 'backgroundColor': 'blue' }} onClick={() => onSave()}> Save </Button>
  </div>
  )
  }

export function TitleComp ({filename,issaveenable,currfoldername}) {


    const folderList = useSelector((state)=>state.directory.value.folderList);
    const [selectedFolder,setselectedFolder ] = useState()

    return(<div style={ {
        display : 'flex'
    }}>
        <Heading size={"2"}>{filename}</Heading>
          <Select value={currfoldername} options={folderList} onSelect={(x) => {setselectedFolder(x)}} ></Select>
          {(issaveenable) && <SaveComponent/>}

    </div>)
}