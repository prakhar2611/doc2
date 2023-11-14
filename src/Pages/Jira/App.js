import React, { useState , useEffect} from "react";
import './App.css';
import { InputField } from './components/InputField';
import axios from 'axios';
import Tables from "./components/Table";
import BarChart from "./components/FloatingBars";
import  { HorizontalBars } from "./components/HorizontalBars";
import { Heading } from "@radix-ui/themes";
import { Select } from "antd";
import Select1 from 'react-select';
export function JiraBoard() {
  const [inputValue, setInputValue] = useState({ jiraId: "", mergeId: ""  });
  const { jiraId, mergeId } = inputValue;
  const [jiraApiResponse, setJiraApiResponse] = useState(null);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [nameList,setNameList] = useState(null);
  const [selected, setSelected] = useState([]);
  const [key,setKey] = useState(null);
  // const [chartData, setChartData] = useState([]);
  let input = !(jiraId.length && mergeId.length);
  let mrId="";

  const handleDropddown=(e)=>{
    let updatedval=e
    setSelectedGender(e);
    console.log("update",);
    handleApi(updatedval);
  }

  const selectName = (e)=>{
    setSelected(e);
    let value = e;
    value= value.value;
    handleApiName(value);
  }
   useEffect(()=>{
    axios.get(`http://10.5.20.49:3022/api/users/list`,{
      headers: {
        "omnia-token": "test"
      }
    })
    .then((res)=>{
      setNameList(res.data);
    })
    .catch((err)=>{
      console.error('API call error:', err);
    })
   },[])

   const handleApiName = value =>{
    axios.get(`http://10.5.20.49:3022/api/users/issues?username=${value}`,{
          headers: {
              "omnia-token": "test"
          }
        }
    )
    .then((res)=>{
      setKey(res.data);
      console.log("keys:",res.data);
    })
    .catch((err)=>{
      console.error('API call error:', err);
    })
   }
  const handleApi = updatedval => { 
        console.log("res::",jiraApiResponse ?jiraApiResponse.commits.map(user=>user.count) :jiraApiResponse);
        axios.get(`http://10.5.20.49:3022/api/issues/id?issueID=${updatedval}`,{
          headers: {
              "omnia-token": "test"
          }
        }
        )
          .then((response) => {
            // setChartData(mockData);
            setJiraApiResponse(response.data);
            mrId = response.data.repo_url
            console.log("mrid::",mrId);
            console.log("res0::",response.data);
            response.data ? console.log(response.data):console.log("no data");
            // console.log(response.data.gitlab_data);
          })
          .catch((error) => {
            console.error('API call error:', error);
          }); 
  };
let dates= jiraApiResponse ?jiraApiResponse.commits.map(user=>user.date) :null;
let counts= jiraApiResponse ?jiraApiResponse.commits.map(user=>user.count) :null;
let name = nameList ? nameList.map(user=>user.Name):null;
let keys = key ? key.map(item=>item.Key) : null; 
let options =  name ? name.map(item => {
  const nameParts = item.split('.'); 
  const label = `${nameParts[0]} ${nameParts[1]}`;
  const value = item; 
  return { label, value };
}):" ";
console.log("name:::::",options);
console.log("jira",keys);
console.log("dateus",dates);
console.log("count",counts);
console.log("selectedGender",selectedGender);
const gender = ["Select", "SGMY-4077","SGMY-3485"];
// const genderArr=gender.map((val,i) =>
// <option key={i} value={val}>{val}</option>
// )

const genderArr= keys && keys.map((val,i) =>
<option key={i} value={val}>{val}</option>
)
  return (
//     <div>
// <div style={{marginLeft:"2%",fontSize:"16px",fontWeight:"600"}}><span>Jira Id</span></div>
// <select className="select" value={selectedGender} onChange={handleDropddown}> {genderArr}</select> 
//       {/* <InputField
//          type="text"
//          value1={jiraId}
//          placeholder="Enter your jira id"
//          name="jiraId"
//          onChange={handleChange}
//        />
//        <InputField
//          type="text"
//          value2={mergeId}
//          placeholder="Enter your merge id"
//          name="mergeId"
//          onChange={handleChange}
//        /> */}
//        {/* <button className="btn" disabled={input} onClick={handleApi}>Submit</button> */}
//        <div className="apiResponseContainer">
      //  {jiraApiResponse ? <div className="jiraContainer"> 
      //   <div><span>Dev Assignee :</span>{jiraApiResponse.dev_assignee }</div>
      //   <div><span>Dev Effort :</span>{jiraApiResponse.dev_effort }</div>
      //   <div><span>Dev StartDate :</span>{jiraApiResponse.dev_start_date ?jiraApiResponse.dev_start_date:"2023-09-29"}</div>
      //   <div><span>Build DropDate :</span>{jiraApiResponse.build_drop_date }</div>
      //  </div>
      //  :null }
//       {/* { gitApiResponse ? <div className="gitContainer"> 
//       <div className="commitDate"><span>Commit Date :</span>{gitApiResponse.map(user=>user.date) }</div> */}
//       {/* <div className="commitContent">
//         <div><span>Commit message :</span>{gitApiResponse.commitMessage }</div>
//         <div><span>Dev Name :</span>{gitApiResponse.name }</div>
//       </div> */}
//        {/* <div><span>No of commits :</span>{gitApiResponse.map(user=>user.count)}</div>
//       </div>:null}
//         */}
//        </div>

//        {/* <ContributionsChart data={chartData} tooltipDataAttrs={tooltipDataAttrs} titleForValue={titleForValue}/> */}
//        {/* <Tables/> */}
//        <BarChart dates={dates} counts={counts}/>
//        <HorizontalBars count={counts}/>
//     </div>

      <div className="flex flex-col gap-5 place-items-center w-1/2">
          <div className="flex flex-col gap-2 place-items-center">
          <Select1
          options={options}
          value={selected}
          onChange={(e)=>selectName(e)}
          placeholder="Select"
          />
            <Heading>JIRA ID</Heading>
            <Select className="min-w-[15ch]" value={selectedGender} onChange={(d) => handleDropddown(d)}> {genderArr}</Select> 
          </div>

          <BarChart dates={dates} counts={counts}/>
          <HorizontalBars count={counts}/>
          {jiraApiResponse ? <div className="flex flex-col gap-1"> 
        <div><Heading>Dev Assignee :</Heading>{jiraApiResponse.dev_assignee }</div>
        <div><Heading>Dev Effort :</Heading>{jiraApiResponse.dev_effort }</div>
        <div><Heading>Dev StartDate :</Heading>{jiraApiResponse.dev_start_date ?jiraApiResponse.dev_start_date:"2023-09-29"}</div>
        <div><Heading>Build DropDate :</Heading>{jiraApiResponse.build_drop_date }</div>
       </div>
       :null }
      </div>

  );
}

