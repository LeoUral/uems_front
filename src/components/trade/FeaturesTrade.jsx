import React from 'react';
import { Form, Button, Container, Alert, Row, Col, Badge } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';
import InputForm from '../questionnaire/InputForm';

export default class FeaturesTrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            id: 1,
            base: [],
            value: []
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
    }

    doEmpty() {
    }

    doChangeVisionBlock(e) {
        console.log(e);
        if (e !== 'Выбор вида конкурса') {
            this.setState({ show: true })
        } else {
            this.setState({ show: false })
        }
    }

    handleClickSave() {
        console.log('click SAVE');
    }

    doChangeValue(data) {
        console.log(data);
    }



    componentDidMount() {
    }

    render() {

        this.value = this.state.value;
        const show = this.state.show;

        return (
            <>
                <Container style={{ maxHeight: '60vh', overflowY: 'auto' }} >
                    <Row>
                        <Col>
                            <h4>
                                Особенности торгов <Badge variant="danger">Незаполнено</Badge>
                            </h4>
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                    <Row>
                        <SelectForm
                            id={1}
                            width={3}
                            show={true}
                            label=""
                            placeholder="Выбор вида конкурса"
                            description="Вид конкурса"
                            option="Конкурс на закупку, Конкурс на продажу"
                            value={this.value[1] ? this.value[1].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doChangeVisionBlock}
                        />
                        <InputForm
                            id={2}
                            width={9}
                            show={show}
                            // verify="number"
                            label=""
                            placeholder="Наименование конкурса"
                            description="Наименование конкурса"
                            value={this.value[2] ? this.value[2].value : ''}
                            // value={this.value[2].value}
                            onChangeValue={this.doChangeValue}
                        />
                    </Row>
                    <Row>&nbsp;</Row>
                    <Button
                        variant="warning"
                        className="btn_trade_form"
                        onClick={this.handleClickSave}
                    >
                        Сохранить параметры
                           </Button>



                </Container>
            </>
        )
    }
}