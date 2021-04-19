import React from 'react';

export default class Svg_Circle extends React.Component {

    render() {

        const color = this.props.colorSvg;

        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="img_svg" fill={color} ><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" /></svg>
            </>
        )
    }
}