import { CoursePart } from '../App';


export const Part = ({ part }: { part: CoursePart}) => {

    switch(part.type) {
        case "normal":
            return (
                <div>
                    <p>
                    <strong>{part.name}</strong> {part.exerciseCount}
                    </p>
                    <p>
                    <i>{part.description}</i>
                    </p>
                    {part.type}
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <p>
                    <strong>{part.name}</strong> {part.exerciseCount}
                    </p>
                    <p>
                    group project count: <i>{part.groupProjectCount}</i>
                    </p>
                    {part.type}
                </div>
            )
        case "submission":
            return (
                <div>
                    <p>
                    <strong>{part.name}</strong> {part.exerciseCount}
                    </p>
                    <p>
                    <i>{part.description}</i>
                    </p>
                    {part.type}
                </div>
            )
        case "special":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong> {part.exerciseCount}
                    </p>
                    <p>
                        <i>{part.description}</i>
                    </p>
                    <p>
                        required skills: {part.requirements.map(r => <span>{r}, </span>)}
                    </p>
                    {part.type}
                </div>
            )
    }

    return (
        <div>

        </div>
    )
}