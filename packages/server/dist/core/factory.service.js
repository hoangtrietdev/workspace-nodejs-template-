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
exports.createBaseService = exports.ER_DUP_ENTRY = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const constants_1 = require("./constants");
const exceptions_1 = require("./exceptions");
exports.ER_DUP_ENTRY = 'ER_DUP_ENTRY';
const createBaseService = (clz) => {
    let BaseService = class BaseService {
        constructor(repository) {
            this.repository = repository;
            this.logger = new common_1.Logger(`${clz.name}Service`);
        }
        async count(options) {
            return this.repository.count({ where: options !== null && options !== void 0 ? options : {} });
        }
        async find(options) {
            return this.repository.find(options);
        }
        async findOne(options) {
            return this.repository.findOne(options);
        }
        async findById(id) {
            const [doc] = await this.repository.findByIds([id]);
            return doc;
        }
        async findByIds(ids) {
            return this.repository.findByIds(ids);
        }
        async paging(options = {}) {
            const { skip = 0, take = constants_1.PAGING_DEFAULT_PAGE_SIZE, where } = options;
            const [total, data] = await Promise.all([
                this.count(where),
                this.find({ ...options, skip, take }),
            ]);
            return {
                total,
                skip,
                take,
                data,
            };
        }
        async create(entity) {
            const doc = this.repository.create(entity);
            try {
                const result = await this.repository.insert(doc);
                return Object.assign(entity, result.generatedMaps[0]);
            }
            catch (err) {
                if (err.code === exports.ER_DUP_ENTRY) {
                    throw new exceptions_1.BusinessException('Object already exists');
                }
                throw err;
            }
        }
        async updateById(id, entity) {
            const [doc] = await this.repository.findByIds([id]);
            if (!doc) {
                throw new common_1.NotFoundException('Not Found', `Not found ${clz.name} with id ${id}`);
            }
            await this.repository.update(id, entity);
            return Object.assign(doc, entity);
        }
        async upsert(entity) {
            const doc = this.repository.create(entity);
            return this.repository.save(doc);
        }
        async delete(options) {
            const res = await this.repository.delete(options);
            return res.affected;
        }
        async deleteById(id) {
            const [doc] = await this.repository.findByIds([id]);
            return doc && this.repository.remove(doc);
        }
    };
    BaseService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_2.InjectRepository(clz)),
        __metadata("design:paramtypes", [typeorm_1.Repository])
    ], BaseService);
    return BaseService;
};
exports.createBaseService = createBaseService;
//# sourceMappingURL=factory.service.js.map