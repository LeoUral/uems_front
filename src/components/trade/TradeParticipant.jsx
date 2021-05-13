import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class TradeParticipant extends React.Component {

    render() {

        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Площадка торгов</h1>
                        <p>Вы вошли на площадку торгов как УЧАСТНИК</p>
                    </Jumbotron>
                </Container>
            </>
        )
    }
}