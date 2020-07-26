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
            players: [
                {name: "Adam", selected: 2},
                {name: "Alicia", selected: null},
            ],
        }
    }

    handleGameResponse(data) {
        console.log(data);
        this.setState({
            players: data
        });
    }

    componentDidMount() {
        const uuid = this.state.uuid;
        fetch(`/api/${uuid}`)
            .then(r => r.json())
            .then(r => this.handleGameResponse(r));
    }

    renderCurrentGameScreen() {
        const {screen} = this.props;
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
        const {screen, players, gameKey} = this.state;

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
