import React from 'react';
import Navigation from '../components/decoration/Navigation';
import LoginPage from '../components/LoginPage';
import Registration from './Registration';
import Server from '../components/server/server';

export default class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show_LoginPage: true,
            show_Registration: false,
            data_Main: [],
            lengthDataFromServer_Main: 0
        }

        this.doChangeShowLoginPage = this.doChangeShowLoginPage.bind(this);
        this.doChangeShowRegistration = this.doChangeShowRegistration.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.writeParseData = this.writeParseData.bind(this);
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

    //*парсинг данных с сервера
    writeParseData(dataJson, name) {
        let dataNew = [];
        dataJson.forEach((data) => {
            dataNew = [...dataNew, { id: data.id, description: data.description, information: data.information, value: data.value }]
        })
        if (name === 'Main') this.setState({ data_Main: dataNew, lengthDataFromServer_Main: dataNew.length })
    }

    doChangeShowRegistration() {
        this.setState({ show_Registration: !this.state.show_Registration })
    }

    doChangeShowLoginPage() {
        this.setState({ show_LoginPage: !this.state.show_LoginPage })
        this.getDataFromServer('Main', Number(localStorage.getItem('idUser')));
    }

    render() {
        return (
            <>
                { this.state.show_LoginPage ?
                    <LoginPage
                        onChangeShowLoginPage={this.doChangeShowLoginPage}
                        onChangeShowRegistration={this.doChangeShowRegistration}
                    /> : ''}

                {this.state.show_Registration ?
                    <Registration
                        onChangeShowLoginPage={this.doChangeShowLoginPage}
                        onChangeShowRegistration={this.doChangeShowRegistration}
                    /> : ''}

                <Navigation
                    nameCompany={this.state.data_Main[1]}
                />
            </>
        )
    }
}