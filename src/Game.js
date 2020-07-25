import React from 'react';
import PlayerList from './PlayerList';
import JoiningInformation from './JoiningInformation';
import LobbyScreen from './LobbyScreen';
import CardSelectScreen from './CardSelectScreen';
import ResultScreen from './ResultScreen';
import IntroScreen from './IntroScreen';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css';

class Game extends React.Component {
    constructor(props = {}) {
        super();
        this.state = {
            error: null,
            screen: "intro",
            isLoaded: false,
            players: [
                {name: "Adam", selected: 2},
                {name: "Alicia", selected: null},
            ],
        }
    }

    componentDidMount() {
        // TODO - connect to the API service to get game state.
    }

    renderCurrentGameScreen() {
        const {screen} = this.props;
        switch (screen) {
            case "lobby":
                return <LobbyScreen props={this.props} />
            case "select":
                return <CardSelectScreen props={this.props} />
            case "result":
                return <ResultScreen props={this.props} />
            case "intro":
            default:
                return <IntroScreen props={this.props} />
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
                    {this.renderCurrentGameScreen()}
                    <PlayerList props={this.props} />
                    <JoiningInformation props={this.props} />
                </Container>
            </Jumbotron>
        );
    }
}

export default Game;
