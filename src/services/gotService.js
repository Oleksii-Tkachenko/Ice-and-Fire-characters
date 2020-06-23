export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, ststus: ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses = async () => {
        const res = await this.getResource("/houses/");
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    getAllBooks = async () => {
        const res = await this.getResource("/books");
        return res.map(this._transformBook)
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    isSet(data) {
        if (data && data.toString()) {
            return data
        } else {
            return "no info"
        }
    }

    _extractId = (item) => {
        const idRegExp = /[0-9]{1,4}/;
        return item.url.match(idRegExp)[0];
    }

    _transformCharacter = (char) => {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
            id: this._extractId(char)
        }
    }
    _transformHouse = (house) => {
        return {
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            anscestralWeapons: this.isSet(house.anscestralWeapons),
            id: this._extractId(house)
        }
    }
    _transformBook = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
            id: this._extractId(book)
        }
    }   
}

// const got = new GotService();

// got.getAllCharacters()
//     .then(res => res.forEach(element => {
//         console.log(element.name);
//     }));

// got.getCharacter(130)
//     .then(res => console.log(res));

// got.getAllHouses()
//     .then(res => res.forEach(element => {
//         console.log(element.name);
//     }));

// got.getHouse(130)
//     .then(res => console.log(res));

// got.getAllBooks()
//     .then(res => res.forEach(element => {
//         console.log(element.name);
//     }));


// got.getBooks(1)
    // .then(res => console.log(res));