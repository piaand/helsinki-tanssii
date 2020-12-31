import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
    const [events, setEvents] = useState([])
    
    const hook = () => {
        axios
            .get('/api/v1/events')
            .then(response => {
                setEvents(response.data)
                console.log(response.data)
            })
    }

    useEffect(hook, [])
    const names = events.name
    if (names !== undefined && names !== null) {
        console.log(names.fi)
    }
    
    return (
        <div>
            <h3>REACT is WORKING MAYBE nooot</h3>
            <p>{events.info_url}</p>
            <p>{events.id}</p>
            
        </div>
    )
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)