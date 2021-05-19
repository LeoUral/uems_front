import React from 'react';
import { Button, Container, Row, Col, Badge } from 'react-bootstrap';
import InputForm from '../questionnaire/InputForm';
import CalendarForm from '../questionnaire/CalendarForm';
import TimeForm from './TimeForm';

export default class DateTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: [],
            value: [],
            data: [],
            errorOff: '',
            errData: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.lookOnError = this.lookOnError.bind(this);
        this.verificationData = this.verificationData.bind(this);
    }

    handleClickSave() {
        console.log('click SAVE');
        console.log(this.state.data);

        this.setState({ value: this.state.data })
        this.verificationData();

        setTimeout(() => {
            if (this.state.errData) {
                this.props.onSaveDataDate(this.state.data);
            }
        }, 500)
    }

    doChangeValue(data) {
        console.log(data);
        this.lookOnError(data);

        this.setState({ data: [...this.state.data, data] })

        setTimeout(() => {
            let arrData = [{ id: 0 }];

            this.state.data.forEach((data) => {
                if (typeof (+data.id) !== undefined) arrData[+data.id] = data;
            })
            this.setState({ data: arrData })
        })
        this.verificationData();
    }

    //проверка введенного время 
    lookOnError(data) {

        if (data.id === '2') {
            let arrTime = data.value.split(':');
            if (+arrTime[0] > 24 || +arrTime[1] > 59) {
                this.setState({ errorOff: 'class-mask-error' })
            } else {
                this.setState({ errorOff: '' })
            }
        }
        // setTimeout(() => {
        //     this.setState({ errorOff: '' });
        // }, 1000)
    }

    verificationData() {
        setTimeout(() => {
            if (this.state.data.length < 4 || this.state.errorOff === 'class-mask-error') {
                this.setState({ errData: false })
            } else {
                this.setState({ errData: true })
            }
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ data: this.props.value });// загружаем данные от родителя
            this.verificationData();
        }, 500)
    }

    render() {

        this.value = this.props.value;
        const errorOff = this.state.errorOff;
        const errShow = this.state.errData;

        return (
            <>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Дата и время торгов
                                 {errShow ?
                                    <Badge variant="info"> ok </Badge>
                                    :
                                    <Badge variant="danger"> Незаполнено </Badge>
                                }
                            </h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3} className="date_trade_text" style={{ margin: '0 -20px 0 0' }} >
                            Дата проведения торгов, ДД/ММ/ГГГГ:
                        </Col>
                        <CalendarForm
                            id={1}
                            show={true}
                            placeholder="Дата проведения торгов"
                            description="Дата проведения торгов"
                            value={this.value[1] ? this.value[1].value : ''}
                            onChangeValue={this.doChangeValue}
                        />

                    </Row>
                    <Row>
                        <Col xs={3} className="date_trade_text" >
                            Начало торгов, ЧЧ:ММ:
                        </Col>
                        <TimeForm
                            id={2}
                            width={4}
                            show={true}
                            classMask={errorOff}
                            label=""
                            placeholder="Время начала торгов"
                            description="Время начала торгов"
                            value={this.value[2] ? this.value[2].value : ''}
                            // value={this.value[4].value}
                            onChangeValue={this.doChangeValue}
                        />

                    </Row>
                    <Row>
                        <Col xs={3} className="date_trade_text" >
                            Временной интервал торгов:
                        </Col>
                        <InputForm
                            id={3}
                            width={4}
                            show={true}
                            verify="number"
                            label=""
                            placeholder="Ход, сек"
                            description="Временной интервал торгов"
                            value={this.value[3] ? this.value[3].value : ''}
                            onChangeValue={this.doChangeValue}
                        />

                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
                    <Row>&nbsp;</Row>
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