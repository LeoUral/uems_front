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
            showNavigation: false,
            data_Main: [],
            lengthDataFromServer: 0,
            lengthDataFromServer_Main: 0,
            infoBlock: {
                language: 'rus',
                cardCompany: [], //карточка предприятия
                mineNumberTrade: [], // имена своих торгов
                otherNumberTrade: [], // имена чужих торгов на которые есть приглашения
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
        this.doCreateTrade = this.doCreateTrade.bind(this);
        this.doUpInfoBlockTrade = this.doUpInfoBlockTrade.bind(this);
    }
    //*созданный блок по своим торгам, добавляем в ИНФОБЛОК
    doCreateTrade(data) { //! ************************************************

        if (!this.state.infoBlock.mineNumberTrade) {
            this.block = this.state.infoBlock;
            this.block.mineNumberTrade = [];
            this.setState({ infoBlock: this.block });
        }

        setTimeout(() => {
            this.block = this.state.infoBlock;

            console.log(data.keyNameTrade);

            this.block.mineNumberTrade = [...this.block.mineNumberTrade, data.keyNameTrade];

            console.log('BLOCK -> ');
            console.log(this.block);
            this.doUpInfoBlockTrade(this.block);
        }, 500)



    }

    //*получили обновленный InfoBlock (TRADE) *** универсалшьная функ. для обновленя infoBlock
    doUpInfoBlockTrade(data) {
        this.setState({ infoBlock: data });

        //todo обновить infoBlock на сервере
        setTimeout(() => {
            console.log(this.state.infoBlock);//test
            this.sendInfoBlockOnServer(this.state.infoBlock, 'start', Number(localStorage.getItem('idUser')))
            console.log(this.state);
        })
    }

    //*получили обновленный InfoBlock (classQuestBlock)
    doUpInfoBlock(data) {
        this.dataQuest = this.state.infoBlock;
        this.dataQuest.classQuestBlock = data.classQuestBlock;

        this.setState({ infoBlock: this.dataQuest });

        //todo обновить infoBlock на сервере
        setTimeout(() => {
            console.log(this.state.infoBlock);//test
            this.sendInfoBlockOnServer(this.state.infoBlock, 'start', Number(localStorage.getItem('idUser')))
        })

    }

    //* проверка наличия, создание, загрузка инфоблока
    doLoadStart(id) {
        this.getInfoBlockfromServer('start', localStorage.getItem('idUser'));
        setTimeout(() => {

            if (this.state.lengthDataFromServer === 0 || this.state.lengthDataFromServer === undefined) {
                this.createInfoBlockOnServer(this.state.infoBlock, 'start', localStorage.getItem('idUser'));
                console.log('CREATE !!!!!!!!!!!!!!!');//test
            }
            this.setState({ showNavigation: true })
        }, 1500)
    }

    //* ЗАГРУЖАЕМ с сервера ИНФОБЛОК
    async getInfoBlockfromServer(name, id) {

        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then((result) => {
            this.setState({ lengthDataFromServer: result.classQuestBlock.length });
            // console.log(result); // test
            // console.log(result.classQuestBlock);//test
            this.setState({ infoBlock: result }); //todo данные поступают асинхронно, уже после верстки
            setTimeout(() => { this.setState({ showNavigation: true }) }, 1000)
            setTimeout(() => { console.log(this.state) }, 1500)//test
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
        if (name === 'Main') {
            this.card = this.state.infoBlock; //! *************************************
            this.card.cardCompany = dataNew;
            this.setState({ infoBlock: this.card, lengthDataFromServer_Main: dataNew.length });
            // setTimeout(() => { console.log(this.state.infoBlock.cardCompany[1]); console.log(this.state.infoBlock) }, 500)//test
        }
    }

    doChangeShowRegistration() {
        this.setState({ show_Registration: !this.state.show_Registration })
    }

    doChangeShowLoginPage() {
        this.setState({ show_LoginPage: !this.state.show_LoginPage })
        this.getDataFromServer('Main', Number(localStorage.getItem('idUser'))); //получаем название компании
    }

    componentDidMount() {
        if (localStorage.getItem('idUser')) {
            this.doLoadStart(Number(localStorage.getItem('idUser')));

        }


        // setTimeout(() => { //todo удаляет ключи торгов
        //     this.dData = this.state.infoBlock;
        //     this.dData.mineNumberTrade = [];
        //     // this.setState({ infoBlock: this.dData })
        //     this.doUpInfoBlockTrade(this.dData);
        // }, 1500)
    }

    render() {

        const showNavigation = this.state.showNavigation;
        const cardCompany = this.state.infoBlock.cardCompany;
        // console.log(cardCompany);//test

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

                {showNavigation ?
                    <Navigation
                        nameCompany={cardCompany && cardCompany[1]}
                        infoBlock={this.state.infoBlock}
                        onUpInfoBlock={this.doUpInfoBlock}
                        onCreateTrade={this.doCreateTrade}
                        keyNameTrade={this.state.infoBlock.mineNumberTrade}
                        keyOtherNumberTrade={this.state.infoBlock.otherNumberTrade}
                    />
                    : ''
                }
            </>
        )
    }
}