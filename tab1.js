// var tab1 = document.getElementById("table1");

// var referenceNode = tab1.getElementsByTagName("caption")[0];

//création d'un nouveau div avec graph pour insérer le graphique
var referenceNode = document.getElementsByTagName("h3")[0];
var newNode = document.createElement("canvas");
newNode.setAttribute("id", "graph1");

referenceNode.after(newNode);


//création du graphique

var tab1 = document.getElementById("table1");

//pays (label)
var tab_pays = [];
var nb_pays = 35 + 2; // 2 = index de départ

for(let i = 2; i<nb_pays; i++){
    //tr, on obtient le pays par row
    let tab1_tr = tab1.getElementsByTagName("tr")[i];
    let tab1_td = tab1_tr.getElementsByTagName("td")[0];

    tab_pays.push(tab1_td.innerHTML);
}

//axe axis (labels)
var tab_annee = [];
let nb_annee = 11 + 2;

for(let i = 2; i< nb_annee; i++){
    let annee_tr = tab1.getElementsByTagName("tr")[1];
    let annee_td = annee_tr.getElementsByTagName("th")[i];
    
    tab_annee.push(annee_td.innerHTML);
}

//data (tableau contenant la liste des crimes par index)
var array_list_crime = [];
let crime_per_year = 12;

for( let i=2; i<nb_pays; i++){
    let pays_tr = tab1.getElementsByTagName("tr")[i];
    
    var list_crime = [];
    
    for(let n=1; n<crime_per_year; n++){
        let crime = pays_tr.getElementsByTagName("td")[n]
        let string_crime = crime.innerHTML;

        if(string_crime != ":"){
            let float_crime = string_crime.replace(/,/g, ".");
            list_crime.push(parseFloat(float_crime));
        }
        else
            list_crime.push(0);

    }
    array_list_crime.push(list_crime);
}

// var tab_label = [];

// for(const [key, value] of Object.entries(obj_keyPays_valueCrime)){
//     var obj_line_properties = {
//         label : "",
//         data : []
//     };
//     obj_line_properties.label = `${key}`;
//     obj_line_properties.data = `${value}`;
//     // obj_line_properties.data.map(elem=> parseInt(elem, 10))

    
//     tab_label.push(obj_line_properties);
// }

// console.log(parseInt(tab_label[0].data))


//axe ordonnée (datasets)
var array_labelAndData = [];

for(index in tab_pays){
    var obj_line_properties = {
        label : "",
        data : [],
        borderColor : "rgba(255, 0, 0, 0.4)",
        hoverBorderWidth : 19,
        borderWidth : 7,
        tension : 0.1
    };

    obj_line_properties.label = tab_pays[index];
    obj_line_properties.data = array_list_crime[index];
    obj_line_properties.borderColor = "#" + Math.floor(Math.random()*16777215).toString(16);

    array_labelAndData.push(obj_line_properties);
}




var ctx = document.getElementById("graph1").getContext("2d");
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: tab_annee,
        datasets: array_labelAndData
    },


    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Crimes (in thousand) per country'
          }
        }
      },
});