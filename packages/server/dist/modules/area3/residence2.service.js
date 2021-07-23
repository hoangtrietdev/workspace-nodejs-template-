"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Residence2Service = void 0;
const common_1 = require("@nestjs/common");
const factory_service_1 = require("../../core/factory.service");
const resident2_entity_1 = require("../../models/resident2.entity");
const BaseResidenceService = factory_service_1.createBaseService(resident2_entity_1.Resident2);
let Residence2Service = class Residence2Service extends BaseResidenceService {
};
Residence2Service = __decorate([
    common_1.Injectable()
], Residence2Service);
exports.Residence2Service = Residence2Service;
//# sourceMappingURL=residence2.service.js.map