import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup'

class PlayerList extends React.Component {
    calculateVariant(selection) {
        if (this.props.screen !== "select") {
            return "";
        }

        if (selection == -1) {
            return "warning"
        }

        return "success";
    }

    render () {
        if (!this.props.players) {
            return <div>Loading...</div>
        }

        return (
            <ListGroup>
                {this.props.players.map(player => (
                    <ListGroup.Item
                        key={player.name}
                        variant={this.calculateVariant(player.selection)}
                    >
                        {player.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }
}

export default PlayerList;
