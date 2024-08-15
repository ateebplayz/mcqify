import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import {     MCQ, MCQBuilder, Subject } from 'src/modules/classes';
import subjects from '../subjects/main'
import * as fs from 'fs'
import * as path from 'path';
import { createReadStream } from 'fs';
import { filter, iif } from 'rxjs';
import questions from '../subjects/main';

@Injectable()
export class QuestionifyService {
    async fetchMCQ(
        codeStr: string,
        yearStr: string,
        session: 'm' | 's' | 'w',
        paperStr: string,
        variantStr: string,
        questionStr: string
      ): Promise<MCQ>  {
        let year = Number(yearStr)
        let paper = Number(paperStr)
        let variant = Number(variantStr)
        let question = Number(questionStr)
      
        if (isNaN(year) || yearStr.length !== 4) {
          throw new HttpException(
            'Invalid Year Entered. Please make sure it is a valid 4 digit number.',
            HttpStatus.BAD_REQUEST
          )
        }
        if (isNaN(question)) {
          throw new HttpException(
            'Invalid Question Entered. Please make sure it is a valid number.',
            HttpStatus.BAD_REQUEST
          )
        }
        if (!codeStr || codeStr.length !== 4) {
          throw new HttpException(
            'Invalid Code Entered. Please make sure it is a valid 4 digit number.',
            HttpStatus.BAD_REQUEST
          )
        }
        if (isNaN(paper) || paperStr.length !== 1) {
          throw new HttpException(
            'Invalid Paper number Entered. Please make sure it is a valid 1 digit number.',
            HttpStatus.BAD_REQUEST
          )
        }
        if (isNaN(variant) || variantStr.length !== 1) {
          throw new HttpException(
            'Invalid Variant number Entered. Please make sure it is a valid 1 digit number.',
            HttpStatus.BAD_REQUEST
          )
        }
        if (session !== 'm' && session !== 's' && session !== 'w') {
          throw new HttpException(
            "Invalid Session Entered. Please make sure it is a valid session. You can view valid sessions at our documentation. It must be either 'm', 's' or 'w'.",
            HttpStatus.BAD_REQUEST
          )
        }
        const board = subjects.find(s=>s.code=codeStr).board
        if (!board) {
          throw new HttpException(
            'The subject code entered is not registered. If you wish to upload it please visit our documentation.',
            HttpStatus.NOT_FOUND
          )
        }
      
        const mcqsDir = path.join(__dirname, '../../questions', board, codeStr)
        const mcqsFiles = fs.readdirSync(mcqsDir)
        const yearSuffix = year.toString().slice(-2)
        const regex = new RegExp(`^${codeStr}_${session}_[ABCD]_${paper}_${variant}_${yearSuffix}_${question}`)
      
        const matchingFile = mcqsFiles.find(file => regex.test(file))
        console.log(matchingFile, mcqsFiles)
        
        if (!matchingFile) {
          throw new HttpException(
            'The question is not registered. If you wish to upload it please visit our documentation.',
            HttpStatus.NOT_FOUND
          )
        }
        return null
    }
    getFile(filePath: string): StreamableFile {
        let fileExistance = fs.existsSync(filePath)
        if(!fileExistance) throw new HttpException('The file is not found. If you wish to upload it please visit our documentation.', HttpStatus.NOT_FOUND)
        const file = createReadStream(filePath);
        return new StreamableFile(file);    
    }
    getList(type: 'subjects' | 'boards', query: string | undefined, mcqify: 'y' | undefined): {data: {subject: Subject | Array<Subject>, mcqs: Array<MCQ | null>}, statusCode: number} {
        if(!type) throw new HttpException("Invalid list type. Please enter either 'subjects' or 'boards'", HttpStatus.BAD_REQUEST);
        if(!query) throw new HttpException("Invalid list type. Please enter either 'subjects' or 'boards'", HttpStatus.BAD_REQUEST);
        let listType = type.toLowerCase()
        if(listType !== 'subjects' && listType !== 'boards') throw new HttpException("Invalid list type. Please enter either 'subjects' or 'boards'", HttpStatus.BAD_REQUEST);
        switch(type) {
            case 'subjects': 
                if(query) {
                    const subjectsDir = fs.readdirSync(path.join(__dirname, '../../questions'))
                    if(subjectsDir.includes(query)) {
                        const mcqsFile = fs.readdirSync(path.join(__dirname, '../../questions', query))
                        let mcqs: Array<MCQ> = []
                        if(mcqify == 'y') {
                            mcqsFile.map(mcq => {
                                let mcqDeet = mcq.split('_')
                                // mcqs.push(new MCQBuilder(query, mcqDeet[1] as 'm' | 'w' | 's', mcqDeet[2] as 'A' | 'B' | 'C' | 'D', parseInt(mcqDeet[4]), parseInt(mcqDeet[3]), parseInt(mcqDeet[5]), parseInt(mcqDeet[6]), parseInt(mcqDeet[7])))
                            })
                        }
                        return {
                            data: {
                                subject: subjects.find(s => s.code == query),
                                mcqs: mcqs
                            },
                            statusCode: 200
                        }
                    } else throw new HttpException(`Couldn't find the subject code ${query}.`, HttpStatus.NOT_FOUND)
                }
                return {data: {subject: subjects[0], mcqs: []}, statusCode: 200};
            case 'boards':
                if(!query) throw new HttpException(`Please enter a query either in the form of 'A' or 'IGCSE'.`, HttpStatus.BAD_REQUEST)
                if(query.toUpperCase() !== 'IGCSE' && query.toUpperCase() !== 'A') throw new HttpException(`Please enter a query either in the form of 'A' or 'IGCSE'.`, HttpStatus.BAD_REQUEST)
                let filteredSubjects = subjects.filter(subject => subject.board === query.toUpperCase())
                return {
                    data: {
                        subject: filteredSubjects,
                        mcqs: []
                    },
                    statusCode: 200
                }
        }
    }
    getRandom(amount: string, code: string | undefined, board: 'IGCSE' | 'A' | undefined): {data: Array<MCQ>, statusCode: number} {
        if(Number(amount) <= 0 || Number(amount) > 250) {
            throw new HttpException('Invalid amount entered. The maximum amount is 250 MCQs', HttpStatus.BAD_REQUEST)
        }
        if(code == undefined) {
            throw new HttpException('Invalid subject code entered. Please make sure it is a valid 4 digit number.', HttpStatus.BAD_REQUEST)
        }
        if((board.toUpperCase() !== 'IGCSE' && board.toUpperCase() !== 'A') || board === null || board == undefined) throw new HttpException(`Please enter a query either in the form of 'A' or 'IGCSE'.`, HttpStatus.BAD_REQUEST)
        let foundCode = false
        subjects.forEach(s => {
            if(s.code == code && s.board == board.toUpperCase()) foundCode = true
        })
        if(!foundCode) {
            throw new HttpException('The subject code entered is not registered or the board is not correct for this code. If you wish to upload it please visit our documentation.', HttpStatus.NOT_FOUND)
        }
        let arrayOfIds = []
        let mcqs: Array<MCQ> = []
        const mcqsDirectory = fs.readdirSync(path.join(__dirname, '../../questions', board, code))
        mcqsDirectory.map(mcq => { 
            let mcqDeet = mcq.split('_')
            mcqs.push(new MCQBuilder(code, mcqDeet[1] as 'm' | 'w' | 's', mcqDeet[2] as 'A' | 'B' | 'C' | 'D', parseInt(mcqDeet[4]), parseInt(mcqDeet[3]), parseInt(mcqDeet[5]), parseInt(mcqDeet[6]), parseInt(mcqDeet[7]), board))
        })
        for (let i = 0; i < Number(amount); i++) {
            let randomNum = Math.floor(Math.random() * mcqs.length)
            if(arrayOfIds.includes(randomNum)) {
                randomNum = Math.floor(Math.random() * mcqs.length)
            }
            arrayOfIds.push(randomNum)
        }
        let mcqsToReturn: Array<MCQ> = []
        arrayOfIds.forEach(id => {
            mcqsToReturn.push(mcqs[id])
        })
        return {
            data: mcqsToReturn,
            statusCode: 200
        }
    }
}
