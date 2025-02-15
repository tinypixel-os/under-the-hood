export type NodeType = "Program" | "VariableDeclaration" | "BinaryExpression" | "Identifier" | "NumberLiteral";

// We don't expect statement to return a value.
// Eg. let x = 45; returns undefined.
export interface Statement {
    type: NodeType;
}

// A program is just an array of statements
export interface Program extends Statement {
    type: "Program";
    body: Statement[];
}

export interface Expression extends Statement {}

// We expect expression to return a value.
// Eg: age = 23; returns 23.

export interface BinaryExpression extends Expression {
    type: "BinaryExpression";
    operator: string; // Eg: +, -, *, /
    left: Expression;
    right: Expression;
}

export interface Identifier extends Expression {
    type: "Identifier";
    symbol: string; // Eg: name, age, x, y
}

export interface NumberLiteral extends Expression {
    type: "NumberLiteral";
    symbol: number; // Eg: 45, 23, 2
}

// Note: Statement is a superset of Expression.
// Statement
// - variable declaration
// - function declaration
// - try/catch blocks
// - while loops

// Expression
// - 