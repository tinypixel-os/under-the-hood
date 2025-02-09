## Mini Language Implementation
This project is an exploration of the internals of a programming language, covering:

- Tokenizer (Lexical Analysis) – Breaking source code into meaningful tokens.
- Parser – Converting tokens into an Abstract Syntax Tree (AST).
- Interpretor – Executing code directly from the AST.
- Compiler – Translating code into another form, like bytecode or machine code.

based on [Youtube playlist](https://www.youtube.com/watch?v=8VB5TY1sIRo&list=PL_2VhOvlMk4UHGqYCLWc6GO8FaPl8fQTh) from [tlaceby](https://github.com/tlaceby).
  
![flowchart](https://github.com/user-attachments/assets/3de27b2d-1910-4fd8-a51f-d82fca65469e)

Image source: [http://www.cs.man.ac.uk/~pjj/farrell/comp3.html](http://www.cs.man.ac.uk/~pjj/farrell/comp3.html)

### Getting started

Running the tokenizer
```
git clone https://github.com/tinypixel-os/under-the-hood.git
cd under-the-hood

npm install -g typescript
tsx lexer.ts
node lexer.js
```
