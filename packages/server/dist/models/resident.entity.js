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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resident = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Resident = class Resident {
};
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Resident.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "image", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ho_ten", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Resident.prototype, "age", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "shsq", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident.prototype, "nam_sinh", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "que_quan", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "tru_quan", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "dia_chi", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "van_hoa", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "dan_toc", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Resident.prototype, "doan_vien", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Resident.prototype, "dang", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident.prototype, "ngay_vao_dang", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ton_giao", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Resident.prototype, "suc_khoe", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "nghe_nghiep", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "noi_lam_viec", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "so_dien_thoai", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ho_ten_cha", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ho_ten_me", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ho_ten_vo", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Resident.prototype, "so_con", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "thanh_phan_xuat_than", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident.prototype, "nhap_ngu", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident.prototype, "xuat_ngu", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ten_don_vi", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "cap_bac", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "chuc_vu", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident.prototype, "ghi_chu", void 0);
Resident = __decorate([
    typeorm_1.Entity()
], Resident);
exports.Resident = Resident;
//# sourceMappingURL=resident.entity.js.map