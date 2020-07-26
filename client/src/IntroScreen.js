import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class IntroScreen extends React.Component {

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
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter your name:</Form.Label>
                    <Form.Control type="text" placeholder="@you" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Join
                </Button>
            </Form>
        );
    }
}

export default IntroScreen;