import { AuthService } from '@modules/user/use-cases/authenticate-user/authenticate-user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from 'src/infrastructure/services/image-upload.service';
import { createBookProvider } from './book.provider';
import { BookOrmEntity } from './database/book.orm-entity';
import { BookRepository } from './database/book.repository';
import { CreateBookHttpController } from './use-cases/create-book/create-book.http.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookOrmEntity]),
    JwtModule.register({}),
    MulterModule.register({}),
    PassportModule,
    AuthService,
  ],
  controllers: [CreateBookHttpController],
  providers: [BookRepository, createBookProvider, ImageUploadService],
  exports: [],
})
export class BookModule {}
