import React from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import TechDataTrade from './TechDataTrade';
import CommercialTrade from './CommercialTrade';
import DateTrade from './DateTrade';
import ParticipantTrade from './ParticipantTrade';
import FeaturesTrade from './FeaturesTrade';


export default class CreateTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            showTech: false,
            showCommercial: false,
            showDate: false,
            showParticipant: false,
            showFeatures: false,
            trade: {
                tech: [],
                commercial: [],
                date: [],
                participant: [],
                features: [],
                nameTrade: ''
            }

        }
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.doSaveDataTrade = this.doSaveDataTrade.bind(this);
        this.doSaveDataCommercial = this.doSaveDataCommercial.bind(this);
    }

    doSaveDataTrade(data) {
        let techData = this.state.trade;
        techData.tech = data;
        this.setState({ trade: techData })
        setTimeout(() => { console.log(this.state.trade) })
    }

    doSaveDataCommercial(data) {
        let comData = this.state.trade;
        comData.commercial = data;
        this.setState({ trade: comData })
        setTimeout(() => { console.log(this.state.trade) })
    }

    handleClick(e) {
        console.log(e.target.dataset.index);

        if (e.target.dataset.index === 'tech') {
            this.setState({ showTech: true })
        } else {
            this.setState({ showTech: false })
        }

        if (e.target.dataset.index === 'commercial') {
            this.setState({ showCommercial: true })
        } else {
            this.setState({ showCommercial: false })
        }

        if (e.target.dataset.index === 'date') {
            this.setState({ showDate: true })
        } else {
            this.setState({ showDate: false })
        }

        if (e.target.dataset.index === 'participant') {
            this.setState({ showParticipant: true })
        } else {
            this.setState({ showParticipant: false })
        }

        if (e.target.dataset.index === 'features') {
            this.setState({ showFeatures: true })
        } else {
            this.setState({ showFeatures: false })
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
        const showCommercial = this.state.showCommercial;
        const showDate = this.state.showDate;
        const showParticipant = this.state.showParticipant;
        const showFeatures = this.state.showFeatures;

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
                                data-index="commercial"
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
                            {showTech ?
                                <TechDataTrade
                                    onSaveDataTrade={this.doSaveDataTrade}
                                    value={this.state.trade.tech}
                                /> : ''}
                            {showCommercial ?
                                <CommercialTrade
                                    onSaveDataCommercial={this.doSaveDataCommercial}
                                    value={this.state.trade.commercial}
                                /> : ''}
                            {showDate ? <DateTrade /> : ''}
                            {showParticipant ? <ParticipantTrade /> : ''}
                            {showFeatures ? <FeaturesTrade /> : ''}
                        </Container>
                        <Row> &nbsp; </Row>
                    </ div>
                </ div>
            </>
        )
    }
}