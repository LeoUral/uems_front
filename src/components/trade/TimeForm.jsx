import React from 'react';
import { Col, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';

//* https://www.npmjs.com/package/react-input-mask - масска для всего

export default class TimeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            language: 'rus',
            id: '',
            description: '',
            information: '',
            value: '',
            colorError: '#fff'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }

    handleBlur(e) {
        this.setState({
            id: e.target.dataset.id,
            description: e.target.dataset.description,
            information: e.target.dataset.information
        })
        setTimeout(() => { this.props.onChangeValue(this.state) })
    }

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value);//test
        this.setState({ value: e.target.value })
    }


    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    render() {

        const width = this.props.width;
        const label = this.props.label;
        const id = this.props.id;
        const description = this.props.description;
        const placeholder = this.props.placeholder;
        const value = this.state.value;
        const show = this.props.show;
        const classError = this.props.classMask;
        const classMask = `form-control phone_form ${classError}`

        return (
            <React.Fragment key={id}>
                <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >

                    <InputMask
                        className={classMask}
                        mask="99:99"
                        maskChar="_"
                        data-id={id}
                        placeholder={placeholder}
                        data-information={placeholder}
                        data-description={description}
                        value={value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </Col>
            </React.Fragment>
        )
    }
}