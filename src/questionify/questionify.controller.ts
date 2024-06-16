import { Controller, Get, Header, HttpException, HttpStatus, Query, Res, StreamableFile } from '@nestjs/common';
import { MCQ, Subject } from 'src/modules/classes';
import { QuestionifyService } from './questionify.service';
import * as path from 'path';
import { createReadStream } from 'fs';

@Controller('questionify')
export class QuestionifyController {
    constructor (private readonly questionifyService: QuestionifyService) {}
    @Get('fetch')
    fetchMCQ(@Query('code') code: string, @Query('year') year: string, @Query('session') session: 'm' | 's' |'w', @Query('paper') paperNumber: string, @Query('variant') variantNumber: string, @Query('question') question: string): Promise<MCQ> {
        return this.questionifyService.fetchMCQ(code, year, session, paperNumber, variantNumber, question)
    }
    @Get('image')
    @Header('Content-Type', 'image/png')
    @Header('Content-Disposition', 'attachment')
    getImage(@Query('name') name: string): StreamableFile {
        return this.questionifyService.getFile(path.join(__dirname, '../../questions', name.substring(0, 4), name))
    }  
    @Get('list')
    getList(@Query('type') type: 'subjects' | 'boards', @Query('query') query: string | undefined): {data: Array<Subject>, statusCode: number} {
        return this.questionifyService.getList(type, query)
    }
}
