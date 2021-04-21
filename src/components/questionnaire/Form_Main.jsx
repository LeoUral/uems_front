import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import CheckForm from './CheckForm';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            dataValue: []
        }

        this.doChangeValue = this.doChangeValue.bind(this);
    }

    doChangeValue(data) {
        console.log(data);
        this.setState({ dataValue: [...this.state.dataValue, data] })
        setTimeout(() => { console.log(this.state.dataValue) })
    }

    render() {

        const value = ""//ARRAY

        return (
            <>
                <div className="modal_window">
                    {/* <div className="shadow"></div> */}
                    <Form className="form_main">
                        <Alert variant="dark">
                            <Alert.Heading > Общаяя информация </Alert.Heading>
                        </Alert>
                        <Container className="container_form_min">
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={1}
                                        width={12}
                                        show={true}
                                        // verify="number"
                                        label="Полное наименование предприятия"
                                        placeholder="Полное наименование предприятия"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={2}
                                        width={9}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="ФИО руководителя"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={3}
                                        width={3}
                                        show={true}
                                        label=""
                                        placeholder="Должность"
                                        description="Предприятие"
                                        option="Директор, Генеральный директор, Президент" //*список для выбора
                                        value=""
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Телефон"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={8}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="E-Mail"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="ИНН"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="КПП"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="ОГРН"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={12}
                                        show={true}
                                        // verify="number"
                                        label="Контактное лицо"
                                        placeholder="ФИО"
                                        description="Контактное лицо"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Должность"
                                        description="Контактное лицо"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Телефон"
                                        description="Контактное лицо"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="E mail"
                                        description="Контактное лицо"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <div> 1. Адрес расположения производственных площадей и технических служб предприятия-изготовителя </div>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Индекс"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={3}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Срана"
                                        description="Предприятие"
                                        option="Россия, не Россия"
                                        value=""
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={3}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Город"
                                        description="Предприятие"
                                        option="Города России"
                                        value=""
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={6}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Улица"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Дом"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={3}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Корпус"
                                        description="Предприятие"
                                        value={value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Container>
                                        <Button variant="outline-dark">Сохранить информацию</Button>
                                    </Container>
                                </Row>
                            </Form.Group>
                            <Row><div></div></Row>

                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}