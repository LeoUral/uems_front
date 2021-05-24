/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import Form_Two_Add from './Form_Two_Add';

export default class Form_Two extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            id: 1,
            maxId: 7,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0,
            base: []
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.addForm = this.addForm.bind(this);
        this.createBlockForm = this.createBlockForm.bind(this);
    }

    handleClickAdd() {
        this.addForm();
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

    addForm() {
        this.setState({
            base: [...this.state.base,
            <React.Fragment key={this.state.id}>
                <Form_Two_Add
                    id={this.state.id}
                    value={this.value}
                    onChangeValue={this.doChangeValue}
                />
            </React.Fragment>
            ],
            id: +this.state.id + 7,
            maxId: +this.state.maxId + 7
        })
    }


    //*создаем необходимое количество блоков
    createBlockForm() {
        let lengthData = this.state.lengthDataFromServer;
        let data = this.state.dataFromServer;

        this.addForm();
        for (let i = 8; i < (lengthData); i++) {

            if ((i - 1) % 7 === 0 && Number(data[i].id > 0)) {
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
            // this.setState({ id: +this.state.id - 7, maxId: +this.state.maxId - 7 });
        }, 1500)
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
                        <Container style={{ maxHeight: '60vh', overflowY: 'auto' }}>

                            {this.state.base}

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