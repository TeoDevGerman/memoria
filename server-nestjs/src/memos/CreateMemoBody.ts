import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

export const CreateMemoBody = z.object({
    title: z.string().min(3).max(50),
    description: z.string().max(9999),
    progress: z.number().min(0).max(100),
    deadline: z.custom((data) => {
        if (typeof data !== 'string') return false;
        return !isNaN(Date.parse(data));
    }, 'deadline must be a valid date'),
});

export type CreateMemoBody = z.infer<typeof CreateMemoBody>;

@Injectable()
export class ValidateCreateMemoBody implements PipeTransform<CreateMemoBody> {
    transform(
        value: CreateMemoBody,
        _metadata: ArgumentMetadata,
    ): CreateMemoBody {
        const parsed = CreateMemoBody.parse(value);
        return parsed;
    }
}
