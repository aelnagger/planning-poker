import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class CardSelectScreen extends React.Component {

    handleClickFactory(value) {
        return (event) => {
            const datum = {
                stage: "select",
                gameId: this.props.uuid,
                player: this.props.player,
                selection: value
            };

            this.props.webSocket.send(JSON.stringify(datum));
        };
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
                            <Button size="lg" key={card.value} onClick={this.handleClickFactory(card.value)}>{card.display}</Button>
                        </ButtonGroup>
                    ))}
                </ButtonToolbar>
            </Row>
            </div>
        );
    }
}

export default CardSelectScreen;
