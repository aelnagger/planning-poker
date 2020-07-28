import React from 'react';
import PlayerList from './PlayerList';
import JoiningInformation from './JoiningInformation';
import LobbyScreen from './LobbyScreen';
import CardSelectScreen from './CardSelectScreen';
import ResultScreen from './ResultScreen';
import IntroScreen from './IntroScreen';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';

class Game extends React.Component {
    constructor(props) {
        super(props);

        // By the time we get here, we should have a game Id.
        const uuid = props.match.params.uuid;

        this.state = {
            error: null,
            screen: "intro",
            isLoaded: false,
            uuid: uuid,
            webSocket: null,
        }
    }

    handleGameResponse(data) {
        this.setState({
            players: data
        });
    }

    componentDidMount() {
        const uuid = this.state.uuid;

        console.log("Opening websocket to server.");
        const webSocket = new WebSocket(`ws://${window.location.hostname}:5005/${uuid}`);

        webSocket.onmessage = (event) => {
            console.log("Got a websocket event!");
            console.log(event);

            if (event.data) {
                const datum = JSON.parse(event.data);
                console.log(datum);
                this.setState(datum);
            }
        };
        webSocket.onclose = (event) => {
            console.log("WebSocket was closed.");
            console.log(event);
        };
        webSocket.onopen = (event) => {
            console.log("Websocket has been opened.");
            console.log(event);

            // Initial player query.
            const datum = {
                stage: "query",
                gameId: uuid,
            };
            const payload = JSON.stringify(datum);
            webSocket.send(payload);
        };
        webSocket.onerror = (event) => {
            console.error('Websocket error occurred');
            console.error(event);
        };

        this.setState({webSocket: webSocket});
    }

    renderCurrentGameScreen() {
        const {screen} = this.state;
        switch (screen) {
            case "lobby":
                return <LobbyScreen {...this.state} />
            case "select":
                return <CardSelectScreen {...this.state} />
            case "result":
                return <ResultScreen {...this.state} />
            case "intro":
            default:
                return <IntroScreen {...this.state} />
        }
    }

    render () {
        /*
         * The game is made up of three main panels.
         * 1. The current screen of the game.
         * 2. The list of players.
         * 3. Joining information.
        */
        return (
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col>
                            {this.renderCurrentGameScreen()}
                        </Col>
                        <Col>
                            <PlayerList {...this.state} />
                        </Col>
                    </Row>
                    <Row>
                        <JoiningInformation {...this.state} />
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default Game;
