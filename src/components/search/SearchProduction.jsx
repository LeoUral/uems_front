/* eslint-disable default-case */
import React from 'react';
import {
    production,
    cutting,
    rolling,
    mechanical,
    welding,
    thermal,
    paintJob,
    flange,
    bottomMetal
} from './constWork';
import { Form, Row } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';

export default class SearchProduction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            show1: false,
            typeProduction: ''
        }

        this.doChangeVisionBlock = this.doChangeVisionBlock.bind(this);
        this.assignConst = this.assignConst.bind(this);
        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    doEmpty() {
    }

    doChangeValue(data) {
        console.log(data.value);
    }

    assignConst(constData) {
        this.setState({ typeProduction: constData });
        setTimeout(() => { console.log(this.state.typeProduction) })// test
    }

    doChangeVisionBlock(data) {
        console.log(data);

        const arrProduction = production.split(', ');

        switch (data) {
            case arrProduction[0]:
                this.assignConst(cutting);
                this.setState({ show1: true });
                break;

            case arrProduction[1]:
                this.assignConst(rolling);
                this.setState({ show1: true });
                break;

            case arrProduction[2]:
                this.assignConst(mechanical);
                this.setState({ show1: true });
                break;

            case arrProduction[3]:
                this.assignConst(welding);
                this.setState({ show1: true });
                break;

            case arrProduction[4]:
                this.assignConst(thermal);
                this.setState({ show1: true });
                break;

            case arrProduction[5]:
                this.assignConst(paintJob);
                this.setState({ show1: true });
                break;

            case arrProduction[6]:
                this.assignConst(flange);
                this.setState({ show1: true });
                break;

            case arrProduction[7]:
                this.assignConst(bottomMetal);
                this.setState({ show1: true });
                break;
        }
    }



    render() {


        const show1 = this.state.show1;
        const typeProduction = this.state.typeProduction;

        return (
            <>

                <Form.Group>
                    <Row>
                        <SelectForm
                            id={2}
                            width={12}
                            show={true}
                            label="Поиск предприятия по виду производства:"
                            placeholder="Поиск предприятия по виду производства"
                            description=""
                            option={production}
                            // value={this.value[3] ? this.value[3].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doChangeVisionBlock}
                        />
                    </Row>
                </Form.Group>
                <Form.Group style={{ opacity: show1 ? '1' : '0', transition: '0.75s' }}>
                    <Row>
                        <SelectForm
                            id={3}
                            width={12}
                            show={true}
                            label="Вид обработки:"
                            placeholder="Вид обработки"
                            description=""
                            option={typeProduction}
                            // value={this.value[3] ? this.value[3].value : ''}
                            // value={this.value[3].value}
                            onChangeValue={this.doChangeValue}
                            onChangeVisionBlock={this.doEmpty}
                        />
                    </Row>
                </Form.Group>

            </>
        )
    }
}