import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/esm/Card';
import Row from 'react-bootstrap/Row'

class ResultScreen extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // Do stuff.
    }

    computeAverage(players) {

        const sum = players.reduce(
            (accumulator, element) => {
                return accumulator + element.selection
            }, 0);

        // In the future, we can setup fancy rounding schemes to figure out tie-breaking.
        return sum / players.length;
    }

    handleClick() {
        const datum = {
            stage: "results",
            gameId: this.props.uuid,
            player: this.props.player,
            selection: "start-new-hand",
        };

        const payload = JSON.stringify(datum);
        this.props.webSocket.send(payload);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Estimate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.players.map(player => (
                                    <tr key={player.name + ".row"}>
                                        <td key={player.name + ".name"}>{player.name}:</td>
                                        <td key={player.name + ".selection"}>{player.selection}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Average</td>
                                    <td>{this.computeAverage(this.props.players)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Button onClick={this.handleClick}>Play New Hand</Button>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default ResultScreen;