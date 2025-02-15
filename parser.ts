import { Statement, Program, Expression, BinaryExpression, NumberLiteral, Identifier } from './abstract-syntax-tree';
import { tokenize } from './lexer';
import { Token, TokenType } from './types/Token';

export default class Parser {
    private tokens: Token[] = [];

    private notEOF(): boolean {
        return this.tokens[0].type !== TokenType.EOF;
    }

    private at() {
        return this.tokens[0] as Token;
    }

    private next() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
        }

        return prev;
    }

    private parseStatement(): Statement {
        return this.parseExpression();
    }

    // Orders Of Prescidence
    // AdditiveExpr
    // MultiplicitaveExpr
    // PrimaryExpr

    private parseExpression(): Expression {
        return this.parseAdditiveExpression();
    }

    private parseAdditiveExpression(): Expression {
        let left = this.parseMultiplicativeExpression();

        while (this.at().type === TokenType.AddToken || this.at().type === TokenType.MinusToken) {
            const operator = this.next().value;
            const right = this.parseMultiplicativeExpression();

            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            } as BinaryExpression;
        }

        return left;
    }

    private parseMultiplicativeExpression(): Expression {
        let left = this.parsePrimaryExpression();

        while (this.at().type === TokenType.MultiplyToken || this.at().type === TokenType.DivideToken) {
            const operator = this.next().value;
            const right = this.parsePrimaryExpression();

            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            } as BinaryExpression;
        }

        return left;
    }

    private parsePrimaryExpression(): Expression {
        const token = this.at().type;

        switch (token) {
            case TokenType.IdentifierToken:
                return { type: "Identifier", symbol: this.next().value } as Identifier;
            case TokenType.NumberToken:
                return { type: "NumberLiteral", symbol: parseFloat(this.next().value) } as NumberLiteral;
            // Grouping Expressions
            case TokenType.OpenParenToken: {
                this.next(); // eat the opening paren
                const value = this.parseExpression();
                this.expect(
                    TokenType.CloseParenToken,
                    "Unexpected token found inside parenthesised expression. Expected closing parenthesis.",
                ); // closing paren
                return value;
            }
            default:
                console.error('Unexpected token', this.at());
                // Trick the complier for TS
                return {} as Statement;
        }
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        // Program is array of statements
        const program: Program = {
            type: "Program",
            body: []
        }

        // Stop parsing when end of file is reached
        while (this.notEOF()) {
            program.body.push(this.parseStatement());
        }

        return program;
    }
}