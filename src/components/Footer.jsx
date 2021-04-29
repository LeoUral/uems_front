import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';


export default class Footer extends React.Component {
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
                    <Jumbotron style={{ backgroundColor: '#6c757d' }}>
                        <p>Разработано в LOTUS &copy;</p>
                    </Jumbotron>
                </Container>
            </>
        )
    }
}