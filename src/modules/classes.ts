type URL = `http://${string}.png` | `https://${string}.png`

export class Subject {
    code: string
    name: string
    board: 'AS' | 'A' | 'O' | 'IGCSE'
    topics: Array<string>
}

export class SubjectBuilder extends Subject {
    constructor(subjectCode: string, name: string, board: 'AS' | 'A' | 'O' | 'IGCSE', topics: Array<string>) {
        super()
        this.code = subjectCode
        this.name = name
        this.board = board
        this.topics = topics
    }
}
