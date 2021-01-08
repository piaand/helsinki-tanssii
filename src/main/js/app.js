import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import EventList from './components/Eventlist'
import SearchPanel from './components/SearchPanel'
import eventService from './services/events'



const App = () => {
    const [events, setEvents] = useState([])
    const [eventFilter, setEventFilter] = useState('')
    const [todayFilter, setTodayFilter] = useState(false)
    const [tomorrowFilter, setTomorrowFilter] = useState(false)
    
    const hook = () => {
        const localData = localStorage.getItem('localEvents')
        if (localData && !(hasExpired(localData))) {
            setEvents(JSON.parse(localData))
        }
        axios
            .get('/api/v1/events')
            .then(response => {
                const allEvents = eventService.parseEvents(response.data)
                console.log(allEvents)
                localStorage.setItem('localEvents', JSON.stringify(allEvents))
                setEvents(allEvents)
            })
    }

    const handleEventFilter = (event) => {
        setEventFilter(event.target.value)
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

    const hoursToMillis = (hours) => {
        return (hours * 60 * 60 * 1000)
    }

    const hasExpired = (data) => {
        const expirationInMilliseconds = hoursToMillis(6);
        const currentDay = new Date()
        const processDate = new Date(JSON.parse(data).date)
        const diffTime = Math.abs(currentDay - processDate);
        return diffTime > expirationInMilliseconds ? true : false
    }

    const eventIsBetweenDates = (start, end, eventDate) =>  {
        if (eventDate >= start && eventDate < end) {
            return true
        }
        return false
    }
 
    const hasEventOnDay = (event, day) => {
        const bufferDay = new Date(day.getTime())
        bufferDay.setDate(bufferDay.getDate() + 1)
        const stringDates  = eventService.getEventStartDates(event)
        const fitEvents = stringDates.filter(eventDay => eventIsBetweenDates(new Date(day), new Date(bufferDay), new Date(eventDay)))
        return fitEvents.length === 0 ? false : true
    }
    
    const filterByPopularDates = () => {
        const currentDay = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
        const tomorrow = new Date(currentDay.getTime())
        tomorrow.setDate(tomorrow.getDate() + 1)
        const allEvents = (events !== undefined && events !== null) ? events.eventsArray : null
        //const currentDay = new Date("2021-05-20T00:00:00.000Z")
        if (allEvents === undefined || allEvents === null || allEvents.length === 0) {
            return ''
        } else {
            if(todayFilter) {
                const todayEvents = allEvents.filter(event => hasEventOnDay(event, new Date(currentDay)))
                return todayEvents
            } else if (tomorrowFilter) {
                const tomorrowEvents = allEvents.filter(event => hasEventOnDay(event, new Date(tomorrow)))
                return tomorrowEvents
            } else {
                return allEvents
            }
        }
    }

    const filterBySearch = (events) => {
        const matchByName = events.filter(event => eventService.nameMatchesTarget(event.name, eventFilter))
        return matchByName
    }

    const eventsToShow = () => {
        const filteredByDay = filterByPopularDates()
        if (eventFilter.trim().length !== 0 && filteredByDay !== '' && filteredByDay.length !== 0) {
            const filteredBySearch = filterBySearch(filteredByDay)
            return filteredBySearch
        }
        return filteredByDay
    }

    useEffect(hook, [])
    return (
        <>
            <Header />
            <SearchPanel handleEventFilter={handleEventFilter} eventFilter={eventFilter} filterToday={handleTodayButtonEvent} filterTomorrow={handleTomorrowButtonEvent} valueToday={todayFilter} valueTomorrow={tomorrowFilter}/>
            <EventList events={eventsToShow()} />
            <Footer />        
        </>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

       