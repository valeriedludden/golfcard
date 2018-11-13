
let courseCollection;
let numPlayers = 5;
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
                $('.teeSelect').append('<option value="' + i + '">' + teeArray[i].teeType + '</option>')
                console.log(" tee type is... "+ teeArray[i].teeType + " and i is .. " + i);
            }
            //pickTee()
            buildCard();
            let teeValue = $("#teeChoice").val();
            loadYards(teeValue);
            // loadPar();
            console.log("The tee type is..");
        }
    };
    xhttp.open('GET', 'http://golf-courses-api.herokuapp.com/courses/' + courseid, true);
    xhttp.send();
}

function pickTee(tee){
    // let teeVal;
    // switch(tee){
    //     case "pro":
    //         teeVal = 1;
    //         break;
    //     case "champion":
    //         teeVal = 2;
    //         break;
    //     case "men":
    //         teeVal = 3;
    //         break;
    //     case "women":
    //         teeVal = 4;
    //         break;
    // let teeVal;
    //
    // for (let i = 0; i < myCourse.data.holes[0].teeBoxes.length; i++) {
    //     if (myCourse.data.holes[0].teeBoxes[i] === tee)
    //         teeVal = i;


        //console.log("the tee picked is number " + tee);
        //console.log("the tee name is " + myCourse.data.holes[0].teeBoxes[tee]);
        //console.log("the tee name is " + myCourse.data.holes[0].teeBoxes[tee].teeType);
        //console.log("the par tee is " + myCourse.data.holes[0].teeBoxes[tee].par);
        //console.log("teeVal is " + teeVal);
    // for(let i = 1; i <= numHoles; i++){
    //     let yardArray = myCourse.data.holes[i-1].teeBoxes[tee];
    //     $('#col' + i).append("<div class='yards' id='yards" + "i" + i + "'>" + yardArray.yards + "</div>");
    // }
    buildCard();
    }

function buildCard(){
    for (let i = 1; i <= numHoles; i++){
        $('.card').append("<div id='col" + i + "' class='column'>" + i + "</div>")
    }
    //loadYards();
buildParBox();
    //loadPar();
    //pickTee(tee);
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
function buildParBox(){
    for(let i = 1; i <= numHoles; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#col' + i).append("<div class='par' id='par" + "i" + i + "'>" + parArray.par + "</div>");
    }
}

function loadPar(){
    // //orginaial
    //     for(let i = 1; i <= numHoles; i++){
    //     let parArray = myCourse.data.holes[i-1].teeBoxes[0];
    //     $('#col' + i).append("<div class='par' id='par" + "i" + i + "'>" + parArray.par + "</div>");
    // }

    //new
    for(let i = 1; i <= numHoles; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#par' + i).val = parArray.par;
    //console.log(parArray.par);
    }
}

function loadYards(tee) {
    console.log(" the tee value " + tee);
    for(let i = 1; i <= numHoles; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[tee];
        $('#col' + i).append("<div class='yards' id='yards" + "i" + i + "'>" + yardArray.yards + "</div>");
    }

    loadPar();
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