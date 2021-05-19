/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Form_Main from './Form_Main';
import Form_One from './Form_One';
import Form_Two from './Form_Two';
import Form_Three from './Form_Three';
import Form_Four from './Form_Four';
import Form_Five from './Form_Five';
import Form_Six from './Form_Six';
import Form_Seven from './Form_Seven';
import Form_Eight from './Form_Eight';
import Form_Nine from './Form_Nine';
import Form_Ten from './Form_Ten';
import Form_Eleven from './Form_Eleven';
import Form_Twelve from './Form_Twelve';
import Form_Thirteen from './Form_Thirteen';
import Form_Fourteen from './Form_Fourteen';
import Svg_Circle from '../../icon/Svg_Circle';

import Server from '../server/server';

export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show: false,
            lengthDataFromServer_Main: 0,
            lengthDataFromServer_One: 0,
            lengthDataFromServer_Two: 0,
            lengthDataFromServer_Three: 0,
            lengthDataFromServer_Four: 0,
            lengthDataFromServer_Five: 0,
            lengthDataFromServer_Six: 0,
            lengthDataFromServer_Seven: 0,
            lengthDataFromServer_Eight: 0,
            lengthDataFromServer_Nine: 0,
            lengthDataFromServer_Ten: 0,
            lengthDataFromServer_Eleven: 0,
            lengthDataFromServer_Twelve: 0,
            lengthDataFromServer_Thirteen: 0,
            lengthDataFromServer_Fourteen: 0,
            data_Main: [],
            data_One: [],
            data_Two: [],
            data_Three: [],
            data_Four: [],
            data_Five: [],
            data_Six: [],
            data_Seven: [],
            data_Eight: [],
            data_Nine: [],
            data_Ten: [],
            data_Eleven: [],
            data_Twelve: [],
            data_Thirteen: [],
            data_Fourteen: [],
            view_Main: false,
            view_One: false,
            view_Two: false,
            view_Three: false,
            view_Four: false,
            view_Five: false,
            view_Six: false,
            view_Seven: false,
            view_Eight: false,
            view_Nine: false,
            view_Ten: false,
            view_Eleven: false,
            view_Twelve: false,
            view_Thirteen: false,
            view_Fourteen: false,
            infoBlock: {
                language: 'rus',
                classQuestBlock: ['btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form', 'btn_form'],
                nameQuestBlock: ['Main', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen']
            }
        }

        this.createDataServer = this.createDataServer.bind(this);
        // this.sendDataOnServer = this.sendDataOnServer.bind(this);
        this.sendDataServer = this.sendDataServer.bind(this);
        this.doCreateDataServer = this.doCreateDataServer.bind(this);
        this.doUpdateDataOnServer = this.doUpdateDataOnServer.bind(this);
        this.doGetDataFromServer = this.doGetDataFromServer.bind(this);
        this.writeParseData = this.writeParseData.bind(this);
        this.handleClickView = this.handleClickView.bind(this);
        this.doChangeView = this.doChangeView.bind(this);
        this.changeColorButton = this.changeColorButton.bind(this);
    }

    //*закрывает форму по нажатию на фон
    doChangeView(name) {
        if (name === 'Main') this.setState({ view_Main: !this.state.view_Main })
        if (name === 'One') this.setState({ view_One: !this.state.view_One })
        if (name === 'Two') this.setState({ view_Two: !this.state.view_Two })
        if (name === 'Three') this.setState({ view_Three: !this.state.view_Three })
        if (name === 'Four') this.setState({ view_Four: !this.state.view_Four })
        if (name === 'Five') this.setState({ view_Five: !this.state.view_Five })
        if (name === 'Six') this.setState({ view_Six: !this.state.view_Six })
        if (name === 'Seven') this.setState({ view_Seven: !this.state.view_Seven })
        if (name === 'Eight') this.setState({ view_Eight: !this.state.view_Eight })
        if (name === 'Nine') this.setState({ view_Nine: !this.state.view_Nine })
        if (name === 'Ten') this.setState({ view_Ten: !this.state.view_Ten })
        if (name === 'Eleven') this.setState({ view_Eleven: !this.state.view_Eleven })
        if (name === 'Twelve') this.setState({ view_Twelve: !this.state.view_Twelve })
        if (name === 'Thirteen') this.setState({ view_Thirteen: !this.state.view_Thirteen })
        if (name === 'Fourteen') this.setState({ view_Fourteen: !this.state.view_Fourteen })
    }

    //* загружает для выбранной формы данные с сервера и открывает форму
    handleClickView(e) {
        this.doGetDataFromServer(e.target.dataset.name, Number(localStorage.getItem('idUser')));
        setTimeout(() => {
            if (e.target.dataset.name === 'Main') this.setState({ view_Main: !this.state.view_Main })
            if (e.target.dataset.name === 'One') this.setState({ view_One: !this.state.view_One })
            if (e.target.dataset.name === 'Two') this.setState({ view_Two: !this.state.view_Two })
            if (e.target.dataset.name === 'Three') this.setState({ view_Three: !this.state.view_Three })
            if (e.target.dataset.name === 'Four') this.setState({ view_Four: !this.state.view_Four })
            if (e.target.dataset.name === 'Five') this.setState({ view_Five: !this.state.view_Five })
            if (e.target.dataset.name === 'Six') this.setState({ view_Six: !this.state.view_Six })
            if (e.target.dataset.name === 'Seven') this.setState({ view_Seven: !this.state.view_Seven })
            if (e.target.dataset.name === 'Eight') this.setState({ view_Eight: !this.state.view_Eight })
            if (e.target.dataset.name === 'Nine') this.setState({ view_Nine: !this.state.view_Nine })
            if (e.target.dataset.name === 'Ten') this.setState({ view_Ten: !this.state.view_Ten })
            if (e.target.dataset.name === 'Eleven') this.setState({ view_Eleven: !this.state.view_Eleven })
            if (e.target.dataset.name === 'Twelve') this.setState({ view_Twelve: !this.state.view_Twelve })
            if (e.target.dataset.name === 'Thirteen') this.setState({ view_Thirteen: !this.state.view_Thirteen })
            if (e.target.dataset.name === 'Fourteen') this.setState({ view_Fourteen: !this.state.view_Fourteen })
        }, 500)
    }

    //* меняем цвет кнопки при выходе через SAVE
    changeColorButton(name) {
        let position = 0;
        this.state.infoBlock.nameQuestBlock.forEach((member, index) => {
            if (member === name) position = index;
        })
        let arrEmpty = this.state.infoBlock.classQuestBlock;
        arrEmpty[position] = 'btn_form active';
        this.setState({ classQuestBlock: arrEmpty })
        setTimeout(() => { this.props.onUpInfoBlock(this.state.infoBlock) })
    }

    doGetDataFromServer(name, id) {
        this.getDataFromServer(name, id);
    }

    doCreateDataServer(data, name, id) {
        this.createDataServer(data, name, id);
        this.changeColorButton(name);
    }

    doUpdateDataOnServer(data, name, id) {
        this.sendDataServer(data, name, id);
        this.changeColorButton(name);
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
        if (name === 'Main') this.setState({ data_Main: dataNew, lengthDataFromServer_Main: dataNew.length })
        if (name === 'One') this.setState({ data_One: dataNew, lengthDataFromServer_One: dataNew.length })
        if (name === 'Two') this.setState({ data_Two: dataNew, lengthDataFromServer_Two: dataNew.length })
        if (name === 'Three') this.setState({ data_Three: dataNew, lengthDataFromServer_Three: dataNew.length })
        if (name === 'Four') this.setState({ data_Four: dataNew, lengthDataFromServer_Four: dataNew.length })
        if (name === 'Five') this.setState({ data_Five: dataNew, lengthDataFromServer_Five: dataNew.length })
        if (name === 'Six') this.setState({ data_Six: dataNew, lengthDataFromServer_Six: dataNew.length })
        if (name === 'Seven') this.setState({ data_Seven: dataNew, lengthDataFromServer_Seven: dataNew.length })
        if (name === 'Eight') this.setState({ data_Eight: dataNew, lengthDataFromServer_Eight: dataNew.length })
        if (name === 'Nine') this.setState({ data_Nine: dataNew, lengthDataFromServer_Nine: dataNew.length })
        if (name === 'Ten') this.setState({ data_Ten: dataNew, lengthDataFromServer_Ten: dataNew.length })
        if (name === 'Eleven') this.setState({ data_Eleven: dataNew, lengthDataFromServer_Eleven: dataNew.length })
        if (name === 'Twelve') this.setState({ data_Twelve: dataNew, lengthDataFromServer_Twelve: dataNew.length })
        if (name === 'Thirteen') this.setState({ data_Thirteen: dataNew, lengthDataFromServer_Thirteen: dataNew.length })
        if (name === 'Fourteen') this.setState({ data_Fourteen: dataNew, lengthDataFromServer_Fourteen: dataNew.length })
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
        this.setState({ infoBlock: this.props.infoBlock })
        setTimeout(() => {
            this.setState({ show: true })
        }, 500)
    }

    render() {

        const show = this.state.show;

        const view_Main = this.state.view_Main;
        const view_One = this.state.view_One;
        const view_Two = this.state.view_Two;
        const view_Three = this.state.view_Three;
        const view_Four = this.state.view_Four;
        const view_Five = this.state.view_Five;
        const view_Six = this.state.view_Six;
        const view_Seven = this.state.view_Seven;
        const view_Eight = this.state.view_Eight;
        const view_Nine = this.state.view_Nine;
        const view_Ten = this.state.view_Ten;
        const view_Eleven = this.state.view_Eleven;
        const view_Twelve = this.state.view_Twelve;
        const view_Thirteen = this.state.view_Thirteen;
        const view_Fourteen = this.state.view_Fourteen;

        const classEmpty = this.state.infoBlock.classQuestBlock;

        return (
            <>
                <div style={{ opacity: show ? '1' : '0', transition: ' 0.75s' }} >
                    <Container fluid style={{ padding: '0', minHeight: '77.5vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'start' }}>

                        {/* <_Sample /> */}

                        {view_Main ?
                            <Form_Main
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Main}
                                data={this.state.data_Main}
                                view={view_Main}
                            />
                            : ''}

                        {view_One ?
                            <Form_One
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_One}
                                data={this.state.data_One}
                                view={view_One}
                            />
                            : ''}

                        {view_Two ?
                            <Form_Two
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Two}
                                data={this.state.data_Two}
                                view={view_Two}
                            />
                            : ''}

                        {view_Three ?
                            <Form_Three
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Three}
                                data={this.state.data_Three}
                                view={view_Three}
                            />
                            : ''}

                        {view_Four ?
                            <Form_Four
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Four}
                                data={this.state.data_Four}
                                view={view_Four}
                            />
                            : ''}

                        {view_Five ?
                            <Form_Five
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Five}
                                data={this.state.data_Five}
                                view={view_Five}
                            />
                            : ''}

                        {view_Six ?
                            <Form_Six
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Six}
                                data={this.state.data_Six}
                                view={view_Six}
                            />
                            : ''}

                        {view_Seven ?
                            <Form_Seven
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Seven}
                                data={this.state.data_Seven}
                                view={view_Seven}
                            />
                            : ''}

                        {view_Eight ?
                            <Form_Eight
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Eight}
                                data={this.state.data_Eight}
                                view={view_Eight}
                            />
                            : ''}

                        {view_Nine ?
                            <Form_Nine
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Nine}
                                data={this.state.data_Nine}
                                view={view_Nine}
                            />
                            : ''}

                        {view_Ten ?
                            <Form_Ten
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Ten}
                                data={this.state.data_Ten}
                                view={view_Ten}
                            />
                            : ''}

                        {view_Eleven ?
                            <Form_Eleven
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Eleven}
                                data={this.state.data_Eleven}
                                view={view_Eleven}
                            />
                            : ''}

                        {view_Twelve ?
                            <Form_Twelve
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Twelve}
                                data={this.state.data_Twelve}
                                view={view_Twelve}
                            />
                            : ''}

                        {view_Thirteen ?
                            <Form_Thirteen
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Thirteen}
                                data={this.state.data_Thirteen}
                                view={view_Thirteen}
                            />
                            : ''}

                        {view_Fourteen ?
                            <Form_Fourteen
                                onCreateDataServer={this.doCreateDataServer}
                                onUpdateDataOnServer={this.doUpdateDataOnServer}
                                onChangeView={this.doChangeView}
                                lengthDataFromServer={this.state.lengthDataFromServer_Fourteen}
                                data={this.state.data_Fourteen}
                                view={view_Fourteen}
                            />
                            : ''}


                        <Button className={classEmpty[0]} variant="success" data-name="Main" onClick={this.handleClickView}>
                            <span data-name="Main" style={{ display: 'block' }}>
                                Данные предприятия
                                 </span>
                        </Button>
                        <Button className={classEmpty[1]} variant="success" data-name="One" onClick={this.handleClickView}>
                            <span data-name="One" style={{ display: 'block' }}>
                                Форма технического аудита: "Заготовительное производство"
                            </span>
                        </Button>
                        <Button className={classEmpty[2]} variant="success" data-name="Two" onClick={this.handleClickView}>
                            <span data-name="Two" style={{ display: 'block' }}>
                                Форма технического аудита: "Механическая обработка деталей и узлов"
                                </span>
                        </Button>
                        <Button className={classEmpty[3]} variant="success" data-name="Three" onClick={this.handleClickView}>
                            <span data-name="Three" style={{ display: 'block' }}>
                                Форма технического аудита: " Сварочное производство"
                            </span>
                        </Button>
                        <Button className={classEmpty[4]} variant="success" data-name="Four" onClick={this.handleClickView}>
                            <span data-name="Four" style={{ display: 'block' }}>
                                Форма технического аудита: "Материалы", "Развальцовка", "Испытания"
                            </span>
                        </Button>
                        <Button className={classEmpty[5]} variant="success" data-name="Five" onClick={this.handleClickView}>
                            <span data-name="Five" style={{ display: 'block' }}>
                                Форма технического аудита: "Термическая обработка"
                            </span>
                        </Button>
                        <Button className={classEmpty[6]} variant="success" data-name="Six" onClick={this.handleClickView}>
                            <span data-name="Six" style={{ display: 'block' }}>
                                Форма технического аудита: "Работа с ЛКМ"
                            </span>
                        </Button>
                        <Button className={classEmpty[7]} variant="success" data-name="Seven" onClick={this.handleClickView}>
                            <span data-name="Seven" style={{ display: 'block' }}>
                                Форма технического аудита: "Крепёжные изделия, Поковки"
                            </span>
                        </Button>
                        <Button className={classEmpty[8]} variant="success" data-name="Eight" onClick={this.handleClickView}>
                            <span data-name="Eight" style={{ display: 'block' }}>
                                Форма технического аудита: "Изготовление фланцев и днища"
                            </span>
                        </Button>
                        <Button className={classEmpty[9]} variant="success" data-name="Nine" onClick={this.handleClickView}>
                            <span data-name="Nine" style={{ display: 'block' }}>
                                Форма технического аудита: "Изготовление полулинз и линзовых компенсаторов / Подъемно-транспортные механизмы"
                            </span>
                        </Button>
                        <Button className={classEmpty[10]} variant="success" data-name="Ten" onClick={this.handleClickView}>
                            <span data-name="Ten" style={{ display: 'block' }}>
                                Форма технического аудита: "Технология сварки"
                            </span>
                        </Button>
                        <Button className={classEmpty[11]} variant="success" data-name="Eleven" onClick={this.handleClickView}>
                            <span data-name="Eleven" style={{ display: 'block' }}>
                                Форма технического аудита: "Развальцовка"
                            </span>
                        </Button>
                        <Button className={classEmpty[12]} variant="success" data-name="Twelve" onClick={this.handleClickView}>
                            <span data-name="Twelve" style={{ display: 'block' }}>
                                Форма технического аудита: "Методы контроля качества"
                            </span>
                        </Button>
                        <Button className={classEmpty[13]} variant="success" data-name="Thirteen" onClick={this.handleClickView}>
                            <span data-name="Thirteen" style={{ display: 'block' }}>
                                Форма технического аудита: "Планирование производства"
                            </span>
                        </Button>
                        <Button className={classEmpty[14]} variant="success" data-name="Fourteen" onClick={this.handleClickView}>
                            <span data-name="Fourteen" style={{ display: 'block' }}>
                                Форма технического аудита: "Сертификаты, Декларации, Аттестации, Аккредитации"
                                </span>
                        </Button>
                    </Container>
                </div>
            </>
        )
    }
}