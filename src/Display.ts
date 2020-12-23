type DisplayContents = { //显示的内容类型
    content?: string,
} & Record<string, string | boolean | number>
export class Display {
    private check_regex = /\{\{([\$\_a-zA-Z][\$\_a-zA-Z0-9]*)\}\}/ //匹配正则
    private compile_string_array: string[] = [] //模板编译完以后的字符串数组
    private compile_string_map: Record<string, number> = {} //模板编译完需要被匹配的字符串的下表
    private print = console.log //输出的函数
    /**
     * @param format_string 模板字符串，使用【{{}}】将替换文字包围
     */
    constructor(private format_string: string = '{{content}}') {
        this.compile()
    }

    get FormatString() { return this.format_string }
    get CompileStringArray() { return [...this.compile_string_array] }
    get CompileStringMap() { return { ...this.compile_string_map } }
    get Print() { return this.print }
    set Print(printFunction: typeof console.log) {
        this.print = printFunction
    }

    private compile() { //编译函数
        let check_string = this.format_string
        while (true) {
            const check_array = this.check_regex.exec(check_string)
            if (!check_array) {
                this.compile_string_array.push(check_string)
                break
            } else {
                const split_flag = check_array[0]
                const save_string = check_array[1]
                const split_array = check_string.split(split_flag)
                this.compile_string_array.push(split_array[0])
                this.compile_string_array.push(save_string)
                this.compile_string_map[save_string] = this.compile_string_array.length - 1
                check_string = split_array[1]
            }
        }
    }
    /**
     * @param content 内容字符串
     */
    display(content: string): string
    /**
     * @param displayContent 内容字典
     */
    display(displayContent: DisplayContents): string
    display(anyArg: string | DisplayContents): any { //输出函数
        const printFunction = this.print
        const keys = Object.keys(this.compile_string_map)
        if (typeof anyArg === 'string') {
            for (const key of keys) {
                if (key === 'content') {
                    const index = this.compile_string_map[key]
                    this.compile_string_array[index] = anyArg
                }
            }
        } else {
            const contentskeys = Object.keys(anyArg)
            for (const key of keys) {
                if (contentskeys.indexOf(key) >= 0) {
                    const index = this.compile_string_map[key]
                    this.compile_string_array[index] = String(anyArg[key])
                }
            }
        }
        printFunction(this.compile_string_array.join(''))
    }
}