/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import InputForm from './InputForm';
import CheckForm from './CheckForm';
import SelectForm from './SelectForm';
import Form_Eight_Add from './Form_Eight_Add';



export default class Form_Eight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 2,
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
                <Form_Eight_Add
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
        // for (let i = 0; i < lengthData; i++) {

        //     if ([22, 32, 42, 52, 62, 72, 82, 92].includes(i) && Number(data[i].id > 0)) {
        //         this.addForm();
        //     }
        // }

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
                // this.doChangeVisionBlock1();
            }
        }, 1500)
    }

    render() {
        console.log('RENDER');

        const id = this.state.id;
        const view = this.props.view;
        this.value = this.props.data;
        const show = this.state.show;
        const show1 = true;


        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита - "Изготовление фланцев и днища" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row> Изготавливает ли Ваше предприятие заготовки корпусных и штуцерных фланцев?</Row>
                                <Row>
                                    <SelectForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Изготовление фланцев"
                                        description="Изготовление фланцев"
                                        option="Да, Нет"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
                            <Row> &nbsp; </Row>
                        </Container>

                        <Container style={{ display: show ? 'block' : 'none' }}>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <Col>
                                        Виды заготовок:
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
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row> Изготавливает ли Ваше предприятие днища?</Row>
                                <Row>
                                    <SelectForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Изготовление днища"
                                        description="Изготовление днища"
                                        option="Да, Нет"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock1}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container style={{ display: show1 ? 'block' : 'none' }}>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }} >
                                <Row>
                                    <CheckForm
                                        id={11}
                                        width={4}
                                        show={true}
                                        placeholder="Эллиптические"
                                        description="Изготовление днища"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <Col>
                                        Материал, минимальный и максимальный диаметр и толщина:
                                    </Col>
                                </Row>
                                <Row>
                                    <InputForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Материал изготовления"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мин диаметр, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах диаметр, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мин толщина, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                            </Form.Group>

                            <Form.Group style={{ borderBottom: '1px solid #ccc' }} >
                                <Row>
                                    <CheckForm
                                        id={11}
                                        width={4}
                                        show={true}
                                        placeholder="Торосферические"
                                        description="Изготовление днища"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <Col>
                                        Материал, минимальный и максимальный диаметр и толщина:
                                    </Col>
                                </Row>
                                <Row>
                                    <InputForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Материал изготовления"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мин диаметр, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах диаметр, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мин толщина, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                            </Form.Group>

                            <Form.Group style={{ borderBottom: '1px solid #ccc' }} >
                                <Row>
                                    <CheckForm
                                        id={11}
                                        width={4}
                                        show={true}
                                        placeholder="Сферические"
                                        description="Изготовление днища"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <Col>
                                        Материал, минимальный и максимальный диаметр и толщина:
                                    </Col>
                                </Row>
                                <Row>
                                    <InputForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Материал изготовления"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мин диаметр, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах диаметр, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мин толщина, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина, мм"
                                        description="Изготовление днища"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
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
                    </Form>
                </div>

            </>
        )
    }
}