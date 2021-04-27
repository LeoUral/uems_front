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
            maxId: 70,
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
        this.doChangeVisionBlock3 = this.doChangeVisionBlock3.bind(this);
        this.doChangeVisionBlock4 = this.doChangeVisionBlock4.bind(this);
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

            if (data === 'Да' || this.props.data[52].value === 'Да') {
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

            if (data === true || this.props.data[53].value === true) {
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

            if (data === true || this.props.data[59].value === true) {
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

    doChangeVisionBlock4(data) {
        if (this.state.lengthDataFromServer > 0) {

            if (data === true || this.props.data[65].value === true) {
                this.setState({ show4: true })
            } else {
                this.setState({ show4: false })
            }
        } else {
            if (data === true) {
                this.setState({ show4: true })
            } else {
                this.setState({ show4: false })
            }
        }
    }

    handleClickAdd() {
        this.addForm();
    }

    handleClickShadow() {
        this.props.onChangeView('Eight');
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
            this.props.onCreateDataServer(data, 'Eight', Number(localStorage.getItem('idUser')));
        } else {
            console.log('UPDATE DATA');
            this.props.onUpdateDataOnServer(data, 'Eight', Number(localStorage.getItem('idUser')));
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
            id: +this.state.id + 5,
            // maxId: +this.state.maxId + 5
        })
    }


    //*создаем необходимое количество блоков
    createBlockForm() {
        let lengthData = this.state.lengthDataFromServer;
        let data = this.state.dataFromServer;

        this.addForm();
        for (let i = 0; i < lengthData; i++) {

            if ([7, 12, 17, 22, 27, 32, 37, 42, 47].includes(i) && Number(data[i].id > 0)) {
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
                this.doChangeVisionBlock3();
                this.doChangeVisionBlock4();
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
        const show3 = this.state.show3;
        const show4 = this.state.show4;

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
                                        id={52}
                                        width={4}
                                        show={true}
                                        label=""
                                        placeholder="Изготовление днища"
                                        description="Изготовление днища"
                                        option="Да, Нет"
                                        value={this.value[52] ? this.value[52].value : ''}
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
                                        id={53}
                                        width={4}
                                        show={true}
                                        placeholder="Эллиптические"
                                        description="Изготовление днища"
                                        value={this.value[53] ? this.value[53].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock2}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <div style={{ display: show2 ? 'block' : 'none' }}>
                                    <Row>
                                        <Col>
                                            Материал, минимальный и максимальный диаметр и толщина:
                                    </Col>
                                    </Row>
                                    <Row>
                                        <InputForm
                                            id={54}
                                            width={4}
                                            show={show2}
                                            // verify="number"
                                            label=""
                                            placeholder="Материал изготовления"
                                            description="Изготовление днища"
                                            value={this.value[54] ? this.value[54].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={55}
                                            width={2}
                                            show={show2}
                                            verify="number"
                                            label=""
                                            placeholder="Мин диаметр, мм"
                                            description="Изготовление днища"
                                            value={this.value[55] ? this.value[55].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={56}
                                            width={2}
                                            show={show2}
                                            verify="number"
                                            label=""
                                            placeholder="Мах диаметр, мм"
                                            description="Изготовление днища"
                                            value={this.value[56] ? this.value[56].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={57}
                                            width={2}
                                            show={show2}
                                            verify="number"
                                            label=""
                                            placeholder="Мин толщина, мм"
                                            description="Изготовление днища"
                                            value={this.value[57] ? this.value[57].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={58}
                                            width={2}
                                            show={show2}
                                            verify="number"
                                            label=""
                                            placeholder="Мах толщина, мм"
                                            description="Изготовление днища"
                                            value={this.value[58] ? this.value[58].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                </div>
                                <Row> &nbsp; </Row>
                            </Form.Group>

                            <Form.Group style={{ borderBottom: '1px solid #ccc' }} >
                                <Row>
                                    <CheckForm
                                        id={59}
                                        width={4}
                                        show={true}
                                        placeholder="Торосферические"
                                        description="Изготовление днища"
                                        value={this.value[59] ? this.value[59].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock3}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <div style={{ display: show3 ? 'block' : 'none' }}>
                                    <Row>
                                        <Col>
                                            Материал, минимальный и максимальный диаметр и толщина:
                                    </Col>
                                    </Row>
                                    <Row>
                                        <InputForm
                                            id={60}
                                            width={4}
                                            show={show3}
                                            // verify="number"
                                            label=""
                                            placeholder="Материал изготовления"
                                            description="Изготовление днища"
                                            value={this.value[60] ? this.value[60].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={61}
                                            width={2}
                                            show={show3}
                                            verify="number"
                                            label=""
                                            placeholder="Мин диаметр, мм"
                                            description="Изготовление днища"
                                            value={this.value[61] ? this.value[61].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={62}
                                            width={2}
                                            show={show3}
                                            verify="number"
                                            label=""
                                            placeholder="Мах диаметр, мм"
                                            description="Изготовление днища"
                                            value={this.value[62] ? this.value[62].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={63}
                                            width={2}
                                            show={show3}
                                            verify="number"
                                            label=""
                                            placeholder="Мин толщина, мм"
                                            description="Изготовление днища"
                                            value={this.value[63] ? this.value[63].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={64}
                                            width={2}
                                            show={show3}
                                            verify="number"
                                            label=""
                                            placeholder="Мах толщина, мм"
                                            description="Изготовление днища"
                                            value={this.value[64] ? this.value[64].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                </div>
                                <Row> &nbsp; </Row>
                            </Form.Group>

                            <Form.Group style={{ borderBottom: '1px solid #ccc' }} >
                                <Row>
                                    <CheckForm
                                        id={65}
                                        width={4}
                                        show={true}
                                        placeholder="Сферические"
                                        description="Изготовление днища"
                                        value={this.value[65] ? this.value[65].value : ''}
                                        onChangeValue={this.doChangeValue}
                                        onChangeVisionBlock={this.doChangeVisionBlock4}
                                    />
                                </Row>
                                <Row> &nbsp; </Row>
                                <div style={{ display: show4 ? 'block' : 'none' }}>
                                    <Row>
                                        <Col>
                                            Материал, минимальный и максимальный диаметр и толщина:
                                    </Col>
                                    </Row>
                                    <Row>
                                        <InputForm
                                            id={66}
                                            width={4}
                                            show={show4}
                                            // verify="number"
                                            label=""
                                            placeholder="Материал изготовления"
                                            description="Изготовление днища"
                                            value={this.value[66] ? this.value[66].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={67}
                                            width={2}
                                            show={show4}
                                            verify="number"
                                            label=""
                                            placeholder="Мин диаметр, мм"
                                            description="Изготовление днища"
                                            value={this.value[67] ? this.value[67].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={68}
                                            width={2}
                                            show={show4}
                                            verify="number"
                                            label=""
                                            placeholder="Мах диаметр, мм"
                                            description="Изготовление днища"
                                            value={this.value[68] ? this.value[68].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={69}
                                            width={2}
                                            show={show4}
                                            verify="number"
                                            label=""
                                            placeholder="Мин толщина, мм"
                                            description="Изготовление днища"
                                            value={this.value[69] ? this.value[69].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                        <InputForm
                                            id={70}
                                            width={2}
                                            show={show4}
                                            verify="number"
                                            label=""
                                            placeholder="Мах толщина, мм"
                                            description="Изготовление днища"
                                            value={this.value[70] ? this.value[70].value : ''}
                                            onChangeValue={this.doChangeValue}
                                        />
                                    </Row>
                                </div>
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