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
import { Residence2Service } from './residence2.service';
import { diskStorage } from 'multer';
import { debug } from 'console';
import { Resident1 } from 'src/models/resident1.entity';
import { Resident2 } from 'src/models/resident2.entity';

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

const { BaseController } = createBaseController(Resident2);

const BaseResidentController: Type<IBaseController<Resident2>> = BaseController;

@ApiTags('resident2')
@Controller('resident2')
export class Residence2Controller extends BaseResidentController {
  constructor(protected readonly service: Residence2Service) {
    super();
  }
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../client/src/pages/residences2/images',
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
