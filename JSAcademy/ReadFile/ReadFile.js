/**
 * Created by Layne_Song on 1/13/2016.
 */
var fs = require('fs');
var fileName = process.argv[2];
var readStream = fs.createReadStream(fileName.toString());
;
readStream.setEncoding('utf8');
var result = {
    lessThanThree: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    greaterThanSix: 0
};

readStream.on('open', function () {
    console.log('Start to read file');
});


readStream.on('data', function (chunk) {
    var originalString = chunk.toString();
    var wordList = originalString.trim().split(' ');
    wordList.forEach(function (word) {
        countCharacter(word);
    });

    function countCharacter(word) {
        var count = word.length;
        switch (true) {
            case (count < 3):
                result.lessThanThree = result.lessThanThree + 1;
                break;
            case  (count === 3):
                result.three = result.three + 1;
                break;
            case (count === 4):
                result.four = result.four + 1;
                break;
            case  (count === 5):
                result.five = result.five + 1;
                break;
            case (count === 6):
                result.six = result.six + 1;
                break;
            default:
                result.greaterThanSix = result.greaterThanSix + 1;
        }
    }
})

readStream.on('end', function () {
    console.log(result);
    console.log('Finish reading file');
})

readStream.on('error', function () {
    console.log('Path does not exist');
});




