import React from 'react'

const checkValueDefined = (value) => value !== undefined && value !== null

const checkNameLocale = (name) => checkValueDefined(name.fi) || checkValueDefined(name.en) || checkValueDefined(name.sv)

const checkNameDefined = (name) => checkValueDefined(name)

const checkEventInFuture = (date) => {
	const eventDate = new Date(date)
	const currentDate = new Date()
	const valid = eventDate >= currentDate ? true : false
	return (valid)
}

const hasStartDate = (date) => checkValueDefined(date.starting_day) && checkEventInFuture(date.starting_day)

const hasID = (id) => checkValueDefined(id)

const removeNonValidEvents = (events) => {
	const validEvents = events.filter(
							event => checkNameDefined(event.name) && 
							checkNameLocale(event.name) && 
							hasStartDate(event.event_dates) &&
							hasID(event.id))
	return validEvents
}

/*
const removeEventDoubles = (events) => {

}
*/

const parseEvents = (events) => {
	console.log("At your service")
	console.log(events)
	const validEvents = removeNonValidEvents(events.data)
	//const uniqueEvents = removeEventDoubles(validEvents)
	return validEvents
}

export default {parseEvents}