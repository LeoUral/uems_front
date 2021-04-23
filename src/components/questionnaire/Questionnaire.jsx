/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Form_Main from './Form_Main';
import Server from '../server/server';
import _Sample from './_Sample';


export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show: false,
            arrayName: ['Main', 'One'],
            data_Main: [],
            view_Main: false
        }

        this.createDataServer = this.createDataServer.bind(this);
        this.sendDataServer = this.sendDataServer.bind(this);
        this.doCreateDataServer = this.doCreateDataServer.bind(this);
        this.doUpdateDataOnServer = this.doUpdateDataOnServer.bind(this);
        this.doGetDataFromServer = this.doGetDataFromServer.bind(this);
        this.writeParseData = this.writeParseData.bind(this);
        this.handleClickView = this.handleClickView.bind(this);
        this.doChangeView = this.doChangeView.bind(this);
    }

    //*закрывает форму по нажатию на фон
    doChangeView(name) {
        this.setState({ view_Main: !this.state.view_Main })
    }

    //* открывает загружает для выбранной формы данные с сервера и открывает форму
    handleClickView(e) {
        this.doGetDataFromServer(e.target.dataset.name, Number(localStorage.getItem('idUser')));
        setTimeout(() => {
            if (e.target.dataset.name === 'Main') this.setState({ view_Main: !this.state.view_Main })
        }, 500)
    }

    doGetDataFromServer(name, id) {
        this.getDataFromServer(name, id);
    }

    doCreateDataServer(data, name, id) {
        this.createDataServer(data, name, id);
    }

    doUpdateDataOnServer(data, name, id) {
        this.sendDataOnServer(data, name, id);
    }

    //*Создаем новые данные на сервере
    async createDataServer(data, name, id) {

        new Promise((resolve) => {
            resolve(Server.createDataOnServer(JSON.stringify(data), name, id))
        }).then((result) => {
            console.log("ALL OK: CREATE data on Server");
            console.log(result);
        }).catch(result => {
            console.log('ERROR: NOT create data on Server');
            console.log(result);
        })
    }

    //*Обновляем данные на сервере
    async sendDataServer(data, name, id) {

        new Promise((resolve) => {
            resolve(Server.sendDataOnServer(JSON.stringify(data), name, id))
        }).then(result => {
            console.log("ALL OK: UPDATE data on Server");
            console.log(result);
        }).catch(result => {
            console.log("ERROR: NOT update data on Server");
            console.log(result);
        })
    }

    //*парсинг данных с сервера
    writeParseData(dataJson, name) {
        let dataNew = [];
        dataJson.forEach((data) => {
            dataNew = [...dataNew, { id: data.id, description: data.description, information: data.information, value: data.value }]
        })
        this.setState({ data_Main: dataNew })
    }

    //* получаем данные с сервера
    async getDataFromServer(name, id) {

        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then((result) => {
            this.writeParseData(result, name);
            this.setState({ lengthDataFromServer: result.length });
        }).catch((result) => {
            this.setState({ lengthDataFromServer: 0 });
            console.log(result);
        })
        console.log('LOAD DATA FROM SERVER');//test
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true })
        }, 500)
    }

    render() {

        const show = this.state.show;
        const view_Main = this.state.view_Main;

        return (
            <>
                <div style={{ opacity: show ? '1' : '0', transition: ' 0.75s' }} >
                    <Container fluid style={{ padding: '0' }}>

                        {/* <_Sample /> */}

                        {view_Main ?
                            <Form_Main
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                data={this.state.data_Main}
                                view={view_Main}
                            />
                            : ''}
                        <Button className="btn_form" variant="outline-success" data-name="Main" onClick={this.handleClickView}>
                            Данные предприятия, форма №1
                            </Button>
                        <Button className="btn_form" variant="outline-success" data-name="One" onClick={this.handleClickView}>
                            Технический аудит, форма №2
                            </Button>
                        <Button className="btn_form" variant="outline-success" data-name="Two" onClick={this.handleClickView}>
                            Технический аудит, форма №3
                            </Button>
                        <Button className="btn_form" variant="outline-success" data-name="Three" onClick={this.handleClickView}>
                            Технический аудит, форма №4
                            </Button>
                        <Button className="btn_form" variant="outline-success" data-name="Four" onClick={this.handleClickView}>
                            Технический аудит, форма №5
                            </Button>
                        <Button className="btn_form" variant="outline-success" data-name="Five" onClick={this.handleClickView}>
                            Технический аудит, форма №6
                            </Button>
                        <Button className="btn_form" variant="outline-success" data-name="Six" onClick={this.handleClickView}>
                            Технический аудит, форма №7
                            </Button>
                    </Container>
                </div>
            </>
        )
    }
}