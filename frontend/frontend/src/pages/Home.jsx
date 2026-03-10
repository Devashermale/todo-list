import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [todos, addtodo] = useState([]);
  const [text, addtext] = useState("");
  const [loading ,setloading] = useState(false)
  const [edit, setedit] = useState(null);
  const [ error ,seterror] = useState(null)
  const [edittext, setedittext] = useState('');
  const [search, setsearch] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('https://todo-list-g5b7.onrender.com');
        addtodo(response.data);
      } catch (error) {
        seterror(error);
      }finally{
        setTimeout(()=>{
           setloading(true)
        },1000)
       
      }
    };
    fetchdata();
  }, []);

  const addtask = (e) => {
    addtext(e.target.value);
  };

  const submittodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const response = await axios.post('https://todo-list-g5b7.onrender.com/todo', { todo: text, iscompleted: false });
      addtodo([...todos, response.data]);
      addtext('');
    } catch (error) {
      console.log(error);
    }
  };

  const edittodo = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://todo-list-g5b7.onrender.com/todo/${id}`, { todo: edittext });
      const updatedList = todos.map((obj) => (obj._id === id ? response.data : obj));
      addtodo(updatedList);
      setedit(null);
      setedittext('');
    } catch (error) {
      console.log(error);
    }
  };

  const saveedit = (obj) => {
    setedit(obj._id);
    setedittext(obj.todo);
  };

  const toggleTodo = async (obj) => {
    try {
      const response = await axios.put(`https://todo-list-g5b7.onrender.com/todo/${obj._id}`, {
        iscompleted: !obj.iscompleted
      });
      addtodo(todos.map(item => (item._id === obj._id ? response.data : item)));
    } catch (error) {
      console.log(error);
    }
  };

  const deletetodo = async (id) => {
    await axios.delete(`https://todo-list-g5b7.onrender.com/todo/${id}`);
    const updatedList = todos.filter((obj) => obj._id !== id);
    addtodo(updatedList);
  };

  const filteredTodos = todos.filter((item) =>
    item.todo.toLowerCase().includes(search.toLowerCase())
  );
if (!loading) {
  return <h1 className='flex justify-center items-center h-screen bg-gray-50 text-3xl font-bold text-blue-600'>loading</h1>
}
if (error) {
 return <h1 className='flex justify-center items-center h-screen bg-gray-50 text-3xl font-bold text-blue-600' >{error.message}</h1>
}
  return (
    <div className='first-div  bg-white h-screen'>
      <div className='  h-screen flex justify-center items-center'>
        <div className=' bg-gray-400 size-110 rounded'>
        <h1 className=' text-2xl text-center p-5'>todo list app</h1>

        <input
          type='text'
          placeholder='search todo'
          value={search}
          className=' bg-white p-2 m-6 pr-48 '
          onChange={(e) => setsearch(e.target.value)}
        />

        <ul className=' overflow-y-scroll overflow-x-hidden  bg-white scroll-auto h-40 m-4  '>
          {filteredTodos.map((obj) => (
            <li key={obj._id} className=' grid grid-rows-1 m-2'>
              {edit === obj._id ? (
                <div className='grid grid-cols-3 items-center gap-3'>
                  <input value={edittext} className=' bg-gray-600 m-2 p-3 mr-4 h-8 w-34 rounded' onChange={(e) => setedittext(e.target.value)} />
                  <button onClick={(e) => edittodo(e, obj._id)} className=' border-2 ml-2 hover:bg-blue-600 m-2 text-2xl   rounded'>Save</button>
                  <button  className='float-end text-2xl  rounded  border-2  hover:bg-blue-600  m-2' onClick={() => setedit(null)}>Cancel</button>
                </div>
              ) : (
                <div className=" grid grid-cols-4">
                  <input
                    type="checkbox"
                    checked={obj.iscompleted }
                    onChange={() => toggleTodo(obj)}
                   className=' size-4 m-2'
                  />
                  
                  <span className={` ${!obj.iscompleted ? '' :  ' line-through text-gray-600'} text-black text-2xl max-w-prose wrap-break-word text-3xl `  }>{obj.todo}</span>
                  <button onClick={() => saveedit(obj)} className= ' border-2  hover:bg-blue-600  rounded m-2'>Edit</button>
                  <button className='float-end text-2xl  border-2  hover:bg-blue-600 rounded m-2' onClick={() => deletetodo(obj._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
         
        </ul>
         <form onSubmit={submittodo}>
          <input
            type='text'
            placeholder='enter your todo'
            value={text}
            onChange={addtask}
            className=' bg-white m-4 p-2 ml-16'
          />
          <button type="submit" className=' bg-blue-900 p-3 m-6 rounded '>add</button>
        </form>
</div>
      </div>
    </div>
  );
}

export default Home;
