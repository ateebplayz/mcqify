import { Test, TestingModule } from '@nestjs/testing';
import { QuestionifyService } from './questionify.service';

describe('QuestionifyService', () => {
  let service: QuestionifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionifyService],
    }).compile();

    service = module.get<QuestionifyService>(QuestionifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
