// declaring variables
var country_selected_sun;
var country_deselected_sun;
var country_selected_unempl;
var country_deselected_unempl;
var all_countries_of_unempl = ["Qatar"]; //data needed for changing axes
var axes = "two";
var change;

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
    text: 'Demo statistics'
},
subtitle: {
    text: 'Source: invented :)'
},
xAxis: [{
    categories: ["2009", "2010","2011", "2012", "2013", "2014", "2015", "2016"]
}],
yAxis: [{ // Primary yAxis
    title: {
        text: 'Unemployment rate in percentage',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
    },
    labels: {
        format: '{value}%',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
    },
    opposite: true,

    }, { // Secondary yAxis
        id: "sunshine",
        yAxis: 1,
        gridLineWidth: 0,
        title: {
            text: 'Hours of sunshine per year',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        labels: {
            format: '{value} hours/year',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    },],
legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    floating: true,
    itemDistance: 50,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
},
series: [{
    yAxis: 1,
    name: 'Hours of sunshine per year - Qatar',
    type: 'area',
    data: [3650, 3217, 3000, 3840, 3870, 3990, 4001, 3710],
    color: '#e1a12b'
}, {
    name: 'Unemployment rate in percentage - Qatar',
    type: 'spline',
    data: [0.4, 0.2, 0.5, 0.8, 0.3, 0.9, 0.75, 0.62],
    color: '#000'
}]
});


// defining the databases
var database1 = [
    {name: "Qatar", value: "Hours of sunshine per year - Qatar", data: [3650, 3217, 3000, 3840, 3870, 3990, 4001, 3710], color: '#e1a12b'},
    {name: "Mongolia", value: "Hours of sunshine per year - Mongolia", data: [2501, 2712, 2930, 2412, 2600, 2603, 2510, 2530], color: '#bde074'},
    {name: 'Sweden', value: "Hours of sunshine per year - Sweden", data: [1648, 1702, 1620, 1752, 1714, 1699, 1705, 1795], color: '#b9a5d1'},
    {name: 'Mozambique', value: "Hours of sunshine per year - Mozambique", data: [2890, 2750, 2810, 3002, 2901, 2980, 2444, 2165], color: '#bbe2ed'}
];

var database2 = [
    {name: "Qatar", value: "Unemployment rate in percentage - Qatar",  data: [0.4, 0.2, 0.5, 0.8, 0.3, 0.9, 0.75, 0.62], color: '#000'},
    {name: "Mongolia", value: "Unemployment rate in percentage - Mongolia", data: [7.7, 6.0, 7.2, 8.1, 7.9, 7.5, 7.5, 8.2], color: '#10b012'},
    {name: 'Sweden', value: "Unemployment rate in percentage - Sweden", data: [5, 6.6, 5.2, 7.4, 6.5, 6.2, 6.0, 5.7], color: '#d81525'},
    {name: 'Mozambique', value: "Unemployment rate in percentage - Mozambique", data: [17.2, 15.4, 16.4, 19.2, 13.4, 14.2, 15.1, 15.9], color: '#3D96AE'}
];


// declaring functions to add and to remove data from chart
function add_to_sun(country_selected_sun, yAxis){
    for(var i = 0; i < database1.length; i++){
        
        // find the right color for the buttons
        $('.sunshine').find('.search-choice').each(function() {
            if ($(this).text() === database1[i].name) {
                $(this).css({"background": database1[i].color, "color": "black"});
            }
        })
        //add data to chart
        if(country_selected_sun == database1[i].name){
           chart.addSeries(
            {
                yAxis: yAxis, 
                name: database1[i].value,
                type: 'area',
                data: database1[i].data,
                color: database1[i].color
            }); // addSeries
        } //end add if 
    }// end for loop
} // end country_to_sun function

function remove_from_sun(country_deselected_sun, change){
     for (var j = 0; j < chart.series.length; j++){
         if (change){
             var series_name = "Unemployment rate in percentage - " + country_deselected_sun;
         } else if (!change){
             var series_name = "Hours of sunshine per year - " + country_deselected_sun;
         }
            if (series_name == chart.series[j].name){
                index = j;
                chart.series[index].remove();
            } // end series name 1 aka hours of sunshine
     } // end for j
  } // end remove hours of sunshine



function add_to_unempl(country_selected_unempl, yAxis){
    for(var i = 0; i < database2.length; i++){
            // find the right color for the buttons
        $('.unemployment').find('.search-choice').each(function() {
            if ($(this).text() === database2[i].name) {
                $(this).css({"background": database2[i].color, "color": "white"});
                }
        })
            //add data to chart
        if(country_selected_unempl == database2[i].name){
            chart.addSeries(
                   {
                   yAxis: yAxis,
                   name: database2[i].value,
                   type: 'spline',
                   data: database2[i].data,
                   color: database2[i].color 
            }); // end add series
        } //end add if 
    }// end for loop
}

function remove_from_unempl(country_deselected_unempl){
    var series_name2 = "Unemployment rate in percentage - " + country_deselected_unempl;
        for (var k = 0; k < chart.series.length; k++){
            if (series_name2 == chart.series[k].name){
                index2 = k;
                chart.series[index2].remove();
            } // end series name 2 aka unemployement rate
        } // end for k
}

// if country is chosen from "sunshine oprtion"
$('.sunshine').on('change', function(evt, params) {
    
    // hours of sunshine of chosen country add to chart
    if(params.selected){
        country_selected_sun = params.selected;
        add_to_sun(country_selected_sun, 1);
    // hours of sunshine of chosen country remove from chart
    } else if(params.deselected){
        country_deselected_sun = params.deselected;
        remove_from_sun(country_deselected_sun, change=false);
    }
  return false;
}); // end click on sunshine

// if country is chosen from "unemployment oprtion"
$('.unemployment').on('change', function(evt, params) {
    all_countries_of_unempl = $(this).val(); //data needed for changing axes
    
    // unemployement rate of chosen country add to chart
    if(params.selected){
        country_selected_unempl = params.selected;
        if (axes == "one"){
            add_to_unempl(country_selected_unempl, 1);    
        } else if (axes == "two"){
            add_to_unempl(country_selected_unempl, 0);
        }
        
        //unemployement rate of chosen country remove from chart
    } else if(params.deselected){
        country_deselected_unempl = params.deselected;
        remove_from_unempl(country_deselected_unempl);
    } // end remove unemployement rate
    return false;
}); // end click unemployement rate


// check if the user wants to see the data on one or two axes
$(".nr_axes").click(function () {
    
    axes = $('input[name=axes]:checked').val();
    
    //if one axis is chosen
    if(axes=="one"){
        // see which countries are currently chosen
        for(var i = 0; i< all_countries_of_unempl.length; i++){
            for(var j=0; j<database1.length; j++){
                if (all_countries_of_unempl[i] == database1[j].name){
                    remove_from_unempl(all_countries_of_unempl[i]);
                    add_to_unempl(all_countries_of_unempl[i],1);
                } // end if country found
            } // end for j
        } // end for i
        // update both axes accordingly
        chart.yAxis[0].update({
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
        }); 
        
        // chart.yAxis[0].update
        chart.yAxis[1].update({
                labels: {
                    enabled: true,
                    format: '{value}',
                },
                title: {
                    text: 'Unemployment rate in percentage' + "<br>" + 'Hours of sunshine per year',
                    margin: 30,
                    style: {
                    color: Highcharts.getOptions().colors[1]
                    },
                }, 
        }); // end chart.yAxis[1].update
        // update the tooltip on the entire chart
        chart.update({
             tooltip: {
                shared: false
            }
        }); // end chart.update
    ////if two axes are chosen
    }else if(axes=="two"){
        // see which countries are currently chosen
        for(var i = 0; i< all_countries_of_unempl.length; i++){
            for(var j=0; j<database1.length; j++){
                if (all_countries_of_unempl[i] == database1[j].name){
                    remove_from_sun(all_countries_of_unempl[i], change=true);
                    add_to_unempl(all_countries_of_unempl[i],0);
                } // end if country is found
            } // end for j
        } // end for i
        // update both axes accordingly
        chart.yAxis[0].update({
            labels: {
                enabled: true,
                format: '{value} %',
            },
            title: {
                text: "Unemployment rate in percentage"
            },             
        }); // chart.yAxis[0].update
        chart.yAxis[1].update({
            labels: {
                enabled: true,
                format: '{value} hours/year',
            },
            title: {
                text: 'Hours of sunshine per year',
                style: {
                color: Highcharts.getOptions().colors[1]
                },
            },
        }); // end chart.yAxis[1].update
        // update the tooltip on the entire chart
        chart.update({
             tooltip: {
                shared: true
            }
        }); //end chart.update
    } // end else if ("two")
}); // end nr_axes clicked