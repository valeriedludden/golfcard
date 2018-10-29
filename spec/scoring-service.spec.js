let ScoringService = require("../js/js"); // get information from js file


describe('ScoringService', () =>{

    let scoringService;
    beforeEach(() => {
        scoringService = new ScoringService;
    });

    describe('calculateScoreRelativeToPar', () =>{


        it('calculates score under par score correctly', () =>{
            let par = 72;
            let playerScore = Array(18).fill(3, 0, 18); //make an array with 18 slots and fill all of them with 3
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScore);
            expect(scoreRelativeToPar).toEqual(-18);

        });
        it('calculates score over par score correctly', () =>{
            let par = 72;
            let playerScore = Array(18).fill(5, 0, 18); //make an array with 18 slots and fill all of them with 3
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScore);
            expect(scoreRelativeToPar).toEqual(18);

        });
        it('returns a number', () => {
            let par = 72;
            let playerScore = Array(18).fill(3, 0, 18); //make an array with 18 slots and fill all of them with 3
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScore);
            expect(typeof scoreRelativeToPar).toEqual('number');
        });
        it('calculates even when no scores', () => {
            let par = 72;
            let playerScore = Array(18); //make an array with 18 slots and fill all of them with 3
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScore);
            expect(scoreRelativeToPar).toEqual(-72);
        });

    });
    describe('calculateOutScore', () => {
        it('returns a number', () => {

        });
    });
    describe('calculateInScore', () => {
        it('returns a number', () => {

        });
    });
    describe('calculateTotalScore', () => {
        it('returns a number', () => {

        });
    });

})