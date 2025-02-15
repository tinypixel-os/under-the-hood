import { RESERVED_KEYWORDS, Token } from "./types/Token";
import { getToken, isAlphabet, isInteger, isSingleCharacterToken, isSkippable } from "./utils/utils";

// let x = 45;
// [ LetToken, IdentifierToken, EqualsToken, NumberToken, SemicolonToken];

// Convert the source code into array of tokens
export function tokenize(sourceCode: string): Token[] {
    let tokens: Token[] = [];
    let currentToken = "";

    for (let i = 0; i < sourceCode.length; i++) {
        let char = sourceCode[i];
        
        if (isSingleCharacterToken(char)) {
             // Eg: (, ), +, -, *, /
            if (currentToken) {
                pushLastToken(currentToken, tokens);
                currentToken = "";
            }

            if (isSkippable(char)) {
                // We don't want to include spaces, tabs, and new lines in our tokens
                continue;
            }
            tokens.push(getToken(char));
        } else if (isInteger(char) || isAlphabet(char)) {
            // Multi character token
            // Eg: let, 45, name, <=, >=, ==, etc.

            // Append the character to the current token
            // let => l => le => let
            currentToken += char;
        } else {
            console.log(`Unexpected character: ${char}`);
        }
    }

    if (currentToken) {
        pushLastToken(currentToken, tokens);
        currentToken = "";
    }

    tokens.push(getToken('EOF'))
    console.log('Tokens \n', tokens);
    return tokens;
}

// Push the last found token into the tokens array
function pushLastToken(currentToken: string, tokens: Token[]): void {
    if (RESERVED_KEYWORDS[currentToken]) {
        tokens.push({
            value: currentToken,
            type: RESERVED_KEYWORDS[currentToken]
        });
    } else {
        tokens.push(getToken(currentToken));
    }
}

// console.log(tokenize("let x = 45 + (2 * 3)"));
/**
  [
    { value: 'let', type: 11 },
    { value: 'x', type: 0 },
    { value: '=', type: 1 },
    { value: '45', type: 2 },
    { value: '+', type: 7 },
    { value: '(', type: 5 },
    { value: '2', type: 2 },
    { value: '*', type: 9 },
    { value: '3', type: 2 },
    { value: ')', type: 6 }
  ]
**/