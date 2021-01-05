import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import EventList from './components/Eventlist'
import SearchPanel from './components/SearchPanel'
import eventService from './services/events'


const App = () => {
    const [events, setEvents] = useState([])
    const [todayFilter, setTodayFilter] = useState(false)
    const [tomorrowFilter, setTomorrowFilter] = useState(false)
    
    const hook = () => {
        axios
            .get('/api/v1/events')
            .then(response => {
                const allEvents = eventService.parseEvents(response.data)
                console.log(allEvents)
                setEvents(allEvents)
            })
    }

    const handleTodayButtonEvent = () => {
        const configTodayFilter = !todayFilter
        if (configTodayFilter && tomorrowFilter) {
            setTomorrowFilter(!tomorrowFilter)
        }
        setTodayFilter(configTodayFilter)
    }

    const handleTomorrowButtonEvent = () => {
        const configTomorrowFilter = !tomorrowFilter
        if (configTomorrowFilter && todayFilter) {
            setTodayFilter(!todayFilter)
        }
        setTomorrowFilter(configTomorrowFilter)
    }

    const eventIsBetweenDates = (start, end, eventDate) =>  {
        console.log(start)
        console.log(eventDate)
        console.log(end)
        if (eventDate >= start && eventDate < end) {
            return true
        }
        console.log('returning false')
        return false
    }
 
    const hasEventOnDay = (event, day) => {
        const bufferDay = new Date(day.getTime())
        bufferDay.setDate(bufferDay.getDate() + 1)
        const stringDates  = eventService.getEventStartDates(event)
        const fitEvents = stringDates.filter(eventDay => eventIsBetweenDates(new Date(day), new Date(bufferDay), new Date(eventDay)))
        const result = fitEvents.length === 0 ? false : true
        return result
    }
    
    const eventsToShow = () => {
        const currentDay = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
        const tomorrow = new Date(currentDay.getTime())
        tomorrow.setDate(tomorrow.getDate() + 1)
        //const currentDay = new Date("2021-05-20T00:00:00.000Z")
        console.log(currentDay)
        if(todayFilter) {
            const todayEvents = events.filter(event => hasEventOnDay(event, new Date(currentDay)))
            return todayEvents
        } else if (tomorrowFilter) {
            const tomorrowEvents = events.filter(event => hasEventOnDay(event, new Date(tomorrow)))
            return tomorrowEvents
        } else {
            return events
        }
    }

    useEffect(hook, [])
    const data = events.data
    return (
        <div>
            <Header />
            <h1>Helsinki Tanssii</h1>
            <SearchPanel filterToday={handleTodayButtonEvent} filterTomorrow={handleTomorrowButtonEvent} valueToday={todayFilter} valueTomorrow={tomorrowFilter}/>
            <EventList events={eventsToShow()} />
            <Footer />        
        </div>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)