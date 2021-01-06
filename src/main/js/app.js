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
    const [eventFilter, setEventFilter] = useState('')
    const [todayFilter, setTodayFilter] = useState(false)
    const [tomorrowFilter, setTomorrowFilter] = useState(false)
    
    const hook = () => {
        const localData = localStorage.getItem('localEvents')
        if (localData && hasNotExpired(localData)) {
            console.log("Using local data!")
            console.log(JSON.parse(localData))
            setEvents(JSON.parse(localData))
        } else {
            axios
                .get('/api/v1/events')
                .then(response => {
                    const allEvents = eventService.parseEvents(response.data)
                    console.log(allEvents)
                    localStorage.setItem('localEvents', JSON.stringify(allEvents))
                    setEvents(allEvents)
                })
        }
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

    const hasNotExpired = (data) => {
        //check metadata and date when last called api
        return true
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
        const result = fitEvents.length === 0 ? false : true
        return result
    }
    
    const filterByPopularDates = () => {
        const currentDay = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
        const tomorrow = new Date(currentDay.getTime())
        tomorrow.setDate(tomorrow.getDate() + 1)
        //const currentDay = new Date("2021-05-20T00:00:00.000Z")
        if (events === null || events.length === 0) {
            return ''
        } else {
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
    const data = events.data
    return (
        <div>
            <Header />
            <h1>Helsinki Tanssii</h1>
            <SearchPanel handleEventFilter={handleEventFilter} eventFilter={eventFilter} filterToday={handleTodayButtonEvent} filterTomorrow={handleTomorrowButtonEvent} valueToday={todayFilter} valueTomorrow={tomorrowFilter}/>
            <EventList events={eventsToShow()} />
            <Footer />        
        </div>
    )
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)