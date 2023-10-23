import DirectoryTree from "antd/es/tree/DirectoryTree"
import {  DownOutlined } from '@ant-design/icons';
import { getdocmeta, getdocs } from "../apis/DocsApi";
import { useState , useEffect} from 'react';



const t = [
    {
      title: 'RedBus',
      children: [
     
      ],
    }
]

const onSelectOrg = (selectedKeys, info) => {
    const value =''
    console.log('selected', selectedKeys,     info.node);

    // dispatch(setCurrFolder(info.node.folder))
    const h = JSON.parse(localStorage.getItem('editor_page'))
    h.folder = info.node.folder
    localStorage.setItem('editor_page', JSON.stringify(h));


    if(info.node.isLeaf) {
      getdocmeta(info.node.title,info.node.folder,true).then(res => {
        console.log(JSON.parse(res.MetaData))
        localStorage.setItem('novel__content', JSON.parse(res.MetaData));

        //jugad to use the local storage
        const h = JSON.parse(localStorage.getItem('editor_page'))
        h.title = info.node.title
        localStorage.setItem('editor_page', JSON.stringify(h));

        window.location.reload();

    //   dispatch(setCurrPage(res))
      }).catch(error => console.error(error))
    }else{
      onExpand(selectedKeys,info)
    }
  };

  function onExpand (keys, info){
    // dispatch(setCurrFolder(info.node.title))
     // dispatch(setCurrFolder(info.node.folder))
   const h = JSON.parse(localStorage.getItem('editor_page'))
   h.folder = info.node.folder
   localStorage.setItem('editor_page', JSON.stringify(h));
  };


export function StaticOrgData() {

    const[treeData,setTreeData] = useState(t)

    useEffect(() => {
        getdocs(true).then(res => {
            console.log("orgdocs",res)
            if(res.length>0) {
                // const folders = []
                // res.forEach(element => {
                // const value = {
                //   value : element.title,
                //   label : element.title
                // }
        
                // folders.push(value)
        
                // });

                const tt = [
                    {
                      title: 'RedBus',
                      children: res,
                    }
                ]
                // console.log(tt)

                
                setTreeData(tt)  //  dispatch(updatedirectory(res)) 
            }
          
        }).catch(error => console.error(error))
      }, [1]);    
     
    return(<DirectoryTree style={{'display' : 'flex','width' : '15rem'}}
    multiple
    switcherIcon={<DownOutlined />}
    defaultExpandAll={true}
    onSelect={onSelectOrg}
    // onExpand={onExpand}
    treeData={treeData}
  />)
}