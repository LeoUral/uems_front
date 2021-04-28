/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import SelectForm from './SelectForm';
import Form_Ten_Add from './Form_Ten_Add';
import Form_Ten_Add1 from './Form_Ten_Add1';
import Form_Ten_Add2 from './Form_Ten_Add2';

export default class Form_Ten extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 2,
            id1: 10,
            id2: 18,
            maxId: 52,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: [],
            base1: [],
            base2: [],
            show: false,
            show1: false
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
        this.props.onChangeView('Ten');
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
            this.props.onCreateDataServer(data, 'Ten', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Ten', Number(localStorage.getItem('idUser')));
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

        if (this.state.id < 8) {

            this.setState({
                base: [...this.state.base,
                <React.Fragment key={this.state.id}>
                    <Form_Ten_Add
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

        if (this.state.id1 < 17) {

            this.setState({
                base1: [...this.state.base1,
                <React.Fragment key={this.state.id1}>
                    <Form_Ten_Add1
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

        if (this.state.id2 < 52) {

            this.setState({
                base2: [...this.state.base2,
                <React.Fragment key={this.state.id2}>
                    <Form_Ten_Add2
                        id2={this.state.id2}
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id2: +this.state.id2 + 5
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

            if ([4, 6, 8].includes(i) && Number(data[i].id > 0)) {
                this.addForm();
            }

            if ([11, 12, 13, 14, 15, 16, 17].includes(i) && Number(data[i].id > 0)) {
                this.addForm1();
            }

            if ([23, 28, 33, 38, 43, 48].includes(i) && Number(data[i].id > 0)) {
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

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Технология сварки" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={3} style={{ paddingTop: '28px' }}>
                                        Аттестация по СМК
                                     </Col>

                                    <SelectForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        label=""
                                        placeholder="Ваш ответ"
                                        description="Аттестация по СМК"
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
                            <Row> &nbsp; </Row>
                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <Col sm={12} style={{ paddingTop: '28px' }}>
                                        Количество и уровень аттестации технологов по сварке:
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

                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <Col sm={12} style={{ paddingTop: '28px' }}>
                                        Аттестованные технологии сварки, применяемые на Вашем предприятии:
                                     </Col>
                                </Row>

                                {this.state.base1}

                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleClickAdd1}
                                    style={{ marginLeft: '20px' }}
                                >
                                    Добавить позицию
                                            </Button>
                                <Row> &nbsp; </Row>
                            </Form.Group>

                            <Form.Group style={{ borderBottom: '1px solid #ccc' }}>
                                <Row>
                                    <Col sm={12} style={{ paddingTop: '28px' }}>
                                        Укажите количество сварщиков аттестованных НАКС в штате предприятия с указанием следующих параметров:
                                     </Col>
                                </Row>

                                {this.state.base2}

                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleClickAdd2}
                                    style={{ marginLeft: '20px' }}
                                >
                                    Добавить позицию
                                            </Button>
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