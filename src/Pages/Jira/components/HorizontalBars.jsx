import React from 'react'
import {Bar} from 'react-chartjs-2';
// const data = {
//     labels: ["Baseline","No of commits"],
//     datasets: [
//       {
//         axis: 'y',
//         backgroundColor: '#3490dc',
//         hoverBackgroundColor: '#1d4f79',
//         data: ["5",ans]
//       }
//     ]
// }

export const HorizontalBars=(counts)=>{
    console.log("nn",counts.count);
    let numbers=counts.count?counts.count:[];
    var Sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        Sum += numbers[i]
    }
    let ans=0;
    let totalCommits = counts && counts.counts ? counts.count.map(user=>ans+=user):null;
    const arraySum = counts && counts.counts ?counts.count.reduce((accumulator, currentValue) => accumulator + currentValue, 0):null;
    console.log("tot",counts.count);
    console.log("total",Sum);
    return(
        <div style={{
            display:'flex',
            justifyContent:"center",
            alignItems:"center",
            width:"50%"}}>
        <Bar
        data={{
            labels: ["Baseline of total no of commits","Total no of commits"],
            datasets: [
              {
                axis: 'y',
                backgroundColor: '#3490dc',
                hoverBackgroundColor: '#1d4f79',
                data: [Sum==0?"0":Sum==6?"8":"12",Sum]
              }
            ]
        }}
        options={{
        indexAxis: 'y',
        plugins:{
             title:{display:false, text:"", font:{size: 12, family: 'rubik'}},
             legend: {display: false, position: 'right'}},
        maintainAspectRatio: false
        }}
    />
    </div>
    )
    
}