
let courseCollection;
let numPlayers = 5;
let numHoles = 18;
let teeType = pickTee();

(function(){
    loadDoc();
})();

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            courseCollection = JSON.parse(this.responseText);
            console.log(courseCollection);

            for(let i = 0; i < courseCollection.courses.length; i++){
                $('.courseSelect').append('<option value="' + courseCollection.courses[i].id + '">'+ courseCollection.courses[i].name +'</option>')
            }
        }
    };
    xhttp.open('GET', 'http://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}

let myCourse;

function loadCourse(courseid){
    console.log(courseid);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);
            console.log(myCourse);

            let teeArray = myCourse.data.holes[0].teeBoxes;
            for (let i = 0; i < teeArray.length; i++) {
                $('.teeSelect').append('<option value="' + i + '">' + teeArray[i].teeType + '</option>')
            }
            buildCard();
            // loadPar();
            console.log("The tee type is.." + teeType);
        }
    };
    xhttp.open('GET', 'http://golf-courses-api.herokuapp.com/courses/' + courseid, true);
    xhttp.send();
}

function pickTee(tee){
    console.log(tee);
   return tee;
}

function buildCard(){
    for (let i = 1; i <= numHoles; i++){
        $('.card').append("<div id='col" + i + "' class='column'>" + i + "</div>")
    }
    loadPar();
    // loadYards();
    // loadHandicap();
    addHoles();

}

function addHoles(){

    for(let p = 1; p <= numPlayers; p++){
        for(let h = 1; h <= numHoles; h++){
            $('#col' + h).append("<input type='text' class='hole' id='p" + p +"h" + h + "'>");
        }
    }

}

function loadPar(){
    for(let i = 1; i <= numHoles; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#col' + i).append("<div class='par' id='par" + "i" + i + "'>" + parArray.par + "</div>");
    }
}
function loadYards() {
    for(let i = 1; i <= numHoles; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#col' + i).append("<div class='par' id='par" + "i" + i + "'>" + parArray.par + "</div>");
    }
}

function loadHandicap() {
    
}

//to add the score

// function addScore(myid){
//     //parse the player number out oft he id, make that p
//     // need to find a way to tie it to player
//     for(let i =0; ){
//         let scoreItem =  $("#p" + p + "h" + i).val();
//         myScore += scoreItem;
//     }
//
//     return myScore;
// }