import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default class MainContent extends React.Component {

    render() {

        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Приветствую Вас!</h1>
                        <p>Есть не заполненная анкета по Вашему предприятию. Хорошо бы её заполнить...</p>
                        <p> Пройти до Анкеты: Данные компании &#10144; Анкета </p>

                        {this.props.showTrade ?
                            <h4> У Вас есть приглашения на торги! </h4>
                            :
                            <h5> Сейчас у Вас нет приглашений на торги. </h5>
                        }
                    </Jumbotron>
                </Container>
            </>
        )
    }
}