import { Token, TokenType } from "../types/Token";

export const isSingleCharacterToken = (char: string): boolean => {
    return ['(', ')', '+', '-', '*', '/', '=', ' '].includes(char);
}

export const getTokenType = (token: string): TokenType => {
    // Single character tokens
    if (token === '=') {
        return TokenType.EqualsToken;
    } else if (token === ';') {
        return TokenType.SemicolonToken;
    } else if (token === '(') {
        return TokenType.OpenParenToken;
    } else if (token === ')') {
        return TokenType.CloseParenToken;
    } else if (token === '+') {
        return TokenType.AddToken;
    } else if (token === '-') {
        return TokenType.MinusToken;
    } else if (token === '*') {
        return TokenType.MultiplyToken;
    } else if (token === '/') {
        return TokenType.DivideToken;
    } else if (token === ' ') {
        return TokenType.WhitespaceToken;
    } 
    // Multi character tokens
    else if (!isNaN(Number(token))) {
        return TokenType.NumberToken;
    } else if (token === 'let') {
        return TokenType.LetToken;
    } else {
        return TokenType.IdentifierToken;
    }
}

export const getToken = (char: string): Token => {
    return {
        value: char,
        type: getTokenType(char)
    }
}

export const isInteger = (str: string): boolean => {
    return /^\d+$/.test(str);
}

export const isAlphabet = (str: string): boolean => {
    return /^[a-zA-Z]+$/.test(str);
}

export const isSkippable = (char: string): boolean => {
    return char === ' ' || char === '\n' || char === '\t';
}