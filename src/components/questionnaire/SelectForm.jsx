import React from 'react';
import { Col, Form } from 'react-bootstrap';

export default class SelectForm extends React.Component {
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
        this.viewListOptions = this.viewListOptions.bind(this);

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
        this.props.onChangeVisionBlock(e.target.value);
    }

    viewListOptions(arr) {
        this.optionArr = [];
        arr.split(', ').forEach(data => {
            this.optionArr.push(
                <option key={data} >{data}</option>
            )
        })
    }


    componentDidMount() {
        this.setState({ value: this.props.value })

        // this.viewListOptions(this.props.option)
    }

    render() {

        this.viewListOptions(this.props.option)

        const width = this.props.width;
        const label = this.props.label;
        const id = this.props.id;
        const description = this.props.description;
        const placeholder = this.props.placeholder;
        const value = this.state.value;
        const show = this.props.show;

        return (
            <React.Fragment key={id}>
                <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        as="select"
                        type="text"
                        data-id={id}
                        placeholder={placeholder}
                        data-information={placeholder}
                        data-description={description}
                        value={value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    >
                        <option key={placeholder}>{placeholder}</option>
                        {this.optionArr}
                    </Form.Control>
                </Col>
            </React.Fragment>
        )
    }
}