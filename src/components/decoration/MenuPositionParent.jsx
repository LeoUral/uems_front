/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PositionChalid from './PositionChaild';

export default class MenuPositionParent extends React.Component {

    render() {

        const show = this.props.show;
        const name = this.props.name;
        const icon = this.props.icon;

        return (
            <>
                <div className="menu-position-parent">
                    {icon}
                    <PositionChalid
                        name={name}
                        show={show}
                        nameMenu={this.props.nameMenu}
                        urlMenu={this.props.urlMenu}
                    />
                </div>
            </>
        )
    }
}