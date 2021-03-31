// FUNCTION 'init': Initializes the page with the default plot
function init() {
    //// Create Dropdown of ids////
    // Select html location '#selDataset' and assign to variable
    var dropdownMenu = d3.select("#selDataset");
    // Extract out all the idNos (via d3)
    d3.json("./data/samples.json").then((importedData) => {
        var data = importedData;
        var names_list = data.names;
            // TEST: console.log(names_list);
        // Append each idNo within the names_list: <option> and the idNo
        names_list.forEach((idNo)=>{
            // TEST: console.log(idNo);
            // In html, append in location: #selDataset >> option >> idNo (value)
            dropdownMenu
            .append('option')
            .text(idNo)
            .property('value');
        });

        //////////////////////////////////////////////////////////////
        //// TO ADD DEMO INFO AND CHARTS FOR ID 940 (First IdNo). ////
        //////////////////////////////////////////////////////////////

        // Extract out the first idNo from names_list which contains all the idNos and name it as variable 'firstId'
        firstId = names_list[0];

        // Run function to add Demo Info about id 940.
        addDemoInfo(firstId); 

        // Run function to add Charts Info about id 940.
        addCharts(firstId);

        // Run function to add Gauge about id 940.
        addGauge(firstId);

        // Append paragraph and string in html id 'sample-metadata'. *This paragraph text only shows up in the initial function.
        info_table.append("p")
        .text("In the above dropdown, select an ID.");

    });

};
        
// EVENT LISTENER: When user selects an ID, run function 'optionChanged'
id_selection = d3.select("#selDataset").on("change", optionChanged);

// FUNCTION 'optionChanged' ON CHANGE: This function is called when a dropdown menu item is selected
function optionChanged(idNo){    
    // Run the following 3 functions 
    // Note: function 'addGauge' is in file bonus.js
    addDemoInfo(idNo);
    addCharts(idNo);
    addGauge(idNo);
};
// FUNCTION 'addDemoInfo' is the small box of information on the top left of html page
function addDemoInfo(idNo){
    info_table = d3.select("#sample-metadata");
    info_table.html("");
    //Append data into table
    d3.json("./data/samples.json").then((importedData) => {
        var metaInfo = importedData.metadata;
        //Variables in the object
        var filteredInfo = metaInfo.filter(obj => obj.id == idNo);
        // console.log(filteredInfo);
        var selectedInfo = filteredInfo[0];
        // console.log(selectedInfo);

        // APPEND TO INFO TABLE THE ID's DATA ON HTML
        Object.entries(selectedInfo).forEach(([key, value]) => {
                console.log(key, value);
                info_table.append("h6").text(`${key}: ${value}`);
                console.log(info_table);
            });
    });

}

// FUNCTION 'addCharts' include the Bar Chart and the Bubble Chart in the html page
function addCharts(idNo){
    ////  HORIZONTAL BAR CHART AND BUBBLE CHART ////

    // Extract out id, otu_ids, sample_values
    d3.json("./data/samples.json").then((data) => {
    var metaData = data.samples;
    var filteredSampInfo = metaData.filter(obj => obj.id == idNo)[0];
    // console.log(filteredSampInfo); 

    // y-values: otu_ids
    var samp_otu_id = filteredSampInfo.otu_ids;
    // Top 10 otu_ids
    var top_otu_id = samp_otu_id.slice(0,10);
    // Top 10 otu_ids in a string, e.g. OTU 1167
    var str_top_otu_id = top_otu_id.map(obj => "OTU "+ obj);

    // x-values: sample_values *Sample values are already descending in samples.json data
    var sample_vals = filteredSampInfo.sample_values;
        // Top 10 counts of the otu_ids
    var top_sample_vals = sample_vals.slice(0,10);

    // otu_labels (for the bubble chart)
    var otu_labs = filteredSampInfo.otu_labels;

    //Plot the bar chart
    var trace = {
        x: top_sample_vals.reverse(),
        y: str_top_otu_id.reverse(),
        type: "bar",
        orientation: 'h'
    };

    var data = [trace];

    var layout = {
        xaxis: {title: "Count"},
        yaxis: {title:"OTU ID"}
    };

    Plotly.newPlot("bar", data, layout);

    //Plot the bubble chart

    var trace = {
        x: samp_otu_id,
        y: sample_vals,
        text: otu_labs,
        mode: 'markers',
        marker: {
            size: sample_vals, 
            color: sample_vals, // Colours grouped by sample_vals i.e. In this instance, grouped by size
            colorscale: 'Portland'
        }
        
    };

    var data = [trace];

    var layout = {
        xaxis:{title:"OTU ID"},
        yaxis:{title:"Count"},
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot("bubble", data, layout);

    });

};

// Run function init()
init();