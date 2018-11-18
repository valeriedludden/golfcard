
let courseCollection;
let numPlayers;
let numHoles = 18;
let myCourse;
let modalId;

(function(){
    loadDoc();
})();

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            courseCollection = JSON.parse(this.responseText);

            for(let i = 0; i < courseCollection.courses.length; i++){
                $('.courseSelect').append('<option value="' + courseCollection.courses[i].id + '">'+ courseCollection.courses[i].name +'</option>')
            }
        }
    };
    xhttp.open('GET', 'http://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}

function loadCourse(courseid){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);

            let teeArray = myCourse.data.holes[0].teeBoxes;
            for (let i = 0; i < teeArray.length; i++) {
                $('.teeSelect').append('<option value="' + i + '">' + teeArray[i].teeType + '</option>');
            }
            numPlayers = $(".players").val();
            buildCard();
        }
    };
    xhttp.open('GET', 'http://golf-courses-api.herokuapp.com/courses/' + courseid, true);
    xhttp.send();
}

function buildCard(){

    numPlayers = $(".players").val();

    //Heading columns
    $('.card').append("<div class='column' id='col0'><div>Hole</div><div>Yards</div><div>Par</div><div>Handicap</div></div>");

    //build first 9 holes
    for (let i = 1; i <= 9; i++){
        $('.card').append("<div id='col" + i + "' class='column'>" + "<div>" + i + "</div></div>");
    }
    //builds the player scores depending on how many players
    for(let p = 1; p <= numPlayers; p++){
        $('#col0').append("<input type='text' placeholder='Player " + p + "' class='player' id='player" + p +"'>");
    }
    //Insert Out Score
        $('.card').append("<div id='colOut' class='column'>" + "<div>" + 'Out' + "</div></div>");
        $('#colOut').append("<div id='outYardsTotal'></div><div id='outParTotal'></div><div id='outHandicapTotal'></div>");
        for(let o = 1; o <= numPlayers; o++){
            $('#colOut').append("<div class='playerOutTotal' id='Out"+ o +"'></div>");
        }

    //Builds the last 9 holes
    for (let i = 10; i <= numHoles; i++){
        $('.card').append("<div id='col" + i + "' class='column'>" + "<div>" + i + "</div></div>");
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
            $('#col' + h).append("<input type='text' onchange='addScore(this.value, this.id)'  class='hole' id='p" + p +"h" + h + "'>");
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

function buildInScore(){
    $(".card").append("<div class='column' id='inScore'><div>In</div></div>");
    let n = 2;
    let squaresNeeded = n + Number(numPlayers);
    for(let i = 0; i <= squaresNeeded; i++){
        $("#inScore").append(`<div id='in${i}'></div>`)
    }
}
function addParTotal(){
    let sumTotal = 0;
    for(let i = 1; i <= numHoles; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumTotal += parArray.par;
    }
    $('#total1').html(sumTotal);

    let sumOut = 0;
    for(let i = 1; i <= 9; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumOut += parArray.par;
    }
    $('#outParTotal').html(sumOut);

    let sumIn = 0;
    for(let i = 10; i <= numHoles; i++){
        let parArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumIn += parArray.par;
    }
    $('#in1').html(sumIn);
}
function buildTotalScore(){
    $(".card").append(`<div class='column' id='totalScore'><div>Total</div></div>`);
    let n = 3;
    let squaresNeeded = n + Number(numPlayers);
    for(let i = 0; i < squaresNeeded; i++){
        $("#totalScore").append(`<div id='total${i}'></div>`);
    }
}
function loadHandicap(){
    for(let i = 1; i <= numHoles; i++){
        let handArray = myCourse.data.holes[i-1].teeBoxes[0];
        $('#hand' + i).html(""+ handArray.hcp + "");
    }
}
function addHandicapTotal(){
    let sumTotal = 0;
    for(let i = 1; i <= numHoles; i++){
        let handArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumTotal += handArray.hcp;
    }
    $('#total2').html(sumTotal);

    let sumOut = 0;
    for(let i = 1; i <= 9; i++){
        let handArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumOut += handArray.hcp;
    }
    $('#outHandicapTotal').html(sumOut);

    let sumIn = 0;
    for(let i = 10; i <= numHoles; i++){
        let handArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumIn += handArray.hcp;
    }
    $('#in2').html(sumIn);
}
function addYardTotal(){
    let sumTotal = 0;
    for(let i = 1; i <= numHoles; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumTotal += yardArray.yards;
    }
    $('#total0').html(sumTotal);

    let sumOut = 0;
    for(let i = 1; i <= 9; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumOut += yardArray.yards;
    }
    $('#outYardsTotal').html(sumOut);

    let sumIn = 0;
    for(let i = 10; i <= numHoles; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[0];

        sumIn += yardArray.yards;
    }
    $('#in0').html(sumIn);
}

function loadYards(tee) {
    for(let i = 1; i <= numHoles; i++){
        let yardArray = myCourse.data.holes[i-1].teeBoxes[tee];
        $('#yards' + i).html(""+ yardArray.yards +"");
    }

    loadPar();
    loadHandicap();
    addParTotal();
    addYardTotal();
    addHandicapTotal();
    hide();

}

function getSum(total, num) {
    return total + num;
}
function addScore(score, id){

    let holeScore = score;
    let playerString = id;
    let pId = Number(playerString.slice(1,2));
    let scoreArray1 = [];
    let scoreArray2 = [];
    let scoreArray3 = [];
    //Total Score
    for (let i = 1; i <= numHoles; i++){
         let value = Number($(`#p${pId}h${i}`).val());
        let sum;
        scoreArray1.push(value);
        sum = scoreArray1.reduce(getSum);
        let idVar = pId + 2;
        $(`#total${idVar}`).html(sum);
    }//In Score
    for (let i = 10; i <= numHoles; i++){
        let value = Number($(`#p${pId}h${i}`).val());
        let sum;
        scoreArray2.push(value);
        sum = scoreArray2.reduce(getSum);
        let idVar = pId + 2;
        $(`#in${idVar}`).html(sum);
    }
        //Out Score
        for (let i = 1; i <= 9; i++){
            let value = Number($(`#p${pId}h${i}`).val());
            let sum;
            scoreArray3.push(value);
            sum = scoreArray3.reduce(getSum);
            $(`#Out${pId}`).html(sum);
        }
}
function hide(){
    $('.begin').css('display', 'none');
    let displayName = myCourse.data.name;
    $('.courseName').append(`<div class="name"><span>The course you are playing is</span><div class="display">${displayName}</div></div>`)
}
function checkName(name){
    // $(".player").each(function(){
    //     let namePlayer = $(this).html();
    //     if(name === namePlayer){
    //         console.log("Cant use that name");
    //     }
    //     console.log($(this).html());
    // });
    let pushName;
    let nameArray = [];
    let count = 0;
    for(let i = 1; i <= numPlayers; i++) {
        pushName = $(`#player${i}`).val();
        if(pushName != ""){
        nameArray.push(pushName);
        }
        console.log(nameArray);

        // for(let p = 1; p <= numPlayers; p++){
        //     for(let  = 1; i <= numPlayers; i++){
        //         if(playerArray[p] === playerArray[i]){
        //         }
        //     }
        // }

            if (nameArray[i + 1] === nameArray[i]) {
                    displayModal();
                }
            }
    }
function checkNumber(number, id) {
    if (number <= 0) {
        modalId = id;
        displayModal();
        $(`#${modalId}`).val('');
    }
}

    function displayModal() {
        $('.numberModal').css('display', 'flex');
    }

    function clearModal() {
        $('.numberModal').css('display', 'none');

    }