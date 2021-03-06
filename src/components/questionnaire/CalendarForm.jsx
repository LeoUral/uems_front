import React from 'react';
import { Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import '../../style/calendarDataPicker.css';

//* https://github.com/wojtekmaj/react-date-picker - GitHub изготовителя

export default class CalendarForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            language: 'rus',
            id: '',
            description: '',
            information: '',
            value: new Date(),
            colorError: '#fff'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(e) {
        this.setState({
            id: this.props.id,
            description: this.props.description,
            information: this.props.placeholder + ' DATE: '
        })
        setTimeout(() => { this.props.onChangeValue(this.state) })
    }

    handleChange(e) {
        // e.preventDefault();
        this.setState({ value: e })
        console.log(e);//test
    }

    componentDidMount() {
        if (this.props.value) this.setState({ value: this.props.value })

    }

    render() {

        if (this.props.value) {
            this.value = this.props.value;
            this.disabled = true;
        } else {
            this.value = this.state.value;
            this.disabled = false;
        }

        const width = this.props.width;
        const label = this.props.label;
        const id = this.props.id;
        const description = this.props.description;
        const placeholder = this.props.placeholder;
        // const value = this.state.value;
        const show = this.props.show;
        console.log(this.value);

        return (
            <React.Fragment key={id}>

                <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >
                    <div
                        className="calendar"
                        data-id={id}
                        placeholder={placeholder}
                        data-information={placeholder}
                        data-description={description}
                        onBlur={this.handleBlur}
                    >
                        <DatePicker
                            format={"dd/MM/yyyy"}
                            value={this.value}
                            onChange={this.handleChange}
                            disabled={this.disabled}

                        />

                    </div>
                </Col>
            </React.Fragment>
        )
    }
}