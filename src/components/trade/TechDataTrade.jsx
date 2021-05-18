import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge } from 'react-bootstrap';
import TechDataTradeAdd from './TechDataTradeAdd';

export default class TechDataTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: [],
            value: [],
            data: [],
            errData: false
        }

        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.verificationData = this.verificationData.bind(this);
        this.renderBlock = this.renderBlock.bind(this);
    }

    //* кнопка SAVE
    handleClickSave() {
        console.log('click SAVE');
        console.log(this.state.data);

        this.setState({ value: this.state.data })
        this.verificationData();

        setTimeout(() => {
            if (this.state.errData) {
                this.props.onSaveDataTrade(this.state.data);
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
                if (typeof (+data.id) !== undefined) arrData[+data.id] = data;
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
                <TechDataTradeAdd
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
            for (let i = 0; i < (lengthData - 3); i = i + 2) {
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

        const errShow = this.state.errData;
        this.value = this.props.value;

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

                    {this.state.base}

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
                </Container>
            </>
        )
    }
}