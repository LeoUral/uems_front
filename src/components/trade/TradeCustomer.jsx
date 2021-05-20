import React from 'react';
import { Jumbotron, Container, Row, Button, Col, Form, Alert } from 'react-bootstrap';
import CreateTrade from './CreateTrade';
import TradeCustomerBuild from './TradeCustomerBuild';
import ModalInfo from '../ModalInfo';
import Server from '../server/server';

export default class TradeCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTrade: false,
            showInfo: false,
            dataOnTrade: []
        }

        this.handleClickBtn = this.handleClickBtn.bind(this);
        this.doChangeShowTrade = this.doChangeShowTrade.bind(this);
        this.doCreateTrade = this.doCreateTrade.bind(this);
        this.doChoiceTrade = this.doChoiceTrade.bind(this);
        this.doChangeShowModalInfo = this.doChangeShowModalInfo.bind(this);
        this.loadDataTrade = this.loadDataTrade.bind(this);
    }

    doChangeShowModalInfo() {
        this.setState({ showInfo: !this.state.showInfo })
    }

    //*выбранные торги
    doChoiceTrade(numberTrade) {
        console.log(numberTrade);//номера вабранных торгов
        this.loadDataTrade(numberTrade, localStorage.getItem('idUser'));

        setTimeout(() => { this.doChangeShowModalInfo(); console.log(this.state.dataOnTrade); }, 1000);
    }

    async loadDataTrade(name, id) {
        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then(result => {
            console.log(result);//test
            this.setState({ dataOnTrade: result });
        }).catch(result => {
            console.log('ERROR:');
            console.log(result);
        })
    }

    doCreateTrade(data) {
        console.log('Create TRADE ->');
        console.log(data);
        this.props.onCreateTrade(data);
    }

    doChangeShowTrade() {
        this.setState({ showTrade: false })
    }

    handleClickBtn(e) {
        console.log(e.target.dataset.index);
        if (e.target.dataset.index === 'trade') this.setState({ showTrade: true })
    }

    render() {

        const showTrade = this.state.showTrade;
        const keyNameTrade = this.props.keyNameTrade;
        const showInfo = this.state.showInfo;

        return (
            <>
                <CreateTrade
                    show={this.state.showTrade}
                    onChangeShowTrade={this.doChangeShowTrade}
                    onCreateTrade={this.doCreateTrade}
                />

                { showInfo && <ModalInfo
                    onChangeShowModalInfo={this.doChangeShowModalInfo}
                    show={showInfo}
                    dataOnTrade={this.state.dataOnTrade}
                />}

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
                                    Создать торги
                                     </Button>

                            </Col >
                        </Row>
                        <Row> &nbsp; </Row>
                        <Row>
                            <Col>
                                Созданные торги:
                            </Col>
                        </Row >
                        <Row>
                            <Col>
                                <TradeCustomerBuild
                                    keyNameTrade={keyNameTrade}
                                    onChoiceTrade={this.doChoiceTrade}
                                />
                            </Col>
                        </Row>
                    </Jumbotron >
                </Container >
            </>
        )
    }
}