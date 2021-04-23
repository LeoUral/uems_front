import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_Two extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 1,
            maxId: 18,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
    }

    handleClickAdd() {
        console.log('CLICK');
    }

    handleClickShadow() {
        this.props.onChangeView('Two');
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
            this.props.onCreateDataServer(data, 'Two', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Two', Number(localStorage.getItem('idUser')));
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
            // this.forceUpdate();
        }, 1000);
    }

    render() {
        console.log('RENDER');

        const id = this.state.id;
        const view = this.props.view;
        this.value = this.props.data;


        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Механическая обработка деталей и узлов" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row> Механическая обработка деталей и узлов (указать максимальные значения)</Row>

                                {/* <Row> <span className="span_title" > Ручная резка: </span></Row> */}
                                <Row>
                                    <SelectForm
                                        id={+id}
                                        width={3}
                                        show={true}
                                        label=""
                                        placeholder="Обработка"
                                        description="Механическая обработка"
                                        option="Токарная, Токарно-карусельная, Сверловка отверстий, Фрезерная обработка, Расточные операции"
                                        value={this.value[+id] ? this.value[+id].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                    />

                                    <InputForm
                                        id={+id + 1}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Диаметр, мм"
                                        description="Механическая обработка"
                                        value={this.value[+id + 1] ? this.value[+id + 1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={+id + 2}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Длина, мм"
                                        description="Механическая обработка"
                                        value={this.value[+id + 2] ? this.value[+id + 2].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={+id + 3}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Высота, мм"
                                        description="Механическая обработка"
                                        value={this.value[+id + 3] ? this.value[+id + 3].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={+id + 4}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Ширина, мм"
                                        description="Механическая обработка"
                                        value={this.value[+id + 4] ? this.value[+id + 4].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={+id + 5}
                                        width={2}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Масса, тн"
                                        description="Механическая обработка"
                                        value={this.value[+id + 5] ? this.value[+id + 5].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <SelectForm
                                        id={+id + 6}
                                        width={3}
                                        show={true}
                                        label=""
                                        placeholder="Наличие ЧПУ обработки"
                                        description="Механическая обработка"
                                        option="Да, Нет"
                                        value={this.value[+id + 6] ? this.value[+id + 6].value : ''}
                                        // value={this.value[3].value}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>

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
                            <Row><div></div></Row>

                        </Container>
                    </Form>
                </div>

            </>
        )
    }
}