import React from 'react'

const Button = ( { effect, buttonOn, text} ) => {
    return (
        <button onClick={effect}>{buttonOn ? 'Remove filter' : text}</button>
    )
}

const ButtonSwitch = ( { effect, effect_tmrw, todayFilter, tomorrowFilter} ) => {
    const todayButtonText = "Show events today"
    const tomorrowButtonText = "Show events tomorrow"
    return (
        <div>
            <Button effect={effect} buttonOn={todayFilter} text={todayButtonText} />
            <Button effect={effect_tmrw} buttonOn={tomorrowFilter} text={tomorrowButtonText} />
        </div>
    )
}

const DescriptionFinder = ({ eventFilter, handleEventFilter }) => {

	return (
		<div>
			<form> Search by event name: 
				<input onChange={handleEventFilter} value={eventFilter}></input>
			</form>
		</div>
	)
}

const SearchPanel = ( {eventFilter, handleEventFilter, filterToday, valueToday, filterTomorrow, valueTomorrow} ) => {
    return (
        <div>
			<p>Filter the events below</p>
			<DescriptionFinder eventFilter={eventFilter} handleEventFilter={handleEventFilter}/>
            <ButtonSwitch effect={filterToday} effect_tmrw={filterTomorrow} todayFilter={valueToday} tomorrowFilter={valueTomorrow}/>
            
        </div>
    )
}

export default SearchPanel