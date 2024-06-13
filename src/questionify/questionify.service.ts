import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { MCQ, MCQBuilder } from 'src/modules/classes';
import subjects from '../subjects/main'
import * as fs from 'fs'
import * as path from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class QuestionifyService {
    async fetchMCQ(codeStr: string, yearStr: string, session: 'm' | 's' | 'w', paperStr: string, variantStr: string, questionStr: string): Promise<MCQ> {
        let code = Number(codeStr)
        let year = Number(yearStr)
        let paper = Number(paperStr)
        let variant = Number(variantStr)
        let question = Number(questionStr)
        if(isNaN(year) || yearStr.length !== 4) {
            throw new HttpException('Invalid Year Entered. Please make sure it is a valid 4 digit number.', HttpStatus.BAD_REQUEST)
        }
        if(isNaN(question)) {
            throw new HttpException('Invalid Question Entered. Please make sure it is a valid number.', HttpStatus.BAD_REQUEST)
        }
        if(isNaN(code) || codeStr.length !== 4) {
            throw new HttpException('Invalid Code Entered. Please make sure it is a valid 4 digit number.', HttpStatus.BAD_REQUEST)
        }
        if(isNaN(paper) || paperStr.length !== 1) {
            throw new HttpException('Invalid Paper number Entered. Please make sure it is a valid 1 digit number.', HttpStatus.BAD_REQUEST)
        }
        if(isNaN(variant) || variantStr.length !== 1) {
            throw new HttpException('Invalid Variant number Entered. Please make sure it is a valid 1 digit number.', HttpStatus.BAD_REQUEST)
        }
        if(session !== 'm' && session !== 's' && session !== 'w') {
            throw new HttpException("Invalid Session Entered. Please make sure it is a valid session. You can view valid sessions at our documentation. It must be either 'm', 's' or 'w'.", HttpStatus.BAD_REQUEST)
        }
        let foundSubject = false
        let foundMcq: MCQ | null = null
        subjects.forEach(subject => {
            if(subject.code == code) {
                foundSubject = true
                subject.mcqs.forEach(mcq => {  
                    if(mcq.mcqIdentifier.year == year && mcq.mcqIdentifier.paper == paper && mcq.mcqIdentifier.variant == variant && mcq.session == session && mcq.mcqIdentifier.number == question) {
                        foundMcq = mcq
                    }
                })
            }
        })
        if(!foundSubject) throw new HttpException('The subject code entered is not registered. If you wish to upload it please visit our documentation.', HttpStatus.NOT_FOUND)
        if(!foundMcq) throw new HttpException('The question is not registered. If you wish to upload it please visit our documentation.', HttpStatus.NOT_FOUND)
            else return foundMcq
    }
    getFile(filePath: string): StreamableFile {
        let fileExistance = fs.existsSync(filePath)
        if(!fileExistance) throw new HttpException('The file is not found. If you wish to upload it please visit our documentation.', HttpStatus.NOT_FOUND)
        const file = createReadStream(filePath);
        return new StreamableFile(file);    
    }
}
