import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge } from 'react-bootstrap';
import CommercialTradeAdd from './CommercialTradeAdd';
import InputForm from '../questionnaire/InputForm';

export default class CommercialTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 11,
            base: [],
            value: [],
            data: [
                { id: 0 },
                { language: "rus", id: "1", description: "Коммерческие параметры торгов", information: "Название параметра", value: "Наличие комплекса мероприятий, повышающих стандарты качества изготовления" },
                { language: "rus", id: "3", description: "Коммерческие параметры торгов", information: "Название параметра", value: "Срок изготовления лота, дней" },
                { language: "rus", id: "5", description: "Коммерческие параметры торгов", information: "Название параметра", value: "Гарантийные обязательства, мес" },
                { language: "rus", id: "7", description: "Коммерческие параметры торгов", information: "Название параметра", value: "Условия оплаты" },
                { language: "rus", id: "9", description: "Коммерческие параметры торгов", information: "Название параметра", value: "Стоимость изготовления лота, руб. (без НДС)" }
            ],
            errData: false
        }

        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.verificationData = this.verificationData.bind(this);
        this.renderBlock = this.renderBlock.bind(this);
    }

    handleClickSave() {
        console.log('click SAVE');
        console.log(this.state.data);

        this.setState({ value: this.state.data })
        this.verificationData();

        setTimeout(() => {
            if (this.state.errData) {
                this.props.onSaveDataCommercial(this.state.data);
            }
        }, 500)
    }

    //* проверка и отправка данных в PARENT
    doChangeValue(data) {
        console.log(data);//test
        this.setState({ data: [...this.state.data, data] })

        setTimeout(() => {

            let arrData = [{ id: 0 }];

            this.state.data.forEach((data) => {
                if (data) arrData[+data.id] = data;
            })
            this.setState({ data: arrData })
        })
        // setTimeout(() => { this.verificationData() })
    }

    verificationData() {
        if ((this.state.data.length) % 2 !== 0) {
            this.setState({ errData: true })
        } else {
            this.setState({ errData: false })
        }
        // console.log(this.state.data.length);//test


    }

    handleClickAdd() {
        this.setState({
            base: [...this.state.base,
            <React.Fragment key={this.state.id}>
                <CommercialTradeAdd
                    onChangeValue={this.doChangeValue}
                    id={this.state.id}
                    value={this.props.value}
                />
            </React.Fragment>
            ],
            id: +this.state.id + 2
        })
        setTimeout(() => { console.log(this.state.id + ' <- ADD ID'); })
    }

    renderBlock() {
        this.handleClickAdd();

        let lengthData = this.props.value.length;

        if (lengthData > 3) {
            for (let i = 0; i < (lengthData - 13); i = i + 2) {
                this.handleClickAdd();
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderBlock();
            this.setState({ data: this.props.value });// загружаем данные от родителя
            this.verificationData();
        }, 500)
    }

    render() {

        const id = this.state.id;
        this.value = this.props.value;
        const errShow = this.state.errData;

        return (
            <>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Технические параметры торгов
                                 {errShow ?
                                    <Badge variant="info"> ok </Badge>
                                    :
                                    <Badge variant="danger"> Незаполнено </Badge>
                                }
                            </h4>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Button
                        variant="secondary"
                        className="btn_trade_form"
                        onClick={this.handleClickAdd}
                    >
                        Добавить позицию
                         </Button>
                    <Button
                        variant={errShow ? "warning" : 'secondary'}
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                        style={{ width: '290px' }}
                    >
                        Проверить и сохранить параметры
                           </Button>
                    <Row>
                        <InputForm
                            id={1}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Название параметра"
                            description="Коммерческие параметры торгов"
                            value="Наличие комплекса мероприятий, повышающих стандарты качества изготовления"
                            onChangeValue={this.doChangeValue}
                        />

                        <InputForm
                            id={2}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Требование к параметру"
                            description="Коммерческие параметры торгов"
                            value={this.value[2] ? this.value[2].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>
                        <InputForm
                            id={3}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Название параметра"
                            description="Коммерческие параметры торгов"
                            value="Срок изготовления лота, дней"
                            onChangeValue={this.doChangeValue}
                        />

                        <InputForm
                            id={4}
                            width={6}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Требование к параметру"
                            description="Коммерческие параметры торгов"
                            value={this.value[4] ? this.value[4].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>
                        <InputForm
                            id={5}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Название параметра"
                            description="Коммерческие параметры торгов"
                            value="Гарантийные обязательства, мес"
                            onChangeValue={this.doChangeValue}
                        />

                        <InputForm
                            id={6}
                            width={6}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Требование к параметру"
                            description="Коммерческие параметры торгов"
                            value={this.value[6] ? this.value[6].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>
                        <InputForm
                            id={7}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Название параметра"
                            description="Коммерческие параметры торгов"
                            value="Условия оплаты"
                            onChangeValue={this.doChangeValue}
                        />

                        <InputForm
                            id={8}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Требование к параметру"
                            description="Коммерческие параметры торгов"
                            value={this.value[8] ? this.value[8].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>
                        <InputForm
                            id={9}
                            width={6}
                            show={true}
                            // verify="number"
                            label=""
                            placeholder="Название параметра"
                            description="Коммерческие параметры торгов"
                            value="Стоимость изготовления лота, руб. (без НДС)"
                            onChangeValue={this.doChangeValue}
                        />

                        <InputForm
                            id={10}
                            width={6}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Требование к параметру"
                            description="Коммерческие параметры торгов"
                            value={this.value[10] ? this.value[10].value : ''}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    {this.state.base}
                    <Button
                        variant="secondary"
                        className="btn_trade_form"
                        onClick={this.handleClickAdd}
                    >
                        Добавить позицию
                         </Button>
                    <Button
                        variant={errShow ? "warning" : 'secondary'}
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                        style={{ width: '290px' }}
                    >
                        Проверить и сохранить параметры
                           </Button>
                    <Row>&nbsp;</Row>
                </Container>
            </>
        )
    }
}