import React from 'react';
import { Col, Form } from 'react-bootstrap';

export default class TextareaForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            language: 'rus',
            id: '',
            description: '',
            information: '',
            value: ''
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
        this.setState({ value: e.target.value });

        console.log(e.target.value);//test
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
        const rows = this.props.rows;

        return (
            <React.Fragment key={id}>
                <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={rows}
                        style={{ backgroundColor: `${this.state.colorError}` }}
                        type="text"
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