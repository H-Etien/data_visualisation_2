var referenceNode = document.getElementsByTagName("h1")[0];
var newNode = document.createElement("canvas");
newNode.setAttribute("id", "ajax_canvas");

referenceNode.after(newNode);

var last_nb_from_array_X = 0;
var nb_ajouter_inc_array_X = 0;

function get_array_from_AJAX (str){
    
    array_X = [];
    array_Y = [];

    str = str.replaceAll("[", "");
    str = str.replaceAll("]", "");
    str = str.split(",");
    
    
    array_X.push(str[0]);
    let index = 1;
    while(index < str.length){
        if(index%2 == 0)
        array_X.push(str[index]);
        else
        array_Y.push(str[index]);
        index++;
    }

    last_nb_from_array_X = array_X[array_X.length-1];
    nb_ajouter_inc_array_X += parseInt(last_nb_from_array_X);
    console.log(nb_ajouter_inc_array_X)
}

function addData(chart, array_X, array_Y) {
    
    array_X.forEach(element => {
        chart.data.labels.push(parseInt(element) + nb_ajouter_inc_array_X);
    });

    array_Y.forEach(element_Y => {
        chart.data.datasets[0].data.push(element_Y)
    })

    chart.update();

}

function updateChart(){
    setTimeout(() => {

        //get value from AJAX server
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let donnee = this.response;
        
                get_array_from_AJAX(donnee); 
                
            }
        }
            
        xhr.open("POST", "https://canvasjs.com/services/data/datapoints.php", true);
        xhr.send();




        addData(ajax, array_X, array_Y);

        updateChart();

    }, 1000);
}


var ctx = document.getElementById("ajax_canvas").getContext("2d");
var xhr = new XMLHttpRequest(); 

var array_X = [];
var array_Y = [];



var data = {
    labels : array_X,
    datasets : [
        {
            label : "AJAX graphique",
            borderColor : "rgba(0, 255, 0, 0.4)",
            pointBorderColor : "rgba(0, 0, 255, 0.4)",
            data : array_Y
        }
    ]
}

var options = {
    responsive : true
}

var config = {
    type : "line",
    data : data,
    options : options
}

var ajax = new Chart(ctx, config);


updateChart();