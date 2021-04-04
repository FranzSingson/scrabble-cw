let testArr = [
    [" ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", ],
    [" ", "D", "A", "B", " ", "X", ],
    [" ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", ],
    [" ", " ", " ", " ", " ", " ", ]
];



function looper() {
    let tempArrWords = [];

    let arrWords = [];
    
    for (let y = 0; y < testArr.length; y++) {
        tempArrWords = [];
        
        for (let x = 0; testArr[y].length; x++) {
            if (testArr[y][x] !== " ") {
                tempArrWords.push(testArr[y][x])
            } else {
                arrWords.push(tempArrWords.join(''));
                tempArrWords = [];
            }

        }
    }
    console.log(arrWords);
}

looper();

