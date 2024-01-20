// to calculate mean
// Mean = list of numbers is the average, calculated by taking the sum of all numbers and dividing that by the count of numbers.
// .reduce() method implementation = To sum up every element in array;

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

// to calculate median
// Median = a list of numbers is the number that appears in the middle of the list, when sorted from least to greatest.
// .slice() method = to create a new array so it can be mutated without mutating the real array

// .sort() method implementation = to sort all numbers in array from least to greatest.
// The comparison function subtracts b from a. If the result is a negative number, it means a should be placed before b in the sorted array.
// If the result is a positive number, it means b should be placed before a. If the result is zero, the order of a and b remains unchanged.
const getMedian = (array) => {
    const sorted = array.slice().sort((a, b) => a - b);
    const median =
        array.length % 2 === 0
        ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
        : sorted[Math.floor(array.length / 2)];
    return median;
}

// to calculate the mode
// Mode = The mode of a list of numbers is the number that appears most often in the list.
// .forEach() to loop every element and do some function on it
// .size() to get the size of the array
const getMode = (array) => {
    const counts = {};
    array.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
    })
    // make a new set of counts array and check if the size is 1, if all numbers in array just have 1 size, then there is no mode.
    if (new Set(Object.values(counts)).size === 1) {
        return null;
    }
    // sorts the keys in descending order based on their corresponding values in the counts object.
    const highest = Object.keys(counts).sort(
        (a, b) => counts[b] - counts[a]
    )[0];
    // checks if the value in the counts object for each key is equal to the value associated with the highest key.
    const mode = Object.keys(counts).filter(
        (el) => counts[el] === counts[highest]
    );
    // concatenates the elements of the array into a string, with each element separated by a comma and a space.
    return mode.join(", ");
}

// to get the range
// Range = the difference between the largest and smallest numbers in the list.
const getRange = (array) => {
    // The elements of the array are spread as individual arguments
    return Math.max(...array) - Math.min(...array);
}

// to get the variance
// Variance = measures how far the values are from the mean, on average.
const getVariance = (array) => {
    const mean = getMean(array);
    // .reduce() is a reducer function with an initial value (0 in this case). 
    // The reducer function is executed for each element of the array, and it accumulates the sum of squared differences.
    const variance = array.reduce((acc, el) => {
        const difference = el - mean;
        const squared = difference ** 2;
        return acc + squared;
    }, 0) / array.length;
    
    return variance;
}

// to get the standard deviation 
// Standard Deviation = the square root of the variance.
const getStandardDeviation = (array) => {
    const variance = getVariance(array);
    // using math library to square the variance
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}

const calculate = () => {
    const value = document.querySelector("#numbers").value;
    // regex to split string with specific pattern
    const array = value.split(/,\s*/g);
    // filter the array, if it is not NaN -> insert it to the numbers variable
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);

    document.querySelector("#mean").textContent = mean;
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;
}