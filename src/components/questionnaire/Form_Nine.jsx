/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import TextareaForm from './TextareaForm';
import Form_Nine_Add from './Form_Nine_Add';

export default class Form_Nine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 8,
            maxId: 35,
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
        this.doChangeVisionBlock2 = this.doChangeVisionBlock2.bind(this);
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

            if (data === 'Да' || this.props.data[7].value === 'Да') {
                this.setState({ show1: true })
            } else {
                this.setState({ show1: false })
            }
        } else {
            if (data === 'Да') {
                this.setState({ show1: true })
            } else {
                this.setState({ show1: false })
            }
        }
    }

    doChangeVisionBlock2(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === 'Да' || this.props.data[34].value === 'Да') {
                this.setState({ show2: true })
            } else {
                this.setState({ show2: false })
            }
        } else {
            if (data === 'Да') {
                this.setState({ show2: true })
            } else {
                this.setState({ show2: false })
            }
        }
    }



    handleClickAdd() {
        this.addForm();
    }

    handleClickShadow() {
        this.props.onChangeView('Nine');
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
            this.props.onCreateDataServer(data, 'Nine', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Nine', Number(localStorage.getItem('idUser')));
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
                <Form_Nine_Add
                    id={this.state.id}
                    value={this.value}
                    onChangeValue={this.doChangeValue}
                />
            </React.Fragment>
            ],
            id: +this.state.id + 3,
            // maxId: +this.state.maxId + 5
        })
    }


    //*создаем необходимое количество блоков
    createBlockForm() {
        let lengthData = this.state.lengthDataFromServer;
        let data = this.state.dataFromServer;

        this.addForm();
        for (let i = 0; i < lengthData; i++) {

            if ([11, 14, 17, 20, 23, 26, 29].includes(i) && Number(data[i].id > 0)) {
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
                this.doChangeVisionBlock2();
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
        const show2 = this.state.show2;

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Изготовление полулинз и линзовых компенсаторов / Подъемно-транспортные механизмы" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '28px' }}>
                                        Изготавливает ли Ваше предприятие полулинзы а так же полулинзы для изготовления линзовых компенсаторов?
                                     </Col>

                                    <SelectForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        label=""
                                        placeholder="Ваш ответ"
                                        description="Изготовление полулинз"
                                        option="Да, Нет"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>
                        <Container style={{ display: show ? 'block' : 'none' }}>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <InputForm
                                        id={2}
                                        width={3}
                                        show={show}
                                        // verify="number"
                                        label=""
                                        placeholder="Материал изготовления"
                                        description="Изготовление полулинз"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={3}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мин диаметр, мм"
                                        description="Изготовление полулинз"
                                        value={this.value[3] ? this.value[3].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Мах диаметр, мм"
                                        description="Изготовление полулинз"
                                        value={this.value[4] ? this.value[4].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={5}
                                        width={3}
                                        show={show}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм"
                                        description="Изготовление полулинз"
                                        value={this.value[5] ? this.value[5].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                            </Form.Group>
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '28px' }}>
                                        Имеется ли на вашем предприятии возможность гибки теплообменных труб?
                                     </Col>
                                    <SelectForm
                                        id={6}
                                        width={2}
                                        show={true}
                                        label=""
                                        placeholder="Ваш ответ"
                                        description="Гибки теплообменных труб"
                                        option="Да, Нет"
                                        value={this.value[6] ? this.value[6].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '28px' }}>
                                        Имеется ли грузоподъемное оборудование на вашем производстве?
                                     </Col>
                                    <SelectForm
                                        id={7}
                                        width={2}
                                        show={true}
                                        label=""
                                        placeholder="Ваш ответ"
                                        description="Грузоподъемное оборудование"
                                        option="Да, Нет"
                                        value={this.value[7] ? this.value[7].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock1}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container style={{ display: show1 ? 'block' : 'none' }}>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }} >

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
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '20px' }}>
                                        Укажите количество конструкторов в штате Вашего предприятия с опытом проектирования кожухотрубных теплообменных аппаратов и аппаратов, работающих под давлением.
                                     </Col>
                                    <InputForm
                                        id={32}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Количество, чел"
                                        description="Конструктора с опытом проектирования"
                                        value={this.value[32] ? this.value[32].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '20px' }}>
                                        Укажите количество технологов в штате Вашего предприятия с опытом разработки технологии изготовления кожухотрубных теплообменных аппаратов и аппаратов, работающих под давлениемом проектирования кожухотрубных теплообменных аппаратов и аппаратов, работающих под давлением.
                                     </Col>
                                    <InputForm
                                        id={33}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Количество, чел"
                                        description="Технологи с опытом разработки"
                                        value={this.value[33] ? this.value[33].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '20px' }}>
                                        Укажите наличие системы технологического контроля изготовления теплообменного оборудования, начиная от входного контроля материалов до момента отгрузки готового изделия и её описание (технологический паспорт и т.п.)
                                     </Col>
                                    <SelectForm
                                        id={34}
                                        width={2}
                                        show={true}
                                        label=""
                                        placeholder="Ваш ответ"
                                        description="Cистемы технологического контроля изготовления теплообменного оборудования"
                                        option="Да, Нет"
                                        value={this.value[34] ? this.value[34].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                    <TextareaForm
                                        id={35}
                                        width={12}
                                        rows={3}
                                        show={show2}
                                        label=""
                                        placeholder="Наличие системы контроля, описание"
                                        description="Cистемы технологического контроля изготовления теплообменного оборудования"
                                        value={this.value[35] ? this.value[35].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
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
                    </Form>
                </div>

            </>
        )
    }
}