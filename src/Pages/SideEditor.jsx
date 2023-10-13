import './App.css';
import { Editor } from "novel";


export function SideEditor() {


  function onChange(editor) {
    //use the above when the above state passed is actually the whole state struct to use
    // .to JSON() you need to go to editor state struct whoch has that fuction defined

    const editorStateJSON = editor.getJSON()
    console.log(JSON.stringify(editorStateJSON))
  }

  return (
      <div
      style={{
          backgroundColor : '#cbd7f7',
        width : '20rem',
          }}>
            <Editor className='SideEditor1'
     storageKey='SideEditor'
     completionApi='http://localhost:9005/api/generate'
    //   onDebouncedUpdate={(editor) => onChange(editor)}
     />
      </div>

  

  );
}

