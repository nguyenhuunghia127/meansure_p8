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

  describe('root', () => {
    it('should serve the frontend entry file', () => {
      const response = {
        sendFile: jest.fn(),
      } as unknown as Parameters<AppController['getHello']>[0];

      appController.getHello(response);

      expect(response.sendFile).toHaveBeenCalledWith(
        expect.stringContaining('frontend'),
      );
    });
  });
});
