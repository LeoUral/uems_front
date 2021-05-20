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

        data.commercial.forEach((data, index) => {
            if (data !== null) {
                this.arrData = [...this.arrData,
                <React.Fragment key={index}>
                    <Row>
                        <Col>
                            {data.information}
                        </Col>
                        <Col>
                            {data.value}
                        </Col>
                    </Row>
                    <Row> &nbsp; </Row>
                </React.Fragment>
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
                    <Form className="form_main">
                        <Alert variant="info" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Информация </Alert.Heading>
                        </Alert>
                        <Container>
                            {this.state.base}
                        </Container>

                    </Form>
                </div>
            </>
        )
    }
}