import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
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
                    <Route path='/main' component={() => <Container><Header/></Container>}/>
                    <Container>
                        
                        <Route path='/main' component={() =><Row>
                                                                <Col lg={{size: 5, offset: 0}}>
                                                                    <Button 
                                                                    className="toggleButton"
                                                                    color="secondary"
                                                                    onClick={this.toggleRandomChar.bind(this)}
                                                                    >Show random character</Button>
                                                                    {randomChar}
                                                                </Col>
                                                            </Row>}/>
                        <Route path='/' exact component={() => <div><h1 className='main-header'>Welcome to the Game Of Thrones DB</h1>
                                                                    <Link className='main-link' to='/main/'>
                                                                        get started
                                                                    </Link></div> }/>
                        <Route path='/page-not-found' exact component={() => <div><h2 className='not-found-header'>the page is not found</h2>
                                                                    <Link className='main-link' to='/main/'>
                                                                        back to main
                                                                    </Link></div> }/>                                        
                        <Route path='/main/characters' component={CharacterPage}/>
                        <Route path='/main/houses' component={HousesPage}/>
                        <Route path='/main/books' exact component={BooksPage}/>
                        <Route path='/main/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
            
                                return <BooksItem bookId={id}/>
                            }
                        }/>
                        <Route render={
                            ({location}) => {
                                if(!location.key && location.pathname !== "/") {
                                    console.log(location.key)
                                    return <Redirect to='/page-not-found' />
                                }
                            }
                        }/>
                    </Container>
                    
                </div>
            </Router>
        );
    }
};
