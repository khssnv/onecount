import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('max ones sequence length', () => {
    it('should return max ones sequence length', () => {
      expect(appController.getMaxOnesSequenceLength('0000111011101011')).toBe(
        7,
      );
    });
  });
});
