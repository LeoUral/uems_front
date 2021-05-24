/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import SelectForm from './SelectForm';
import InputForm from './InputForm';
import CheckForm from './CheckForm';
import Form_Twelve_Add from './Form_Twelve_Add';
import Form_Twelve_Add1 from './Form_Twelve_Add1';
import Form_Twelve_Add2 from './Form_Twelve_Add2';

export default class Form_Twelve extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 1,
            id1: 20,
            id2: 33,
            maxId: 44,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: [],
            base1: [],
            base2: [],
            show: false,
            show1: false,
            show2: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickAdd1 = this.handleClickAdd1.bind(this);
        this.handleClickAdd2 = this.handleClickAdd2.bind(this);
        this.addForm = this.addForm.bind(this);
        this.addForm1 = this.addForm1.bind(this);
        this.addForm2 = this.addForm2.bind(this);
        this.createBlockForm = this.createBlockForm.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.doChangeVisionBlock1 = this.doChangeVisionBlock1.bind(this);
        this.doChangeVisionBlock2 = this.doChangeVisionBlock2.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    //*Пустышка
    doEmpty() {
    }

    //* меняем видимость блока при выборе ДА / НЕТ
    doChangeVisionBlock(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === 'Да' || this.props.data[17].value === 'Да') {
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

    doChangeVisionBlock1(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === true || this.props.data[19].value === true) {
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

    doChangeVisionBlock2(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === true || this.props.data[32].value === true) {
                this.setState({ show2: true })
            } else {
                this.setState({ show2: false })
            }
        } else {
            if (data === true) {
                this.setState({ show2: true })
            } else {
                this.setState({ show2: false })
            }
        }
    }

    handleClickAdd() {
        this.addForm();
    }

    handleClickAdd1() {
        this.addForm1();
    }

    handleClickAdd2() {
        this.addForm2();
    }

    handleClickShadow() {
        this.props.onChangeView('Twelve');
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
            this.props.onCreateDataServer(data, 'Twelve', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Twelve', Number(localStorage.getItem('idUser')));
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

        if (this.state.id < 14) {

            this.setState({
                base: [...this.state.base,
                <React.Fragment key={this.state.id}>
                    <Form_Twelve_Add
                        id={this.state.id}
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id: +this.state.id + 2
                // maxId: +this.state.maxId + 5
            })
        }
    }

    addForm1() {

        if (this.state.id1 < 32) {

            this.setState({
                base1: [...this.state.base1,
                <React.Fragment key={this.state.id1}>
                    <Form_Twelve_Add1
                        id1={this.state.id1}
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id1: +this.state.id1 + 1
                // maxId: +this.state.maxId + 5
            })
        }
    }

    addForm2() {

        if (this.state.id2 < 44) {

            this.setState({
                base2: [...this.state.base2,
                <React.Fragment key={this.state.id2}>
                    <Form_Twelve_Add2
                        id2={this.state.id2}
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id2: +this.state.id2 + 1
                // maxId: +this.state.maxId + 5
            })
        }
    }

    //*создаем необходимое количество блоков
    createBlockForm() {
        let lengthData = this.state.lengthDataFromServer;
        let data = this.state.dataFromServer;

        this.addForm();
        this.addForm1();
        this.addForm2();

        for (let i = 0; i < lengthData; i++) {

            if ([3, 5, 7, 9, 11, 13, 15].includes(i) && Number(data[i].id > 0)) {
                this.addForm();
            }

            if ([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].includes(i) && Number(data[i].id > 0)) {
                this.addForm1();
            }

            if ([34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44].includes(i) && Number(data[i].id > 0)) {
                this.addForm2();
            }
        }
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
                this.doChangeVisionBlock2();
            }
        }, 1500)
    }

    render() {
        console.log('RENDER');

        const id = this.state.id;
        const id1 = this.state.id1;
        const id2 = this.state.id2;
        const view = this.props.view;
        this.value = this.props.data;
        const show = this.state.show;
        const show1 = this.state.show1;
        const show2 = this.state.show2;

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Методы контроля качества" </Alert.Heading>
                        </Alert>
                        <Container style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            <Form.Group >
                                <Row>
                                    <Col sm={12} style={{ paddingTop: '28px' }}>
                                        Количество рекламаций за указанный период, шт.
                                     </Col>
                                </Row>

                                {this.state.base}

                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleClickAdd}
                                    style={{ marginLeft: '20px' }}
                                >
                                    Добавить позицию
                                            </Button>
                                <Row> &nbsp; </Row>
                            </Form.Group>
                            {/* </Container> */}
                            <Container style={{ display: true ? 'block' : 'none' }}>
                                <Row> &nbsp; </Row>
                                <Form.Group>
                                    <Row>
                                        <Col sm={9} style={{ paddingTop: '28px' }}>
                                            Численность персонала, работающего в службе качества:
                                     </Col>
                                        <InputForm
                                            id={16}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Кол-во человек"
                                            description="Численность персонала, работающего в службе качества"
                                            value={this.value[16] ? this.value[16].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                </Form.Group>
                            </Container>
                            <Container>
                                <Form.Group >
                                    <Row>
                                        <Col sm={9} style={{ paddingTop: '28px' }}>
                                            Система входного контроля материалов и комплектующих
                                     </Col>
                                        <SelectForm
                                            id={17}
                                            width={3}
                                            show={true}
                                            label=""
                                            placeholder="Ваш ответ"
                                            description="Система входного контроля материалов и комплектующих"
                                            option="Да, Нет"
                                            value={this.value[17] ? this.value[17].value : ''}
                                            // value={this.value[3].value}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doChangeVisionBlock}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                </Form.Group>
                            </Container>
                            <Container style={{ display: show ? 'block' : 'none' }}>
                                <Form.Group>
                                    <Row>
                                        <Col sm={9} style={{ paddingTop: '28px' }}>
                                            Численность персонала, задействованного в оформлении паспортов на оборудование:
                                     </Col>
                                        <InputForm
                                            id={18}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Кол-во человек"
                                            description="Численность персонала, задействованного в оформлении паспортов на оборудование"
                                            value={this.value[18] ? this.value[18].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                </Form.Group>

                                <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                    <Row>
                                        <Col sm={12} style={{ paddingTop: '28px' }}>
                                            Методы разрушающего и неразрушающего контроля качества выпускаемой продукции, применяемые на Вашем предприятии:
                                     </Col>
                                    </Row>
                                    <Row> &nbsp; </Row>
                                    <Row>
                                        <CheckForm
                                            id={19}
                                            width={4}
                                            show={true}
                                            placeholder="Собственные"
                                            description="Методы разрушающего и неразрушающего контроля, собственные"
                                            value={this.value[19] ? this.value[19].value : ''}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doChangeVisionBlock1}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                    <div style={{ display: show1 ? 'block' : 'none' }} >

                                        {this.state.base1}

                                        <Row >
                                            <Button
                                                variant="outline-secondary"
                                                onClick={this.handleClickAdd1}
                                                style={{ marginLeft: '20px' }}
                                            >
                                                Добавить позицию
                                            </Button>
                                        </Row>
                                    </div>
                                    <Row> &nbsp; </Row>
                                </Form.Group>

                                <Form.Group style={{ borderBottom: '1px solid #ccc' }}>

                                    <Row> &nbsp; </Row>
                                    <Row>
                                        <CheckForm
                                            id={32}
                                            width={4}
                                            show={true}
                                            placeholder="Аутсорсинг"
                                            description="Методы разрушающего и неразрушающего контроля, аутсорсинг"
                                            value={this.value[32] ? this.value[32].value : ''}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doChangeVisionBlock2}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                    <div style={{ display: show2 ? 'block' : 'none' }} >

                                        {this.state.base2}

                                        <Row>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={this.handleClickAdd2}
                                                style={{ marginLeft: '20px' }}
                                            >
                                                Добавить позицию
                                            </Button>
                                        </Row>
                                    </div>
                                    <Row> &nbsp; </Row>
                                </Form.Group>
                            </Container>

                            <Container>
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
                                        </Container>
                                    </Row>
                                </Form.Group>
                                <Row> &nbsp; </Row>

                            </Container>
                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}