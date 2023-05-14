import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemoBody } from './CreateMemoBody';
import { MemoDAO } from './memo.schema';

@Injectable()
export class MemosService {
    constructor(@InjectModel(MemoDAO.name) private memoDAO: Model<MemoDAO>) {}
    public async getAllMemos({
        includeDeleted,
    }: {
        includeDeleted: boolean;
    }): Promise<MemoDAO[]> {
        if (!includeDeleted)
            return this.memoDAO.find({ deletedAt: null }).lean();

        return this.memoDAO.find().lean();
    }

    public getMemoById(id: string): Promise<MemoDAO | null> {
        return this.memoDAO.findById(id).lean();
    }

    public async createMemo(memo: CreateMemoBody): Promise<MemoDAO> {
        const createdMemo = new this.memoDAO(memo);
        return createdMemo.save();
    }

    public async updateMemo(
        id: string,
        memo: CreateMemoBody,
    ): Promise<MemoDAO | null> {
        return this.memoDAO.findByIdAndUpdate(id, memo, { new: true }).lean();
    }

    public async deleteMemo(id: string): Promise<MemoDAO | null> {
        return this.memoDAO
            .findByIdAndUpdate(id, { $set: { deletedAt: new Date() } })
            .lean();
    }
}
