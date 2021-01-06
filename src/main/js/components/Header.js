import React from 'react'
import Image from 'react-bootstrap/Image'
import { Container, Row } from 'react-bootstrap'

const Header = () => {
	return (
		<div className="header-img">
			<header className="header">
				<Container fluid>
					<Row>
						<h1 className="mainTitle">Helsinki Tanssii</h1>
					</Row>
					<Row>
						<h1 className="subTitle">Search engine for dance events in Helsinki and capital area of Finland</h1>
					</Row>
				</Container>
			</header>
		</div>
	)
}


export default Header