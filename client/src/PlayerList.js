import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup'

class PlayerList extends React.Component {
    constructor(props = {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            players: props.players || []
        };
    }

    componentDidMount() {
        if (!!this.state.players) {
            this.setState({isLoaded: true});
        }
    }

    render () {
        const {error, isLoaded, players} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }

        return (
            <ListGroup>
                
                {players.map(player => (<ListGroup.Item key={player.name} >{player.name}</ListGroup.Item>))}
            </ListGroup>
        );
    }
}

export default PlayerList;