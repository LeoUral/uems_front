/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import SelectForm from './SelectForm';
import InputForm from './InputForm';
import CheckForm from './CheckForm';


export default class Form_Six extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            // id: 3,
            maxId: 22,
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
        this.doChangeVisionBlock1 = this.doChangeVisionBlock1.bind(this);
        this.doChangeVisionBlock2 = this.doChangeVisionBlock2.bind(this);
        this.doChangeVisionBlock3 = this.doChangeVisionBlock3.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    //*Пустышка
    doEmpty() {

    }

    //* меняем видимость блока при выборе ДА / НЕТ
    doChangeVisionBlock(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === 'Да' || this.props.data[1].value === 'Да') {
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

            if (data === true || this.props.data[2].value === true) {
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

            if (data === true || this.props.data[10].value === true) {
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

    doChangeVisionBlock3(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === true || this.props.data[17].value === true) {
                this.setState({ show3: true })
            } else {
                this.setState({ show3: false })
            }
        } else {
            if (data === true) {
                this.setState({ show3: true })
            } else {
                this.setState({ show3: false })
            }
        }
    }

    handleClickShadow() {
        this.props.onChangeView('Six');
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
            this.props.onCreateDataServer(data, 'Six', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Six', Number(localStorage.getItem('idUser')));
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
        const show = this.state.show;
        const show1 = this.state.show1;
        const show2 = this.state.show2;
        const show3 = this.state.show3;


        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Работа с ЛКМ" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <SelectForm
                                        id={1}
                                        width={6}
                                        show={true}
                                        label="Производится на Вашем предприятии покраска изделий?"
                                        placeholder="Покарска изделий"
                                        description="Работа с ЛКМ"
                                        option="Да, Нет"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>
                        <Row > &nbsp; </Row>
                        <Container style={{ display: show ? 'block' : 'none' }} >
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <CheckForm
                                        id={2}
                                        width={4}
                                        show={true}
                                        placeholder="Подготовка поверхносей"
                                        description="Работа с ЛКМ, подготовка поверхносей"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock1}
                                    />
                                </Row>
                                <div style={{ display: show1 ? 'block' : 'none' }}>
                                    <Row  >
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Название технологии:
                                        </Col>
                                        <InputForm
                                            id={3}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Название технологии"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[3] ? this.value[3].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Оборудование:
                                        </Col>
                                        <InputForm
                                            id={4}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Оборудование"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[4] ? this.value[4].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Габариты:
                                        </Col>
                                        <InputForm
                                            id={5}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах длина, мм"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[5] ? this.value[5].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={6}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах ширина, мм"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[6] ? this.value[6].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={7}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах высота, мм"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[7] ? this.value[7].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                    <Row>
                                        <CheckForm
                                            id={8}
                                            width={4}
                                            show={true}
                                            placeholder="Пескоструйная обработка"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[8] ? this.value[8].value : ''}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                        <CheckForm
                                            id={9}
                                            width={4}
                                            show={true}
                                            placeholder="Дробеструйная обработка"
                                            description="Работа с ЛКМ, подготовка поверхносей"
                                            value={this.value[9] ? this.value[9].value : ''}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                    </Row>
                                </div>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <CheckForm
                                        id={10}
                                        width={4}
                                        show={true}
                                        placeholder="Нанесения ЛКМ"
                                        description="Работа с ЛКМ, нанесение"
                                        value={this.value[10] ? this.value[10].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                                <div style={{ display: show2 ? 'block' : 'none' }}>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Название технологии:
                                        </Col>
                                        <InputForm
                                            id={11}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Название технологии"
                                            description="Работа с ЛКМ, нанесение"
                                            value={this.value[11] ? this.value[11].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Оборудование:
                                        </Col>
                                        <InputForm
                                            id={12}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Оборудование"
                                            description="Работа с ЛКМ, нанесение"
                                            value={this.value[12] ? this.value[12].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Габариты:
                                        </Col>
                                        <InputForm
                                            id={13}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах длина, мм"
                                            description="Работа с ЛКМ, нанесение"
                                            value={this.value[13] ? this.value[13].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={14}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах ширина, мм"
                                            description="Работа с ЛКМ, нанесение"
                                            value={this.value[14] ? this.value[14].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={15}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах высота, мм"
                                            description="Работа с ЛКМ, нанесение"
                                            value={this.value[15] ? this.value[15].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                    <Row>
                                        <CheckForm
                                            id={16}
                                            width={4}
                                            show={true}
                                            placeholder="Установка безвоздушной покраски"
                                            description="Работа с ЛКМ, нанесение"
                                            value={this.value[16] ? this.value[16].value : ''}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                    </Row>
                                </div>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <CheckForm
                                        id={17}
                                        width={4}
                                        show={true}
                                        placeholder="Сушка изделий после нанесения ЛКМ"
                                        description="Работа с ЛКМ, сушка изделий"
                                        value={this.value[17] ? this.value[17].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock3}
                                    />
                                </Row>
                                <div style={{ display: show3 ? 'block' : 'none' }}>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Название технологии:
                                        </Col>
                                        <InputForm
                                            id={18}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Название технологии"
                                            description="Работа с ЛКМ, сушка изделий"
                                            value={this.value[18] ? this.value[18].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Оборудование:
                                        </Col>
                                        <InputForm
                                            id={19}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Оборудование"
                                            description="Работа с ЛКМ, сушка изделий"
                                            value={this.value[19] ? this.value[19].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                    <Row>
                                        <Col sm={3} style={{ paddingTop: '28px' }}>
                                            Габариты:
                                        </Col>
                                        <InputForm
                                            id={20}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах длина, мм"
                                            description="Работа с ЛКМ, сушка изделий"
                                            value={this.value[20] ? this.value[20].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={21}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах ширина, мм"
                                            description="Работа с ЛКМ, сушка изделий"
                                            value={this.value[21] ? this.value[21].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={22}
                                            width={3}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Мах высота, мм"
                                            description="Работа с ЛКМ, сушка изделий"
                                            value={this.value[22] ? this.value[22].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                </div>
                                <Row> &nbsp; </Row>
                            </Form.Group>
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
                            <Row><div></div></Row>

                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}