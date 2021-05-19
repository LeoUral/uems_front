/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import CheckForm from './CheckForm';
import Form_Fourteen_Add from './Form_Fourteen_Add';

export default class Form_Fourteen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 2,
            id1: 15,
            id2: 28,
            id3: 41,
            maxId: 53,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: [],
            base1: [],
            base2: [],
            base3: [],
            show: false,
            show1: false,
            show2: false,
            show3: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickAdd1 = this.handleClickAdd1.bind(this);
        this.handleClickAdd2 = this.handleClickAdd2.bind(this);
        this.handleClickAdd3 = this.handleClickAdd3.bind(this);
        this.addForm = this.addForm.bind(this);
        this.addForm1 = this.addForm1.bind(this);
        this.addForm2 = this.addForm2.bind(this);
        this.addForm3 = this.addForm3.bind(this);
        this.createBlockForm = this.createBlockForm.bind(this);
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

            if (data === true || this.props.data[14].value === true) {
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

            if (data === true || this.props.data[27].value === true) {
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

            if (data === true || this.props.data[40].value === true) {
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

    handleClickAdd() {
        this.addForm();
    }

    handleClickAdd1() {
        this.addForm1();
    }

    handleClickAdd2() {
        this.addForm2();
    }

    handleClickAdd3() {
        this.addForm3();
    }

    handleClickShadow() {
        this.props.onChangeView('Fourteen');
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
            this.props.onCreateDataServer(data, 'Fourteen', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Fourteen', Number(localStorage.getItem('idUser')));
        }
        // setTimeout(() => { console.log(this.state.dataOnServer) })//test
        this.handleClickShadow();
    }

    //* данные с полей формы, формируются в массив объектов
    doChangeValue(data) {
        console.log(data);//test
        this.setState({ dataValue: [...this.state.dataValue, data] })
        setTimeout(() => { console.log(this.state.dataValue) })//test
    }

    addForm() {

        if (this.state.id < (this.state.id1 - 2)) {

            this.setState({
                base: [...this.state.base,
                <React.Fragment key={this.state.id}>
                    <Form_Fourteen_Add
                        id={this.state.id}
                        placeholder="Сертификаты"
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

        if (this.state.id1 < (this.state.id2 - 2)) {

            this.setState({
                base1: [...this.state.base1,
                <React.Fragment key={this.state.id1}>
                    <Form_Fourteen_Add
                        id={this.state.id1}
                        placeholder="Декларации"
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id1: +this.state.id1 + 2
                // maxId: +this.state.maxId + 5
            })
        }
    }

    addForm2() {

        if (this.state.id2 < (this.state.id3 - 2)) {

            this.setState({
                base2: [...this.state.base2,
                <React.Fragment key={this.state.id2}>
                    <Form_Fourteen_Add
                        id={this.state.id2}
                        placeholder="Аттестации"
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id2: +this.state.id2 + 2
                // maxId: +this.state.maxId + 5
            })
        }
    }

    addForm3() {

        if (this.state.id3 < (this.state.maxId)) {

            this.setState({
                base3: [...this.state.base3,
                <React.Fragment key={this.state.id3}>
                    <Form_Fourteen_Add
                        id={this.state.id3}
                        placeholder="Аккредитации"
                        value={this.value}
                        onChangeValue={this.doChangeValue}
                    />
                </React.Fragment>
                ],
                id3: +this.state.id3 + 2
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
        this.addForm3();

        for (let i = 0; i < lengthData; i++) {

            if ([4, 6, 8, 10, 12].includes(i) && Number(data[i].id > 0)) {
                this.addForm();
            }

            if ([17, 19, 21, 23, 25].includes(i) && Number(data[i].id > 0)) {
                this.addForm1();
            }

            if ([30, 32, 34, 36, 38].includes(i) && Number(data[i].id > 0)) {
                this.addForm2();
            }

            if ([43, 45, 47, 49, 51].includes(i) && Number(data[i].id > 0)) {
                this.addForm3();
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
                this.doChangeVisionBlock3();
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
        const show3 = this.state.show3

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Сертификаты, Декларации, Аттестации, Аккредитации" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row>
                                    <Col sm={3} style={{ paddingTop: '28px' }}>
                                        Разрешительная документация
                                     </Col>
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <CheckForm
                                        id={1}
                                        width={4}
                                        show={true}
                                        placeholder="Сертификаты"
                                        description="Разрешительная документация, сертификаты"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container style={{ display: show ? 'block' : 'none' }}>
                            <Row> &nbsp; </Row>
                            <Form.Group >

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
                                    <CheckForm
                                        id={14}
                                        width={4}
                                        show={true}
                                        placeholder="Декларации"
                                        description="Разрешительная документация, декларации"
                                        value={this.value[14] ? this.value[14].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock1}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container style={{ display: show1 ? 'block' : 'none' }}>
                            <Row> &nbsp; </Row>
                            <Form.Group>

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
                        </Container>

                        <Container>
                            <Form.Group>
                                <Row>
                                    <CheckForm
                                        id={27}
                                        width={4}
                                        show={true}
                                        placeholder="Аттестации"
                                        description="Разрешительная документация, аттестации"
                                        value={this.value[27] ? this.value[27].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container style={{ display: show2 ? 'block' : 'none' }}>
                            <Row> &nbsp; </Row>
                            <Form.Group>

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
                            <Form.Group>
                                <Row>
                                    <CheckForm
                                        id={40}
                                        width={4}
                                        show={true}
                                        placeholder="Аккредитации"
                                        description="Разрешительная документация, аккредитации"
                                        value={this.value[40] ? this.value[40].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock3}
                                    />
                                </Row>
                            </Form.Group>
                        </Container>

                        <Container style={{ display: show3 ? 'block' : 'none' }}>
                            <Row> &nbsp; </Row>
                            <Form.Group >

                                {this.state.base3}

                                <Button
                                    variant="outline-secondary"
                                    onClick={this.handleClickAdd3}
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