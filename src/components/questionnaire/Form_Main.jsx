/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import PhoneForm from './PhoneForm';
import CheckForm from './CheckForm';
import SelectForm_City from './SelectForm_City';
import { CITY } from './ConstCity';

export default class Form_Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            show: false,
            dataValue: [],
            maxId: 21,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
    }

    doChangeVisionBlock(e) {
        console.log(e);
        if (e) {
            this.setState({ show: true })
        } else {
            this.setState({ show: false })
        }
    }

    //*Пустышка
    doEmpty() {
    }

    handleClickShadow() {
        this.props.onChangeView('Main');
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
        this.setState({ dataOnServer: data })

        //todo проверка на наличие данных на сервере
        if (this.state.lengthDataFromServer < 1) {
            console.log('CREATE DATA');//todo создаем новый блок данных на сервер
            this.props.onCreateDataServer(data, 'Main', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA'); //todo перезаписываем существующий блок данных на срвере
            this.props.onUpdateDataOnServer(data, 'Main', Number(localStorage.getItem('idUser')));
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
            if (this.props.data[21].value) this.setState({ show: true })
            // this.forceUpdate();
        }, 1000);
    }

    render() {
        console.log('RENDER');

        const view = this.props.view;
        this.value = this.props.data;
        const show = this.state.show;

        const city = CITY;

        console.log(this.value);//test

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Общаяя информация </Alert.Heading>
                        </Alert>
                        <Container style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={1}
                                        width={12}
                                        show={true}
                                        // verify="number"
                                        label="Полное наименование предприятия"
                                        placeholder="Полное наименование предприятия"
                                        description="Предприятие"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        // value={this.value[1].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={2}
                                        width={9}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="ФИО руководителя"
                                        description="Предприятие"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        // value={this.value[2].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={3}
                                        width={3}
                                        show={true}
                                        label=""
                                        placeholder="Должность"
                                        description="Предприятие"
                                        option="Директор, Генеральный директор, Президент" //*список для выбора
                                        value={this.value[3] ? this.value[3].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={21}
                                        width={12}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Сайт компании"
                                        description="Предприятие"
                                        value={this.value[21] ? this.value[21].value : ''}
                                        // value={this.value[2].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <PhoneForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Телефон"
                                        description="Предприятие"
                                        value={this.value[4] ? this.value[4].value : ''}
                                        // value={this.value[4].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={5}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="E-Mail"
                                        description="Предприятие"
                                        value={this.value[5] ? this.value[5].value : ''}
                                        // value={this.value[5].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={20}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Наименование пользователя"
                                        description="Предприятие"
                                        option="Добывающее и/или перерабатывающее предприятие, Машиностроительный завод, Проектная организация, Инжиниринговая компания, Поставщик материалов и комплектующих, Строительно-монтажная организация, Генеральный подрядчик, Лицензиар, Инвестор, Транспортная компания, Лаборатория НМК и РМК"
                                        value={this.value[20] ? this.value[20].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={6}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="ИНН"
                                        description="Предприятие"
                                        value={this.value[6] ? this.value[6].value : ''}
                                        // value={this.value[6].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={7}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="КПП"
                                        description="Предприятие"
                                        value={this.value[7] ? this.value[7].value : ''}
                                        // value={this.value[7].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={8}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="ОГРН"
                                        description="Предприятие"
                                        value={this.value[8] ? this.value[8].value : ''}
                                        // value={this.value[8].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={19}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="основной код ОКВЭД"
                                        description="Предприятие"
                                        value={this.value[19] ? this.value[19].value : ''}
                                        // value={this.value[8].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={9}
                                        width={12}
                                        show={true}
                                        // verify="number"
                                        label="Контактное лицо"
                                        placeholder="ФИО"
                                        description="Контактное лицо"
                                        value={this.value[9] ? this.value[9].value : ''}
                                        // value={this.value[9].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={10}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Должность"
                                        description="Контактное лицо"
                                        value={this.value[10] ? this.value[10].value : ''}
                                        // value={this.value[10].value}
                                        onChangeValue={this.doChangeValue}
                                    />

                                    <PhoneForm
                                        id={11}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Телефон"
                                        description="Контактное лицо"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        // value={this.value[11].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={12}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="E mail"
                                        description="Контактное лицо"
                                        value={this.value[12] ? this.value[12].value : ''}
                                        // value={this.value[12].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <div> 1. Адрес расположения производственных площадей и технических служб предприятия-изготовителя </div>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={13}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Индекс"
                                        description="Предприятие"
                                        value={this.value[13] ? this.value[13].value : ''}
                                        // value={this.value[13].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={14}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Страна"
                                        description="Предприятие"
                                        option="Россия, не Россия"
                                        value={this.value[14] ? this.value[14].value : ''}
                                        // value={this.value[14].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                    <SelectForm_City
                                        id={15}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Город"
                                        description="Предприятие"
                                        option={city}
                                        value={this.value[15] ? this.value[15].value : ''}
                                        // value={this.value[15].value}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doEmpty}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={16}
                                        width={6}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Улица"
                                        description="Предприятие"
                                        value={this.value[16] ? this.value[16].value : ''}
                                        // value={this.value[16].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={17}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Дом"
                                        description="Предприятие"
                                        value={this.value[17] ? this.value[17].value : ''}
                                        // value={this.value[17].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={18}
                                        width={3}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Корпус"
                                        description="Предприятие"
                                        value={this.value[18] ? this.value[18].value : ''}
                                        // value={this.value[18].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <Row>
                                    <CheckForm
                                        id={21}
                                        width={12}
                                        show={true}
                                        placeholder="Согласие на обработку персональных данных (в т.ч. Пользовательское Соглашение, Договор Оферты"
                                        description="Предприятие"
                                        value={this.value[21] ? this.value[21].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Container>
                                        {show ? <Button variant="outline-dark" onClick={this.handleClickSave} >Сохранить информацию</Button> : ''}
                                    </Container>
                                </Row>
                            </Form.Group>
                            <Row> &nbsp;</Row>

                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}