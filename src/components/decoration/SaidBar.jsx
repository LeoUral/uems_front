import React from 'react';
import MenuPositionParent from './MenuPositionParent';

export default class SaidBar extends React.Component {

    render() {
        return (
            <>
                <div className="said-bar">
                    <div style={{ width: '5vw', height: '10vh' }}></div>
                    <MenuPositionParent />
                    <MenuPositionParent />
                    <MenuPositionParent />
                    <MenuPositionParent />
                    <MenuPositionParent />
                </div>
            </>
        )
    }
}