import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import '../../services/gotService.js';
import './app.css';





export default class App extends Component {
    state = {
        randomCharShow: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar() {
        this.setState((state) =>{
            return {
                randomCharShow : !this.state.randomCharShow
            }
        })
    }

    render() {
        const {randomCharShow} = this.state;
        const randomChar = randomCharShow ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button 
                            className="toggleButton"
                            color="secondary"
                            onClick={this.toggleRandomChar.bind(this)}
                            >Show random character</Button>
                            {randomChar}
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
};
