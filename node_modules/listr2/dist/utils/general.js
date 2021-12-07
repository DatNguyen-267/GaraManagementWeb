"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneObject = void 0;
const v8_1 = require("v8");
/**
 * Deep clones a object in the most easiest manner.
 */
function cloneObject(obj) {
    return (0, v8_1.deserialize)((0, v8_1.serialize)(obj));
}
exports.cloneObject = cloneObject;
