import React from 'react'

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

const EventList = ({events}) => {
	if (events === '') {
		return (<p>Fetching events...</p>)
	} else if (events.length === 0) {
		return (<p>No events - try with loser seach restrcitions</p>)
	} else {
		return (
            <div>
                <p>Here are the events happening in Helsinki!</p>
                {events.map(event => 
                    <Event key={event.id} event={event}/>
                )}
            </div>
        )
	}
}

export default EventList