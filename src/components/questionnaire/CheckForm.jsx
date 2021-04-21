import React from 'react';
import { Col, Form } from 'react-bootstrap';

export default class CheckForm extends React.Component {
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
        this.setState({ value: e.target.checked })
        console.log(e.target.checked);//test
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    render() {

        const width = this.props.width;
        // const label = this.props.label;
        const id = this.props.id;
        const description = this.props.description;
        const placeholder = this.props.placeholder;
        const value = this.state.value;
        const show = this.props.show;

        return (
            <React.Fragment key={id}>
                <Col sm={width} style={{ visibility: show ? 'visible' : 'collapse' }} >
                    <Form.Check
                        type="checkbox"
                        id="customControlAutosizing"
                        custom
                        label={placeholder}
                        data-id={id}
                        data-information={placeholder}
                        data-description={description}
                        checked={value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </Col>
            </React.Fragment>
        )
    }
}