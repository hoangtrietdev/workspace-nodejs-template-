"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidenceModule = void 0;
const residence_service_1 = require("./residence.service");
const residence_controller_1 = require("./residence.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resident_entity_1 = require("../models/resident.entity");
const platform_express_1 = require("@nestjs/platform-express");
let ResidenceModule = class ResidenceModule {
};
ResidenceModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([resident_entity_1.Resident]),
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
        ],
        controllers: [residence_controller_1.ResidenceController],
        providers: [residence_service_1.ResidenceService],
    })
], ResidenceModule);
exports.ResidenceModule = ResidenceModule;
//# sourceMappingURL=residence.module.js.map