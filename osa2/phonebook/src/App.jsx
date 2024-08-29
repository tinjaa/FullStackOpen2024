import { useEffect, useState } from 'react'
import personService from './services/PersonService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(persons => persons.name.trim().toLowerCase())
    const existingPerson = persons.find(person =>person.name.trim().toLowerCase() === newName.trim().toLowerCase())

    if (names.includes(newName.trim().toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        personService
        personService
        .update(existingPerson.id, newPerson)
        .then(() => {
          return personService.getAll();
        })
        .then(result => {
          setPersons(result);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
        showNotification(error.response.data.error,true)
  
        })
      }

    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`,false)
        }).catch(error => {
          showNotification(error.response.data.error,true)
    
        })
    }
  }

  const deletePerson = (name, id) => {
    const alert = `Are you sure you want to delete ${name}`
    console.log(alert)

    if (window.confirm(alert)) {
      personService.delete(id)
        .then(() => {
          personService.getAll().then(response => setPersons(response))
          showNotification(`${name} successfully deleted`,false)
        })
        .catch(error => {
          showNotification(`${name} was already deleted from the server`,true)
          personService.getAll().then(response => setPersons(response))
        })
    }
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const showNotification = (message, isError) => {
    setError(isError)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        error={error} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={filter} 
        deletePerson={deletePerson} />
    </div>
  )

}

export default App