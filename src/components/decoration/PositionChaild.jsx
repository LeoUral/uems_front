import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import Svg_Angle_left from '../../icon/Svg_Angle_left';
import Svg_Angle_down from '../../icon/Svg_Angle_down';


export default class PositionChaild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            viewData: [],
            show1: false
        }

        this.renderMenu = this.renderMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
    }

    handleClickShow(e) {
        this.setState({ show1: !this.state.show1 })
    }

    handleClick(e) {
        e.preventDefault(e);
        console.log(e.target.dataset.url);
        this.props.onTransferUrl(e.target.dataset.url);
    }

    renderMenu(data, url) {
        let viewMenu = []
        for (let i = 0; i < data.length; i++) {
            viewMenu = [...viewMenu,
            <div
                key={url[i]}
                className="chaild-block"
            >
                <a
                    // href={url[i]}
                    href="/"
                    data-url={url[i]}
                    className="chaild-link"
                    onClick={this.handleClick}
                >
                    {data[i]}
                </a>
            </div>
            ]
        }
        this.setState({ viewData: viewMenu });
    }

    componentDidMount() {
        this.renderMenu(this.props.nameMenu, this.props.urlMenu);
    }

    render() {

        const show = this.props.show;
        const name = this.props.name;
        const show1 = this.state.show1;
        const icon = this.props.icon;

        return (
            <>
                <Accordion
                    defaultActiveKey="1"
                    style={{ transition: '0.5s', width: show ? '0px' : '240px' }}
                >
                    <Card style={{ width: '240px', transition: '0.5s', width: show ? '40px' : '240px' }} >
                        <Card.Header style={{ padding: '0px', width: '240px' }} >
                            <Accordion.Toggle variant="link" eventKey="0" className="card-my" onClick={this.handleClickShow}>
                                {icon}
                                {name}
                                {show1 ? <Svg_Angle_down colorSvg="#ccc" /> : <Svg_Angle_left colorSvg="#ccc" />}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {this.state.viewData}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}