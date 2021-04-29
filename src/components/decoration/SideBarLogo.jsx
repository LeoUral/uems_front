import React from 'react';


export default class SideBarLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'

        }
        this.handleClickLogo = this.handleClickLogo.bind(this);

    }

    handleClickLogo() {
        console.log('CLICK');
    }

    componentDidMount() {

    }

    render() {

        const show = this.props.show;
        this.nameCompany = this.props.nameCompany;
        // console.log(this.nameCompany.value);

        return (
            <>
                <div
                    className={show ? 'side_bar_logo-vert' : 'side_bar_logo'}
                    onClick={this.handleClickLogo}
                >
                    {this.nameCompany && this.nameCompany.value}
                </div>
            </>
        )
    }
}