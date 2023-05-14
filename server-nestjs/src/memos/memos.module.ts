import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoDAO, MemoSchema } from './memo.schema';
import { MemosController } from './memos.controller';
import { MemosService } from './memos.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: MemoDAO.name, schema: MemoSchema }]),
    ],
    controllers: [MemosController],
    providers: [MemosService],
})
export class MemosModule {}
