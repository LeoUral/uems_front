/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import InputForm from './InputForm';
import CheckForm from './CheckForm';
import Form_Five_Add from './Form_Five_Add';


export default class Form_Five extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 11,
            maxId: 21,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: [],
            show: false,
            show1: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.addForm = this.addForm.bind(this);
        this.createBlockForm = this.createBlockForm.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.doChangeVisionBlock1 = this.doChangeVisionBlock1.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    //*Пустышка
    doEmpty() {

    }

    //* меняем видимость блока при выборе ДА / НЕТ
    doChangeVisionBlock(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === true || this.props.data[1].value === true) {
                this.setState({ show: true })
            } else {
                this.setState({ show: false })
            }
        } else {
            if (data === true) {
                this.setState({ show: true })
            } else {
                this.setState({ show: false })
            }
        }
    }

    doChangeVisionBlock1(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === true || this.props.data[11].value === true) {
                this.setState({ show1: true })
            } else {
                this.setState({ show1: false })
            }
        } else {
            if (data === true) {
                this.setState({ show1: true })
            } else {
                this.setState({ show1: false })
            }
        }
    }

    handleClickAdd() {
        this.addForm();
    }

    handleClickShadow() {
        this.props.onChangeView('Five');
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
            this.props.onCreateDataServer(data, 'Five', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Five', Number(localStorage.getItem('idUser')));
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

    addForm() {
        this.setState({
            base: [...this.state.base,
            <React.Fragment key={this.state.id}>
                <Form_Five_Add
                    id={this.state.id}
                    value={this.value}
                    onChangeValue={this.doChangeValue}
                />
            </React.Fragment>
            ],
            id: +this.state.id + 10,
            maxId: +this.state.maxId + 10
        })
    }


    //*создаем необходимое количество блоков
    createBlockForm() {
        let lengthData = this.state.lengthDataFromServer;
        let data = this.state.dataFromServer;

        this.addForm();
        for (let i = 0; i < lengthData; i++) {

            if ([22, 32, 42, 52, 62, 72, 82, 92].includes(i) && Number(data[i].id > 0)) {
                this.addForm();
            }
        }

        console.log('createBlockForm');
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataFromServer: this.props.data, lengthDataFromServer: this.props.lengthDataFromServer });
            console.log('DATA on dataFromServer');
            console.log(this.props.data);
            // this.forceUpdate();
        }, 1000);
        setTimeout(() => {
            this.createBlockForm();
            if (this.props.lengthDataFromServer > 0) {
                this.doChangeVisionBlock();
                this.doChangeVisionBlock1();
            }
        }, 1500)
    }

    render() {
        console.log('RENDER');

        const id = this.state.id;
        const view = this.props.view;
        this.value = this.props.data;
        const show = this.state.show;
        const show1 = this.state.show1;


        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита - "Термическая обработка" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row> Имеется ли на Вашем предприятии термическая обработка узлов и деталей выпускаемого оборудования?</Row>
                                <Row>
                                    <CheckForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        placeholder="Собственное оборудование"
                                        description="Собственная термическая обработка"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                                <Row>
                                    <CheckForm
                                        id={2}
                                        width={4}
                                        show={show}
                                        placeholder="Печная"
                                        description="Собственная термическая обработка"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                    <CheckForm
                                        id={3}
                                        width={4}
                                        show={show}
                                        placeholder="Внепечная"
                                        description="Собственная термическая обработка"
                                        value={this.value[3] ? this.value[3].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                    <CheckForm
                                        id={4}
                                        width={4}
                                        show={show}
                                        placeholder="Коврики(маты)"
                                        description="Собственная термическая обработка"
                                        value={this.value[4] ? this.value[4].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                    <CheckForm
                                        id={5}
                                        width={4}
                                        show={show}
                                        placeholder="Колпаки"
                                        description="Собственная термическая обработка"
                                        value={this.value[5] ? this.value[5].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                                <Row style={{ visibility: show ? 'visible' : 'collapse' }}>
                                    <Col>Укажите: Мах длина, ширина, высота (мм)</Col>
                                </Row>
                                <Row>
                                    <InputForm
                                        id={6}
                                        width={2}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мах длина, мм"
                                        description="Собственная термическая обработка"
                                        value={this.value[6] ? this.value[6].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={7}
                                        width={2}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мах ширина, мм"
                                        description="Собственная термическая обработка"
                                        value={this.value[7] ? this.value[7].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={8}
                                        width={2}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мах высота, мм"
                                        description="Собственная термическая обработка"
                                        value={this.value[8] ? this.value[8].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={9}
                                        width={2}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мах вес деталей, тн"
                                        description="Собственная термическая обработка"
                                        value={this.value[9] ? this.value[9].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={10}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мах темп. обраб. деталей, С"
                                        description="Собственная термическая обработка"
                                        value={this.value[10] ? this.value[10].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>

                                <Row>
                                    <CheckForm
                                        id={11}
                                        width={4}
                                        show={true}
                                        placeholder="Аутсорсинг"
                                        description="Аутсорсинг, термическая обработка"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock1}
                                    />
                                </Row>

                                {show1 ? this.state.base : ''}

                            </Form.Group>
                            <Row> &nbsp; </Row>
                            <Form.Group>
                                <Row>
                                    <Container>
                                        <Button
                                            variant="outline-dark"
                                            onClick={this.handleClickSave}
                                        >
                                            Сохранить информацию
                                             </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={this.handleClickAdd}
                                            style={{ marginLeft: '20px' }}
                                        >
                                            Добавить позицию
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