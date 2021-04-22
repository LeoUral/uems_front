import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import Server from '../server/server';

export default class Form_Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            maxId: 18,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0
        }

        this.getNullArray();

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.getNullArray = this.getNullArray.bind(this);
        this.writeParseData = this.writeParseData.bind(this);

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
            this.props.onCreateDataServer(data, 'Main', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Main', Number(localStorage.getItem('idUser')));
        }
        setTimeout(() => { console.log(this.state.dataOnServer) })//test
    }

    //* данные с полей формы, формируются в массив объектов
    doChangeValue(data) {
        console.log(data);
        this.setState({ dataValue: [...this.state.dataValue, data] })
        setTimeout(() => { console.log(this.state.dataValue) })
    }

    //*создаем пустой массив объектов для первого запуска или отсутсвия связи с сервером
    //*загрузить пустой массив до получения данных с сервера
    getNullArray() {
        if (this.state.dataFromServer.length < 1) {
            let data = this.state.dataFromServer;
            console.log('NULL ARRAY');

            for (let i = 0; i <= (this.state.maxId); i++) {

                //todo создаем позицию с пустым объектом
                data[i] = { id: '', description: '', information: '', value: '' }
            }
            this.setState({ dataFromServer: data })
            console.log(data);
        }
    }

    //*парсинг данных с сервера
    writeParseData(dataJson) {
        let dataNew = [];
        dataJson.forEach((data) => {
            dataNew = [...dataNew, { id: data.id, description: data.description, information: data.information, value: data.value }]
        })
        this.setState({ dataFromServer: dataNew })

        // this.props.onData(dataNew); //todo петля данных
        setTimeout(() => { console.log(this.state.dataFromServer); })//test
    }

    //* получаем данные с сервера
    async getDataFromServer(name, id) {

        new Promise((resolve) => {
            resolve(Server.getDataFromServer(name, id))
        }).then((result) => {
            this.writeParseData(result);
            this.setState({ lengthDataFromServer: result.length });
        }).catch((result) => {
            this.setState({ lengthDataFromServer: 0 });
            console.log(result);
        })
    }


    componentDidMount() {
        this.getDataFromServer('Main', Number(localStorage.getItem('idUser')))
    }

    render() {

        this.value = this.state.dataFromServer;

        return (
            <>
                <div className="modal_window" >
                    <div className="shadow_form"></div>
                    <Form className="form_main" >
                        <Alert variant="dark">
                            <Alert.Heading > Общаяя информация </Alert.Heading>
                        </Alert>
                        <Container className="container_form_min">
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
                                        // value={this.value[1] && this.value[1].value}
                                        value={this.value[1].value}
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
                                        // value={this.value[2] && this.value[2].value}
                                        value={this.value[2].value}
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
                                        // value={this.value[3] && this.value[3].value}
                                        value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row>
                                    <InputForm
                                        id={4}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Телефон"
                                        description="Предприятие"
                                        // value={this.value[4] && this.value[4].value}
                                        value={this.value[4].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={5}
                                        width={8}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="E-Mail"
                                        description="Предприятие"
                                        // value={this.value[5] && this.value[5].value}
                                        value={this.value[5].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <InputForm
                                        id={6}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="ИНН"
                                        description="Предприятие"
                                        // value={this.value[6] && this.value[6].value}
                                        value={this.value[6].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={7}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="КПП"
                                        description="Предприятие"
                                        // value={this.value[7] && this.value[7].value}
                                        value={this.value[7].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={8}
                                        width={4}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="ОГРН"
                                        description="Предприятие"
                                        // value={this.value[8] && this.value[8].value}
                                        value={this.value[8].value}
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
                                        // value={this.value[9] && this.value[9].value}
                                        value={this.value[9].value}
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
                                        // value={this.value[10] && this.value[10].value}
                                        value={this.value[10].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={11}
                                        width={4}
                                        show={true}
                                        // verify="number"
                                        label=""
                                        placeholder="Телефон"
                                        description="Контактное лицо"
                                        // value={this.value[11] && this.value[11].value}
                                        value={this.value[11].value}
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
                                        // value={this.value[12] && this.value[12].value}
                                        value={this.value[12].value}
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
                                        // value={this.value[13] && this.value[13].value}
                                        value={this.value[13].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={14}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Срана"
                                        description="Предприятие"
                                        option="Россия, не Россия"
                                        // value={this.value[14] && this.value[14].value}
                                        value={this.value[14].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={15}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Город"
                                        description="Предприятие"
                                        option="Города России"
                                        // value={this.value[15] && this.value[15].value}
                                        value={this.value[15].value}
                                        onChangeValue={this.doChangeValue}
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
                                        // value={this.value[16] && this.value[16].value}
                                        value={this.value[16].value}
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
                                        // value={this.value[17] && this.value[17].value}
                                        value={this.value[17].value}
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
                                        // value={this.value[18] && this.value[18].value}
                                        value={this.value[18].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Container>
                                        <Button variant="outline-dark" onClick={this.handleClickSave} >Сохранить информацию</Button>
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