import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class MainContent extends React.Component {

    render() {

        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Приветствую Вас!</h1>
                        <p>Есть не заполненная анкета по Вашему предприятию. Хорошо бы её заполнить, но есть проблемка, которая в будущем конечно устранитсяю Это то, что анкета еще не подключена к этому проекту! Ну ни чего страшного, подождите, и будет Вам счастье!</p>
                    </Jumbotron>
                </Container>
            </>
        )
    }
}