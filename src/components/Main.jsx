import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }
    }

    render() {
        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Hello!</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, ratione! Obcaecati, dolores saepe alias distinctio delectus sunt, eaque explicabo corrupti assumenda rem, necessitatibus ut doloribus in nostrum officia vel maiores cumque. Incidunt minima beatae quidem possimus sunt nesciunt, distinctio pariatur.</p>
                    </Jumbotron>
                </Container>
            </>
        )
    }
}