import React from 'react';

import Card from 'react-bootstrap/Card'

class JoiningInformation extends React.Component {

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
        const location = window.location.href;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>Joining Information</Card.Title>
                    <Card.Text>
                        Share this link to invite others to join: <a href={location}>{location}</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default JoiningInformation;