import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge } from 'react-bootstrap';
import TechDataTradeAdd from './TechDataTradeAdd';

export default class ParticipantTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: []
        }

        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    handleClickSave() {
        console.log('click SAVE');
    }

    doChangeValue(data) {
        console.log(data);
    }

    handleClickAdd() {
        this.setState({
            base: [...this.state.base,
            <React.Fragment key={this.state.id}>
                <TechDataTradeAdd
                    onChangeValue={this.doChangeValue}
                    id={this.state.id}
                />
            </React.Fragment>
            ],
            id: +this.state.id + 2
        })
        setTimeout(() => { console.log(this.state.id + ' <- ADD ID'); })
    }

    componentDidMount() {
        this.handleClickAdd();
    }

    render() {

        return (
            <>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Участники торгов <Badge variant="danger">Невыбраны</Badge>
                            </h4>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Button
                        variant="secondary"
                        className="btn_trade_form"
                        onClick={this.handleClickAdd}
                    >
                        Добавить позицию
                         </Button>
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