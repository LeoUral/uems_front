/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import Svg_Angle_double_left from '../../icon/Svg_Angle_double_left';
import Svg_Angle_double_right from '../../icon/Svg_Angle_double_right';


export default class NaviBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }

        this.handleClickNavbar = this.handleClickNavbar.bind(this);
        this.handleClickExit = this.handleClickExit.bind(this);
    }

    //* Выход из системы 
    handleClickExit(e) {
        e.preventDefault();
        localStorage.removeItem('idUser');
        window.location.href = "/";
    }

    handleClickNavbar() {
        this.props.onChangeShow();
    }

    render() {

        const show = this.props.show;

        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="navigation__navbar">
                    <Navbar.Brand href="#home" onClick={this.handleClickNavbar} >
                        {show ?
                            <Svg_Angle_double_right
                                colorSvg="rgba(25, 25, 25, 0.51)"
                            /> :
                            <Svg_Angle_double_left
                                colorSvg="rgba(25, 25, 25, 0.51)"
                            />}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing" onClick={this.handleClickExit} >Выход</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}