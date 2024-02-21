import { useEffect, useState } from 'react';
import { addBook, deleteBook, getBook, getBookById, updateBook as putReq } from './service/book';

function App() {
  const [book, setBook] = useState([]);
  const [bookId, setBookId] = useState();
  const [newBook, setNewBook] = useState({name: '', author: ''});
  const [updateBook, setUpdateBook] = useState({name: '', author: '', id: ''});

  const fetchBooks = () =>{
    getBook().then((res)=>{
      setBook(res.data);
    })
  }

  useEffect(()=>{
    fetchBooks();
  },[])

  return (
    <div className="App">

      <button onClick={fetchBooks}>Get all books</button>

      <h1>{book.length > 1 ? 'All book' : 'One book'}</h1>
      {book && book.map((ele)=>{
        return <div key={ele.id}>
          <h3>{ele.name}</h3>
          <p>{ele.author}</p>
          <p>uniqe key{ele.id}</p>
        </div>
      })}

      <h3>Get book by id</h3>
      <input type="text" id="bookId" 
      onChange={(e)=>{
        setBookId(e.target.value);
      }}/>
      <button onClick={()=>{
        getBookById(bookId).then((res)=>{
          setBook(res.data);
        })
      }}>Get book</button>

      <h3>delete book by id</h3>
      <input type="text" id="bookId" 
      onChange={(e)=>{
        setBookId(e.target.value);
      }}/>
      <button onClick={()=>{
        deleteBook(bookId)
      }}>Get book</button>

<h3>add new book</h3>
<label>Book name</label>
      <input type="text" id="bookId" 
      onChange={(e)=>{
        setNewBook({...newBook, name: e.target.value});
      }}/>

<label>Book author</label>
<input type="text" id="bookId" 
      onChange={(e)=>{
        setNewBook({...newBook, author: e.target.value});
      }}/>
      <button onClick={()=>{
        addBook(newBook);
      }}>Add new book</button>



<h3>update new book</h3>
<label>Book name</label>
      <input type="text" id="bookId" 
      onChange={(e)=>{
        setUpdateBook({...updateBook, name: e.target.value});
      }}/>

<label>Book author</label>
<input type="text" id="bookId" 
      onChange={(e)=>{
        setUpdateBook({...updateBook, author: e.target.value});
      }}/>

<label>Book author</label>
<input type="text" id="bookId" 
      onChange={(e)=>{
        setUpdateBook({...updateBook, id: e.target.value});
      }}/>
      <button onClick={()=>{
        putReq(updateBook);
      }}>change book</button>

    </div>



      
  );
}

export default App;
