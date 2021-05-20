import React from 'react';
import Server from '../server/server';
import { Button } from 'react-bootstrap';

export default class TradeCustomerBuild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            base: []
        }
        this.getDataTrade = this.getDataTrade.bind(this);
        this.getBuildTrade = this.getBuildTrade.bind(this);
        this.renderTrade = this.renderTrade.bind(this);
        this.handleClickBuildTrade = this.handleClickBuildTrade.bind(this);
    }

    handleClickBuildTrade(e) {
        // console.log('Выбранные торги');
        // console.log(e.target.dataset.key);
        this.props.onChoiceTrade(e.target.dataset.key);
    }

    //*получаем данные по торгам с сервера согласно keyNameTrade
    getBuildTrade(arrData) {
        arrData.forEach(data => {
            this.getDataTrade(+data, localStorage.getItem('idUser'))
        })
    }

    async getDataTrade(name, id) {
        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then(result => {
            console.log(result);//test
            this.renderTrade(result);
        }).catch(result => {
            console.log('ERROR');
            console.log(result);
        })
    }

    renderTrade(data) {

        let dateD = (data.date[1].value).split('T');
        let date = dateD[0];


        this.setState({
            base: [...this.state.base,
            <React.Fragment key={data.keyNameTrade}>
                <Button
                    data-key={data.keyNameTrade}
                    variant="info"
                    className="btn_form"
                    onClick={this.handleClickBuildTrade}
                >
                    <span data-key={data.keyNameTrade} style={{ display: 'block' }} > {data.nameTrade}</span>
                    <span data-key={data.keyNameTrade} style={{ display: 'block' }}>Дата торгов: {date}</span>
                    <span data-key={data.keyNameTrade} style={{ display: 'block' }}> Время начала: {data.date[2].value}</span>
                </Button>
            </React.Fragment>
            ]
        })

    }

    componentDidMount() {
        this.getBuildTrade(this.props.keyNameTrade);
    }

    render() {

        return (
            <>
                {this.state.base}
            </>
        )
    }
}