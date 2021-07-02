/** Compiles BrainFuck code */
export function bfc(input: string): string {
    const tokens = tokenize(input);
    console.log(`Tokens ${tokens}`);
    const numbers =  interpret(tokens);
    console.log(`Numbers ${numbers}`);
    return numbers.map(a => String.fromCharCode(a)).join("");
}

/** Take a string and convert it into an array of BrainFuckToken enums */
function tokenize(input: string): BrainFuckToken[] {
    return input.split("").map(a => {
        switch (a) {
            case "]":
                return BrainFuckToken.CloseIf;
            case "[":
                return BrainFuckToken.OpenIf;
            case "+":
                return BrainFuckToken.Increment;
            case "-":
                return BrainFuckToken.Decrement;
            case ">":
                return BrainFuckToken.NextCell;
            case "<":
                return BrainFuckToken.PreviousCell;
            default:
                return null;
        }
    }).filter(a => a != null) as BrainFuckToken[];
}

/** interpret the BrainFuck code */
function interpret(code: BrainFuckToken[]): number[] {
    let code_pointer = 0;
    let memory_pointer = 0;
    let memory = [0];
    let brace_position: number[] = [];

    while (code_pointer < code.length) {
        switch (code[code_pointer]) {
            case BrainFuckToken.CloseIf:
                if (memory[memory_pointer] != 0) {
                    code_pointer = brace_position[brace_position.length - 1];
                } else {
                    brace_position.pop();
                }
                console.log(brace_position);
                break;
            case BrainFuckToken.OpenIf:
                brace_position.push(code_pointer);
                break;
            case BrainFuckToken.Increment:
                memory[code_pointer]++;
                if (memory[code_pointer] >= 254) {
                    memory[code_pointer] = 0;
                }
                break;
            case BrainFuckToken.Decrement:
                memory[code_pointer]--;
                if (memory[code_pointer] < 0) {
                    memory[code_pointer] = 254;
                }
                break;
            case BrainFuckToken.NextCell:
                memory_pointer++;
                if (memory_pointer >= memory.length) {
                    memory.push(0);
                }
                break;
            case BrainFuckToken.PreviousCell:
                memory_pointer--;
                if (memory_pointer < 0) {
                    memory_pointer = memory.length - 1;
                }
                break;
        
        }

        code_pointer++;
    }

    return memory;
}

/** A repersentation of the BrainFuck Code  */
enum BrainFuckToken {
    CloseIf,      // ]
    OpenIf,       // [
    Increment,    // +
    Decrement,    // -
    NextCell,     // >
    PreviousCell, // <
}
