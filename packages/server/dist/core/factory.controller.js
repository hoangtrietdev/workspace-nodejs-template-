"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseController = exports.ParseFilterPipe = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("@nestjs/swagger/dist/constants");
const model_properties_accessor_1 = require("@nestjs/swagger/dist/services/model-properties-accessor");
const modelPropertiesAccessor = new model_properties_accessor_1.ModelPropertiesAccessor();
class StringOperators {
}
__decorate([
    swagger_1.ApiProperty({ type: String, isArray: true, required: false }),
    __metadata("design:type", Array)
], StringOperators.prototype, "in", void 0);
__decorate([
    swagger_1.ApiProperty({ type: String, isArray: true, required: false }),
    __metadata("design:type", Array)
], StringOperators.prototype, "nin", void 0);
class NumberOperators {
}
__decorate([
    swagger_1.ApiProperty({ type: Number, isArray: true, required: false }),
    __metadata("design:type", Array)
], NumberOperators.prototype, "in", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number, isArray: true, required: false }),
    __metadata("design:type", Array)
], NumberOperators.prototype, "nin", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number, required: false }),
    __metadata("design:type", Number)
], NumberOperators.prototype, "gt", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number, required: false }),
    __metadata("design:type", Number)
], NumberOperators.prototype, "gte", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number, required: false }),
    __metadata("design:type", Number)
], NumberOperators.prototype, "lt", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number, required: false }),
    __metadata("design:type", Number)
], NumberOperators.prototype, "lte", void 0);
class DateOperators {
}
__decorate([
    swagger_1.ApiProperty({ type: Date, required: false }),
    __metadata("design:type", Date)
], DateOperators.prototype, "gt", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Date, required: false }),
    __metadata("design:type", Date)
], DateOperators.prototype, "gte", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Date, required: false }),
    __metadata("design:type", Date)
], DateOperators.prototype, "lt", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Date, required: false }),
    __metadata("design:type", Date)
], DateOperators.prototype, "lte", void 0);
let ParseFilterPipe = class ParseFilterPipe {
    transform(value) {
        let parsed = {};
        if (typeof value === 'string') {
            try {
                parsed = JSON.parse(value || '{}');
            }
            catch (err) {
                throw new common_1.BadRequestException('Bad filter');
            }
        }
        else {
            parsed = value;
        }
        const filter = {};
        if (Array.isArray(parsed.select)) {
            filter.select = parsed.select;
        }
        if (parsed.skip && !Number.isNaN(parsed.skip)) {
            filter.skip = Number(parsed.skip);
        }
        if (parsed.take && !Number.isNaN(parsed.take)) {
            filter.take = Number(parsed.take);
        }
        if (parsed.where) {
            if (typeof parsed.where === 'string') {
                try {
                    parsed.where = JSON.parse(parsed.where || '{}');
                }
                catch (err) {
                    throw new common_1.BadRequestException('Bad filter');
                }
            }
            filter.where = Object.keys(parsed.where).reduce((all, field) => {
                const fieldFilter = parsed.where[field];
                if (typeof fieldFilter !== 'object') {
                    all[field] = fieldFilter;
                }
                return all;
            }, {});
        }
        if (parsed.order) {
            if (typeof parsed.order === 'string') {
                try {
                    parsed.order = JSON.parse(parsed.order || '{}');
                }
                catch (err) {
                    throw new common_1.BadRequestException('Bad filter');
                }
            }
            filter.order = parsed.order;
        }
        return filter;
    }
};
ParseFilterPipe = __decorate([
    common_1.Injectable()
], ParseFilterPipe);
exports.ParseFilterPipe = ParseFilterPipe;
const OptionalDecorator = (enabled, decorator, ...params) => (target, key, descriptor) => {
    if (!enabled)
        return;
    return decorator(...params)(target, key, descriptor);
};
const createPagingResultClass = (clz) => {
    class PagingResult {
    }
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], PagingResult.prototype, "total", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], PagingResult.prototype, "skip", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], PagingResult.prototype, "take", void 0);
    __decorate([
        swagger_1.ApiProperty({ type: clz, isArray: true }),
        __metadata("design:type", Array)
    ], PagingResult.prototype, "data", void 0);
    Object.defineProperty(PagingResult, 'name', {
        writable: false,
        configurable: true,
        value: `${clz.name}PagingResult`,
    });
    return PagingResult;
};
const createWhereOptionsClass = (clz) => {
    let WhereOptions = class WhereOptions {
    };
    WhereOptions = __decorate([
        swagger_1.ApiExtraModels(StringOperators, NumberOperators, DateOperators)
    ], WhereOptions);
    const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);
    fields.forEach((field) => {
        const metadata = Reflect.getMetadata(constants_1.DECORATORS.API_MODEL_PROPERTIES, clz.prototype, field);
        switch (metadata.type) {
            case String:
            case 'string':
                swagger_1.ApiProperty({
                    required: false,
                    type: String,
                    oneOf: [
                        { type: 'string', enum: metadata.enum },
                        { $ref: swagger_1.getSchemaPath(StringOperators) },
                    ],
                })(WhereOptions.prototype, field);
                class_validator_1.IsString()(WhereOptions.prototype, field);
                break;
            case Number:
            case 'number':
                swagger_1.ApiProperty({
                    required: false,
                    type: Number,
                    oneOf: [{ type: 'number' }, { $ref: swagger_1.getSchemaPath(NumberOperators) }],
                })(WhereOptions.prototype, field);
                class_validator_1.IsNumber()(WhereOptions.prototype, field);
                break;
            case Date:
            case 'date':
                swagger_1.ApiProperty({
                    required: false,
                    type: NumberOperators,
                })(WhereOptions.prototype, field);
                class_validator_1.IsDate()(WhereOptions.prototype, field);
                break;
            default:
                swagger_1.ApiProperty({
                    ...metadata,
                    required: false,
                })(WhereOptions.prototype, field);
        }
    });
    Object.defineProperty(WhereOptions, 'name', {
        writable: false,
        configurable: true,
        value: `${clz.name}WhereOptions`,
    });
    return WhereOptions;
};
const createOrderOptionsClass = (clz) => {
    class OrderOptions {
    }
    const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);
    fields.forEach((field) => {
        swagger_1.ApiProperty({
            type: String,
            required: false,
            enum: ['ASC', 'DESC'],
            enumName: 'OrderDirection',
        })(OrderOptions.prototype, field);
    });
    Object.defineProperty(OrderOptions, 'name', {
        writable: false,
        configurable: true,
        value: `${clz.name}OrderOptions`,
    });
    return OrderOptions;
};
const createFilterOptionsClass = (clz, whereClz, orderClz, paging = false) => {
    const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);
    let FilterOptions = class FilterOptions {
    };
    __decorate([
        swagger_1.ApiProperty({
            type: String,
            isArray: true,
            required: false,
            enum: fields,
        }),
        __metadata("design:type", Array)
    ], FilterOptions.prototype, "select", void 0);
    __decorate([
        swagger_1.ApiProperty({ required: false, type: whereClz }),
        __metadata("design:type", Object)
    ], FilterOptions.prototype, "where", void 0);
    __decorate([
        swagger_1.ApiProperty({ required: false, type: orderClz }),
        __metadata("design:type", Object)
    ], FilterOptions.prototype, "order", void 0);
    FilterOptions = __decorate([
        swagger_1.ApiExtraModels(whereClz, orderClz)
    ], FilterOptions);
    if (paging) {
        swagger_1.ApiProperty({ required: false, type: Number })(FilterOptions.prototype, 'skip');
        swagger_1.ApiProperty({ required: false, type: Number })(FilterOptions.prototype, 'take');
        class_validator_1.IsNumber()(FilterOptions.prototype, 'skip');
        class_validator_1.IsNumber()(FilterOptions.prototype, 'take');
        class_validator_1.Min(0)(FilterOptions.prototype, 'skip');
        class_validator_1.Min(1)(FilterOptions.prototype, 'take');
        class_validator_1.Max(100)(FilterOptions.prototype, 'take');
    }
    Object.defineProperty(FilterOptions, 'name', {
        writable: false,
        configurable: true,
        value: `${clz.name}${paging ? 'PagingFilterOptions' : 'FilterOptions'}`,
    });
    return FilterOptions;
};
const createBaseController = (clz, options) => {
    const { list = true, findOne = list, findById = list, create = true, update = true, deleteById = true, } = options !== null && options !== void 0 ? options : {};
    const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);
    const ClzPagingResult = createPagingResultClass(clz);
    const ClzWhereOptions = createWhereOptionsClass(clz);
    const ClzOrderOptions = createOrderOptionsClass(clz);
    const ClzFilterOptions = createFilterOptionsClass(clz, ClzWhereOptions, ClzOrderOptions, true);
    let BaseController = class BaseController {
        async list(filter) {
            return this.service.paging(filter);
        }
        async getAll(filter) {
            return this.service.find(filter);
        }
        async findOne(filter) {
            return this.service.findOne(filter);
        }
        async findById(id) {
            return this.service.findById(id);
        }
        async create(body) {
            const res = await this.service.create(body);
            return res;
        }
        async update(id, body) {
            const res = await this.service.updateById(id, body);
            return res;
        }
        async deleteById(id) {
            const doc = await this.service.deleteById(id);
            return !!doc;
        }
    };
    __decorate([
        swagger_1.ApiQuery({
            name: 'take',
            type: Number,
            required: false,
            description: 'Page size',
        }),
        swagger_1.ApiQuery({
            name: 'skip',
            type: Number,
            required: false,
            description: 'Skip',
        }),
        swagger_1.ApiQuery({
            name: 'where',
            required: false,
            description: 'Where filter',
        }),
        swagger_1.ApiQuery({
            name: 'order',
            required: false,
            description: 'Order',
        }),
        swagger_1.ApiQuery({
            name: 'select',
            isArray: true,
            required: false,
            enum: fields,
            description: 'Fields to select',
        }),
        OptionalDecorator(!!list, swagger_1.ApiOkResponse, { type: ClzPagingResult }),
        OptionalDecorator(!!list, common_1.Get, '/'),
        __param(0, common_1.Query(ParseFilterPipe, new common_1.ValidationPipe({ transform: true, expectedType: ClzFilterOptions }))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "list", null);
    __decorate([
        swagger_1.ApiQuery({
            name: 'where',
            required: false,
            description: 'Where filter',
        }),
        swagger_1.ApiQuery({
            name: 'order',
            required: false,
            description: 'Order',
        }),
        swagger_1.ApiQuery({
            name: 'select',
            isArray: true,
            required: false,
            enum: fields,
            description: 'Fields to select',
        }),
        OptionalDecorator(!!list, swagger_1.ApiOkResponse, { type: [clz] }),
        OptionalDecorator(!!list, common_1.Get, '/all'),
        __param(0, common_1.Query(ParseFilterPipe, new common_1.ValidationPipe({ transform: true, expectedType: ClzFilterOptions }))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "getAll", null);
    __decorate([
        swagger_1.ApiQuery({
            name: 'where',
            required: false,
            description: 'Where filter',
        }),
        swagger_1.ApiQuery({
            name: 'order',
            required: false,
            description: 'Order',
        }),
        swagger_1.ApiQuery({
            name: 'select',
            isArray: true,
            required: false,
            enum: fields,
            description: 'Fields to select',
        }),
        OptionalDecorator(!!findOne, swagger_1.ApiOkResponse, { type: clz }),
        OptionalDecorator(!!findOne, common_1.Get, '/findOne'),
        __param(0, common_1.Query(ParseFilterPipe, new common_1.ValidationPipe({ transform: true, expectedType: ClzFilterOptions }))),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "findOne", null);
    __decorate([
        OptionalDecorator(!!findById, swagger_1.ApiOkResponse, { type: clz }),
        OptionalDecorator(!!findById, common_1.Get, '/:id'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "findById", null);
    __decorate([
        OptionalDecorator(!!create, swagger_1.ApiOkResponse, { type: clz }),
        OptionalDecorator(!!create, swagger_1.ApiBody, { type: clz }),
        OptionalDecorator(!!create, common_1.Post, '/'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "create", null);
    __decorate([
        OptionalDecorator(!!update, swagger_1.ApiOkResponse, { type: clz }),
        OptionalDecorator(!!update, swagger_1.ApiBody, { type: clz }),
        OptionalDecorator(!!update, common_1.Put, '/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "update", null);
    __decorate([
        OptionalDecorator(!!deleteById, swagger_1.ApiOkResponse, { type: Boolean }),
        OptionalDecorator(!!deleteById, common_1.Delete, '/:id'),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "deleteById", null);
    BaseController = __decorate([
        swagger_1.ApiExtraModels(ClzFilterOptions),
        swagger_1.ApiBearerAuth()
    ], BaseController);
    return {
        fields,
        BaseController,
        WhereOptions: ClzWhereOptions,
        FilterOptions: ClzFilterOptions,
        PagingResult: ClzPagingResult,
    };
};
exports.createBaseController = createBaseController;
//# sourceMappingURL=factory.controller.js.map