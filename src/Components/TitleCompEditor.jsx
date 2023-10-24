import { Heading } from "@radix-ui/themes";
import { Button, Input, Select } from "antd";
import { onGoapicall } from "./AISearchComp";
import { useSelector } from "react-redux";
import { useState } from "react";
import { saveFile } from "../apis/DocsApi";

 export default function TitleCompEditor({title,folder,isorg=true}) {
    return( 
        <div className=" grid grid-cols-6 place-items-center shadow-inner ">
            <div className="flex flex-col col-span-5 place-items-center p-5">
        <Heading as="h3">{title}</Heading>
        <Heading color="blue" size={2} as="h3">{folder}</Heading>
    </div>
    <div className="flex flex-col gap-2"> 
        <Button col-start-5 onClick={() => onGoapicall()}> summarize</Button>
        {!(isorg) && <Button onClick={onSave(title,folder)} > save</Button> }
   
</div>
   
    </div>
    
    )
 }

 function onSave(currinputfile,folderName) {
    // const items = JSON.parse(localStorage.getItem('items'))
    const y = localStorage.getItem('novel__content');
    saveFile(JSON.stringify(y), currinputfile,folderName )
    // window.location.reload();

}

 export function NewTitleEditor({FolderList}) {
    const [currinputfile, setcurrinputfile] = useState()
    const [folderName ,setfolderName] = useState() 
    const folderList = useSelector((state) => state.directory.value.folderList);


   

    function setFolder (value) {
        setfolderName(value)
    }

    const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return( 
        <div className=" grid grid-cols-6 place-items-center shadow-inner ">
            <div className="flex flex-col col-span-5 place-items-center p-5 gap-2">
            <Input style={{ 'width': '15rem' }}
            placeholder="Enter File Name"
              onChange={(e) => setcurrinputfile(e.target.value)} />
            <Select className="min-w-[20ch]"
             showSearch
             placeholder="Enter Folder Name"
             optionFilterProp="children"
             filterOption={filterOption}
            options={FolderList} 
            onChange={setFolder}
            onSearch={setFolder}
            //onSelect={(x) => { setselectedFolder(x) }}
             />
                
    </div>
    <Button onClick={onSave(currinputfile,folderName)} > save</Button>
    </div>
    
    )
 }