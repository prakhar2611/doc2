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
  const folder = useSelector((state) => state.page.value['folder']);
  const [currfoldername,setinputFolder] = useState(folder)

  const [save,setsave] = useState(false)
  const folderList = useSelector((state)=>state.directory.value.folderList);


  const [currinputfile, setcurrinputfile] = useState(folder)


  const {
    token: { colorBgContainer },
  } = theme.useToken();



  function SaveComponent() {
    return (<div className='save'>
    <Input style={{ 'width': '30rem' }} disabled={false} onChange={(e) => setcurrinputfile(e.target.value)} />
    <Button style={{ 'backgroundColor': 'blue' }} onClick={() => onSave()}> Save </Button>
  </div>)
  }

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


  function onSave() {
    // const items = JSON.parse(localStorage.getItem('items'))
    const y = localStorage.getItem('novel__content');
    saveFile(JSON.stringify(y), currinputfile, "NewFolder")
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
          alignItems: 'stretch',
          gap: '2rem'
        }}>


          <Heading size={"2"}>FILE NAME</Heading>
          <Select value={currfoldername} options={folderList} onSelect={(x) => {setinputFolder(x)}} ></Select>

          {(save) && <SaveComponent/>}


        </div>

        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          {/* <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider> */}
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <FileList />

            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>

              {/* buttons and inputs             */}
              {/* <div style={{
              display : 'flex',
              flexDirection : 'row',
              width : '75rem',
              alignItems : 'stretch',
              gap : '2rem'
            }}>
              

              <Heading size={"2"}>FILE NAME</Heading>        
              <Input style={{ 'width': '30rem' }} disabled={false} onChange={(e) => setinputFolder(e.target.value)} />
              <Button style={{ 'backgroundColor': 'blue' }} onClick={() => onSave()}> Save </Button>
              
              </div> */}


              {/* Editors  */}

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
