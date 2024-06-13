type URL = `http://${string}.png` | `https://${string}.png`

export class MCQ {
    /**
     * The subject code assigned by Cambridge
     * @example 5070 (The Chemistry for O-Level)
     * @emits number
     */
    subjectCode: number
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
    code: number
    name: string
    board: 'AS' | 'A' | 'O' | 'IGCSE'
    mcqs: Array<MCQ>
    topics: Array<string>
}

export class SubjectBuilder extends Subject {
    constructor(subjectCode: number, name: string, board: 'AS' | 'A' | 'O' | 'IGCSE', mcqs: Array<MCQ>, topics: Array<string>) {
        super()
        this.code = subjectCode
        this.name = name
        this.board = board
        this.mcqs = mcqs
        this.topics = topics
    }
}

export class MCQBuilder extends MCQ {
    constructor(subjectCode: number, session: 'm' |'s' | 'w', fileName: `${string}.png`, answer: 'A' | 'B' | 'C' | 'D', variant: number, paper: number, year: number, question: number, topic: number) {
        super()
        this.subjectCode = subjectCode
        this.session = session
        this.question = `http://localhost:3000/questionify/image/${fileName}`
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
