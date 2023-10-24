import React, { use, useState,useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { LaptopOutlined, NotificationOutlined, UserOutlined,  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,PlusCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Select } from 'antd';
import { EditorNovel } from './Editor'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setReload } from '../Utils/Reducers/editoeSlice';
import { Theme, Flex, Container, Box, Card, Heading, Text, TextField } from "@radix-ui/themes";

import { sd } from './defaultdata';
import { Editor } from "novel"
import { SideEditor } from './SideEditor'
import { FileList } from './FileList';
import Input from 'antd/es/input/Input';
import { getdocmeta, getdocs, saveFile } from '../apis/DocsApi';
import { MySmallCurdComponent } from './SmallCurdComponent';
import { TitleComp } from '../Components/TitleComp';
import { AIOpenSearch } from '../Components/AISearchComp';
import OpenAI from 'openai';
import { StaticOrgData } from '../Components/StaticOrgData';
import TitleCompEditor, { NewTitleEditor } from '../Components/TitleCompEditor';
import store from '../Utils/store';




const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(6).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});



function GetEditor({ sd }) {
  return (
    <Editor
      defaultValue={sd}
      disableLocalStorage={true}
    />
    // onDebouncedUpdate={(editor) => onChange(editor)} />
  )
}





export function Omnia() {


  const [orgsidecontent,setorgcontent] = useState([])
  const [personalContent,setpersonalContent] = useState([])
  const [currentFolder, setcurrentFolder] = useState("")
  const [currentFile, setcurrentfile] = useState("")
  const [FolderList,setFolderList] = useState([])

  const dispatch = useDispatch()
  const [content, setcontent] = useState(sd)
  const page = JSON.parse(localStorage.getItem('editor_page'))
  // const folder = page.folder
  // const title = page.title
  // const folder = useSelector((state) => state.page.value['folder']);
  // const title =  useSelector((state) => state.page.value['title']);
  const [save, setsave] = useState(false)
  const [currinputfile, setcurrinputfile] = useState([])
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const containerRef = useRef(null);
  const SideEditorRef = useRef(null)
  


  function loglocalstrg() {
    const items = JSON.parse(localStorage.getItem('items'))
    const y = localStorage.getItem('novel__content');
    console.log("on click save - ", y, items)
  }

  function loaddata(data) {

    if (data == 1) {
      const f = { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "dajsdksaf" }] }] }
      setcontent(f)
      localStorage.setItem('novel__content', JSON.stringify(f));

    } else {
      setcontent(sd)
      localStorage.setItem('novel__content', JSON.stringify(sd));

    }
    dispatch(setReload())
    window.location.reload();

  }


  //fetching org level directory 
  useEffect(() => {
    const orgDocs = {
      title: 'RedBus',
      label : 'RedBus',
      children: []
    }

    const f= orgsidecontent
    getdocs(true).then(res => {
      if(res.length>0) {
        const tt = [  ]
        res.map((data) => {
          const h ={
            key : data.title,
            title : data.title,
            label : data.title,
            children : data.children
          }
          tt.push(h)
        })
         orgDocs.children = tt
         setorgcontent([orgDocs])
      }
    
  }).catch(error => console.error(error))
},[])


//fecting personal directory 
useEffect(() => {
  const personalData = {
    title: 'Personal',
    label : 'Personal',
    children: []
  }
  const folderls =[]

  const f= personalContent
  getdocs().then(res => {
    if(res.length>0) {
      const tt = [  ]
      res.map((data) => {
        const h ={
          key : data.title,
          title : data.title,
          label : data.title,
          children : data.children
        }
        tt.push(h)

        folderls.push({
          value : data.title,
          label : data.title
        })
      })
      personalData.children = tt
       setpersonalContent([personalData])
       setFolderList(folderls)
    }
  
}).catch(error => console.error(error))
},[])
  
const saveScrollPosition = () => {
  return {
    x: window.scrollX,
    y: window.scrollY
  };
}

const restoreScrollPosition = (position) => {
  window.scrollTo(position.x, position.y);
}


function onPersonalSelect (selectedKeys) {
  onSelect(selectedKeys,false)
}

function onSelect (selectedKeys, isorg=true )  {
  const value =''
  console.log('selected', selectedKeys,selectedKeys.item.props);
  const node = selectedKeys.item.props

  // dispatch(setCurrFolder(info.node.folder))
//  const h = JSON.parse(localStorage.getItem('editor_page'))
//  h.folder = node.folder
//  localStorage.setItem('editor_page', JSON.stringify(h));

 const position = saveScrollPosition();

  if(node.isLeaf) {
    getdocmeta(node.title,node.folder).then(res => {
      console.log(JSON.parse(res.MetaData))
      localStorage.setItem('novel__content', JSON.parse(res.MetaData));

    // const existingComponent = containerRef.current.querySelector('.dynamic-component');
    // if (existingComponent) {
    //   ReactDOM.unmountComponentAtNode(existingComponent); 
    //   console.log("Removing exsting Node")
    //   existingComponent.remove();
    // } 
    const container = document.getElementById('Editor');
    const root = createRoot(container);
    root.render(
    
      <Provider store={store}>
        <TitleCompEditor title={node.title} folder={node.folder} isorg={isorg} />
             <EditorNovel sd={JSON.parse(res.MetaData)}   />
              
       </Provider>);
       setcurrentFolder(node.folder)
       setcurrentfile(node.title)
    restoreScrollPosition(position);

    //   const newDiv = document.createElement('div');
    //   newDiv.className = 'dynamic-component';
    //   containerRef.current.appendChild(newDiv);
    //   const element = (
    //     <Provider store={store}>
    //       <EditorNovel sd={JSON.parse(res.MetaData)}   />
    //     </Provider>
    //   );
    //   ReactDOM.createRoot(element, newDiv);
    

      //jugad to use the local storage
      const h = JSON.parse(localStorage.getItem('editor_page'))
      h.title = node.title
      localStorage.setItem('editor_page', JSON.stringify(h));


      // window.location.reload();

    // dispatch(setCurrPage(res))
    }).catch(error => console.error(error))
  }else{
    // onExpand(selectedKeys,info)
  }
};


function createNewTemplate() {

  localStorage.setItem('novel__content', JSON.stringify(sd));

  const container = document.getElementById('Editor');
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
           <NewTitleEditor FolderList={FolderList} CurrentFodler={currentFolder}/>
           <EditorNovel  />       
     </Provider>
     );

}


  return (
  <Theme>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='m-5 p-5 gap-2'/>
        <div className='flex place-content-center'>

        <Button className='place-items-center' onClick={createNewTemplate} type='primary' shape="circle" icon={<PlusCircleFilled  />} />

        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={orgsidecontent}
          
          onSelect={(d,n) =>onSelect(d,n)}
        />

        <Menu
          theme="dark"
          mode="inline"
          items={personalContent}
          onClick={(d)=> onPersonalSelect(d)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>

       
        
        {/* <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        > */}
        <Content className=' flex flex-col m-6 p-5 bg-white place-content-center place-items-center'>

        <div className='flex  min-w-[80ch] m-5 p-5 shadow-md rounded-sm'>
        <AIOpenSearch ediotrRef={SideEditorRef}/>
        </div>

         <div className='flex'>
              <div className='flex flex-col '>
                <div className='flex gap-5 place-items-stretch '>
                  <div className='flex flex-col place-items-stretch'>
                    <div className='flex flex-col' ref={containerRef} id="Editor" ></div>
                  {/* <EditorNovel sd={content} /> */}
                  </div>

                  <div className='flex place-items-center flex-col min-w-[48ch] max-w-[48ch]   bg-slate-100'>
                  <div ref={SideEditorRef} id="SideEditor" ></div>
                  </div>
                </div>
              </div>
            </div>
        </Content>
      </Layout>
    </Layout>
    </Theme>
  );
};
