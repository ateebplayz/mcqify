import { MCQBuilder, SubjectBuilder } from "src/modules/classes"

const questions = [
    new SubjectBuilder(5070, 'Chemistry', 'O', [
        new MCQBuilder(5070, 's', '5070_s22_qp_13_q35.png', 'C', 3, 1, 2022, 35, 0)
    ], ['Some topic']),
]

export default questions