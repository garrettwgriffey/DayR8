export default {
    predict: function (dataObject, days) {
        console.log(dataObject, days)
        let zeroes, ones, twos, threes, fours, fives, sixes, sevens, eights
        zeroes = ones = twos = threes = fours = fives = sixes = sevens = eights = []
        let arraysObject = []
        let zeroPercentage, onePercentage, twoPercentage, threePercentage, fourPercentage, fivePercentage, sixPercentage, sevenPercentage, eightPercentage, rate = 0
        let percentagesArray = [zeroPercentage, onePercentage, twoPercentage, threePercentage, fourPercentage, fivePercentage, sixPercentage, sevenPercentage, eightPercentage]
        
        let consolidateArrays = (zeroesArray, onesArray, twosArray, threesArray, foursArray, fivesArray, sixesArray, sevensArray, eightsArray) => {
            arraysObject.push(zeroesArray, onesArray, twosArray, threesArray, foursArray, fivesArray, sixesArray, sevensArray, eightsArray)
            return arraysObject
        }

        let getPercentages = (days) => {
            console.log(arraysObject)
            rate = 100/days;
            for(var i=0;i<arraysObject.length;i++) {
                percentagesArray[i] = arraysObject[i].length * rate
                console.log(percentagesArray[i])
            }
        }
        
        for (var i=0;i<dataObject.data.length;i++) {
            switch(dataObject.data[i].emotion) {
                case 0:
                    zeroes.push(dataObject.data[i].emotion)
                break;
                case 1:
                    ones.push(dataObject.data[i].emotion)
                break;
                case 2:
                    twos.push(dataObject.data[i].emotion)
                break;
                case 3:
                    threes.push(dataObject.data[i].emotion)
                break;
                case 4:
                    fours.push(dataObject.data[i].emotion)
                break;
                case 5:
                    fives.push(dataObject.data[i].emotion)
                break;
                case 6:
                    sixes.push(dataObject.data[i].emotion)
                break;
                case 7:
                    sevens.push(dataObject.data[i].emotion)
                break;
                case 8:
                    eights.push(dataObject.data[i].emotion)
                break;
                default:
                    console.log("switch")
                break;
            }
        };
        consolidateArrays(zeroes, ones, twos, threes, fours, fives, sixes, sevens, eights, days);
        getPercentages(days);
        console.log(percentagesArray)
        console.log(arraysObject);
    }
}