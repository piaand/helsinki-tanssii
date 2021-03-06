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

const hasStartDate = (date) => checkValueDefined(date) && checkValueDefined(date.starting_day) && checkEventInFuture(date.starting_day)

const hasID = (id) => checkValueDefined(id)

const removeNonValidEvents = (events) => {
	const validEvents = events.filter(event => 
		checkNameDefined(event.name) && 
		checkNameLocale(event.name) && 
		hasStartDate(event.event_dates) &&
		hasID(event.id)
	)
	return validEvents
}

const modifyEventField = (event) => {
	const arrayDates = [event.event_dates]
	const modifiedEvent = {...event, event_dates : arrayDates}
	return modifiedEvent
}

const nameInList = (nameList, name) => {
	if (checkValueDefined(name)) {
		return nameList.includes(name)
	}
	return false
}

const removeDoubles = (arrayEvents, event) => {
	const namesFi = arrayEvents.map(event => event.name.fi)
	const namesEn = arrayEvents.map(event => event.name.en)
	const namesSv = arrayEvents.map(event => event.name.sv)

	if (!(nameInList(namesFi, event.name.fi) || nameInList(namesEn, event.name.en) || nameInList(namesSv, event.name.sv))) {
		const modifiedEvent = modifyEventField(event)
		return arrayEvents.concat(modifiedEvent)
	}
	return arrayEvents
}

const removeEventDoubles = (events) => events.reduce(removeDoubles, [])

const checkTheNameMatches = (name, target) => {
	if (checkValueDefined(name) && checkValueDefined(target)) {
		const res = name === target ? true : false
		return (res)
	}
	return false
}

const addEventData = (events, uniqueEvents) => {
	const extendedEvents = uniqueEvents.map(event => {
		const matches = events.filter(data => 
			checkTheNameMatches(event.name.fi, data.name.fi) ||
			checkTheNameMatches(event.name.en, data.name.en) ||
			checkTheNameMatches(event.name.sv, data.name.sv)
		)
		const newDates = matches.map(item => item.event_dates)
		return {...event, event_dates : newDates}
	})
	return extendedEvents
}

const getEventStartDates = (event) => {
	const dates = event.event_dates.map(date => date.starting_day)
	return dates
}

const checkWordExistsAndMatches = (word, target) => {
	const targetLowerCase = target.toLowerCase()
	if (checkValueDefined(word) && word.toLowerCase().includes(targetLowerCase)) {
		return true
	} else {
		return false
	}
}

const nameMatchesTarget = (name, target) => {
	if (checkWordExistsAndMatches(name.fi, target) || checkWordExistsAndMatches(name.en, target) || checkWordExistsAndMatches(name.sv, target)) {
		return true
	}
	return false
}

const addProcessingDate = (events) => {
	const processDate = new Date()
	const datedObject = {date:  processDate, eventsArray: events}
	return datedObject
}

const createEmptyEvents = () => ({date: new Date(), eventsArray: []})

const parseEvents = (events) => {
	console.log("At your service")
	if (events !== undefined && events !== null && events !== "") {
		const validEvents = removeNonValidEvents(events.data)
		const uniqueEvents = removeEventDoubles(validEvents)
		const formattedEvents = addEventData(validEvents, uniqueEvents)
		const final = addProcessingDate(formattedEvents)
		console.log(final)
		return final
	} else {
		console.log("No events found via API")
		const emptyEvents = createEmptyEvents()
		return emptyEvents
	}
}

export default {parseEvents, getEventStartDates, nameMatchesTarget}