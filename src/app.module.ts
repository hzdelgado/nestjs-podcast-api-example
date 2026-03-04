import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TopicsModule } from './topics/topics.module';
import { Topic } from './topics/entities/topic.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'adminuser',
      password: process.env.DATABASE_PASSWORD || 'admin1234',
      database: process.env.DATABASE_NAME || 'example_db',
      entities: [Topic],
      synchronize: true, // solo en desarrollo
    }),
    EpisodesModule, 
    TopicsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
