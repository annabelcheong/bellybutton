function addGauge(){



    //Select html id gauge
    info_table = d3.select("#gauge");

    //Remove everything in the sample-metadata
    info_table.html("");

    //Append data into the table 
    info_table.append("p")
    .text("This is placeholder for the gauge");

    // Use D3 fetch to read the JSON file
    // The data from the JSON file is arbitrarily named importedData as the argument
        d3.json("./data/samples.json").then((importedData) => {
            var data = importedData;
            var metadata = data.metadata;
            var wfreq = metadata.map(obj=>obj.wfreq);
            console.log(wfreq);
    
        // Example from plotly with my edited data
            var data = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: wfreq,
                    title: { text: "Wash Frequency" },
                    type: "indicator",
                    mode: "gauge+number"
                }
            ];
            
            var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', data, layout);
    
        });
    
    };







// addGauge(){
//     // //Select html id gauge
//     // info_table = d3.select("#gauge");

//     // //Remove everything in the sample-metadata
//     // info_table.html("");

//     // //Append data into the table 
//     // info_table.append("p")
//     // .text("This is placeholder for the gauge");

// // Use D3 fetch to read the JSON file
// // The data from the JSON file is arbitrarily named importedData as the argument
// d3.json("./data/samples.json").then((importedData) => {
//     var data = importedData;
//     var metadata = data.metadata;
//     var wfreq = metadata.map(obj=>obj.wfreq);
//     console.log(wfreq);

// // Example from plotly with my edited data
//     var data = [
//         {
//             domain: { x: [0, 1], y: [0, 1] },
//             value: wfreq,
//             title: { text: "Wash Frequency" },
//             type: "indicator",
//             mode: "gauge+number"
//         }
//     ];
    
//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot('gauge', data, layout);



// }
