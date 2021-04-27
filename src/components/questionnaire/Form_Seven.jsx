/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import SelectForm from './SelectForm';
import InputForm from './InputForm';
import CheckForm from './CheckForm';


export default class Form_Seven extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            // id: 3,
            maxId: 6,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: [],
            show: false,
            show1: false,
            show2: false,
            show3: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        // this.handleClickAdd = this.handleClickAdd.bind(this);
        // this.addForm = this.addForm.bind(this);
        // this.createBlockForm = this.createBlockForm.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    //*Пустышка
    doEmpty() {

    }

    //* меняем видимость блока при выборе ДА / НЕТ
    doChangeVisionBlock(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === 'Да' || this.props.data[2].value === 'Да') {
                this.setState({ show: true })
            } else {
                this.setState({ show: false })
            }
        } else {
            if (data === 'Да') {
                this.setState({ show: true })
            } else {
                this.setState({ show: false })
            }
        }
    }

    handleClickShadow() {
        this.props.onChangeView('Seven');
    }

    //*формируем данные в массив объектов для отправки на сервер
    handleClickSave() {
        let data = this.state.dataOnServer;

        for (let i = 0; i <= (this.state.maxId); i++) {

            //todo создаем позицию с пустым объектом
            data[i] = { id: '', description: '', information: '', value: '' }

            //todo заполняем объект данными с сервера
            this.state.dataFromServer.forEach((dataD) => {
                if (+dataD.id === i) {
                    data[i] = { id: dataD.id, description: dataD.description, information: dataD.information, value: dataD.value }
                }
            })
            //todo заполняем объект данными с формы
            this.state.dataValue.forEach((dataE) => {
                if (+dataE.id === i) {
                    data[i] = { id: dataE.id, description: dataE.description, information: dataE.information, value: dataE.value }
                }
            })

        }
        this.setState({ dataOnServer: data }) //todo проверка на наличие данных на сервере
        if (this.state.lengthDataFromServer < 1) {
            console.log('CREATE DATA');
            this.props.onCreateDataServer(data, 'Seven', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Seven', Number(localStorage.getItem('idUser')));
        }
        setTimeout(() => { console.log(this.state.dataOnServer) })//test
        this.handleClickShadow();
    }

    //* данные с полей формы, формируются в массив объектов
    doChangeValue(data) {
        console.log(data);//test
        this.setState({ dataValue: [...this.state.dataValue, data] })
        setTimeout(() => { console.log(this.state.dataValue) })//test
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataFromServer: this.props.data, lengthDataFromServer: this.props.lengthDataFromServer });
            console.log('DATA on dataFromServer');
            console.log(this.props.data);
            // this.forceUpdate();
        }, 1000);

        if (this.props.lengthDataFromServer > 0) {
            setTimeout(() => {
                this.doChangeVisionBlock();
            }, 1500)
        }
    }

    render() {
        console.log('RENDER');

        // const id = this.state.id;
        const view = this.props.view;
        this.value = this.props.data;
        const show = this.state.show;

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Крепёжные изделия, Поковки" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <SelectForm
                                        id={1}
                                        width={6}
                                        show={true}
                                        label="Изготавливает ли Ваше предприятие крепёжные изделия по СТО 00220256-024-2016?"
                                        placeholder="Ваш ответ"
                                        description="Крепёжные изделия"
                                        option="Да, Нет"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <SelectForm
                                        id={2}
                                        width={6}
                                        show={true}
                                        label="Имеет ли Ваше предприятие возможность изготовления поковок для решеток?"
                                        placeholder="Ваш ответ"
                                        description="Изготовления поковок"
                                        option="Да, Нет"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={3}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Максимальный вес, тн"
                                        description="Изготовления поковок"
                                        value={this.value[3] ? this.value[3].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Максимальный диаметр, мм"
                                        description="Изготовления поковок"
                                        value={this.value[4] ? this.value[4].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={5}
                                        width={3}
                                        show={show}
                                        // verify="number"
                                        label=""
                                        placeholder="Марка стали"
                                        description="Изготовления поковок"
                                        value={this.value[5] ? this.value[5].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={6}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина стали, мм"
                                        description="Изготовления поковок"
                                        value={this.value[6] ? this.value[6].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />

                                </Row>
                            </Form.Group>
                        </Container>
                        <Row > &nbsp; </Row>
                        <Container style={{ display: show ? 'block' : 'none' }} >

                            <Form.Group>
                                <Row>
                                    <Container>
                                        <Button
                                            variant="outline-dark"
                                            onClick={this.handleClickSave}
                                        >
                                            Сохранить информацию
                                             </Button>
                                    </Container>
                                </Row>
                            </Form.Group>
                            <Row > &nbsp; </Row>

                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}