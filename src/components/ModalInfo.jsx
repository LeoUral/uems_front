/* eslint-disable default-case */

import React from 'react';
import { Container, Form, Alert, Button, Row, Col, Table } from 'react-bootstrap';

export default class ModalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            base: []
        }

        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.renderDataOn = this.renderDataOn.bind(this);
    }

    handleClickSearch() {
        console.log('Click SEARCH');
    }

    handleClickShadow() {
        this.props.onChangeShowModalInfo();
    }

    renderDataOn(data) {
        this.arrData = [];

        data.tech.forEach((data, index) => {
            if (data !== null) {
                this.arrData = [...this.arrData,
                <tr key={index + 'tech'}>
                    <td >{data.information}</td>
                    <td >{data.value}</td>
                </tr>
                ]
            }
        })

        data.commercial.forEach((data, index) => {
            if (data !== null) {
                this.arrData = [...this.arrData,
                <tr key={index + 'comm'}>
                    <td >{data.information}</td>
                    <td >{data.value}</td>
                </tr>
                ]
            }
        })

        data.date.forEach((data, index) => {
            if (data !== null) {

                this.arrData = [...this.arrData,
                <tr key={index + 'date'}>
                    <td >{data.information}</td>
                    <td >{data.value}</td>
                </tr>
                ]
            }
        })

        this.setState({ base: this.arrData })
    }


    componentDidMount() {
        this.renderDataOn(this.props.dataOnTrade);
    }

    render() {


        const show = this.props.show;

        return (
            <>
                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="info" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Информация по торгам </Alert.Heading>
                        </Alert>
                        <Container style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.base}
                                </tbody>
                            </Table>
                        </Container>

                    </Form>
                </div>
            </>
        )
    }
}