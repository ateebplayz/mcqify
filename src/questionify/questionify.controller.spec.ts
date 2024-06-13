import { Test, TestingModule } from '@nestjs/testing';
import { QuestionifyController } from './questionify.controller';

describe('QuestionifyController', () => {
  let controller: QuestionifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionifyController],
    }).compile();

    controller = module.get<QuestionifyController>(QuestionifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
