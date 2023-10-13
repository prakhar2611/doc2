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
        'content' : {}
    }},
  reducers: {

    setCurrPage: (state, action) => {
    state.value.title = action.payload.Title
    state.value.content = action.payload.MetaData
    
    // localStorage.setItem('editor_page', JSON.stringify(state.value));
    //   console.log(localStorage.getItem('editor_page'))
    },
    setCurrFolder: (state, action) => {
      state.value.folder = action.payload

      // localStorage.setItem('editor_page', JSON.stringify(state.value));
      // console.log(localStorage.getItem('editor_page'))


  },
    setNewPage : (state,action) => {
      state.value = newPage
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrPage,setNewPage, setCurrFolder } = pageSlice.actions

export default pageSlice.reducer