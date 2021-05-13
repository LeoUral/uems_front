import React from 'react';
import { Jumbotron, Container, Row, Button, Col } from 'react-bootstrap';

export default class TradeCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }

        this.handleClickBtn = this.handleClickBtn.bind(this);
    }

    handleClickBtn(e) {
        console.log(e.target.dataset.index);
    }

    render() {

        return (
            <>
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Площадка торгов</h1>
                        <p>Вы вошли на площадку торгов как ЗАКАЗЧИК</p>
                        <Row></Row>
                        <Row> &nbsp; </Row>
                        <Row>
                            <Col>
                                <Button
                                    className="btn_trade_form"
                                    variant="outline-primary"
                                    data-index="trade"
                                    onClick={this.handleClickBtn}
                                >
                                    Данные по торгам
                                     </Button>
                                <Button
                                    className="btn_trade_form"
                                    variant="outline-primary"
                                    data-index="tech"
                                    onClick={this.handleClickBtn}
                                >
                                    Технические параметры торгов
                                       </Button>
                                <Button
                                    className="btn_trade_form"
                                    variant="outline-primary"
                                    data-index="commercial"
                                    onClick={this.handleClickBtn}
                                >
                                    Коммерческие параметры торгов
                                     </Button>
                                <Button
                                    className="btn_trade_form"
                                    variant="outline-primary"
                                    data-index="participant"
                                    onClick={this.handleClickBtn}
                                >
                                    Участники торгов
                                     </Button>
                                <Button
                                    className="btn_trade_form"
                                    variant="outline-primary"
                                    data-index="date"
                                    onClick={this.handleClickBtn}
                                >
                                    Дата начала торгов, время
            </Button>

                            </Col >
                        </Row >
                    </Jumbotron >
                </Container >
            </>
        )
    }
}