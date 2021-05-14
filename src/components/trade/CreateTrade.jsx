import React from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import TechDataTrade from './TechDataTrade';


export default class CreateTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            showTech: false

        }
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(e.target.dataset.index);
        if (e.target.dataset.index === 'tech') {
            this.setState({ showTech: true })
        } else {
            this.setState({ showTech: false })
        }
    }

    handleClickShadow() {
        this.props.onChangeShowTrade();
    }

    componentDidMount() {

    }

    render() {

        const show = this.props.show;
        const showTech = this.state.showTech;

        return (
            <>
                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <div className="form_main" >
                        <Alert variant="primary" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Создание торгов </Alert.Heading>
                        </Alert>
                        <Container>
                            <Button
                                variant="primary"
                                className="btn_trade_form"
                                data-index="tech"
                                onClick={this.handleClick}
                            >
                                Технические параметры торгов
                            </Button>

                            <Button
                                variant="primary"
                                className="btn_trade_form"
                                data-index="comercial"
                                onClick={this.handleClick}
                            >
                                Коммерческие параметры торгов
                            </Button>

                            <Button
                                variant="primary"
                                className="btn_trade_form"
                                data-index="date"
                                onClick={this.handleClick}
                            >
                                Дата, время начала торгов
                            </Button>

                            <Button
                                variant="primary"
                                className="btn_trade_form"
                                data-index="participant"
                                onClick={this.handleClick}
                            >
                                Выбрать участников торгов
                            </Button>

                            <Button
                                variant="primary"
                                className="btn_trade_form"
                                data-index="features"
                                onClick={this.handleClick}
                            >
                                Особенности торгов, рубрика
                            </Button>

                        </ Container>
                        <Row> &nbsp; </Row>
                        <Container>
                            {showTech ? <TechDataTrade /> : ''}
                        </Container>
                        <Row> &nbsp; </Row>
                    </ div>
                </ div>
            </>
        )
    }
}