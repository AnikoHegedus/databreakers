// declaring variables
var data_selected;
var data_deselected;
var axes;
var one_axis = false;
var all_data_chosen;


// defining the chart
var chart = Highcharts.chart('container', {
chart: {
    zoomType: 'xy',
    marginTop: 150,
},
 tooltip: {
    shared: true,
},
title: {
    text: 'Demo statistics on company X'
},
subtitle: {
    text: 'Source: invented :)'
},
xAxis: [{
    categories: ["2009", "2010","2011", "2012", "2013", "2014", "2015", "2016"]
}],
yAxis: [],

legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    floating: true,
    itemDistance: 50,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
},
series: []
});


// defining the databases
var database = [
    {name: "Number of existing customers", value: "Number of existing customers", data: [12089, 12075, 13581, 13000, 12090, 12980, 12440, 12016], color: '#bb5578', yAxis: "existing_customers"},
    {name: "Turnover in thousands", value: "Turnover in thousands", data: [1648, 1702, 1620, 1752, 1714, 1699, 1705, 1795], color: '#b9a5d1', yAxis: "turnover"},
    {name: "Number of new customers", value: "Number of new customers", data: [289, 275, 281, 300, 290, 298, 244, 216], color: '#bbe2ed', yAxis: "new_customers"},
    {name: "Number of employees", value: "Number of employees", data: [34, 37, 30, 45, 42, 44,  47, 50], color: '#e1a12b', yAxis: "employees"},
    {name: "Value of export in millions", value: "Value of export in millions", data: [1.2, 0.8, 1.3, 1.4, 0.9, 0.75, 0.6, 0.88], color: '#bde074', yAxis: "export"},
];

//check the requested number of axes
$(".nr_axes").on("change", function(){
    axes = $('input[name=axes]:checked').val();
    
    //if one axis is chosen
    if(axes =="yes"){
        // remove all data from the different axes     
        remove_all_data();
        // add new, common axis
        chart.addAxis({
                id: "oneaxis",
        }); // end add new axis
        
        // add all chosen data to the common axis
        for(var i = 0; i< all_data_chosen.length; i++){
            add_to_one_axis(all_data_chosen[i]);
        }
        // set one_axis to true
        one_axis = true;
    
    // if two axes are chosen
    } else if (axes =="no"){
        // remove all date from the common axis
        remove_all_data();
       // remove the common axis
        chart.get("oneaxis").remove();
        // add all data to their own axes
        for(var i = 0; i< all_data_chosen.length; i++){
            add_to_more_axes(all_data_chosen[i]);
        }
        // set one_axis to true
        one_axis = false;
        // hide axes if there are more than two of them
        hide_axes_if_more_than_two();
    }
   
});

// add data to one axis
function add_to_one_axis(data_selected){
    for(var i = 0; i < database.length; i++){
        
        // find the right color for the buttons
        $('.statistics').find('.search-choice').each(function() {
            if ($(this).text() === database[i].name) {
                $(this).css({"background": database[i].color, "color": "black"});
            }
        })
        
        //add data the chosen data to chart 
        if(data_selected == database[i].name){
             chart.addSeries(
                {
                    yAxis: "oneaxis", 
                    name: database[i].value,
                    type: 'spline',
                    data: database[i].data,
                    color: database[i].color,        
                });            
            }
    } // end finding chosen data in database
    // change tooltip
    chart.update({
                tooltip: {
                    shared: false
                }
    }); // end chart update
} //add_to_one_axis

// function for adding data to more axes
function add_to_more_axes(data_selected){
    // go through the database
    for(var i = 0; i < database.length; i++){
        
        // find the right color for the buttons
        $('.statistics').find('.search-choice').each(function() {
            if ($(this).text() === database[i].name) {
                $(this).css({"background": database[i].color, "color": "black"});
            }
        })
        
        //look for chosen data
        if(data_selected == database[i].name){
            // add new axis to each series
            chart.addAxis({
                id: database[i].yAxis,
                labels: {
                    enabled: "{value}"
                },
                title: {
                    text: database[i].name
                },
            }); // end add new axis to each series

            // add data to its axis
             chart.addSeries({
                yAxis: database[i].yAxis, 
                name: database[i].value,
                type: 'spline',
                data: database[i].data,
                color: database[i].color,
            }); // addSeries
        } //end if data found
    }// end for loop

    // if there are more than two axis, hide them
    if (!one_axis){
        hide_axes_if_more_than_two();
    } 
    // update tooltip
    chart.update({
        tooltip: {
            shared: true
        }
    }); // end update tooptip
} // end data_to_chart function
 

// remove single data from chart
function remove_single_data_from_chart(data_deselected){
    // find the data to be removed
    series_length = chart.series.length;
     for (var j = 0; j < chart.series.length; j++){
            if (data_deselected == chart.series[j].name){
                chart.series[j].remove(); // remove the right series
            } // end if data found
    } // end going through chart.series

    // if there are more axes remove the axes too
    if(!one_axis){
        for(var i = 0; i<database.length; i++){
            // find the right axis
            if (data_deselected == database[i].name){
                    chart.get(database[i].yAxis).remove();                
            } // end finding the right axes
        } // end for 
    } // end if !one_axis
  } // end remove single data

  // remove all data from chart
  function remove_all_data(){
       var seriesLength = chart.series.length;
        for(var i = seriesLength -1; i > -1; i--) {
            chart.series[i].remove();
        }
        // if more than one axis, remove the axis too
        if(!one_axis){
            for(var i = 0; i<database.length; i++){
                for(var j = 0; j< all_data_chosen.length; j++){
                    if (all_data_chosen[j] == database[i].name){
                        chart.get(database[i].yAxis).remove();                
                    } // end if data found
                } // end for j
            } // end for i 
        } // end if !one_axis
  } // end remove_all_data

// if series are shown on different axis, hide axis if there are more than two
function hide_axes_if_more_than_two(){
    if (chart.series.length > 2){
        for(var j = 0; j<chart.series.length; j++){ // find which axis to hide
            chart.series[j].yAxis.update({
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                }
            }); // end hide found axes
        } // end finding axes
   } // end if chart.series.length > 2
} // hide_axes_if_more_than_two

// if series are shown on different axis, show axis if there are less than two
function show_if_less_than_two(){
    if (chart.series.length <= 2){
       for(var j = 0; j<chart.series.length; j++){ // find which axis to show
            chart.series[j].yAxis.update({
                labels: {
                    enabled: true
                },
                title: {
                    text: chart.series[j].name
                }
            });// end show found axes
        }// end finding axes
    } // end if chart.series.length <= 2
} // show_if_less_than_two


// clicking on chosing the data
$('.statistics').on('change', function(evt, params) {
    all_data_chosen = $(this).val();
   
    // data chosen to add to chart
    if(params.selected){
        if(one_axis){
            add_to_one_axis(params.selected);
        } else if(!one_axis){
            add_to_more_axes(params.selected)
        }
    // data chosen to remove from chart
    }else if(params.deselected){
        remove_single_data_from_chart(params.deselected);
        if (!one_axis){
            show_if_less_than_two();
        }
    }
    return false;
});


// start with one data
$( document ).ready(function() {
    add_to_more_axes("Number of existing customers");

});