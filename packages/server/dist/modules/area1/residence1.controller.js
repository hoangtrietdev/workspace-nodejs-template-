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
exports.Residence1Controller = exports.editFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const factory_controller_1 = require("../../core/factory.controller");
const resident_entity_1 = require("../../models/resident.entity");
const residence1_service_1 = require("./residence1.service");
const multer_1 = require("multer");
const resident1_entity_1 = require("../../models/resident1.entity");
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
const { BaseController } = factory_controller_1.createBaseController(resident1_entity_1.Resident1);
const BaseResidentController = BaseController;
let Residence1Controller = class Residence1Controller extends BaseResidentController {
    constructor(service) {
        super();
        this.service = service;
    }
    async uploadedFile(image) {
        try {
            const response = {
                originalname: image.originalname,
                filename: image.filename,
            };
            return response;
        }
        catch (error) {
            console.log(image);
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
], Residence1Controller.prototype, "uploadedFile", null);
Residence1Controller = __decorate([
    swagger_1.ApiTags('resident1'),
    common_1.Controller('resident1'),
    __metadata("design:paramtypes", [residence1_service_1.Residence1Service])
], Residence1Controller);
exports.Residence1Controller = Residence1Controller;
//# sourceMappingURL=residence1.controller.js.map