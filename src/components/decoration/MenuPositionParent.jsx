/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PositionChalid from './PositionChaild';
import Svg_Angle_left from '../../icon/Svg_Angle_left';
import Svg_Angle_down from '../../icon/Svg_Angle_down';

export default class MenuPositionParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show1: false
        }

        this.doTransferUrl = this.doTransferUrl.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
    }

    handleClickShow(e) {
        this.setState({ show1: !this.state.show1 })
    }


    doTransferUrl(url) {
        this.props.onTransferUrl(url);
    }

    render() {

        const show = this.props.show;
        const name = this.props.name;
        const icon = this.props.icon;
        const show1 = this.state.show1;

        return (
            <>
                <div className="menu-position-parent" >
                    {/* {icon} */}
                    <PositionChalid
                        icon={icon}
                        name={name}
                        show={show}
                        nameMenu={this.props.nameMenu}
                        urlMenu={this.props.urlMenu}
                        onTransferUrl={this.doTransferUrl}
                    />

                </div>
            </>
        )
    }
}