import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

export default class PositionChaild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            viewData: []
        }

        this.renderMenu = this.renderMenu.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault(e);
        console.log(e.target);
    }

    renderMenu(data, url) {
        let viewMenu = []
        for (let i = 0; i < data.length; i++) {
            viewMenu = [...viewMenu,
            <div
                key={data[i]}
                className="chaild-block"
            >
                <a
                    href={url[i]}
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

        return (
            <>
                {/* <div className={this.classChild} > {this.props.name} </div> */}
                <Accordion
                    defaultActiveKey="1"
                    style={{ transition: '0.5s', width: show ? '0px' : '200px' }}
                >
                    <Card>
                        <Card.Header style={{ padding: '0px' }} >
                            <Accordion.Toggle variant="link" eventKey="0" className="card-my" >
                                {name}
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