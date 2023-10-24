import './App.css';
import { Editor } from "novel";
import { useDispatch, useSelector } from 'react-redux';
import { setcontent } from '../Utils/Reducers/contentSlice';
import { useEffect, useState } from 'react';
import { Flex } from '@radix-ui/themes'; 

export function EditorNovel({ sd }) {

  const [reload, setreload] = useState(false)
  const [content, setcontent] = useState(sd)

  const g = useSelector((state) => state.editor.value['reload'])
  useEffect(() => {
    setreload(g)
  }, [g])

  const dispatch = useDispatch()
  function onChange(editor) {
    
  }



  return (
    <div >
      <Editor
      
        className='flex md:max-w-[120ch] md:min-w-[100ch] shadow-lg'
        // onChange={onchange}
        // defaultValue={sd}
        defaultValue={sd}
        disableLocalStorage={false}
        // onDebouncedUpdate={(editor) => onChange(editor)} 
        />

    </div>
      

  );
}
