import React, { use, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button,Select } from 'antd';
import { EditorNovel } from './Editor'
import { useDispatch, useSelector } from 'react-redux';
import { setReload } from '../Utils/Reducers/editoeSlice';
import { Theme, Flex, Container, Box, Card, Heading, Text } from "@radix-ui/themes";

import { sd } from './defaultdata';
import { Editor } from "novel"
import { SideEditor } from './SideEditor'
import { FileList } from './FileList';
import Input from 'antd/es/input/Input';
import { saveFile } from '../apis/DocsApi';
import { MySmallCurdComponent } from './SmallCurdComponent';
import { TitleComp } from '../Components/TitleComp';
import { AIOpenSearch } from '../Components/AISearchComp';


const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
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




export function OmniaWelcome() {

  const dispatch = useDispatch()
  const [content, setcontent] = useState(sd)
  
  
 const page =JSON.parse(localStorage.getItem('editor_page'))

 
 const folder =  page.folder
 const title =  page.title



  // const folder = useSelector((state) => state.page.value['folder']);
  // const title =  useSelector((state) => state.page.value['title']);

  const [save,setsave] = useState(false)


  const [currinputfile, setcurrinputfile] = useState(folder)


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





  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />

        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '75rem',
          justifyContent:'center',
          gap: '2rem'
        }}>


          <TitleComp filename={title}  issaveenable = {true} currfoldername={folder}/>

        </div>

        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
        
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <FileList />
            <AIOpenSearch/>

            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem'

              }}>

                <EditorNovel sd={content} />
                <SideEditor />

              </div>

            </div>
            {/* <Editor/> */}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
      </Footer>
    </Layout>
  );
};
