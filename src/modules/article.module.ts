import { Module } from '@nestjs/common';
import { ArticleService } from 'src/services/article.service';
import { ArticlesController } from 'src/controllers/article.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [ArticleService, PrismaService],
  exports: [ArticleService],
})
export class ArticleModule {}
