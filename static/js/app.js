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
        
        names_list.forEach((name_ID)=>{
            console.log(name_ID);
            //Append into html <option> and the name_ID as the value
            dropdownMenu
            .append('option')
            .text(name_ID)
            .property('value');
            });
    });

    info_table = d3.select("#sample-metadata");
    //remove everything in the sample-metadata
    info_table.html("");
    //Append data into the table 

    info_table.append("p")
    .text("In the above dropdown, select an ID.");
    
    // row = info_table.append("p")
    // row.text("id: ";
    // row = info_table.append("p")
    // row.text("ethnicity: ");
    // row = info_table.append("p")
    // row.text("gender: ");
    // row = info_table.append("p")
    // row.text("age: ");
    // row = info_table.append("p")
    // row.text("location: ");
    // row = info_table.append("p")
    // row.text("bbtype: ");
    // row = info_table.append("p")
    // row.text("wfreq: ");

};
        
// When user selects an ID, run function 'optionChanged'
id_selection = d3.select("#selDataset").on("change", optionChanged);

// // // FUNCTION 'optionChanged' ON CHANGE: This function is called when a dropdown menu item is selected
function optionChanged(idNo){
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

    // HORIZONTAL BAR CHART
    // Extract out id, otu_ids, sample_values
    d3.json("./data/samples.json").then((data) => {
    var metaData = data.samples;
        // console.log(metaData);
    filteredSampInfo = metaData.filter(obj => obj.id == idNo)[0];
    console.log(filteredSampInfo);

    // x-values: otu_ids
    samp_otu_id = filteredSampInfo.otu_ids;
    console.log(samp_otu_id);
    // y-values: sample_values
    sample_vals = filteredSampInfo.sample_values;
    console.log(sample_vals);

    });

    var trace1 = {
        x: samp_otu_id,
        y: sample_vals,
        type: "bar"
    };

    var data = [trace1];

    Plotly.newPlot("bar", data);
    
















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