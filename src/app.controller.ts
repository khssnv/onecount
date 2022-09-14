import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':sequence')
  getMaxOnesSequenceLength(@Param('sequence') sequence: string): number {
    return this.appService.maxOnesSequence(sequence);
  }
}
