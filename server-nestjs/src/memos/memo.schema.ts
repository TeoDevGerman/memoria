import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Memo } from '@shared';
import { HydratedDocument } from 'mongoose';

export type MemoDocument = HydratedDocument<Memo>;

@Schema({ timestamps: true, collection: 'memos' })
export class MemoDAO implements Omit<Memo, 'id'> {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    progress: number;
    @Prop()
    deadline: Date;
    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
    @Prop({ type: Date, default: null })
    deletedAt: Date | null;
}

export const MemoSchema = SchemaFactory.createForClass(MemoDAO);
