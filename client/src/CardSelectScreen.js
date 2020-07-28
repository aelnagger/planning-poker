import React from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'



class CardSelectScreen extends React.Component {

    constructor(props = {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            players: []
        }
    }

    componentDidMount() {
        // Do stuff.
    }

    handleClick(event) {
        console.log(event);
    }

    render() {
        const cards = [
            {display: "?", value: -999},
            {display: "0", value: 0},
            {display: "1", value: 1},
            {display: "2", value: 2},
            {display: "3", value: 3},
            {display: "5", value: 5},
            {display: "∞", value :999},
        ];

        return (
            <div>
            <Row>
                <Col>
                <p>Waiting for input from all players.</p>
                </Col>
            </Row>
            <Row>
                <ButtonToolbar>
                    {cards.map(card => (
                        <ButtonGroup size="lg" className="mr-2" key={card.value}>
                            <Button size="lg" key={card.value} onClick={this.handleClick}>{card.display}</Button>
                        </ButtonGroup>
                    ))}
                </ButtonToolbar>
            </Row>
            </div>
        );
    }
}

export default CardSelectScreen;
