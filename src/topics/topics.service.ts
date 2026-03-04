import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {

  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>) {
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = await this. topicRepository.create(createTopicDto);
    return this.topicRepository.save(topic);
  }

  async findAll(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async findOne(id: number): Promise<Topic>  {
    const topic = await this.topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.findOne(id);
    Object.assign(topic, updateTopicDto);
    return await this.topicRepository.save(topic);
  }

  async remove(id: number): Promise<void> {
    const topic = await this.findOne(id);
    await this.topicRepository.remove(topic);
  }
}
