
import React from 'react';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
} from '@radix-ui/react-icons';
import { CodeSandboxCircleFilled, DownOutlined, EditFilled, SaveFilled } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';

import './Toolbar.css';
export function MySmallCurdComponent() {
    //for save and edit playing with store at 3am
    const saveContent = useSelector((state)=>state.tosavecontent.value);
    const iseditable = useSelector((state) =>state.editor.value.editable)
    const onselectedit =  useSelector((state) =>state.editor.value.onselectEditable)
    const title = useSelector((state)=>state.page.value['title']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const folder =  useSelector((state)=>state.page.value['folder']);
    const folderList = useSelector((state)=>state.directory.value.folderList);

    const [currfoldername,setinputFolder] = useState(folder)
    const [currtitle,setcurrTitle] =useState(title)
    const [savelabel,setsavelabel] = useState("Save")


    const dispatch = useDispatch()

    function makeEditable() {
      editor.setEditable(true)
      dispatch(seteditable(true))
          setcurrTitle(title)     
    }
    function makeUneditable() {
      editor.setEditable(false)
      dispatch(seteditable(false))
      dispatch(setonselectEditable(false))
    }

    function makeFolderEdit(value) {
      dispatch(setonselectEditable(value))
    }

    function setCurrentTitle(value) {
      setcurrTitle(value)
      if(value != title){
        setsavelabel("Save As")
      }else{
        setsavelabel("Save")
      }
    }


    const showModal = () => {
    setIsModalOpen(true);
    };
    const handleOk = () => {
    console.log("save content =====> ",  saveContent)
        //dispatch(setCurrFolder(currfoldername))
        saveFile(saveContent,currtitle,currfoldername)
        getdocs().then(res => {
          dispatch(updatedirectory(res)) 
        }).catch(error => console.error(error))
        dispatch(setonselectEditable(false))
        dispatch(seteditable(false))
        editor.setEditable(false)
        setIsModalOpen(false);
        message.info(`File Saved !`);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };

  return ( 
    <div style={{'display' : 'flex', 'flexDirection' : 'row' , 'gap' : '1rem', 'marginLeft' : 'auto', 'padding' : '5px', 'alignItems' : 'center'}}>
    {(!iseditable)&&<EditTwoTone onClick={() => makeEditable()} />}  
    {(iseditable)&&<SaveTwoTone  onClick={() => showModal()} />}
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Card style={{'width' :'25rem' ,'display':'flex','flexGrow' : '6'}}>
              <Flex direction={"column"} >
                {(!iseditable)&&<Heading size={"5"}>{title}</Heading>}
                {(iseditable)&&<Input style={{'width':'50rem'}} value={currtitle} disabled={false} onChange={(e)=>setCurrentTitle(e.target.value)} placeholder={plchldr} />}

                <Separator.Root className="SeparatorRoot" style={{ margin: '5px 0px' }} />
                <Flex style={{'justifyContent' :'flex-start' ,'gap': '1rem','alignItems':'baseline'}}>            
                  <Heading size={"2"}>Folder</Heading> 
                  {(!onselectedit) &&<Select disabled = {!iseditable} value={currfoldername} options={folderList} onSelect={(x) => {setinputFolder(x)}} ></Select>}
                  {(onselectedit)  &&<Input style={{'width':'30rem'}} value={currfoldername} disabled={false} onChange={(e)=>setinputFolder(e.target.value)} placeholder={plchldr} />}
                  {(iseditable&&!onselectedit) &&< EditTwoTone label="edit" onClick={(x) => {makeFolderEdit(true)}} > </EditTwoTone> }
                  {(iseditable&&onselectedit)  &&< Cross1Icon label="edit" onClick={(x) => {makeFolderEdit(false)}} > </Cross1Icon> }
                </Flex>
              </Flex>
            </Card>
    </Modal>
    {(iseditable)&&<StopTwoTone onClick={() => makeUneditable()}/>}
    </div>
   
  )
}