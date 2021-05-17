import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge } from 'react-bootstrap';
import ComercialTradeAdd from './ComercialTradeAdd';
import InputForm from '../questionnaire/InputForm';

export default class ComercialTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 11,
            base: [],
            value: []
        }

        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
    }

    handleClickSave() {
        console.log('click SAVE');
    }

    doChangeValue(data) {
        console.log(data);
    }

    handleClickAdd() {
        this.setState({
            base: [...this.state.base,
            <React.Fragment key={this.state.id}>
                <ComercialTradeAdd
                    onChangeValue={this.doChangeValue}
                    id={this.state.id}
                />
            </React.Fragment>
            ],
            id: +this.state.id + 2
        })
        setTimeout(() => { console.log(this.state.id + ' <- ADD ID'); })
    }

    componentDidMount() {
        this.handleClickAdd();
    }

    render() {

        const id = this.state.id;
        this.value = this.state.value;

        return (
            <>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Коммерческие параметры торгов <Badge variant="danger">Незаполнено</Badge>
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
                        variant="warning"
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                    >
                        Сохранить параметры
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
                            // value={this.value[1] ? this.value[1].value : ''}
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
                            // value={this.value[1] ? this.value[1].value : ''}
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
                        variant="warning"
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                    >
                        Сохранить параметры
                           </Button>
                    <Row>&nbsp;</Row>
                </Container>
            </>
        )
    }
}