"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.BadRequestException {
    constructor(objectOrError, description) {
        super(objectOrError, description);
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=exceptions.js.map