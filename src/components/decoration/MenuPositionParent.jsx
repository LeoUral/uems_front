import React from 'react';

export default class MenuPositionParent extends React.Component {

    render() {
        return (
            <>
                <div style={{ margin: '10px 5px 10px 20px' }}>
                    <p>
                        <i class="fas fa-user"></i>
                        Position 1
                        <i class="fas fa-clone"></i>
                    </p>
                    <i class="fas fa-clone"></i>
                    <i class="fas fa-user"></i>
                </div>
            </>
        )
    }
}