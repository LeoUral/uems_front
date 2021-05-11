import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class Search extends React.Component {

    render() {

        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Приветствую Вас!</h1>
                        <p>Тут будет блок поиска</p>

                    </Jumbotron>
                </Container>
            </>
        )
    }
}