/* eslint-disable default-case */

import React from 'react';
import { Jumbotron, Container, Form, Alert, Button, Row, } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import {
    production,
    cutting,
    rolling,
    mechanical,
    welding,
    thermal,
    paintJob,
    flange,
    bottomMetal,
    material
} from './constWork';
import Server from '../server/server';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            show1: false,
            typeProduction: '',
            nameCompany: ''

        }

        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.assignConst = this.assignConst.bind(this);
        this.getDataNotId = this.getDataNotId.bind(this);
    }

    doEmpty() {
    }

    assignConst(constData) {
        this.setState({ typeProduction: constData });
        setTimeout(() => { console.log(this.state.typeProduction) })// test
    }

    doChangeVisionBlock(data) {
        console.log(data);

        const arrProduction = production.split(', ');

        switch (data) {
            case arrProduction[0]:
                this.assignConst(cutting);
                this.setState({ show1: true });
                break;

            case arrProduction[1]:
                this.assignConst(rolling);
                this.setState({ show1: true });
                break;

            case arrProduction[2]:
                this.assignConst(mechanical);
                this.setState({ show1: true });
                break;

            case arrProduction[3]:
                this.assignConst(welding);
                this.setState({ show1: true });
                break;

            case arrProduction[4]:
                this.assignConst(thermal);
                this.setState({ show1: true });
                break;

            case arrProduction[5]:
                this.assignConst(paintJob);
                this.setState({ show1: true });
                break;

            case arrProduction[6]:
                this.assignConst(flange);
                this.setState({ show1: true });
                break;

            case arrProduction[7]:
                this.assignConst(bottomMetal);
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

    async getDataNotId() {
        new Promise((resolve) => {
            resolve(Server.getDataFromServerNotId('Main'))
        }).then(result => {
            // console.log(result);
            this.arrName = [];

            result.forEach(data => {
                let name = (JSON.parse(data.uo_array));
                console.log(name[1].value);
                this.arrName = [...this.arrName, name[1].value]
            })
            console.log(this.arrName);

            this.arrNameCompany = [];

            this.arrName.forEach(data => {
                if (!this.arrNameCompany.includes(data) && data !== undefined) this.arrNameCompany = [...this.arrNameCompany, data]
            })
            console.log(this.arrNameCompany.join(', '));
            this.setState({ nameCompany: this.arrNameCompany.join(', ') })

        }).catch(result => {
            console.log("ErorR: ");
            console.log(result);
        })
    }

    componentDidMount() {
        this.setState({ show: true });
        this.getDataNotId();
    }

    render() {

        const show = this.state.show;
        const show1 = this.state.show1;
        const typeProduction = this.state.typeProduction;
        const nameCompany = this.state.nameCompany;

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
                                        label="Поиск предприятия по названию:"
                                        placeholder="Название предприятия"
                                        description=""
                                        option={nameCompany}
                                        // value={this.value[3] ? this.value[3].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <SelectForm
                                        id={2}
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
                            <Form.Group style={{ opacity: show1 ? '1' : '0', transition: '0.75s' }}>
                                <Row>
                                    <SelectForm
                                        id={3}
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
                            <Form.Group>
                                <Row>
                                    <SelectForm
                                        id={4}
                                        width={12}
                                        show={true}
                                        label="Поиск по материалам используемым в производстве:"
                                        placeholder="Материалы, с которыми работает предприятие"
                                        description=""
                                        option={material}
                                        // value={this.value[3] ? this.value[3].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
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