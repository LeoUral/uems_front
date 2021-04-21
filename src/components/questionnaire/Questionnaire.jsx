import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap';

export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'rus',
            show: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true })
        }, 500)
    }

    render() {

        const show = this.state.show;

        return (
            <>
                <div style={{ transform: show ? 'scale(1)' : 'scale(0)', transition: ' 1s' }} >
                    {/* <div style={{ transform: show ? 'opacity(1)' : 'opacity(0)', transition: ' 1s' }} > */}
                    <Container fluid style={{ padding: '0' }}>
                        <Jumbotron style={{ marginBottom: '0', minHeight: '78vh', width: '100%' }}>
                            <h1>Это блок Анкеты</h1>
                            <p>Тут будет размещена анкета </p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit sapiente illo consectetur sequi! Repellendus numquam sunt rem laborum odit eos omnis sint, ea harum dolores, nemo rerum excepturi, dignissimos cum accusantium atque hic! Aperiam officia explicabo repellat quidem veritatis consequatur, ipsa velit ut optio praesentium quibusdam ipsum eaque, possimus voluptatem.</p>
                        </Jumbotron>
                    </Container>
                </div>
            </>
        )
    }
}