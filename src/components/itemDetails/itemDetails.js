import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }

    }

    updateChar() {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }
        
        const {getData} = this.props;
        
        getData(itemId)
            .then((char) =>{
                this.setState({
                    char
                })
            })

        // this.gotService.getCharacter(charId)
        //     .then((char) => {
        //         this.setState({char})
        //     })
            
        
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        if (this.props.itemId === null) {
            return <span className='select-error'>Please select an item</span>
        }
        if (!this.state.char) {
            return <Spinner/>
        }
        const {char} = this.state;
        const {name} = char;


        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </div>
        );
    }
}