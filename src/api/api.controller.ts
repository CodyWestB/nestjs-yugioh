import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('price/bitcoin')
  async getBitcoinPrice(): Promise<number> {
    return await this.apiService.getBitcoinPriceUSD();
  }
}
