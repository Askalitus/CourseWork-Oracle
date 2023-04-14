import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';

@Module({
  controllers: [PhotoController],
  imports: []
})
export class PhotoModule {}
