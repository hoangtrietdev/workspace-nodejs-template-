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
exports.Resident1 = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Resident1 = class Resident1 {
};
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Resident1.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "image", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ho_ten", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Resident1.prototype, "age", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "shsq", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident1.prototype, "nam_sinh", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "que_quan", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "tru_quan", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "dia_chi", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "van_hoa", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "dan_toc", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Resident1.prototype, "doan_vien", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Boolean)
], Resident1.prototype, "dang", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident1.prototype, "ngay_vao_dang", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ton_giao", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Resident1.prototype, "suc_khoe", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "nghe_nghiep", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "noi_lam_viec", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "so_dien_thoai", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ho_ten_cha", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ho_ten_me", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ho_ten_vo", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Resident1.prototype, "so_con", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "thanh_phan_xuat_than", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident1.prototype, "nhap_ngu", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Resident1.prototype, "xuat_ngu", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ten_don_vi", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "cap_bac", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "chuc_vu", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Resident1.prototype, "ghi_chu", void 0);
Resident1 = __decorate([
    typeorm_1.Entity()
], Resident1);
exports.Resident1 = Resident1;
//# sourceMappingURL=resident1.entity.js.map