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
exports.ResidenceController = exports.editFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const factory_controller_1 = require("../core/factory.controller");
const resident_entity_1 = require("../models/resident.entity");
const residence_service_1 = require("./residence.service");
const multer_1 = require("multer");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const { BaseController } = factory_controller_1.createBaseController(resident_entity_1.Resident);
const BaseResidentController = BaseController;
let ResidenceController = class ResidenceController extends BaseResidentController {
    constructor(service) {
        super();
        this.service = service;
    }
    async uploadedFile(file) {
        try {
            const response = {
                originalname: file.originalname,
                filename: file.filename,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    common_1.Post('image'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', {
        storage: multer_1.diskStorage({
            destination: '../client/src/pages/residences/images',
            filename: exports.editFileName,
        }),
        fileFilter: exports.imageFileFilter,
    })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResidenceController.prototype, "uploadedFile", null);
ResidenceController = __decorate([
    swagger_1.ApiTags('resident'),
    common_1.Controller('resident'),
    __metadata("design:paramtypes", [residence_service_1.ResidenceService])
], ResidenceController);
exports.ResidenceController = ResidenceController;
//# sourceMappingURL=residence.controller.js.map