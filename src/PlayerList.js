import React from 'react';

class PlayerList extends React.Component {
    constructor(props = {}) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            players: props.players ?? []
        };
    }

    componentDidMount() {
        // Any async logic we want to have done.
    }

    render () {
        const {error, isLoaded, players} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        }

        return (
            <ul>
                {players.map(player => (<li class={player.class??""} >{player.name}</li>))}
            </ul>
        );
    }
}

export default PlayerList;