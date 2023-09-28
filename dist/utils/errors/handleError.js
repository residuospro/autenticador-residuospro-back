"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandleError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = HandleError;
//# sourceMappingURL=handleError.js.map