/* eslint-disable default-case */

import React from 'react';
import { Container, Form, Alert, Button, Row, Col, Table } from 'react-bootstrap';

export default class ModalInfo extends React.Component {
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
        this.handleClickSearch = this.handleClickSearch.bind(this);
    }

    handleClickSearch() {
        console.log('Click SEARCH');
    }

    handleClickShadow() {
        this.props.onChangeShowModalInfo();
    }

    render() {

        const show = this.props.show;

        return (
            <>
                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main">
                        <Alert variant="info" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Информация </Alert.Heading>
                        </Alert>
                        <Container>
                            Modal window
                        </Container>

                    </Form>
                </div>
            </>
        )
    }
}