// test-module-1.js: Defines a simple Calculator class and exports it as module.exports
// - Used from module.js to show module.exports require and instance usage
// - Contains add, multiple, divide methods

// class Calculator {
//     add (a, b) {
//         return a + b;
//     }
//     multiple (a, b) {
//         return a * b;
//     }

//     divide (a, b) {
//         return a / b;
//     }
// }


// module.exports = Calculator;



module.exports = class  {
    add (a, b) {
        return a + b;
    }
    multiple (a, b) {
        return a * b;
    }

    divide (a, b) {
        return a / b;
    }
}
