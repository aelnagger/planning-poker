import React from 'react';

class ResultScreen extends React.Component {

    constructor(props = {}) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            players: []
        }
    }

    componentDidMount() {
        // Do stuff.
    }

    render() {
        return (
            <div>
                <button class="call-to-action">Start Round</button>
            </div>
        );
    }
}

export default ResultScreen;