import {
  Body,
  Controller,
  Post,
  Type,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { extname } from 'path';
import {
  createBaseController,
  IBaseController,
} from 'src/core/factory.controller';
import { Resident } from 'src/models/resident.entity';
import { Residence1Service } from './residence1.service';
import { diskStorage } from 'multer';
import { debug } from 'console';
import { Resident1 } from 'src/models/resident1.entity';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

const { BaseController } = createBaseController(Resident1);

const BaseResidentController: Type<IBaseController<Resident1>> = BaseController;

@ApiTags('resident1')
@Controller('resident1')
export class Residence1Controller extends BaseResidentController {
  constructor(protected readonly service: Residence1Service) {
    super();
  }
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../client/src/pages/residences1/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() image) {
    try {
      const response = {
        originalname: image.originalname,
        filename: image.filename,
      };
      return response;
    } catch (error) {
      console.log(image);
      throw error;
    }
  }
}
