import React from 'react'
import Country from './Country';

const Countries = (props) => {
    if (props.filter === '' || props.countries.length === 0)
        return (
            <div></div>
        )
        
    else if (props.countries.length > 10)
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    else if (props.countries.length === 1)
        return (
            <Country country={props.countries[0]}/>
        )

    else
        return (
            <div>
                <ul>
                    {props.countries.map(country =>
                        <li key={country.name.common}>
                            {country.name.common}
                            <button onClick={() => {
                                props.setFilter(country.name.common)
                            }
                            }> Show </button>                           
                        </li>
                        )}
                </ul>
            </div>
        )


}

export default Countries