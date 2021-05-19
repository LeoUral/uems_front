/* eslint-disable default-case */

import React from 'react';
import { Jumbotron, Container, Form, Alert, Button, Row, Col, Table } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import SearchNameCompany from './SearchNameCompany';
import SearchProduction from './SearchProduction';
import SearchMaterial from './SearchMaterial';
import Server from '../server/server';
// import SaerchTable from './SearchTable';
import SearchModal from './SearchModal';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            nameCompany: '',
            data: [],
            dataSearch: [],
            viewDataTable: []
        }


        this.handleClickShow = this.handleClickShow.bind(this);
        this.doChoiceCompany = this.doChoiceCompany.bind(this);
        this.doTableChoice = this.doTableChoice.bind(this);
    }
    doTableChoice(renderTable) {
        //Рендер строк компаний
    }

    doChoiceCompany(data) {
        //ID выбранных компаний
    }

    handleClickShow() {
        this.setState({ show: !this.state.show })
    }

    handleClickShadow() {
        this.setState({ show: false })
    }

    componentDidMount() {
        this.setState({ show: true });
    }

    render() {

        const show = this.state.show;

        return (
            <>
                <SearchModal
                    show={show}
                    onChangeShow={this.handleClickShow}
                    onChoiceCompany={this.doChoiceCompany}
                    onTableChoice={this.doTableChoice}
                />
                <Container fluid style={{ padding: '0' }}>
                    <Jumbotron style={{ marginBottom: '0', minHeight: '78vh' }}>
                        <h1>Блок поиска по предприятиям в базе LOTUS</h1>
                        <Button variant="outline-secondary" onClick={this.handleClickShow} > Запустить форму поиска </Button>
                    </Jumbotron>
                </Container>
            </>
        )
    }
}