import React from 'react';
import {Text, View} from 'react-native';

const PatternPrinting = () => {
  for (let i = 1; i <= 5; i++) {
    let row = '*'.repeat(i);
    console.log(row);
  }

  for (let i = 5; i >= 1; i--) {
    let row1 = '*'.repeat(i);
    console.log(row1);
  }

  //   const n = 5;
  //   for (let i = 1; i <= n; i++) {
  //     let row = '';
  //     for (let j = 1; j <= n; j++) {
  //       if (i === 1 || i === n || j === 1 || j === n) {
  //         row += '*';
  //       } else {
  //         row += ' ';
  //       }
  //     }
  //     console.log(row);
  //   }

  //   const n = 3;
  // for (let i = 1; i <= n; i++) {
  //   let row = " ".repeat(n - i) + "*".repeat(2 * i - 1);
  //   console.log(row);
  // }

  // for (let i = n - 1; i >= 1; i--) {
  //   let row = " ".repeat(n - i) + "*".repeat(2 * i - 1);
  //   console.log(row);
  // }

  // const n = 5;

  // const printRow = (spaces, stars) => {
  //   let row = " ".repeat(spaces);
  //   for (let i = 1; i <= stars; i++) {
  //     if (i === 1 || i === stars) {
  //       row += "*";
  //     } else {
  //       row += " ";
  //     }
  //   }
  //   console.log(row);
  // };

  // for (let i = 1; i <= n; i++) {
  //   printRow(n - i, 2 * i - 1);
  // }

  // for (let i = n - 1; i >= 1; i--) {
  //   printRow(n - i, 2 * i - 1);
  // }

  // const n = 5;
  // for (let i = 1; i <= n; i++) {
  //   let row = " ".repeat(n - i);
  //   if (i === n) {
  //     row += "*".repeat(2 * i - 1);
  //   } else {
  //     row += "*";
  //     if (i > 1) {
  //       row += " ".repeat(2 * i - 3) + "*";
  //     }
  //   }
  //   console.log(row);
  // }

  console.log("----------------")

  function butterflyPattern(n) {
    for (let i = 1; i <= n; i++) {
      let row = '';

      for (let j = 1; j <= i; j++) {
        row += '*';
      }

      let spaces = 2 * (n - i);
      for (let j = 1; j <= spaces; j++) {
        row += ' ';
      }

      for (let j = 1; j <= i; j++) {
        row += '*';
      }

      console.log(row);
    }

    for (let i = n - 1; i >= 1; i--) {
      let row = '';

      for (let j = 1; j <= i; j++) {
        row += '*';
      }

      let spaces = 2 * (n - i);
      for (let j = 1; j <= spaces; j++) {
        row += ' ';
      }

      for (let j = 1; j <= i; j++) {
        row += '*';
      }

      console.log(row);
    }
  }

  butterflyPattern(5);

  console.log("----------------")


  return <View></View>;
};

export default PatternPrinting;
