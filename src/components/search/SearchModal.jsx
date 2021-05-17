/* eslint-disable default-case */

import React from 'react';
import { Container, Form, Alert, Button, Row, Col, Table } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import SearchNameCompany from './SearchNameCompany';
import SearchProduction from './SearchProduction';
import SearchMaterial from './SearchMaterial';
import Server from '../server/server';
// import SaerchTable from './SearchTable';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            nameCompany: '',
            data: [],
            dataSearch: [],
            viewDataTable: [],
            idSearchCompany: [0] // массив ID выбранных компаний
        }

        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.parsingDataForSearch = this.parsingDataForSearch.bind(this);
        this.sendRequestSearch = this.sendRequestSearch.bind(this);
        this.parsingDataFromServer = this.parsingDataFromServer.bind(this);
        this.doNotRepeat = this.doNotRepeat.bind(this);
        this.doWriteTable = this.doWriteTable.bind(this);
        this.handleClickTable = this.handleClickTable.bind(this);
        this.doChoiceCompany = this.doChoiceCompany.bind(this);
        this.addIdConpany = this.addIdConpany.bind(this);
        this.removeIdCompany = this.removeIdCompany.bind(this);
        this.handleClickChoice = this.handleClickChoice.bind(this);

    }

    // определяем ID выбранного предприятия в таблице
    handleClickTable(e) {
        console.log(e.target.dataset.id);
        //todo прописать позже функции

        this.doChoiceCompany(e);
    }

    // выделяем выбранную компанию
    doChoiceCompany(dataCompany) {

        this.arrSearch = this.state.dataSearch;

        this.arrSearch.forEach((data, index) => {

            if (+data.id === +dataCompany.target.dataset.id) {
                this.arrSearch[index].choice = !this.arrSearch[index].choice;

                if (this.arrSearch[index].choice === true) {
                    this.addIdConpany(+data.id);
                } else {
                    this.removeIdCompany(+data.id);
                }
            }
        })

        this.setState({ dataSearch: this.arrSearch })
        console.log(this.arrSearch);//test
        setTimeout(() => { console.log(this.state.idSearchCompany) }) //test
        this.doWriteTable(this.arrSearch);
    }

    //добавление ID компании при выборе
    addIdConpany(id) {
        this.setState({ idSearchCompany: [...this.state.idSearchCompany, id] })
        console.log('add');
    }

    //удаление ID компании при повторном выборе
    removeIdCompany(id) {
        let index = this.state.idSearchCompany.indexOf(id);
        if (index > 0) {
            const arrIdCompany = this.state.idSearchCompany;
            arrIdCompany.splice(index, 1);
            this.setState({ idSearchCompany: arrIdCompany });
        }
        console.log('remove');//test
    }

    handleClickSearch() {
        console.log('Click SEARCH');
        this.parsingDataForSearch(this.state.data);
    }

    handleClickChoice() {
        console.log('Подтверждение выбора компаний');
    }

    //*отправка поисквого запроса, получаем результат поиска (ID компаний)
    async sendRequestSearch(data) {
        new Promise((resolve) => {
            resolve(Server.sendSearchData(data))
        }).then(result => {
            console.log(result);
            this.parsingDataFromServer(result);
        }).catch(result => {
            console.log('ERROR search:');
            console.log(result);
        })
    }

    //*делаем верстку таблицы с надйенными данными
    doWriteTable(data) {
        this.arrData = [];

        data.forEach(element => {
            let choice = element.choice;
            console.log(choice);

            this.arrData = [...this.arrData,
            <tr key={element.id} style={{ cursor: 'pointer', backgroundColor: choice ? '#fd7e14' : '' }} onClick={this.handleClickTable} >
                <td data-id={element.id} >{element.nameCompany}</td>
                <td data-id={element.id} >{element.phone}</td>
                <td data-id={element.id} >{element.eMail}</td>
                <td data-id={element.id} >{element.city}</td>
            </tr>
            ]
        });
        this.setState({ viewDataTable: this.arrData })
    }

    //*группируем данные, убираем повторы
    doNotRepeat() {
        this.dData = [];
        this.state.dataSearch.forEach((data) => {
            //определяем наличие объекта в массиве, если его нет получаем undefined и добавляем его в массив один раз
            if ((this.dData.find(item => item.nameCompany == data.nameCompany)) === undefined) {
                this.dData = [...this.dData, data]
            }
        })
        this.setState({ dataSearch: this.dData });
        this.doWriteTable(this.dData);
    }

    //*парсинг данных с сервера
    parsingDataFromServer(data) {
        console.log('Данные с сервера:');
        for (let i = 0; i < data.length; i++) {
            data[i].forEach(data => {
                // console.log(data);
                console.log(data.uo_usid);// ID пользователей
                this.getDataFromServerOnId(data.uo_usid);
            })
        }
        setTimeout(() => { this.doNotRepeat() }, 500)
        setTimeout(() => { console.log(this.state.dataSearch) }, 500)//test
    }

    //* парсинг данных для отправки запросом на сервер
    parsingDataForSearch(data) {
        this.dData = [];
        this.check = true;

        data.forEach(data => {
            this.dData[+data.id] = { id: data.id, description: data.description, information: data.information, data: data.value }
            if (data.value === undefined) this.check = false;//проверка на undefined
        })
        //проверка на undefined
        if (this.check) {
            this.sendRequestSearch(this.dData)
        } else {
            this.setState({ data: [] })
        }
        console.log(this.dData);
    }

    //*получение данных с сервера согласно полученных ID
    async getDataFromServerOnId(id) {

        new Promise(resolve => {
            resolve(Server.getDataFromServer("Main", id))
        }).then(result => {

            this.setState({ dataSearch: [...this.state.dataSearch, { id: id, nameCompany: result[1].value, phone: result[4].value, eMail: result[5].value, city: result[15].value, choice: false }] })
            // console.log(result);
        }).catch(result => {
            console.log('ERROR data from server:');
            console.log(result);
        })
    }

    doEmpty() {
    }

    doChangeValue(data) {
        // console.log(data);
        if (data.value !== undefined) this.setState({ data: [...this.state.data, data] }) // проверка на undefined
        setTimeout(() => { console.log(this.state.data); })
    }

    handleClickShadow() {
        this.props.onChangeShow();
    }


    render() {

        const show = this.props.show;

        return (
            <>
                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main">
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма поиска </Alert.Heading>
                        </Alert>
                        <Container>

                            <SearchNameCompany
                                onChangeValue={this.doChangeValue}
                            />

                            <SearchProduction
                                onChangeValue={this.doChangeValue}
                            />

                            <SearchMaterial
                                onChangeValue={this.doChangeValue}
                            />

                            <Row> &nbsp; </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="outline-success"
                                        className="btn_trade_form"
                                        onClick={this.handleClickSearch}
                                    >
                                        Поиск по базе ЕСУИ
                                            </Button>
                                    <Button
                                        variant="outline-primary"
                                        className="btn_trade_form"
                                        onClick={this.handleClickChoice}
                                    >
                                        Подтвердить выбор
                                           </Button>
                                </Col>
                            </Row>
                            <Row> &nbsp; </Row>
                        </Container>
                        <Container>
                            {/** таблица с результатами поиска  */}
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Компания</th>
                                        <th>Телефон</th>
                                        <th>E-mail</th>
                                        <th>Город</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.viewDataTable}
                                </tbody>
                            </Table>
                        </Container>

                    </Form>
                </div>
            </>
        )
    }
}