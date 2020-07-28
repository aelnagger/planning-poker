import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup'

class PlayerList extends React.Component {
    render () {
        if (!this.props.players) {
            return <div>Loading...</div>
        }

        return (
            <ListGroup>
                {this.props.players.map(player => (<ListGroup.Item key={player.name} >{player.name}</ListGroup.Item>))}
            </ListGroup>
        );
    }
}

export default PlayerList;
