import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import Books from './Components/Books';
import Statistics from "./Components/Statistics";
import NewBook from "./Components/NewBook";

function App() {

  const [books, setBooks] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [bookCount, setBookCount] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3003/books')
      .then((response) => {
        setBooks(response.data);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/books/count')
      .then((response) => {
        setBookCount(response.data[0].bookCount);
      })
  }, [lastUpdate])

  useEffect(() => {
    axios.get('http://localhost:3003/books/average_price')
      .then((response) => {
        setAveragePrice(response.data[0].averagePrice);
      })
  }, [lastUpdate])

  const addBook = (book) => {
    axios.post('http://localhost:3003/books', book)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const editBook = (id, book) => {
    axios.put('http://localhost:3003/books/' + id, book)
      .then(() => {
        setLastUpdate(Date.now())
      })
  }

  const deleteBook = (id) => {
    axios.delete('http://localhost:3003/books/' + id)
      .then(() => {
        setLastUpdate(Date.now());
        window.alert("Knyga ištrinta");
      })
  }

  const getBook = id => {
    if (id === 0) {
      return {
        title: '',
        price: '',
        discount_price: '',
        sale: ''
      };
    }
    for (let i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        return { ...books[i] };
      }
    }
  }
  
  const sortByTitle = (order) => {
    const booksCopy = books.slice();
    if (order === "asc") {
      booksCopy.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
    } else if (order === "desc"){
      booksCopy.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
    }
    setBooks(booksCopy);

}

const sortByPrice = (order) => {
  const booksCopy = books.slice();
  if (order === "asc") {
    booksCopy.sort((a, b) => a.price - b.price);
  } else {
    booksCopy.sort((a, b) => b.price - a.price);
  }
  setBooks(booksCopy);
}

  return (
    <>
      <Statistics bookCount={bookCount} averagePrice={averagePrice}></Statistics>
      <NewBook addBook={addBook}></NewBook>
      <Books books={books} editBook={editBook} deleteBook={deleteBook} sortByTitle={sortByTitle} sortByPrice={sortByPrice}></Books>
    </>
  );
}

export default App;