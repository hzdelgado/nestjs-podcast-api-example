
import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateEpisodeDto {
    @IsString()
    name: string;
    @IsBoolean()
    @IsOptional()
    featured?: boolean;
    @IsDate()
    @Type(() => Date)
    publishedAt: Date;
}