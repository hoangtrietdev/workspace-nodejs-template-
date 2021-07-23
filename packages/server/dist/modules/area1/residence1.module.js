"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Residence1Module = void 0;
const residence1_service_1 = require("./residence1.service");
const residence1_controller_1 = require("./residence1.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resident1_entity_1 = require("../../models/resident1.entity");
const platform_express_1 = require("@nestjs/platform-express");
let Residence1Module = class Residence1Module {
};
Residence1Module = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([resident1_entity_1.Resident1]),
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
        ],
        controllers: [residence1_controller_1.Residence1Controller],
        providers: [residence1_service_1.Residence1Service],
    })
], Residence1Module);
exports.Residence1Module = Residence1Module;
//# sourceMappingURL=residence1.module.js.map