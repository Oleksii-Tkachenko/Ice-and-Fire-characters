import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
// import CharacterPage from '../pages/characterPage'
// import HousesPage from '../pages/housesPage'
// import BooksPage from '../pages/booksPage'
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../../services/gotService.js';
import './app.css';





export default class App extends Component {

    gotService = new gotService();

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
            <Router>
                <div className="app"> 
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

                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
            
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};
