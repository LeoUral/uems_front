import React from 'react';
import { Alert, Container, Form, Row, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import SelectForm from './SelectForm';

export default class Form_One extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'rus',
            dataValue: [],
            maxId: 22,
            dataOnServer: [],
            dataFromServer: [],
            lengthDataFromServer: 0
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickShadow = this.handleClickShadow.bind(this);
    }

    handleClickShadow() {
        this.props.onChangeView('One');
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
            this.props.onCreateDataServer(data, 'One', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'One', Number(localStorage.getItem('idUser')));
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

        const view = this.props.view;
        this.value = this.props.data;

        console.log(this.value);//test

        return (
            <>
                <div className="modal_window" style={{ display: view ? 'block' : 'none' }} >
                    <div className="shadow_form" onClick={this.handleClickShadow} ></div>
                    <Form className="form_main" >
                        <Alert variant="dark" onClose={() => this.handleClickShadow()} dismissible>
                            <Alert.Heading > Форма технического аудита: "Заготовительное производство" </Alert.Heading>
                        </Alert>
                        <Container>
                            <Form.Group>
                                <Row> Заготовительное производство (укажите способы и виды резки, максимальную толщину резания металла, максимальную толщину и длину вальцуемых обечаек и т.д.). </Row>

                                <Row> <span className="span_title" > Ручная резка: </span></Row>
                                <Row>

                                    <InputForm
                                        id={1}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(углер.)"
                                        description="Ручная резка"
                                        value={this.value[1] ? this.value[1].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={2}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(нерж.)"
                                        description="Ручная резка"
                                        value={this.value[2] ? this.value[2].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row><span className="span_title"> Автоматизированная огневая резка: </span></Row>
                                <Row>
                                    <InputForm
                                        id={3}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Длина рабочей зоны, мм"
                                        description="Автоматизированная огневая резка"
                                        value={this.value[3] ? this.value[3].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={4}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Ширина рабочей зоны, мм"
                                        description="Автоматизированная огневая резка"
                                        value={this.value[4] ? this.value[4].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={5}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(углер.)"
                                        description="Автоматизированная огневая резка"
                                        value={this.value[5] ? this.value[5].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={6}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(нерж.)"
                                        description="Автоматизированная огневая резка"
                                        value={this.value[6] ? this.value[6].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row><span className="span_title"> Лазерная резка: </span></Row>
                                <Row>
                                    <InputForm
                                        id={7}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Длина рабочей зоны, мм"
                                        description="Лазерная резка"
                                        value={this.value[7] ? this.value[7].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={8}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Ширина рабочей зоны, мм"
                                        description="Лазерная резка"
                                        value={this.value[8] ? this.value[8].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={9}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(углер.)"
                                        description="Лазерная резка"
                                        value={this.value[9] ? this.value[9].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={10}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(нерж.)"
                                        description="Лазерная резка"
                                        value={this.value[10] ? this.value[10].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row><span className="span_title"> Гидроабразивная резка: </span></Row>
                                <Row>
                                    <InputForm
                                        id={11}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Длина рабочей зоны, мм"
                                        description="Гидроабразивная резка"
                                        value={this.value[11] ? this.value[11].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={12}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Ширина рабочей зоны, мм"
                                        description="Гидроабразивная резка"
                                        value={this.value[12] ? this.value[12].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={13}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(углер.)"
                                        description="Гидроабразивная резка"
                                        value={this.value[13] ? this.value[13].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={14}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Толщина, мм(нерж.)"
                                        description="Гидроабразивная резка"
                                        value={this.value[14] ? this.value[14].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row><span className="span_title"> Вальцовка(на холдно): </span></Row>
                                <Row>
                                    <InputForm
                                        id={15}
                                        width={5}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина листа при ширине 1,5м.,мм,(углер.)"
                                        description="Вальцовка(на холдоно)"
                                        value={this.value[15] ? this.value[15].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={16}
                                        width={5}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина листа при ширине 1,5м., мм, (нерж.)"
                                        description="Вальцовка(на холдоно)"
                                        value={this.value[16] ? this.value[16].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={17}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Диам. верхнего валка, мм"
                                        description="Вальцовка(на холдоно)"
                                        value={this.value[17] ? this.value[17].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={18}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах ширина листа, мм"
                                        description="Вальцовка(на холдоно)"
                                        value={this.value[18] ? this.value[18].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                </Row>
                                <Row><span className="span_title"> Вальцовка(на горячо): </span></Row>
                                <Row>
                                    <InputForm
                                        id={19}
                                        width={5}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина листа при ширине 1,5м., мм, (углер.)"
                                        description="Вальцовка(на горячо)"
                                        value={this.value[19] ? this.value[19].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={20}
                                        width={5}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах толщина листа при ширине 1,5м., мм, (нерж.)"
                                        description="Вальцовка(на горячо)"
                                        value={this.value[20] ? this.value[20].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={21}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Диаметр верхнего валка, мм"
                                        description="Вальцовка(на горячо)"
                                        value={this.value[21] ? this.value[21].value : ''}
                                        onChangeValue={this.doChangeValue}
                                    />
                                    <InputForm
                                        id={22}
                                        width={3}
                                        show={true}
                                        verify="number"
                                        label=""
                                        placeholder="Мах ширина листа, мм"
                                        description="Вальцовка(на горячо)"
                                        value={this.value[22] ? this.value[22].value : ''}
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