import readline from "readline";
import Parser from "./frontend/parser"; // Ensure the correct import path

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    const parser = new Parser();

    function promptUser() {
        rl.question("> ", (input) => {
            if (!input || input === "exit") {
                rl.close();
                return;
            }

            const ast = parser.produceAST(input);
            console.log('AST \n', JSON.stringify(ast, null, 2));

            promptUser(); // Ask again
        });
    }

    promptUser();
}

main();

// > 5 * 2 + 1
// {
//     "type": "Program",
//     "body": [
//       {
//         "type": "BinaryExpression",
//         "operator": "+",
//         "left": {
//           "type": "BinaryExpression",
//           "operator": "*",
//           "left": {
//             "type": "NumberLiteral",
//             "symbol": 5
//           },
//           "right": {
//             "type": "NumberLiteral",
//             "symbol": 2
//           }
//         },
//         "right": {
//           "type": "NumberLiteral",
//           "symbol": 1
//         }
//       }
//     ]
//   }
