import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { TweetsService } from '../tweets.service';

@Injectable()
export class CheckNewTweetsTask {
  private limit: number = 10;

  constructor(
    private tweetService: TweetsService,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
  ) {}

  @Interval(5000)
  async handle() {
    console.log('searching tweets...');
    let offset = await this.cache.get<number>('tweet-offset');

    offset = !offset ? 0 : offset;

    console.log('offset: ', offset);

    const tweets = await this.tweetService.findAll(offset, this.limit);

    if (tweets.length === this.limit) {
      console.log('found more tweets');
      await this.cache.set('tweet-offset', offset + this.limit, {
        ttl: 1 * 60 * 10,
      });
      console.log('Send mails');
    }
  }
}
