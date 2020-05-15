import React from 'react'
// import ResultsListItem from "./ResultsListItem";
// import ResultsFilters from './ResultsFilters';
import { AssignmentsContext } from "../../context/AssignmentsContext";
import { UserContext } from "../../context/UserContext";
import Heading from "../Heading"
import SingleAssignmentItem from '../AssignmentsPage/SingleAssignmentItem';
import AssignmentsColumns from '../AssignmentsPage/AssignmentsColumns';

export default function ResultsList() {
    const { results, questions, assignments } = React.useContext(AssignmentsContext)
    const { user } = React.useContext(UserContext)
    const [validAssignments, setValidAssignments] = React.useState([])

    function formatResults(results = [], questions = [], assignments = []) {
        let tempAssignments = []

        for (let i = 0; i < assignments.length; i++) {
            const assignment = assignments[i].id;
            let findQuestion = questions.filter(record => record.quiz_id === assignment)
            if (findQuestion.length > 0) {
                for (let j = 0; j < findQuestion.length; j++) {
                    let doneQuestions = results.find(record => record.question_id === findQuestion[j].question_id && record.student_id === user.user.id)
                    if (doneQuestions) {
                        tempAssignments = [...tempAssignments, assignments[i]]
                        break
                    }
                }
            }
        }

        setValidAssignments(tempAssignments)
    }

    React.useEffect(() => {
        formatResults(results, questions, assignments)
    }, [results, questions, assignments])
    // console.log(validAssignments)
    return <div>
        <Heading title="CHOOSE ASSIGNMENT"></Heading>
        {/* <ResultsFilters></ResultsFilters> */}
        {<p className="text-center my-3">{validAssignments.length} results found</p>}
        <AssignmentsColumns></AssignmentsColumns>
        {validAssignments.length === 0 && <p className="text-center my-3">no results found</p>}
        {validAssignments.map((item,index)=><SingleAssignmentItem key={item.id} data={item} index={index}></SingleAssignmentItem>)}
    </div>
}