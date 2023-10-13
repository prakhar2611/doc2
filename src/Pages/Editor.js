import './App.css';
import { Editor } from "novel";
import { useDispatch, useSelector } from 'react-redux';
import { setcontent } from '../Utils/Reducers/contentSlice';
import { useEffect, useState } from 'react';


export function EditorNovel({ sd }) {

  const [reload, setreload] = useState(false)
  const [content, setcontent] = useState(sd)

  const g = useSelector((state) => state.editor.value['reload'])
  useEffect(() => {
    setreload(g)
  }, [g])

  const dispatch = useDispatch()
  function onChange(editor) {
    //use the above when the above state passed is actually the whole state struct to use
    // .to JSON() you need to go to editor state struct whoch has that fuction defined
    const editorStateJSON = editor.getJSON()
    // const editorStateJSON = editor.get
    // console.log(JSON.stringify(editorStateJSON))
  }

  return (
    <div style={{
      backgroundColor : '#cbd7f7',
      width : '50rem'
    }}>
      <Editor
        // defaultValue={sd}
        value={content}
        disableLocalStorage={false}
        onDebouncedUpdate={(editor) => onChange(editor)} />

    </div>

  );
}