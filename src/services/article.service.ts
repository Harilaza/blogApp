import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ArticleDto } from 'src/interfaces/article/dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, createArticleDto: ArticleDto) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        authorId,
      },
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
      include: { author: true }, 
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id }, include: { author: true}});
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async update(id: string, authorId: string, updateArticleDto: ArticleDto) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    if (article.authorId !== authorId) {
      throw new ForbiddenException('You can only update your own articles');
    }
    return this.prisma.article.update({
      where: { id },
      data: { ...updateArticleDto },
    });
  }

  async remove(id: string, authorId: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    if (article.authorId !== authorId) {
      throw new ForbiddenException('You can only delete your own articles');
    }
    return this.prisma.article.delete({ where: { id } });
  }
}
