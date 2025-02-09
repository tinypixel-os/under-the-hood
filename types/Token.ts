export enum TokenType {
    IdentifierToken, // x
    EqualsToken, // =
    NumberToken, // 45
    SemicolonToken, // ;
    WhitespaceToken, // ' '

    OpenParenToken, // (
    CloseParenToken, // )

    AddToken, // +
    MinusToken, // -
    MultiplyToken, // *
    DivideToken, // /

    // Refer to RESERVED_KEYWORDS
    LetToken, // let
    VarToken, // var
    ConstToken, // const
    IfToken, // if
    ElseToken, // else
    ReturnToken, // return
    FunctionToken, // function
    ForToken, // for
    WhileToken, // while
}

export interface Token {
    value: string,
    type: TokenType
}

export const RESERVED_KEYWORDS: Record<string, TokenType> = {
    'let': TokenType.LetToken,
    'var': TokenType.VarToken,
    'const': TokenType.ConstToken,
    'if': TokenType.IfToken,
    'else': TokenType.ElseToken,
    'return': TokenType.ReturnToken,
    'function': TokenType.FunctionToken,
    'for': TokenType.ForToken,
    'while': TokenType.WhileToken,
}