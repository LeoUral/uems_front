import React from 'react';
import { Col, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

export default class CalendarForm extends React.Component {
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
        this.erasingError = this.erasingError.bind(this);
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
        if (this.props.verify === 'number') {
            this.verificationNumber(e)
        } else {
            this.setState({ value: e.target.value })
        }
        console.log(e.target.value);//test
    }

    verificationNumber(e) {
        if (isFinite(e.target.value)) {
            this.setState({ value: e.target.value, colorError: '#fff' })
        } else {
            console.log('error');
            this.setState({ colorError: '#dc3545' })
            this.erasingError();
        }
    }
    erasingError() {
        setTimeout(() => { this.setState({ colorError: '#fff' }) }, 500)
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

        return (
            <React.Fragment key={id}>
                {/* <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
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
                </Col> */}


                <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >
                    <div
                        data-id={id}
                        placeholder={placeholder}
                        data-information={placeholder}
                        data-description={description}
                        onBlur={this.handleBlur}
                    >
                        <DatePicker
                            format={"dd/MM/yyyy"}
                            value={value}
                            onChange={this.handleChange}

                        />

                    </div>
                </Col>
            </React.Fragment>
        )
    }
}