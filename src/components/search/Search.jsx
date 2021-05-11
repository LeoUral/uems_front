/* eslint-disable default-case */

import React from 'react';
import { Jumbotron, Container, Form, Alert, Button, Row, } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import { production, cutting, rolling } from './constWork';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            show1: false,
            typeProduction: ''
        }

        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.assignConst = this.assignConst.bind(this);
    }

    doEmpty() {
    }

    assignConst(constData) {
        this.setState({ typeProduction: constData });
    }

    doChangeVisionBlock(data) {
        console.log(data);

        const arrProduction = production.split(', ');

        switch (data) {
            case arrProduction[0]:
                this.assignConst(cutting);
                console.log('REZKA');//test
                this.setState({ show1: true });
                break;

        }
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
        const show1 = this.state.show1;
        const typeProduction = this.state.typeProduction;

        return (
            <>

                <div className="modal_window" style={{ display: show ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма поиска </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row>
                                    <SelectForm
                                        id={1}
                                        width={12}
                                        show={true}
                                        label="Поиск предприятия по виду производства:"
                                        placeholder="Поиск предприятия по виду производства"
                                        description=""
                                        option={production}
                                        // value={this.value[3] ? this.value[3].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group style={{ opacity: show1 ? '1' : '0', transition: ' 0.75s' }}>
                                <Row>
                                    <SelectForm
                                        id={2}
                                        width={12}
                                        show={true}
                                        label="Вид обработки:"
                                        placeholder="Вид обработки"
                                        description=""
                                        option={typeProduction}
                                        // value={this.value[3] ? this.value[3].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
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