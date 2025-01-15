import React from 'react';
import {View} from 'react-native';

const ArrayMethods = () => {
  const filterArray = ['apple', 'mango', 'grape', 'pineapple'];
  const filterSize = filterArray.length;
  console.log('Array.length :', filterSize);

  const toString = filterArray.toString();
  console.log('Array.toString : ', toString);

  const atArray = filterArray.at(2); // we can use both () and [] brackets for the same.
  console.log('Array.at : ', atArray);

  const seperator = filterArray.join('*'); //It behaves just like toString(), but in addition you can specify the separator.
  console.log('Array.join :', seperator);

  const fruits = filterArray.pop(); //removes the last element from the array
  console.log('Array.pop : ', fruits);
  console.log("Popped array : ", filterArray)

  const addFruits = filterArray.push("kiwi") // adds item as the last element of the array.
  console.log("Pushed array : ", filterArray)

  const shiftArray = ['one', 'two', 'three', 'four'] // removes the first item and brings rest of the elements to lower index.
  shiftArray.shift();
  console.log("shifted Array: ", shiftArray)

  const unshiftArray = ['black', 'red', 'green', 'brown']
  unshiftArray.unshift("purple");
  console.log("Array.unshift: ", unshiftArray)

  unshiftArray[3] = "grey" // change an element in an array
  console.log("Changing elements:", unshiftArray)

   unshiftArray[unshiftArray.length]  = "green" //can add elements to the array with length
   console.log("Adding:", unshiftArray)

   const figures = ['1','2', '3', '4']
   const words = ['one', 'two','three', 'four']
   const numbers = figures.concat(words) // we can add more than 2 arrays to one array; like (arr1, arr2)
   console.log("concat:", numbers) // we can also add value using concat.

   numbers.copyWithin(2,4); //Copy to index 2, all elements from index 4
   console.log("copywith:", numbers)

   unshiftArray.copyWithin(2,0,4) // Copy to index 2, the elements from index 0 to 4
   console.log('copywith', unshiftArray)
// copywithin -  actually rewrites the data; it neither add nor changes the length of the data.

const myArray = [[1,2],[3,4],[5,6]]
const newArray = myArray.flat()
console.log("flat:", newArray)

//The splice() method adds new items to an array.
//The slice() method slices out a piece of an array.

unshiftArray.splice(2, 0, "pink", "violet") // param-2 = which position; param-0 = how many to remove
console.log("Splice: ", unshiftArray)


unshiftArray.slice(0,1) // 0- where to add new & 1- how many to remove
console.log("slice: ", unshiftArray)







  return <View></View>;
};

export default ArrayMethods;
