"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
var Display = (function () {
    function Display(format_string) {
        if (format_string === void 0) { format_string = '{{content}}'; }
        this.format_string = format_string;
        this.check_regex = /\{\{([\$\_a-zA-Z][\$\_a-zA-Z0-9]*)\}\}/;
        this.compile_string_array = [];
        this.compile_string_map = {};
        this.print = console.log;
        this.compile();
    }
    Object.defineProperty(Display.prototype, "FormatString", {
        get: function () { return this.format_string; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "CompileStringArray", {
        get: function () { return __spreadArrays(this.compile_string_array); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "CompileStringMap", {
        get: function () { return __assign({}, this.compile_string_map); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "Print", {
        get: function () { return this.print; },
        set: function (printFunction) {
            this.print = printFunction;
        },
        enumerable: false,
        configurable: true
    });
    Display.prototype.compile = function () {
        var check_string = this.format_string;
        while (true) {
            var check_array = this.check_regex.exec(check_string);
            if (!check_array) {
                this.compile_string_array.push(check_string);
                break;
            }
            else {
                var split_flag = check_array[0];
                var save_string = check_array[1];
                var split_array = check_string.split(split_flag);
                this.compile_string_array.push(split_array[0]);
                this.compile_string_array.push(save_string);
                this.compile_string_map[save_string] = this.compile_string_array.length - 1;
                check_string = split_array[1];
            }
        }
    };
    Display.prototype.display = function (anyArg) {
        var printFunction = this.print;
        var keys = Object.keys(this.compile_string_map);
        if (typeof anyArg === 'string') {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (key === 'content') {
                    var index = this.compile_string_map[key];
                    this.compile_string_array[index] = anyArg;
                }
            }
        }
        else {
            var contentskeys = Object.keys(anyArg);
            for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                var key = keys_2[_a];
                if (contentskeys.indexOf(key) >= 0) {
                    var index = this.compile_string_map[key];
                    this.compile_string_array[index] = String(anyArg[key]);
                }
            }
        }
        printFunction(this.compile_string_array.join(''));
    };
    return Display;
}());
exports.Display = Display;
//# sourceMappingURL=Display.js.map