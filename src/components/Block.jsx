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
            lengthDataFromServer: 0,
            lengthDataFromServer_Main: 0,
            infoBlock: {
                language: 'rus',
                classQuestBlock: ['btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form'],
                nameQuestBlock: ['Main', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen']
            }
        }

        this.doChangeShowLoginPage = this.doChangeShowLoginPage.bind(this);
        this.doChangeShowRegistration = this.doChangeShowRegistration.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.writeParseData = this.writeParseData.bind(this);
        this.doLoadStart = this.doLoadStart.bind(this);
        this.getInfoBlockfromServer = this.getInfoBlockfromServer.bind(this);
        this.doUpInfoBlock = this.doUpInfoBlock.bind(this);
    }

    //*получили обновленный InfoBlock (classQuestBlock)
    doUpInfoBlock(data) {
        this.setState({ infoblock: data });

        //todo обновить infoBlock на сервере
        setTimeout(() => {
            console.log(this.state.infoBlock);
            this.sendInfoBlockOnServer(this.state.infoBlock, 'start', Number(localStorage.getItem('idUser')))
        })
    }

    //* проверка наличия, создание, загрузка инфоблока
    doLoadStart(id) {
        this.getInfoBlockfromServer('start', id);
        setTimeout(() => {
            if (this.state.lengthDataFromServer === 0) {
                this.createInfoBlockOnServer(this.state.infoBlock, 'start', id);
            }
        }, 500)
    }

    //* ЗАГРУЖАЕМ с сервера ИНФОБЛОК
    async getInfoBlockfromServer(name, id) {

        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then((result) => {
            this.setState({ lengthDataFromServer: result.length });
            console.log(result); // test
            this.setState({ infoBlock: result });
        }).catch((result) => {
            this.setState({ lengthDataFromServer: 0 });
            console.log(result);
        })
    }

    //* СОЗДАЕМ на сервере ИНФОБЛОК
    async createInfoBlockOnServer(data, name, id) {

        new Promise((resolve) => {
            resolve(Server.createDataOnServer(JSON.stringify(data), name, id))
        }).then(result => {
            console.log('SERVER create Info Block, all OK');
            console.log(result);
        }).catch(result => {
            console.log('SERVER ERROR, not create info block. ERROR: ');
            console.log(result);
        })
    }

    //* ОБНОВЛЯЕМ на сервере ИНФОБЛОК
    async sendInfoBlockOnServer(data, name, id) {

        new Promise((resolve) => {
            resolve(Server.sendDataOnServer(JSON.stringify(data), name, id))
        }).then(result => {
            console.log('SERVER update Info Block, all OK');
            console.log(result);
        }).catch(result => {
            console.log('ERROR! Server not update Info Block. ERROR: ');
            console.log(result);
        })
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
        this.getDataFromServer('Main', Number(localStorage.getItem('idUser'))); //получаем название компании
    }

    componentDidMount() {
        this.doLoadStart(Number(localStorage.getItem('idUser')));
    }

    render() {
        return (
            <>
                { this.state.show_LoginPage ?
                    <LoginPage
                        onChangeShowLoginPage={this.doChangeShowLoginPage}
                        onChangeShowRegistration={this.doChangeShowRegistration}
                        onLoadStart={this.doLoadStart}
                    /> : ''}

                {this.state.show_Registration ?
                    <Registration
                        onChangeShowLoginPage={this.doChangeShowLoginPage}
                        onChangeShowRegistration={this.doChangeShowRegistration}
                    /> : ''}

                <Navigation
                    nameCompany={this.state.data_Main[1]}
                    infoBlock={this.state.infoBlock}
                    onUpInfoBlock={this.doUpInfoBlock}
                />
            </>
        )
    }
}