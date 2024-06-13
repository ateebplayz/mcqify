type URL = `https://${string}.png`

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
    season: 'm' | 's' | 'w'
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