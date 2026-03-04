import { Body, Controller, DefaultValuePipe, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from './pipes/is-positive.pipe';
import { ApiKeyGuard } from './guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('episodes')
export class EpisodesController {

    constructor(private episodesService: EpisodesService,
        private configService: ConfigService
    ) {}

    @Get()
    findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc',
            @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number
        ) {
        return this.episodesService.findAll(sort)
    }

    @Get('featured')
    findFeatured() {
        return this.episodesService.findFeatured();
    }
    // add guard to protect this endpoint: @UseGuards(ApiKeyGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const episode = await this.episodesService.findOne(id);
        if (!episode) {
            // Alternative: NotFoundException
            throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
        }
        return episode;
    }
    @Post()
    create(@Body(ValidationPipe) input: CreateEpisodeDto) {
        return this.episodesService.create(input)
    }
}
