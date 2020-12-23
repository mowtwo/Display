declare type DisplayContents = {
    content?: string;
} & Record<string, string | boolean | number>;
export declare class Display {
    private format_string;
    private check_regex;
    private compile_string_array;
    private compile_string_map;
    private print;
    constructor(format_string?: string);
    get FormatString(): string;
    get CompileStringArray(): string[];
    get CompileStringMap(): {
        [x: string]: number;
    };
    get Print(): typeof console.log;
    set Print(printFunction: typeof console.log);
    private compile;
    display(content: string): string;
    display(displayContent: DisplayContents): string;
}
export {};
