/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import SelectForm from './SelectForm';
import InputForm from './InputForm';
import Form_Three_Add from './Form_Three_Add';
import CheckForm from './CheckForm';

export default class Form_Four extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            // id: 3,
            maxId: 14,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: [],
            show1: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.doChangeVisionBlock1 = this.doChangeVisionBlock1.bind(this);
        this.doChangeVisionBlock2 = this.doChangeVisionBlock2.bind(this);
        this.doChangeVisionBlock3 = this.doChangeVisionBlock3.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    //*Пустышка
    doEmpty() {
    }

    //* меняем видимость блока при выборе ДА / НЕТ
    doChangeVisionBlock1(data) {
        if (data === 'Да' || this.props.data[7].value === 'Да') {
            this.setState({ show1: true })
        } else {
            this.setState({ show1: false })
        }
    }

    doChangeVisionBlock2(data) {
        if (data === 'Да' || this.props.data[9].value === 'Да') {
            this.setState({ show2: true })
        } else {
            this.setState({ show2: false })
        }
    }

    doChangeVisionBlock3(data) {
        if (data === 'Да' || this.props.data[12].value === 'Да') {
            this.setState({ show3: true })
        } else {
            this.setState({ show3: false })
        }
    }

    handleClickShadow() {
        this.props.onChangeView('Four');
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
            this.props.onCreateDataServer(data, 'Four', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Four', Number(localStorage.getItem('idUser')));
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
                this.doChangeVisionBlock1();
                this.doChangeVisionBlock2();
                this.doChangeVisionBlock3();
            }, 1500)
        }
    }

    render() {
        console.log('RENDER');
        // const id = this.state.id;
        const view = this.props.view;
        this.value = this.props.data;
        const show1 = this.state.show1;
        const show2 = this.state.show2;
        const show3 = this.state.show3;

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита - "Материалы", "Развальцовка", "Испытания" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row>Материалы, с которыми работает Ваше предприятие:</Row>
                                <Row>
                                    <CheckForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        placeholder="Углеродистые стали" //* подпись LABEL для чекбокса
                                        description="Материалы"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />

                                    <CheckForm
                                        id={2}
                                        width={4}
                                        show={true}
                                        placeholder="Никелевые сплавы"
                                        description="Материалы"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />

                                    <CheckForm
                                        id={3}
                                        width={4}
                                        show={true}
                                        placeholder="Медно-никелевые сплавы"
                                        description="Материалы"
                                        value={this.value[3] ? this.value[3].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />

                                    <CheckForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        placeholder="Титан"
                                        description="Материалы"
                                        value={this.value[4] ? this.value[4].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />

                                    <CheckForm
                                        id={5}
                                        width={4}
                                        show={true}
                                        placeholder="Аустенитные стали"
                                        description="Материалы"
                                        value={this.value[5] ? this.value[5].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />

                                    <CheckForm
                                        id={6}
                                        width={4}
                                        show={true}
                                        placeholder="Аустенитно-ферритные (ХМ) стали"
                                        description="Материалы"
                                        value={this.value[6] ? this.value[6].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                            <Form.Group>
                                <Row>
                                    <Col sm={8} style={{ paddingTop: '20px' }}>
                                        Имеется ли на Вашем предприятии опыт развальцовки теплообменных трубок толщиной стенки 1мм.?
                                        </Col>
                                    <SelectForm
                                        id={7}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Наличие опыта развальцовки"
                                        description="Развальцовка теплообменных труб"
                                        option="Да, Нет"
                                        value={this.value[7] ? this.value[7].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock1}
                                    />
                                    <CheckForm
                                        id={8}
                                        width={4}
                                        show={show1}
                                        placeholder="Менее 1 мм/дюйма"
                                        description="Наличие опыта развальцовки"
                                        value={this.value[8] ? this.value[8].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                            <Form.Group>
                                <Row>
                                    <Col sm={8} style={{ paddingTop: '28px' }}>
                                        Проводятся ли на Вашем предприятии пневматические испытания выпускаемого оборудования?
                                        </Col>
                                    <SelectForm
                                        id={9}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Наличие испытаний"
                                        description="Пневматические испытания выпускаемого оборудования"
                                        option="Да, Нет"
                                        value={this.value[9] ? this.value[9].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={10}
                                        width={4}
                                        show={show2}
                                        verify="number"
                                        label=""
                                        placeholder="Мах давление, МПа"
                                        description="Пневматические испытания выпускаемого оборудования"
                                        value={this.value[10] ? this.value[10].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={11}
                                        width={4}
                                        show={show2}
                                        verify="number"
                                        label=""
                                        placeholder="Количество аттестованных стендов, шт."
                                        description="Пневматические испытания выпускаемого оборудования"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                            <Form.Group>
                                <Row>
                                    <Col sm={8} style={{ paddingTop: '28px' }}>
                                        Проводятся ли на Вашем предприятии гидравлические испытания выпускаемого оборудования?
                                        </Col>
                                    <SelectForm
                                        id={12}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Наличие испытаний"
                                        description="Гидравлические испытания выпускаемого оборудования"
                                        option="Да, Нет"
                                        value={this.value[12] ? this.value[12].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock3}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={13}
                                        width={4}
                                        show={show3}
                                        verify="number"
                                        label=""
                                        placeholder="Мах давление, МПа"
                                        description="Гидравлические испытания выпускаемого оборудования"
                                        value={this.value[13] ? this.value[13].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={14}
                                        width={4}
                                        show={show3}
                                        verify="number"
                                        label=""
                                        placeholder="Количество аттестованных стендов, шт."
                                        description="Гидравлические испытания выпускаемого оборудования"
                                        value={this.value[14] ? this.value[14].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Container>
                                        <Row> &nbsp; </Row>
                                        <Button
                                            variant="outline-dark"
                                            onClick={this.handleClickSave}
                                        >
                                            Сохранить информацию
                                             </Button>
                                    </Container>
                                </Row>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}