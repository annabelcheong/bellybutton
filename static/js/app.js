// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("./data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    // console.log(data);
    metadata = data.metadata;
    console.log(metadata);
    idNo = metadata.map(obj=>obj.id);
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
   
    
});

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
    
    //Append data into table

    d3.json("./data/samples.json").then((importedData) => {
        var metadata = importedData.metadata;
        //Variables in the object
        filteredInfo = metadata.filter(obj => obj.id == idNo)

        console.log(filteredInfo);
        var info_table = d3.select("#sample-metadata");
        //remove everything in the sample-metadata
        info_table.html("");
        
        Object.entries(filteredInfo).forEach(([key, value]) => {
        console.log(key, value);
        info_table.append("p")
        .text(`${key}: ${value}`);
       
        // .text(key)
        // .property('value');
        });
        
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
    });

};





// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");





// run function init()
init();