/**
 * Represents the position of a token.
 */
class FilePosition {
    public index: number;
    public line: number;
    public column: number;

    constructor(index: number, line: number, column: number) {
        this.index = index;
        this.line = line;
        this.column = column;
    }

    clone(): FilePosition {
        return new FilePosition(this.index, this.line, this.column);
    }

    sized(length: number): FileRangePosition {
        return new FileRangePosition(this.index, this.index + length, this.line, this.line, this.column, this.column + length);
    }
}

/**
 * Represents the position of a sized token.
 */
class FileRangePosition {
    public startIndex: number;
    public endIndex: number;
    public startLine: number;
    public endLine: number;
    public startColumn: number;
    public endColumn: number;

    constructor(startIndex: number, endIndex: number, startLine: number, endLine: number, startColumn: number, endColumn: number) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.startLine = startLine;
        this.endLine = endLine;
        this.startColumn = startColumn;
        this.endColumn = endColumn
    }
}

/**
 * Base class for tokens
 */
abstract class Token {
    position: FileRangePosition;

    constructor(position: FileRangePosition) {
        this.position = position;
    }
}

type TokenArgConstructor<T, R> = (arg0: FileRangePosition, arg1: R) => T;
type TokenConstructor<T> = (arg0: FileRangePosition) => T;

/**
 * Builder class for tokenizers.
 */
class TokenizerBuilder<T extends Token> {
    /** @package */
    alreadyBuilt: boolean = false;
    /** @package */
    constTokens: Record<string, TokenConstructor<T>> = {};
    /** @package */
    ignoreChars: Set<string> = new Set<string>();
    /** @package */
    lineCommentStarter?: string;
    /** @package */
    blockCommentStarter?: string;
    /** @package */
    blockCommentEnder?: string;
    /** @package */
    numberToken?: TokenArgConstructor<T, number>;
    /** @package */
    stringToken?: TokenArgConstructor<T, string>;
    /** @package */
    textToken?: TokenArgConstructor<T, string>;
    /** @package */
    identifierToken?: TokenArgConstructor<T, string>;

    private throwIfBuilt() {
        if (this.alreadyBuilt) {
            throw new Error("Attempted to build tokenizer a second time!");
        }
    }

    private throwIfDefined(value: any | undefined) {
        if (value) {
            throw new Error("Attempted to set a property that was already set!");
        }
    }

    /**
     * Register a new constant token for this tokenizer.
     * @param ident String representing the constant text to match.
     * @param token The token instance to produce when the string is found.
     * @returns This
     */
    public addConstToken(ident: string, token: TokenConstructor<T>): TokenizerBuilder<T> {
        this.throwIfBuilt();

        if (ident.length > 0) {
            if (this.constTokens[ident]) throw new Error("Duplicate constant token entry.");
            this.constTokens[ident] = token;

        } else {    
            throw new Error("Constant tokens must have at least one character.");
        }

        return this;
    }

    /**
     * Register a new ignored character for this tokenizer.
     * @param ident The character to completely ignore.
     * @returns This
     */
    public addIgnoreChar(ident: string): TokenizerBuilder<T> {
        this.throwIfBuilt();

        if (ident.length == 1) {
            if (this.ignoreChars.has(ident)) throw new Error("Duplicate ignore character entry.");
            this.ignoreChars.add(ident);

        } else {
            throw new Error("Ignored characters must be length 1");
        }

        return this;
    }

    /**
     * Sets this tokenizer's line-comment starter.
     * @param match One or two character string that will begin a line comment.
     * @returns This
     */
    public setLineComment(match: string): TokenizerBuilder<T> {
        this.throwIfBuilt();
        this.throwIfDefined(this.lineCommentStarter);

        if (match.length === 1 || match.length === 2) {
            this.lineCommentStarter = match;

        } else {
            throw new Error("Line comment string must have a length of one or two.");
        }

        return this;
    }

    /**
     * Sets this tokenizer's block-comment starter and ender.
     * @param match One or two character string that will begin a line comment.
     * @returns This
     */
    public setBlockComment(start: string, end: string): TokenizerBuilder<T> {
        this.throwIfBuilt();
        this.throwIfDefined(this.lineCommentStarter);

        if (start.length === 1 || start.length === 2) {
            if (end.length === 1 || end.length === 2) {
                this.blockCommentStarter = start;
                this.blockCommentEnder = end;

            } else {
                throw new Error("Block comment end string must have a length of one or two.");
            }
        } else {
            throw new Error("Block comment start string must have a length of one or two.");
        }

        return this;
    }


    public build() {
        this.throwIfBuilt();

        return new Tokenizer<T>(this);
    }
}

/**
 * A tokenizer instance
 */
class Tokenizer<T extends Token> {
    // Settings
    private readonly constTokens: Record<string, TokenConstructor<T>>;
    private readonly lineCommentStarter?: string;
    private readonly blockCommentStarter?: string;
    private readonly blockCommentEnder?: string;
    private readonly ignoreChars: Set<string>;
    private readonly numberToken?: TokenArgConstructor<T, number>;
    private readonly stringToken?: TokenArgConstructor<T, string>;
    private readonly textToken?: TokenArgConstructor<T, string>;
    private readonly identifierToken?: TokenArgConstructor<T, string>;

    // Instance
    private currentString!: string;
    private currentPosition!: FilePosition;
    private tokens!: T[];

    /** @package */
    constructor(settings: TokenizerBuilder<T>) {
        this.constTokens = settings.constTokens;
        this.lineCommentStarter = settings.lineCommentStarter;
        this.blockCommentStarter = settings.blockCommentStarter;
        this.blockCommentEnder = settings.blockCommentEnder;
        this.ignoreChars = settings.ignoreChars;
        this.numberToken = settings.numberToken;
        this.stringToken = settings.stringToken;
        this.textToken = settings.textToken;
        this.identifierToken = settings.identifierToken;
    }

    // Unsafe, ensure hasNext() before calling
    private peek(n: number = 0): string {
        return this.currentString.charAt(this.currentPosition.index + n)
    }

    // Unsafe, ensure hasNext() before calling
    private next(): string {
        const char = this.peek();
        
        if (char === '\n') {
            this.currentPosition.line++;
            this.currentPosition.column = 1;
        } else {
            this.currentPosition.column++;
        }

        this.currentPosition.index++;
        return char;
    }

    private hasNext(n: number = 0): boolean {
        return this.currentPosition.index + n < this.currentString.length;
    }

    private nextMatches(match: string): boolean {
        if (this.hasNext(match.length)) {
            const check = this.currentString.substring(this.currentPosition.index, this.currentPosition.index + match.length);
            if (check === match) {
                this.currentPosition.index += match.length;
                this.currentPosition.column += match.length;
                return true;

            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private nextMatchesSized(match: string): FileRangePosition | undefined {
        let pos = this.currentPosition.clone();
        if (this.nextMatches(match)) {
            return pos.sized(match.length);
        } else {
            return undefined;
        }
    }

    /**
     * Tokenizes code into a TokenIterator based on this Tokenizer's settings.
     * @param code The code to tokenize
     */
    public tokenize(code: string): TokenIterator<T> {
        this.currentString = code;
        this.currentPosition = new FilePosition(0, 1, 1);
        this.tokens = [];

        while (this.hasNext()) {
            // Ignore characters
            if (this.ignoreChars.has(this.peek())) {
                this.next();
                continue;
            }

            // Single-line comments
            if (this.lineCommentStarter) {
                if (this.nextMatches(this.lineCommentStarter)) {
                    while (this.hasNext()) {
                        if (this.next() === '\n') {
                            break;
                        }
                    }

                    continue;
                }
            }

            // Multi-line comments
            if (this.blockCommentStarter && this.blockCommentEnder) {
                let position = this.currentPosition.clone();

                if (this.nextMatches(this.blockCommentStarter)) {
                    let foundEnd = false;
                    
                    while (this.hasNext(this.blockCommentEnder.length)) {
                        if (this.nextMatches(this.blockCommentEnder)) {
                            foundEnd = true;
                            break;
                        } else {
                            this.next();
                        }
                    }

                    if (!foundEnd) {
                        throw new TokenizationError("Block comment was not closed.", position);
                    }

                    continue;
                }
            }

            // Parse constant tokens
            let foundConst = false;
            for (let pattern of Object.keys(this.constTokens)) {
                let match = this.nextMatchesSized(pattern);

                if (match) {
                    let token = this.constTokens[pattern](match)
                    this.tokens.push(token);

                    foundConst = true;
                    break;
                }
            }

            if (foundConst) {
                continue;
            }
        }

        return new TokenIterator(this.tokens);
    }
}

/**
 * Represents an error during tokenization.
 */
class TokenizationError extends Error {
    position: FilePosition | FileRangePosition;

    constructor(message: string, position: FilePosition | FileRangePosition) {
        if (position instanceof FilePosition) {
            super(message + `\n  At: line ${position.line}, column ${position.column}`);
        } else {
            super(message + `\n  At: line ${position.startLine}, column ${position.startColumn}`);
        }
        
        this.position = position;
    }
}

/**
 * Iterator for Tokens.
 */
class TokenIterator<T extends Token> {
    private tokens: T[];

    constructor(tokens: T[]) {
        this.tokens = tokens;
    }
}