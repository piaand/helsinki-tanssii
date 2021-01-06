import React from 'react'
import { Jumbotron, Container, Row } from 'react-bootstrap'

const Button = ( { effect, buttonOn, text} ) => {
    return (
        <button className="btn btn-secondary" onClick={effect}>{buttonOn ? 'Remove filter' : text}</button>
    )
}

const ButtonSwitch = ( { effect, effect_tmrw, todayFilter, tomorrowFilter} ) => {
    const todayButtonText = "Show events today"
    const tomorrowButtonText = "Show events tomorrow"
    return (
        <Row >
			<div className="filterButtons">
				<Button effect={effect} buttonOn={todayFilter} text={todayButtonText} />&nbsp;
				<Button effect={effect_tmrw} buttonOn={tomorrowFilter} text={tomorrowButtonText} />
			</div>
        </Row>
    )
}

const DescriptionFinder = ({ eventFilter, handleEventFilter }) => {

	return (
		<Row>
			<form className="searchBar"> 
				<p className="searchField">Search by event name:</p><input onChange={handleEventFilter} value={eventFilter}></input>
			</form>
		</Row>
	)
}

const SearchPanel = ( {eventFilter, handleEventFilter, filterToday, valueToday, filterTomorrow, valueTomorrow} ) => {
    return (
        <div>
			<Jumbotron className="searchPanel">
				<Container><p>Filter the events below</p></Container>
				<Container>
					<DescriptionFinder eventFilter={eventFilter} handleEventFilter={handleEventFilter}/>
					<ButtonSwitch effect={filterToday} effect_tmrw={filterTomorrow} todayFilter={valueToday} tomorrowFilter={valueTomorrow}/>
				</Container>
			</Jumbotron>
            
        </div>
    )
}

export default SearchPanel