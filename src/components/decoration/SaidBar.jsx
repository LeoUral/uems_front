import React from 'react';
import MenuPositionParent from './MenuPositionParent';
import Svg_Circle from '../../icon/Svg_Circle';
import SideBarLogo from './SideBarLogo';

export default class SaidBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'

        }

        this.handleFocus = this.handleFocus.bind(this);
    }

    handleFocus() {
        this.props.onFocusSaidBar();
    }


    render() {

        const show = this.props.show;

        return (
            <>
                <div className="said-bar" style={{ width: show ? '55px' : '300px' }} onMouseOver={this.handleFocus} >

                    <SideBarLogo
                        show={show}
                    />

                    {/* <div style={{ width: '5vw', height: '10vh' }}></div> */}

                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Данные компании"
                        nameMenu={["position 1", "Position 2", "Position 3"]}
                        urlMenu={["/", "/", "/"]}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Инструменты"
                        nameMenu={["position 1", "Position 2", "Position 3"]}
                        urlMenu={["/", "/", "/"]}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Конкурсы"
                        nameMenu={["position 1", "Position 2", "Position 3"]}
                        urlMenu={["/", "/", "/"]}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Кооперация"
                        nameMenu={["position 1", "Position 2", "Position 3"]}
                        urlMenu={["/", "/", "/"]}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Снабжение"
                        nameMenu={["position 1", "Position 2", "Position 3"]}
                        urlMenu={["/", "/", "/"]}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Консультация"
                        nameMenu={["position 1", "Position 2", "Position 3"]}
                        urlMenu={["/", "/", "/"]}
                    />

                </div>
            </>
        )
    }
}