import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { Memo } from '@shared';
import { ValidateMongoId } from 'src/ValidateMongoId';
import { CreateMemoBody, ValidateCreateMemoBody } from './CreateMemoBody';
import { MemosService } from './memos.service';

@Controller('/memo')
export class MemosController {
    constructor(private readonly memosService: MemosService) {}

    @Get()
    async getAllMemos(
        @Query('includeDeleted') includeDeleted = false,
    ): Promise<Memo[]> {
        return this.memosService.getAllMemos({ includeDeleted });
    }

    @Get(':id')
    async getMemo(@Param('id', ValidateMongoId) id: string): Promise<Memo> {
        const memo = await this.memosService.getMemoById(id);

        if (!memo)
            throw new HttpException('Memo not found', HttpStatus.NOT_FOUND);
        return memo;
    }

    @Post()
    async createMemo(
        @Body(ValidateCreateMemoBody)
        createMemoBody: CreateMemoBody,
    ): Promise<Memo> {
        CreateMemoBody.parse(createMemoBody);
        return this.memosService.createMemo(createMemoBody);
    }

    @Put(':id')
    async updateMemo(
        @Param('id', ValidateMongoId) id: string,
        @Body(ValidateCreateMemoBody)
        updateMemoBody: CreateMemoBody,
    ): Promise<Memo> {
        const memo = await this.memosService.updateMemo(id, updateMemoBody);
        if (!memo)
            throw new HttpException('Memo not found', HttpStatus.NOT_FOUND);
        return memo;
    }

    @Delete(':id')
    async deleteMemo(@Param('id', ValidateMongoId) id: string): Promise<Memo> {
        const memo = await this.memosService.deleteMemo(id);
        if (!memo)
            throw new HttpException('Memo not found', HttpStatus.NOT_FOUND);
        return memo;
    }
}
