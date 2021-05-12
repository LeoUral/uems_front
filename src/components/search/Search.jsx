/* eslint-disable default-case */

import React from 'react';
import { Jumbotron, Container, Form, Alert, Button, Row, } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import SearchNameCompany from './SearchNameCompany';
import SearchProduction from './SearchProduction';
import SearchMaterial from './SearchMaterial';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            nameCompany: ''
        }

        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    doEmpty() {
    }

    doChangeValue(data) {
        console.log(data.value);
    }

    handleClickShow() {
        this.setState({ show: true })
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

                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма поиска </Alert.Heading>
                        </Alert>
                        <Container>

                            <SearchNameCompany />

                            <SearchProduction />

                            <SearchMaterial />
                            <Row> &nbsp; </Row>
                        </Container>

                    </Form>
                </div>

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