import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    Put,
  } from '@nestjs/common';
  import { ArticleService } from 'src/services/article.service';
  import { ArticleDto } from 'src/interfaces/article/dto/article.dto';
  import { JwtGuard } from 'src/services/jwt-auth.guard';
  
  @Controller('articles')
  @UseGuards(JwtGuard) 
  export class ArticlesController {
    constructor(private readonly articlesService: ArticleService) {}
  
    @Post()
    async create(@Body() body: ArticleDto, @Req() req: any) {        
      return this.articlesService.create(req.user.sub, body);
    }
  
    @Get()
    async findAll() {
      return this.articlesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.articlesService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ArticleDto, @Req() req: any) {
      return this.articlesService.update(id, req.user.sub, body);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: any) {
      return this.articlesService.remove(id, req.user.sub);
    }
  }
  