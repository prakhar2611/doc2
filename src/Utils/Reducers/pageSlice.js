import { createSlice } from '@reduxjs/toolkit'

const sd = {
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "bold"
            }
          ],
          "text": "Welcome"
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "This is WYSWYG live update editor. To Create, Update, Save your own docs across redBus."
        },
        {
          "type": "hardBreak"
        },
        {
          "type": "text",
          "text": "People new to organization can ask anything about Tech, product, Teams and learn things "
        },
        {
          "type": "hardBreak"
        },
        {
          "type": "text",
          "text": "across the organization."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "IT comes with the best option around your hand."
        }
      ]
    },
    {
      "type": "bulletList",
      "attrs": {
        "tight": true
      },
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Type \"/\" to use slash menu."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Use our AI powered Feature to ask anything about redBus."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Explore other team Works."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Trace you productivity."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Collaboration across team."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph"
    }
  ]
}

const newPage = {
  'title' : 'Create New File',
  'folder' : 'Provide Folder Name',
  'content' :   sd

}

export const pageSlice = createSlice({
  name: 'Page',
  initialState: {
    value:{
        'title' : 'Create New File',
        'folder' : 'Provide Folder Name',
        'content' : '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Basic Template to follow While Creating File and Folder in the Systemm.","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"this is initial state of editor editor","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"Lets get started","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    }},
  reducers: {
    setCurrPage: (state, action) => {
        // state.value.set(action.payload.title,action.payload.meta)
    //   state.value.content = action.payload.meta
    //   state.value.pageId = ''
    //   state.value.pageName = action.payload.title
    state.value.title = action.payload.Title
    state.value.content = action.payload.MetaData

    },
    setCurrFolder: (state, action) => {
      console.log("on click Page state =====> " ,action.payload)

      state.value.folder = action.payload

  },
    setNewPage : (state,action) => {
      state.value = newPage

    }

    // setCurrPageName: (state, action) => {
    //   state.value.title = action.payload
    // }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrPage,setNewPage, setCurrFolder } = pageSlice.actions

export default pageSlice.reducer