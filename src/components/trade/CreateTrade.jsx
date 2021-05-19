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
            showCreateTrade: false, // вкл кнопки - создать торги
            renderTableCompany: [], // рендер таблицы компаний
            trade: {
                tech: [],
                commercial: [],
                date: [],
                participant: [],
                features: [],
                nameTrade: '',
                keyNameTrade: '',
                organizerId: ''
            }

        }
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.doSaveDataTrade = this.doSaveDataTrade.bind(this);
        this.doSaveDataCommercial = this.doSaveDataCommercial.bind(this);
        this.doSaveDataDate = this.doSaveDataDate.bind(this);
        this.doSaveDataParticipant = this.doSaveDataParticipant.bind(this);
        this.doRenderTable = this.doRenderTable.bind(this);
        this.doSaveDataFeatures = this.doSaveDataFeatures.bind(this);
        this.handleClickCreateTrade = this.handleClickCreateTrade.bind(this);
        this.verificationShow = this.verificationShow.bind(this);
    }

    handleClickCreateTrade() {
        // console.log('click -> create Trade');//test       

        let date = new Date();
        let dateTrade = this.state.trade;
        dateTrade.keyNameTrade = date.getTime();
        dateTrade.organizerId = localStorage.getItem('idUser');
        this.setState({ trade: dateTrade });
        setTimeout(() => {
            this.props.onCreateTrade(this.state.trade);
            this.handleClickShadow();
        }, 500);
        // setTimeout(() => { console.log(this.state.trade); console.log((this.state.trade.keyNameTrade)); })//test
    }

    async createTradeObject(data, name, id) {
        //todo написать функционал создания объекта на сервере с данными по trade
    }

    verificationShow() {

        let trade = this.state.trade;
        if (trade.tech.length > 2 && trade.commercial.length > 3 && trade.date.length > 3 && trade.participant.length > 1 && trade.features.length > 2 && trade.nameTrade.length > 0) this.setState({ showCreateTrade: true })
    }

    doSaveDataFeatures(data) {
        let fetData = this.state.trade;
        fetData.features = data;
        fetData.nameTrade = data[2].value;
        console.log(data[2].value);
        this.setState({ trade: fetData })
        setTimeout(() => { console.log(this.state.trade); this.verificationShow() });//test
    }

    doSaveDataParticipant(data) {
        let idData = this.state.trade;
        idData.participant = data;
        this.setState({ trade: idData })
        setTimeout(() => { console.log(this.state.trade); this.verificationShow() })//test
    }

    //рендер таблицы компаний
    doRenderTable(renderTable) {
        this.setState({ renderTableCompany: renderTable });
    }

    doSaveDataTrade(data) {
        let techData = this.state.trade;
        techData.tech = data;
        this.setState({ trade: techData })
        setTimeout(() => { console.log(this.state.trade); this.verificationShow() })//test
    }

    doSaveDataCommercial(data) {
        let comData = this.state.trade;
        comData.commercial = data;
        this.setState({ trade: comData })
        setTimeout(() => { console.log(this.state.trade); this.verificationShow() })//test
    }

    doSaveDataDate(data) {
        let dateData = this.state.trade;
        dateData.date = data;
        this.setState({ date: dateData })
        setTimeout(() => { console.log(this.state.trade); this.verificationShow() })//test
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
        const showCreateTrade = this.state.showCreateTrade;

        return (
            <>
                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <div className="form_main" >
                        <Alert variant="primary" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading >
                                Создание торгов
                                {showCreateTrade ?
                                    <Button
                                        variant="success"
                                        className="btn_trade_form"
                                        onClick={this.handleClickCreateTrade}
                                    >
                                        Создать торги
                                   </Button>
                                    : ''}
                            </Alert.Heading>
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
                            {showDate ?
                                <DateTrade
                                    onSaveDataDate={this.doSaveDataDate}
                                    value={this.state.trade.date}
                                /> : ''}
                            {showParticipant ?
                                <ParticipantTrade
                                    onSaveDataParticipant={this.doSaveDataParticipant}
                                    onRenderTable={this.doRenderTable}
                                    value={this.state.trade.participant}
                                    renderTable={this.state.renderTableCompany}
                                />
                                : ''}
                            {showFeatures ?
                                <FeaturesTrade
                                    onSaveDataFeatures={this.doSaveDataFeatures}
                                    value={this.state.trade.features}
                                />
                                : ''}
                        </Container>
                        <Row> &nbsp; </Row>
                    </ div>
                </ div>
            </>
        )
    }
}