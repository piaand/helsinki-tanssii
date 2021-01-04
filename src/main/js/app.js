import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import eventService from './services/events'

const Event = ({event}) => {
    if (event.name.fi !== undefined && event.name.fi !==null) {
        return (<p>{event.name.fi} : {event.event_dates[0].starting_day} : {event.event_dates[0].ending_day}</p>)
    } else if (event.name.en !== undefined && event.name.en !==null) {
        return (<p>{event.name.en}</p>)
    } else if (event.name.sv !== undefined && event.name.sv !==null) {
        return (<p>{event.name.sv}</p>)
    }
    return (<p>This event had no title</p>)
    
}

const Intro = ({events}) => {
    if (events !== undefined && events !== null) {

        return (
            <div>
                <p>Here are the events happening in Helsinki!</p>
                {events.map(event => 
                    <Event key={event.id} event={event}/>
                )}
            </div>
        ) 
    }
    return (<p>Fetching events...</p>)

}

const App = () => {
    const [events, setEvents] = useState([])
    
    const hook = () => {
        axios
            .get('/api/v1/events')
            .then(response => {
                const allEvents = eventService.parseEvents(response.data)
                console.log(allEvents)
                setEvents(allEvents)
            })
    }

    useEffect(hook, [])
    const data = events.data
    if (data !== undefined && data !== null) {
        console.log("Data found")
        if (data[0].name.fi !== undefined && data[0].name.fi !== null)
            console.log(data[0].name.fi)
    }
    
    return (
        <div>
            <Header />
            <h1>Helsinki Tanssii</h1>
            <Intro events={events} />
            <Footer />        
        </div>
    )
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)