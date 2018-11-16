
let courseCollection;
let numPlayers;
let numHoles = 18;

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
                $('.teeSelect').append('<option value="' + i + '">' + teeArray[i].teeType + '</option>');
                console.log(" tee type is... "+ teeArray[i].teeType + " and i is .. " + i);
            }
            numPlayers = $(".players").val();
            buildCard();
            console.log("the number of players is " + numPlayers);
        }
    };
    xhttp.open('GET', 'http://golf-courses-api.herokuapp.com/courses/' + courseid, true);
    xhttp.send();
}

function buildCard(){
    numPlayers = $(".players").val();
    console.log("build card numPlayers is .." + numPlayers);
    $('.card').append("<div class='column' id='col0'><div>Hole</div><div>Yards</div><div>Par</div><div>Handicap</div></div>");
    for (let i = 1; i <= numHoles; i++){
        $('.card').append("<div id='col" + i + "' class='column'>" + "<div>" + i + "</div></div>");
    }
    for(let p = 1; p <= numPlayers; p++){
        $('#col0').append("<div>Player " +  p + "</div>");
    }
    let teeValue = $("#teeChoice").val();
    cardBoxes();
    addHoles();
    buildInScore();
    buildTotalScore();
}

function addHoles(){

    for(let p = 1; p <= numPlayers; p++){
        for(let h = 1; h <= numHoles; h++){
            $('#col' + h).append("<input type='text' class='hole' id='p" + p +"h" + h + "'>");
        }
    }
}
function cardBoxes(){
    for(let i = 1; i <= numHoles; i++){
        $('#col' + i).append("<div class='yards' id='yards" + i + "'></div>");
        $('#col' + i).append("<div class='par' id='par" + i + "'></div>");
        $('#col' + i).append("<div class='handicap' id='hand" + i + "'></div>");
    }
}

function loadPar(){

    for(let i = 1; i <= numHoles; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#par' + i).html(""+ parArray.par+"");
    }
}
function buildOutScore(){
    $("#col9").append("<div class='column' id='outScore'><div>Out</div></div>");
    let n = 2;
    let squaresNeeded = n + Number(numPlayers);
    for(let i = 0; i < squaresNeeded; i++){
        $("#outScore").append("<div>value</div>")
    }
}

function buildInScore(){
    $(".card").append("<div class='column' id='inScore'><div>In</div></div>");
    let n = 2;
    let squaresNeeded = n + Number(numPlayers);
    for(let i = 0; i < squaresNeeded; i++){
        $("#inScore").append("<div>value</div>")
    }
}
function buildTotalScore(){
    $(".card").append("<div class='column' id='totalScore'><div>Total</div></div>");
    let n = 2;
    let squaresNeeded = n + Number(numPlayers);
    console.log("squaresNeeded = " + squaresNeeded);
    console.log("numPlayers = " + numPlayers);
    for(let i = 0; i < squaresNeeded; i++){
        $("#totalScore").append("<div>value</div>")
    }
}
function loadHandicap(){
    for(let i = 1; i <= numHoles; i++){
        let handArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#hand' + i).html(""+ handArray.hcp + "");
        //console.log(parArray.par);
    }
}

function loadYards(tee) {
    console.log(" the tee value " + tee);
    for(let i = 1; i <= numHoles; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[tee];
        $('#yards' + i).html(""+ yardArray.yards +"");
    }
    loadPar();
    loadHandicap();
}

// function loadHandicap() {
//
// }

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
// to have the tee value to use anywhere, make a global vairable globaltee and use this function
// function chooseTee(teevalue){
//     gloabal tee = teevalue;
//     buildCard();
// }
