import { Controller, Get, Query } from '@nestjs/common';
import { MCQ } from 'src/modules/classes';
import { QuestionifyService } from './questionify.service';

@Controller('questionify')
export class QuestionifyController {
    constructor (private readonly questionifyService: QuestionifyService) {}
    @Get('fetch')
    fetchMCQ(@Query('year') year: string, @Query('session') session: 'm' | 's' |'w', @Query('paper') paperNumber: string, @Query('variant') variantNumber: string): MCQ {
        return this.questionifyService.fetchMCQ(year, session, paperNumber, variantNumber)
    }
}
