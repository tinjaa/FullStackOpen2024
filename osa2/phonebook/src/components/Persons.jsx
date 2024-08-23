import React from "react";
import Person from "./Person";

const Persons = ({ persons, filter, deletePerson }) => {
    return (
        <div>
            {persons.map((person) => {
                if (filter.length === 0 || person.name.trim().toLowerCase().search(filter.trim().toLowerCase()) !== -1) {
                    return (
                        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.name, person.id)} />
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default Persons