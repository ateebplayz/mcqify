import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MCQ } from 'src/modules/classes';

@Injectable()
export class QuestionifyService {
    fetchMCQ(yearStr: string, session: 'm' | 's' | 'w', paperStr: string, variantStr: string): MCQ {
        let year = Number(yearStr)
        let paper = Number(paperStr)
        let variant = Number(variantStr)
        if(isNaN(year) || yearStr.length !== 4) {
            throw new HttpException('Invalid Year Entered. Please make sure it is a valid 4 digit number.', HttpStatus.BAD_REQUEST)
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
        return {
            subjectCode: 1,
            season: 'w',
            question: "https://grabyourservices.com/_next/static/media/logo.ab1c54d0.png",
            mcqIdentifier: {
                variant: 1,
                paper: 2,
                year: Number(year),
                number: 1
            },
            answer: 'A',
            topic: 1
        }
    }
}
