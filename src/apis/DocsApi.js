import axios from "axios";
import { useDispatch } from "react-redux";
import { updatedirectory } from "../Utils/Reducers/directorySlice";

const serverurl = process.env.REACT_APP_TEST_SERVER_URL
const token = sessionStorage.getItem('access_token');

export function getdocs(isorg=false){
    //const dispatch = useDispatch()

    if(isorg){
      console.log("Request payload for fetching the data : ", serverurl+`docs/api/v1/listDocs` )
      return  axios.get(`http://localhost:9005/docs/api/v1/listOrgDocs`,{
              headers: {           
                  'Content-Type': 'application/json',
              },        
          })
          .then(response => response.data.Data)
          .catch(error => {return console.error(error)});
    }else{
      console.log("Request payload for fetching the data : ", serverurl+`docs/api/v1/listDocs` )
      return  axios.get(`http://localhost:9005/docs/api/v1/listDocs`,{
              headers: {           
                  'Content-Type': 'application/json',
                  'token' :  token
              },        
          })
          .then(response => response.data.Data)
          .catch(error => {return console.error(error)});
    }

    
  }

  export function getdocmeta(title,folder,isOrg=false){
    //const dispatch = useDispatch()

    const request ={
        "title" : title,
        "folder" : folder,
        "isOrg" : isOrg,
    }
    console.log("Request payload for fetching the data : ", request)

    return  axios.post(`http://localhost:9005/docs/api/v1/getDocsMeta`,JSON.stringify(request),{
            headers: {           
                'Content-Type': 'application/json',
                'token' :  token,
            },        
        })
        .then(response =>  response.data.Data)
        .catch(error => {return console.error(error)});
  }


  export  function saveFile(payload,title,folder) {
    const saveFileRequest = {
      "metaData" : payload,
      "title" : title,
      "folder" : folder
    }
    // const [cData] = useConfig()
  
  
    console.log("save file payload :", saveFileRequest)
    axios.post(`http://localhost:9005/docs/api/v1/save`,JSON.stringify(saveFileRequest),{
      headers: {           
          'Content-Type': 'application/json',
          'token' :  token

      },
    })
      .then(response => { 
        console.log("response of save  doc meta :",response.data)
        return true
        
      }).catch(error => console.error(error));
  }
  