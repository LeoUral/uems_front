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
        this.doTransferUrl = this.doTransferUrl.bind(this);
    }

    doTransferUrl(url) {
        this.props.onTransferUrl(url);
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

                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Данные компании"
                        nameMenu={["Возможности", "Референц", "Лицензии", "Новости", "Загрузка", "Анкета"]}
                        urlMenu={["/opportunities", "/references", "/licenses", "/news", "/loading", "/questionnaire"]}
                        onTransferUrl={this.doTransferUrl}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Инструменты"
                        nameMenu={["Прочностные", "Быстрый эскиз", "Расчеты т/о LOTUS", "Тех.проекты"]}
                        urlMenu={["/endurance", "/sketch", "/calculations", "/projects"]}
                        onTransferUrl={this.doTransferUrl}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Конкурсы"
                        nameMenu={["Как участник", "Как заказчик", "Опрос рынка"]}
                        urlMenu={["/participant", "/customer", "/survey"]}
                        onTransferUrl={this.doTransferUrl}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Кооперация"
                        nameMenu={["Тех.возможности других", "Финансирование проектов", "Производственные услуги", "Человеческие ресурсы"]}
                        urlMenu={["/tech_others", "/funding", "/production", "/people"]}
                        onTransferUrl={this.doTransferUrl}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Снабжение"
                        nameMenu={["Складская программа", "Остатки производства", "Потребности", "Оборудование", "Оснастки"]}
                        urlMenu={["/warehouse", "/remains", "/needs", "/equipment", "/snap-ins"]}
                        onTransferUrl={this.doTransferUrl}
                    />
                    <MenuPositionParent
                        show={this.props.show}
                        icon={<Svg_Circle colorSvg="rgba(255, 255, 255, 1)" />}
                        name="Консультация"
                        nameMenu={["Коуч", "Лаборатории"]}
                        urlMenu={["/coach", "/laboratory"]}
                        onTransferUrl={this.doTransferUrl}
                    />

                </div>
            </>
        )
    }
}