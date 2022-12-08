import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [HttpModule, CardsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
