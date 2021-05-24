import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import TradeParticipantBuild from './TradeParticipantBuild';
import Server from '../server/server';
import ModalInfo from '../ModalInfo';

export default class TradeParticipant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showInfo: false,
            keyOtherNumberTrade: [],
            organizerId: [],
            dataOnTrade: []
        }
        this.sendKeyNameTrade = this.sendKeyNameTrade.bind(this);
        this.doChoiceTrade = this.doChoiceTrade.bind(this);
        this.doChangeShowModalInfo = this.doChangeShowModalInfo.bind(this);
        this.loadDataTrade = this.loadDataTrade.bind(this);

    }

    doChangeShowModalInfo() {
        this.setState({ showInfo: !this.state.showInfo })
    }

    //*выбранные торги
    doChoiceTrade(numberTrade, numberTradeId) {
        console.log(numberTrade);//номера вабранных торгов
        this.loadDataTrade(numberTrade, numberTradeId);

        setTimeout(() => { this.doChangeShowModalInfo(); console.log(this.state.dataOnTrade); }, 1500);
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

    sendKeyNameTrade() {
        this.dataD = [];
        this.dataId = [];

        if (this.props.keyOtherNumberTrade) {
            this.props.keyOtherNumberTrade.forEach(data => { //! error
                console.log(data.keyNameTrade);// test
                console.log(data.organizerId);// test
                this.dataD = [...this.dataD, data.keyNameTrade]
                this.dataId = [...this.dataId, data.organizerId]
            });
        }

        this.setState({ keyOtherNumberTrade: this.dataD, organizerId: this.dataId })
        setTimeout(() => { this.setState({ show: true }) }, 1000)
    }

    componentDidMount() {
        // this.setState({ keyOtherNumberTrade: this.props.keyOtherNumberTrade })
        this.sendKeyNameTrade();
    }

    render() {

        const keyNameTrade = this.state.keyOtherNumberTrade;
        const organizerId = this.state.organizerId;
        const showInfo = this.state.showInfo;

        return (
            <>
                { showInfo && <ModalInfo
                    onChangeShowModalInfo={this.doChangeShowModalInfo}
                    show={showInfo}
                    dataOnTrade={this.state.dataOnTrade}
                />}
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Площадка торгов</h1>
                        <p>Вы вошли на площадку торгов как УЧАСТНИК</p>

                        {this.state.show ?
                            <TradeParticipantBuild
                                keyNameTrade={keyNameTrade}
                                organizerId={organizerId}
                                onChoiceTrade={this.doChoiceTrade}


                            />
                            : ''
                        }
                    </Jumbotron>
                </Container>
            </>
        )
    }
}