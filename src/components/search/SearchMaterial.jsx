/* eslint-disable default-case */
import React from 'react';
import {
    material
} from './constWork';
import { Form, Row, } from 'react-bootstrap';
import SelectForm from '../questionnaire/SelectForm';

export default class SearchMaterial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }

        this.doChangeValue = this.doChangeValue.bind(this);
        this.doEmpty = this.doEmpty.bind(this);
    }

    doEmpty() {
    }

    doChangeValue(data) {
        // console.log(data.value);
        data.description = 'Four';
        this.props.onChangeValue(data);
    }

    render() {

        return (
            <>
                <Form.Group>
                    <Row>
                        <SelectForm
                            id={4}
                            width={12}
                            show={true}
                            label="Поиск по материалам используемым в производстве:"
                            placeholder="Материалы, с которыми работает предприятие"
                            description=""
                            option={material}
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