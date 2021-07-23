"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Residence2Module = void 0;
const residence2_service_1 = require("./residence2.service");
const residence2_controller_1 = require("./residence2.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resident2_entity_1 = require("../../models/resident2.entity");
const platform_express_1 = require("@nestjs/platform-express");
let Residence2Module = class Residence2Module {
};
Residence2Module = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([resident2_entity_1.Resident2]),
            platform_express_1.MulterModule.register({
                dest: './files',
            }),
        ],
        controllers: [residence2_controller_1.Residence2Controller],
        providers: [residence2_service_1.Residence2Service],
    })
], Residence2Module);
exports.Residence2Module = Residence2Module;
//# sourceMappingURL=residence2.module.js.map