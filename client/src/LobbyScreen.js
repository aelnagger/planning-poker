import React from 'react';
import Button from 'react-bootstrap/Button'

class LobbyScreen extends React.Component {

    constructor(props = {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            players: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const datum = {
            stage: "lobby",
            gameId: this.state.uuid,
            player: this.state.name,
            selection: "start-round",
        };

        this.props.webSocket.send(JSON.stringify(datum));
    }

    render() {
        return (
            <div>
            <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit}
        >
            Start Round
        </Button>
        </div>
        );
    }
}

export default LobbyScreen;