// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
// d3.json("./data/samples.json").then((importedData) => {
//     // console.log(importedData);
//     var data = importedData;
//     // console.log(data);
//     var metadata = data.metadata;
//     console.log(metadata);
//     var idNo = metadata.map(obj=>obj.id);
    // console.log(idNo);
    // for (var i=0; i<idNo.length; i++){
    //     console.log(idNo[i])
    // }
    // ethnic = metadata.map(obj=>obj.ethnicity);
    // // console.log(ethnic);
    // gender = metadata.map(obj=>obj.gender);
    // // console.log(gender);
    // age = metadata.map(obj=>obj.age);
    // // console.log(age);
    // loc = metadata.map(obj=>obj.location);
    // // console.log(loc); 
    // bbtype = metadata.map(obj=>obj.bbtype);
    // // console.log(bbtype);
    // wfreq = metadata.map(obj=>obj.wfreq);
    // console.log(wfreq);
   
    
// });

// FUNCTION 'init': Initializes the page with a default plot
function init() {

    var dropdownMenu = d3.select("#selDataset");

    d3.json("./data/samples.json").then((importedData) => {
        var data = importedData;
        var names_list = data.names;
            console.log(names_list);

        names_list.forEach((idNo)=>{
            console.log(idNo);
            //Append into html <option> and the idNo as the value
            dropdownMenu
            .append('option')
            .text(idNo)
            .property('value');
            });
    
    
    
    info_table = d3.select("#sample-metadata");
    //remove everything in the sample-metadata
    info_table.html("");
    //Append data into the table 

    info_table.append("p")
    .text("In the above dropdown, select an ID.");
  
    //////////////////////////////////////////////////////////////
    //// TO ADD DEMO INFO AND CHARTS FOR ID 940 (First IdNo). ////
    //////////////////////////////////////////////////////////////

     // Extract out the first idNo from names_list which contains all the idNos and name it as variable 'firstId'
    firstId = names_list[0];

    // addDemoInfo(firstId); 
    addDemoInfo(firstId);  
    addCharts(firstId);
    });


    

};
        
// When user selects an ID, run function 'optionChanged'
id_selection = d3.select("#selDataset").on("change", optionChanged);

// // // FUNCTION 'optionChanged' ON CHANGE: This function is called when a dropdown menu item is selected
function optionChanged(idNo){
    
    addDemoInfo(idNo);
    addCharts(idNo);
};


function addDemoInfo(idNo){

    info_table.html("");
    //Append data into table
    d3.json("./data/samples.json").then((importedData) => {
        var metaInfo = importedData.metadata;
        //Variables in the object
        var filteredInfo = metaInfo.filter(obj => obj.id == idNo);
        // console.log(filteredInfo);
        var selectedInfo = filteredInfo[0];
        console.log(selectedInfo);
        info_table = d3.select("#sample-metadata");
        //remove everything in the sample-metadata
        // info_table.html("");

        // APPEND TO INFO TABLE THE ID's DATA ON HTML
        Object.entries(selectedInfo).forEach(([key, value]) => {
                console.log(key, value);
                info_table.append("h6").text(`${key}: ${value}`);
                console.log(info_table);
            });
    });

}



function addCharts(idNo){
    // HORIZONTAL BAR CHART
    // Extract out id, otu_ids, sample_values
    d3.json("./data/samples.json").then((data) => {
    var metaData = data.samples;
        // console.log(metaData);

    var filteredSampInfo = metaData.filter(obj => obj.id == idNo)[0];
    console.log(filteredSampInfo); 

    // x-values: otu_ids
    var samp_otu_id = filteredSampInfo.otu_ids;
    // console.log(samp_otu_id);
    var top_otu_id = samp_otu_id.slice(0,10);
    console.log(top_otu_id);
    var str_top_otu_id = top_otu_id.map(obj => "OTU "+ obj);
    // str_top_otu_id = str_top_otu_id.reverse();
    console.log(str_top_otu_id);

    // y-values: sample_values *Sample values are already descending in samples.json data
    var sample_vals = filteredSampInfo.sample_values;
    // console.log(sample_vals);
    var top_sample_vals = sample_vals.slice(0,10);
    // top_sample_vals = top_sample_vals.reverse();
    console.log(top_sample_vals);

    //otu_labels (for the bubble chart)
    var otu_labs = filteredSampInfo.otu_labels;

    var trace1 = {
        x: top_sample_vals.reverse(),
        y: str_top_otu_id.reverse(),
        type: "bar",
        orientation: 'h'
    };

    //Plot the bar chart

    var data = [trace1];

    var layout = {
        title: "OTU IDs vs Sample Values",
        xaxis: {title: "Sample Values"},
        yaxis: {title:"OTU IDs"}
    };

    Plotly.newPlot("bar", data, layout);

    //Plot the bubble chart

    var trace2 = {
        x: samp_otu_id,
        y: sample_vals,
        text: otu_labs,
        mode: 'markers',
        marker: {
            size: sample_vals, //marker size [40, 60, 80, 100,50,20,20,10,20,50], 
            color: samp_otu_id //otu_ids for the marker colours
        }
        
    };

    var data1 = [trace2];

    var layout1 = {
        title: 'OTU ID and Values',
        xaxis:{title:"OTU ID"},
        yaxis:{title:"Count"},
        showlegend: false,
        height: 600,
        width: 600
    };

    Plotly.newPlot("bubble", data1, layout1);



});

};

 // var idNo = metadata.map(obj=>obj.id);
        // row = info_table.append("p").text(id).property('value');
        
        
        // var ethnic = metadata.map(obj=>obj.ethnicity);
        // var gender = metadata.map(obj=>obj.gender);
        // var age = metadata.map(obj=>obj.age);
        // var loc = metadata.map(obj=>obj.location);
        // var bbtype = metadata.map(obj=>obj.bbtype);
        // var wfreq = metadata.map(obj=>obj.wfreq);

    // row = info_table.append("p")
    // row.text("The ID you selected have the demographic info as follows:");


// run function init()
init();