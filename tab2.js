var referenceNode = document.getElementsByTagName("h4")[2];
var newNode = document.createElement("canvas");
newNode.setAttribute("id", "graph2");

referenceNode.after(newNode);


var tab2 = document.getElementById("table2");

const nb_pays2 = 31;

var array_labels_pays = [];
var array_label_homicide_2007 = [];
var array_label_homicide_2010 = [];
var array_color = [];


for(let i=1; i< nb_pays2; i++){
    let tab2_tr = tab2.getElementsByTagName("tr")[i];
    var tab2_td = tab2_tr.getElementsByTagName("td")[0];

    array_labels_pays.push(tab2_td.innerHTML);
}

for(let i=1; i< nb_pays2; i++){
    let tab2_tr = tab2.getElementsByTagName("tr")[i];
    var tab2_td = tab2_tr.getElementsByTagName("td")[1];

    array_label_homicide_2007.push(tab2_td.innerHTML);
}

for(let i=1; i< nb_pays2; i++){
    let tab2_tr = tab2.getElementsByTagName("tr")[i];
    var tab2_td = tab2_tr.getElementsByTagName("td")[2];

    array_label_homicide_2010.push(tab2_td.innerHTML);
}

var ctx = document.getElementById("graph2").getContext("2d");

var data = {
    labels : array_labels_pays,
    datasets : [
        {
            label : "2007",
            backgroundColor : "rgba(255, 0, 0, 0.4)",
            data : array_label_homicide_2007
        },
        {
            label : "2010",
            backgroundColor : "rgba(0, 0, 255, 0.4)",
            data : array_label_homicide_2010
        }
    ]
}

var options = {
    responsive : true
}

var config = {
    type : "bar",
    data : data,
    options : options
}

var graph2 = new Chart(ctx, config)