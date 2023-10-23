import React from 'react';
import { useState , useEffect} from 'react';
import {  DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrFolder,setCurrPage } from '../Utils/Reducers/pageSlice';
import { getdocs,getdocmeta } from '../apis/DocsApi';
import { updatedirectory } from '../Utils/Reducers/directorySlice';
// import { useConfig } from './Utils/CustomConfigHook';
// import  configData from './config.json' 

const { DirectoryTree } = Tree;


// import { EditorProvider } from './Editor/EditorProvider'
const serverurl = process.env.REACT_APP_TEST_SERVER_URL


export function FileList () {
  
  const directory = useSelector((state) => state.directory.value.tree)
  const [d,setd] = useState()
  const folderList = useSelector((state)=>state.directory.value.folderList);
  const currFolder = useSelector((state) => state.page.value["folder"])
  // const folderList = useSelector((state)=>state.directory.value.folderList);

  //const[c,setc] = useState(content_meta)
  console.log("directory : ", JSON.stringify(directory))
  // console.log("Folder List : ",  folderList)


  const dispatch = useDispatch()

  const onSelect = (selectedKeys, info) => {
    const value =''
    console.log('selected', selectedKeys,     info.node);

    // dispatch(setCurrFolder(info.node.folder))
   const h = JSON.parse(localStorage.getItem('editor_page'))
   h.folder = info.node.folder
   localStorage.setItem('editor_page', JSON.stringify(h));


    if(info.node.isLeaf) {
      getdocmeta(info.node.title,info.node.folder).then(res => {
        console.log(JSON.parse(res.MetaData))
        localStorage.setItem('novel__content', JSON.parse(res.MetaData));

        //jugad to use the local storage
        const h = JSON.parse(localStorage.getItem('editor_page'))
        h.title = info.node.title
        localStorage.setItem('editor_page', JSON.stringify(h));

        window.location.reload();

      dispatch(setCurrPage(res))
      }).catch(error => console.error(error))
    }else{
      onExpand(selectedKeys,info)
    }
  };

  function onExpand (keys, info){
    dispatch(setCurrFolder(info.node.title))
     // dispatch(setCurrFolder(info.node.folder))
   const h = JSON.parse(localStorage.getItem('editor_page'))
   h.folder = info.node.folder
   localStorage.setItem('editor_page', JSON.stringify(h));
  };


  
    useEffect(() => {
      getdocs().then(res => {
        
       dispatch(updatedirectory(res)) 
      }).catch(error => console.error(error))
    }, [1]);    
   

  return (
    // <Card>  
  //     {/* <Tree
      
    
  //   switcherIcon={<DownOutlined />}
  //   defaultExpandedKeys={['0-0-0']}
  //   onSelect={onSelect}
  //   treeData={data}
  // />   */}

<DirectoryTree style={{'display' : 'flex','width' : '15rem'}}
      multiple
      switcherIcon={<DownOutlined />}
      defaultExpandAll={true}
      onSelect={onSelect}
      // onExpand={onExpand}
      treeData={directory}
    />
  // {/* <Editor content={c}/>  */}
  //   {/* </Card> */}
    
  );
};




