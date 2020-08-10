import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class IntroScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            name: '',
            players: [],
            uuid: props.uuid,
            canSubmit: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {
        // Do stuff.
    }

    handleSubmit(event) {
        console.log(this.props.webSocket);

        const datum = {
            stage: "intro",
            gameId: this.state.uuid,
            player: this.state.name,
            selection: -1
        };

        this.props.webSocket.send(JSON.stringify(datum));

        event.preventDefault();
    }

    handleNameChange(event) {
        const name = event.target.value;
        this.setState({
            name: name,
            canSubmit: (name && 0 !== name.length),
        });
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter your name:</Form.Label>
                    <Form.Control type="text" placeholder="@you" value={this.state.name} onChange={this.handleNameChange}/>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={!this.state.canSubmit}
                >
                    Join
                </Button>
            </Form>
        );
    }
}

export default IntroScreen;