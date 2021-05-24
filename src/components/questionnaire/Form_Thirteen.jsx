/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button, Col } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Thirteen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            // id: 8,
            maxId: 8,
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
        this.doEmpty = this.doEmpty.bind(this);
    }

    //*Пустышка
    doEmpty() {

    }

    //* меняем видимость блока при выборе ДА / НЕТ
    doChangeVisionBlock(data) {
        // if (this.state.lengthDataFromServer > 0) {

        //     if (data === 'Да' || this.props.data[1].value === 'Да') {
        //         this.setState({ show: true })
        //     } else {
        //         this.setState({ show: false })
        //     }
        // } else {
        //     if (data === 'Да') {
        //         this.setState({ show: true })
        //     } else {
        //         this.setState({ show: false })
        //     }
        // }
    }




    handleClickAdd() {
        this.addForm();
    }

    handleClickShadow() {
        this.props.onChangeView('Thirteen');
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
            this.props.onCreateDataServer(data, 'Thirteen', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Thirteen', Number(localStorage.getItem('idUser')));
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
        // this.setState({
        //     base: [...this.state.base,
        //     <React.Fragment key={this.state.id}>
        //         <Form_Nine_Add
        //             id={this.state.id}
        //             value={this.value}
        //             onChangeValue={this.doChangeValue}
        //         />
        //     </React.Fragment>
        //     ],
        //     id: +this.state.id + 3,
        //     // maxId: +this.state.maxId + 5
        // })
    }


    //*создаем необходимое количество блоков
    createBlockForm() {
        // let lengthData = this.state.lengthDataFromServer;
        // let data = this.state.dataFromServer;

        // this.addForm();
        // // for (let i = 0; i < lengthData; i++) {

        // //     if ([11, 14, 17, 20, 23, 26, 29].includes(i) && Number(data[i].id > 0)) {
        // //         this.addForm();
        // //     }
        // // }
        // // console.log('createBlockForm');
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataFromServer: this.props.data, lengthDataFromServer: this.props.lengthDataFromServer });
            console.log('DATA on dataFromServer');
            console.log(this.props.data);
            // this.forceUpdate();
        }, 1000);
        // setTimeout(() => {
        //     this.createBlockForm();
        //     if (this.props.lengthDataFromServer > 0) {
        //         // this.doChangeVisionBlock();
        //         // this.doChangeVisionBlock1();
        //         // this.doChangeVisionBlock2();
        //     }
        // }, 1500)
    }

    render() {
        console.log('RENDER');

        const id = this.state.id;
        const view = this.props.view;
        this.value = this.props.data;
        // const show = this.state.show;

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Планирование производства" </Alert.Heading>
                        </Alert>
                        <Container style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            <Form.Group>
                                <Row>
                                    <Col sm={10} style={{ paddingTop: '28px' }}>
                                        Система сквозного планирования производства.
                                     </Col>

                                    <SelectForm
                                        id={1}
                                        width={2}
                                        show={true}
                                        label=""
                                        placeholder="Ваш ответ"
                                        description="Система сквозного планирования производства."
                                        option="Да, Нет"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                            </Form.Group>
                            {/* </Container> */}

                            <Container>
                                <Form.Group>
                                    <Row>
                                        <Col sm={10} style={{ paddingTop: '28px' }}>
                                            Наличие ERP системы
                                     </Col>

                                        <SelectForm
                                            id={2}
                                            width={2}
                                            show={true}
                                            label=""
                                            placeholder="Ваш ответ"
                                            description="Система сквозного планирования производства."
                                            option="Да, Нет"
                                            value={this.value[2] ? this.value[2].value : ''}
                                            // value={this.value[3].value}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                </Form.Group>
                            </Container>

                            <Container>
                                <Form.Group>
                                    <Row>
                                        <Col sm={10} style={{ paddingTop: '28px' }}>
                                            Наличие автоматизации системы сквозного планирования производства с указанием программного продукта
                                     </Col>

                                        <SelectForm
                                            id={3}
                                            width={2}
                                            show={true}
                                            label=""
                                            placeholder="Ваш ответ"
                                            description="Система сквозного планирования производства."
                                            option="Да, Нет"
                                            value={this.value[3] ? this.value[3].value : ''}
                                            // value={this.value[3].value}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                    <Row>
                                        <InputForm
                                            id={4}
                                            width={9}
                                            show={true}
                                            // verify="number"
                                            label=""
                                            placeholder="Наличие програмного продукта"
                                            description="Система сквозного планирования производства."
                                            value={this.value[4] ? this.value[4].value : ''}
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
                                            Наличие системы MES
                                     </Col>

                                        <SelectForm
                                            id={5}
                                            width={2}
                                            show={true}
                                            label=""
                                            placeholder="Ваш ответ"
                                            description="Система сквозного планирования производства."
                                            option="Да, Нет"
                                            value={this.value[5] ? this.value[5].value : ''}
                                            // value={this.value[3].value}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                </Form.Group>
                            </Container>

                            <Container>
                                <Form.Group>
                                    <Row>
                                        <Col sm={10} style={{ paddingTop: '28px' }}>
                                            Количество персонала, задействованного в диспетчировании производства
                                     </Col>

                                        <InputForm
                                            id={6}
                                            width={2}
                                            show={true}
                                            verify="number"
                                            label=""
                                            placeholder="Кол-во человек"
                                            description="Количество персонала, задействованного в диспетчировании производства"
                                            value={this.value[6] ? this.value[6].value : ''}
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
                                            Наличие подъездных ЖД путей
                                     </Col>

                                        <SelectForm
                                            id={7}
                                            width={2}
                                            show={true}
                                            label=""
                                            placeholder="Ваш ответ"
                                            description="Система сквозного планирования производства."
                                            option="Да, Нет"
                                            value={this.value[7] ? this.value[7].value : ''}
                                            // value={this.value[3].value}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
                                        />
                                    </Row>
                                    <Row> &nbsp; </Row>
                                </Form.Group>
                            </Container>

                            <Container>
                                <Form.Group>
                                    <Row>
                                        <Col sm={10} style={{ paddingTop: '28px' }}>
                                            Возможность отгрузки водным транспортом.
                                     </Col>

                                        <SelectForm
                                            id={8}
                                            width={2}
                                            show={true}
                                            label=""
                                            placeholder="Ваш ответ"
                                            description="Система сквозного планирования производства."
                                            option="Да, Нет"
                                            value={this.value[8] ? this.value[8].value : ''}
                                            // value={this.value[3].value}
                                            onChangeValue={this.doChangeValue}
                                            onChangeVisionBlock={this.doEmpty}
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
                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}