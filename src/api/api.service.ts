import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  async getBitcoinPriceUSD(): Promise<number> {
    const request = this.http
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .pipe(
        map((res) => res.data?.bpi),
        map((bpi) => bpi?.USD),
        map((usd) => {
          return usd?.rate;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const bitcoinValue = await lastValueFrom(request);

    return bitcoinValue;
  }
}
