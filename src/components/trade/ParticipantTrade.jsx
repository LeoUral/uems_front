import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge, Jumbotron } from 'react-bootstrap';
import SearchModal from '../search/SearchModal';

export default class ParticipantTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: []
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.doChangeShow = this.doChangeShow.bind(this);
    }

    doChangeShow() {
        this.setState({ show: !this.state.show })
    }

    handleClickSave() {
        console.log('click SAVE');
    }

    doChangeValue(data) {
        console.log(data);
    }


    componentDidMount() {
    }

    render() {

        const show = this.state.show;

        return (
            <>
                <div style={{ position: 'absolute', left: '0', top: '-10%' }} >
                    <SearchModal
                        show={show}
                        onChangeShow={this.doChangeShow}
                    />
                </div>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Участники торгов <Badge variant="danger">Невыбраны</Badge>
                            </h4>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Container fluid style={{ padding: '0' }}>
                        <Jumbotron style={{ marginBottom: '0', minHeight: '20vh' }}>
                            <h1>Блок поиска по предприятиям в базе LOTUS</h1>
                            <Button variant="outline-secondary" onClick={this.doChangeShow} > Запустить форму поиска </Button>
                        </Jumbotron>
                    </Container>
                    <Button
                        variant="warning"
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                    >
                        Сохранить параметры
                           </Button>

                </Container>
            </>
        )
    }
}