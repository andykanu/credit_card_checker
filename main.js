// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [4, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [3, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
//function to use Luhn's algorithm to check for valid cards.
const createCheckNum =(arr) => {
    const myLength = arr.length;
    let myArr = [];
    for (let i = myLength-1; i>=0; i-=2) {
        myArr.push(arr[i])
//double every second digit before check digit and subtract 9 if answer is >=10
    }
    for (let i = myLength -2; i >=0; i-=2) {
        if(arr[i]*2 > 9) {
            myArr.push(arr[i] * 2 - 9)
        } else {
            myArr.push(arr[i]*2)
        }
    }
    //create checknumber by adding result together
    return myArr.reduce((acc, num)=> acc+num)  
}

const validateCred =(arr) => {
    checkNum = createCheckNum(arr);
    return checkNum % 10 == 0 ? true : false;
}
//return array of invalid card #s based on array passed in. 
const findInvalidCards =(arr) => {
    let myArr = [];
    for (let i = 0; i < arr.length; i++) {
        let res = validateCred(arr[i]);
        if (res == false) {
            myArr.push(arr[i]);
        } 
    }
    return myArr;

}
//find companies with invalid card numbers. Note. Could look up externally stored list rather than hardcoding here, but this will do for the purpose of this exercise.
const idInvalidCardCompanies = (arr) => {
    const myArr = findInvalidCards(arr);
    let companyArr = [];
    for (let i =0; i < myArr.length; i++) {
        switch (myArr[i][0]) {
            case 4:
                companyArr.push('Visa');
                break;
            case 3:
                companyArr.push('Amex');
                break;
            case 5: 
                companyArr.push('MasterCard');
                break;
            case 6:
                companyArr.push('Discover');
                break;
            default:
                companyArr.push('Company not recognized')
                break;
        }
    }
//return array without duplicates
    return [...new Set (companyArr)];
}

//Function to convert valid numbers to invalid numbers
const convertToValid = (arr) => {
    const myArr = findInvalidCards(arr);
    arrToCheck = []
    for (let i = 0; i < myArr.length; i++) {
        checkNum = createCheckNum(myArr[i]) % 10;
        j = myArr[i].length -1;
        
        //checks if number greater than number at final index. If so, replace final index with 9 and fix on next loop. 
        while (checkNum > 0) {
            myArr[i][j] - checkNum <0 ? myArr[i][j] = 9: myArr[i][j] -=checkNum; 
            checkNum = createCheckNum(myArr[i]) % 10;
        }
        arrToCheck.push(myArr[i])
    }
    return arrToCheck;
}
