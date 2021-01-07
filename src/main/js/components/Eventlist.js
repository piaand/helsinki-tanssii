import React from 'react'
import { CardColumns, Card, Row, Container } from 'react-bootstrap'


const determineImage = (description) => {
    const eventImages = description.images
    if (eventImages && eventImages[0]) {
        return eventImages[0].url
    }
    return "/images/photo_filler.jpg"
} 

const determineEventName = (name) => {
    if (name.fi !== undefined && name.fi !==null) {
        return (<h1>{name.fi}</h1>)
    } else if (name.en !== undefined && name.en !==null) {
        return (<h1>{name.en}</h1>)
    } else {
        return (<h1>{name.sv}</h1>)
    }
}

const Results = ({ text }) => (<Container className="resultRow">{text}</Container>)

const Event = ({event}) => {
    const imagePath = determineImage(event.description)
    const eventName = determineEventName(event.name)
    return (
        <Card className="event-card">
            <Card.Img variant="top" src={imagePath} />
            <Card.Body>
                <Card.Title>{eventName}</Card.Title>
                <Card.Text>
                    {event.description.intro}
                    <br></br>
                    <br></br>
                    <a href={event.info_url}>Link to event details</a>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{event.location.address.street_address}, {event.location.address.locality}</small>
            </Card.Footer>
        </Card>
    )
}

const EventList = ({events}) => {    
    if (events === '') {
		return (<Results text={"Fetching events ..."}/>)
	} else if (events.length === 0) {
		return (<Results text={"No events - try with loser seach restrcitions"}/>)
	} else {
		return (
            <Container>
                <Results text={"Here are the events happening in Helsinki!"}/>
                <CardColumns>
                    {events.map(event => 
                        <Event key={event.id} event={event}/>
                    )}
                </CardColumns>
            </Container>
        )
	}
}

export default EventList
//<span>Photo by <a href="https://unsplash.com/@soymeraki?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Javier Allegue Barros</a> on <a href="https://unsplash.com/s/photos/evening?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>