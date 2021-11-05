import './App.css';

import Comments from './component/Comments/Comments';

import axios from 'axios';

import { useEffect, useState } from 'react'

function App() {

  const [active, setactive] = useState(false)

  const [data, setdata] = useState([])

  const [name, setname] = useState("")

  const [email, setemail] = useState("")

  const [body, setbody] = useState("")

  const [type, settype] = useState("create")

  const [id, setid] = useState(0)

  useEffect(() => {
    const fetchdata = async (src) => {
      try {
        const res = await axios.get(src);
        //console.log(res.data);
        setdata(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchdata("https://jsonplaceholder.typicode.com/comments");
  }, [])

  const deleteHandler = (id) => {
    const deletedata = async (idd) => {
      setdata(prev => prev.filter(d => d.id !== idd))
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      }
      catch (e) {
        console.log(e);
      }
    }
    deletedata(id);
  }

  const updateHandler = async (id) => {
    console.log("update : ", id);
    settype("update")
    setactive(true)
    setid(id);
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(type);

    if (type === "create") {
      if (name && email && body) {
        try {
          await axios({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: {
              name: name,
              email: email,
              body: body
            }
          })
        }
        catch (e) {
          console.log(e);
        }
        const id = data.length;
        const obj = {
          id,
          name,
          email,
          body
        }
        const newarr = [...data, obj];
        setdata(newarr)
      }
    }
    if (type === "update") {
      if (name && email && body) {
        try {
          await axios({
            method: "PUT",
            url: `https://jsonplaceholder.typicode.com/posts/${id}`,
            data: {
              id,
              name,
              email,
              body
            }
          })
        }
        catch (e) {
          console.log(e);
        }
      }
      const newdata = data.map(d => {
        if (d.id === id) {
          return {
            id,
            name,
            email,
            body
          }
        }
        else return d;
      })
      setdata(newdata);
    }
    setactive(false)
  }


  return (

    <div className="App">
      <nav className="nav"><span>Comments</span> <button onClick={(e) => {
        console.log(e.target);
        setactive(prev => !prev)
        settype("create");
      }
      } >Make a Comment</button></nav>

      <div className={active ? "submit" : "submit hidden"}>
        <form>
          <div className="row">
            <label>
              Name :
              <input type="text" value={name} onChange={e => setname(e.target.value)} />
            </label>
          </div>
          <div className="row">
            <label>
              Email :
              <input type="email" value={email} onChange={e => setemail(e.target.value)} />
            </label>
          </div>
          <div className="row">
            <label>
              Body :
              <input type="text" value={body} onChange={e => setbody(e.target.value)} />
            </label>
          </div>
          <button onClick={submitHandler} type="submit">Submit</button>
        </form>
      </div>

      {data.map((d, index) => <Comments updateHandler={updateHandler} name={d.name} id={d.id} email={d.email} body={d.body} deleteHandler={deleteHandler} key={index} />)}

    </div >

  );
}

export default App;
