type URL = `http://${string}.png` | `https://${string}.png`

export class MCQ {
    /**
     * The subject code assigned by Cambridge
     * @example 5070 (The Chemistry for O-Level)
     * @emits number
     */
    subjectCode: string
    /**
     * The season of the question.
     * @example 'm' (The February March Session)
     * @emits character
     */
    session: 'm' | 's' | 'w'
    /**
     * The image URL of the question
     * @example https://mcqify.grabyourservices.com:9000/questionify/images/5070_m24_qp_23_q15.png
     * @requires https
     * @requires png
     */
    question: URL
    mcqIdentifier: {
        /**
         * The variant of the question's question paper
         * @example 4
         */
        variant: number
        /**
         * The papaer of the question's question paper
         * @example 2
         */
        paper: number
        /**
         * The year of the question's question paper
         * @example 2024
         */
        year: number
        /**
         * The question number of the question
         * @example 29
         */
        number: number
    }
    /**
     * The answer to the MCQ Question
     * @example 'A'
     */
    answer: 'A' | 'B' | 'C' | 'D'
    /**
     * The topic that the question belons to
     * @example 12 (Stoichiometry)
     */
    topic: number
}

export class Subject {
    code: string
    name: string
    board: 'A' | 'IGCSE'
    topics: Array<string>
}

export class SubjectBuilder extends Subject {
    constructor(subjectCode: string, name: string, board: 'A' | 'IGCSE', topics: Array<string>) {
        super()
        this.code = subjectCode
        this.name = name
        this.board = board
        this.topics = topics
    }
}

export class MCQBuilder extends MCQ {
    constructor(subjectCode: string, session: 'm' |'s' | 'w', answer: 'A' | 'B' | 'C' | 'D', variant: number, paper: number, year: number, question: number, topic: number, board: 'IGCSE' | 'A') {
        super()
        this.subjectCode = subjectCode
        this.session = session
        this.question = `https://amplyfy.grabyourservices.com:9000/images/${board}/${subjectCode}/${subjectCode}_${session}_${answer}_${paper}_${variant}_${year}_${question}_${topic}.png`
        this.answer = answer
        this.mcqIdentifier = {
            variant: variant,
            paper: paper,
            year: year,
            number: question
        }
        this.topic = topic
    }
}