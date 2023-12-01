import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';
import LoginForm from './LoginForm'

function BooksComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [id, setId] = useState('');
  const [year, setYear] = useState('');
  // user is the currently logged in user
	const [user, setUser] = useState(null);
  
  // function to call API to get all books in DB
  function displayAllBooks() {
  	axios.get('https://bookstore-404519.ue.r.appspot.com/findAllBooks')
      .then(response => {
        setBooks(response.data);  // Axios packs the response in a 'data' property
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  
  };

    // function to call API to get all books in DB
    function findByAuthor() {
      axios.get(`https://bookstore-404519.ue.r.appspot.com/findByAuthor?author=${author}`)
        .then(response => {
          setBooks(response.data);  // Axios packs the response in a 'data' property
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    
    };

  // function to handle the user submit of a new book
  // async used so we can use the "await", which causes a block until post is done
  //   and makes for a little simpler code (no .then)
  async function handleSubmit(event) {
        event.preventDefault();
        
        const postData = {
            title,
            author,
            year: parseInt(year, 10) // Convert string to integer
        };

        try {
            const response = await axios.post('https://bookstore-404519.ue.r.appspot.com/saveBook', postData);
            console.log('Response:', response.data);
            displayAllBooks()
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

  
  // useEffect makes it so list of books shown when this component mounts
  useEffect(() => {
    // Using Axios to fetch data
   
    displayAllBooks()
  }, []);

  // this will be called by the LoginForm
  function HandleLogin(user) {
    setUser(user);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <div className="login-container">
          <LoginForm LoginEvent={HandleLogin} />
        </div>
        <div>
          {user?
          <div className="book-list">
            {books.map(book => (
              <div className="book-item" key={book.id}>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
              </div>
            ))}
                    
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
              </label>
              <br />
              <label>
                Author:
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
              </label>
              <br />
              <label>
                Year:
                <input type="number" value={year} onChange={e => setYear(e.target.value)} />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
        
            {/* Form for finding books by author */}
            <form onSubmit={(e) => {
              e.preventDefault();
              findByAuthor(); // Correctly calling the findByAuthor function
            }}>
              <label>
                Find by Author:
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
              </label>
              <button type="submit">Find</button>
            </form>
          </div>:<br/>
          }
        </div>
      </div>
    </div>
  );
}

export default BooksComponent;