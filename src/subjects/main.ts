import { SubjectBuilder } from "src/modules/classes"

const questions = [

    // IGCSE Subjects

    new SubjectBuilder("0620", 'Chemistry', 'IGCSE', ['Some topic']),
    new SubjectBuilder("0625", 'Physics', 'IGCSE', ['Some topic']),
    new SubjectBuilder("0455", 'Economics', 'IGCSE', ['Some topic']),
    new SubjectBuilder("0610", 'Biology', 'IGCSE', ['Some topic']),

    // A/AS Level Subjects

    new SubjectBuilder("9701", 'Chemistry', 'A', ['Some topic']),
    new SubjectBuilder("9702", 'Physics', 'A', ['Some topic']),
    new SubjectBuilder("9708", 'Economics', 'A', ['Some topic']),
    new SubjectBuilder("9700", 'Biology', 'A', ['Some topic']),
]

export default questions