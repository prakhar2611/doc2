import React, { use, useState,useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Select } from 'antd';
import { EditorNovel } from './Editor'
import { useDispatch, useSelector } from 'react-redux';
import { setReload } from '../Utils/Reducers/editoeSlice';
import { Theme, Flex, Container, Box, Card, Heading, Text, TextField } from "@radix-ui/themes";

import { sd } from './defaultdata';
import { Editor } from "novel"
import { SideEditor } from './SideEditor'
import { FileList } from './FileList';
import Input from 'antd/es/input/Input';
import { getdocs, saveFile } from '../apis/DocsApi';
import { MySmallCurdComponent } from './SmallCurdComponent';
import { TitleComp } from '../Components/TitleComp';
import { AIOpenSearch } from '../Components/AISearchComp';
import OpenAI from 'openai';
import { StaticOrgData } from '../Components/StaticOrgData';
import TitleCompEditor from '../Components/TitleCompEditor';




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

  const dispatch = useDispatch()
  const [content, setcontent] = useState(sd)
  const page = JSON.parse(localStorage.getItem('editor_page'))
  const folder = page.folder
  const title = page.title
  // const folder = useSelector((state) => state.page.value['folder']);
  // const title =  useSelector((state) => state.page.value['title']);
  const [save, setsave] = useState(false)
  const [currinputfile, setcurrinputfile] = useState(folder)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



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

useEffect(() => {
  const orgDocs = {
    title: 'Personal',
    label : 'Personal',
    children: []
  }

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
      })
       orgDocs.children = tt
       setpersonalContent([orgDocs])
    }
  
}).catch(error => console.error(error))
},[])
  

const onSelectOrg = (selectedKeys, d) => {
  const value =''
  console.log('selected', selectedKeys.keyPath ,d);
}



  return (
  <Theme>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='m-5 p-5'/>
        <Menu
          theme="dark"
          mode="inline"
          items={orgsidecontent}
          onClick={(d)=> onSelectOrg(d)}
        />

        <Menu
          theme="dark"
          mode="inline"
          items={personalContent}
          onClick={(d)=> onSelectOrg(d)}
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

       
        
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >

        <div className='flex place-content-center min-w-[40ch] m-5 p-5 shadow-md rounded-sm'>
        
        <AIOpenSearch/>
        </div>

         <div style={{
              display: 'flex',
              gap : '1rem',
              flexDirection: 'row'
            }}>

           
              <div style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                 

                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',

                }}>

               

                  <div style={{display:'flex',flexDirection:'column', gap:'2rem'}}>
                    <TitleCompEditor title={"PRAKHAR"}/>
                  <EditorNovel sd={content} />
                  </div>

                  <div style={{display:'flex',flexDirection:'column', gap:'2rem'}}>
                  
                  <SideEditor />
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
