//first we need to get all the columns
var colrequest = new XMLHttpRequest;
var columns;
colrequest.onreadystatechange = function() {
    if (colrequest.readyState == 4){
//        console.log(colrequest.responseText);
        var res = colrequest.responseText;
        checkcontent(columns, res);
    }
}
colrequest.open("GET", "./data/columns.txt", false);

function checkcontent(columns, data){
    console.log("data: ");
    console.log(data);
    var column = JSON.parse(data);
    columns = column;
};
var colstring = JSON.stringify(columns);
localStorage.setItem("columns", colstring);
