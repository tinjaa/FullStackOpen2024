import React from 'react'

const Person = ({person, deletePerson}) => (
        <div>
            <span>{person.name} {person.number}</span>
            <button onClick={() => deletePerson(person.name, person.id)}>Delete</button>
        </div>
)

export default Person