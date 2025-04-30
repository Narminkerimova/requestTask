import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const url = "https://northwind.vercel.app/api/suppliers/";
  const [data, setdata] = useState([]);
  const [newdata, setnewdata] = useState({
    contactName:"",
    contactTitle:"",
    companyName:""
  });

  async function getAllData() {
    try {
      let datas = await axios.get(url);
      setdata(datas.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteData(id) {
    try {
      let datas = await axios.delete(url+id);
      console.log(id);
      getAllData()
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(data);
    getAllData();
  }, []);

  async function addData(e) {
    e.preventDefault();
    try {
      let datas = await axios.post(url,newdata);
      setnewdata(datas.data);
      console.log(newdata);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <form onSubmit={()=>addData()}>
      <input onChange={(e) => setnewdata({ ...newdata, contactName: e.target.value })} type="text" placeholder="Write Contact Name:"/>
      <input onChange={(e) => setnewdata({ ...newdata, contactTitle: e.target.value })} type="text" placeholder="Write Contact Title:"/>
      <input onChange={(e) => setnewdata({ ...newdata, companyName: e.target.value })} type="text" placeholder="Write Company Name:"/>
      <button className="sendBtn">Send</button>
    </form>
      <table>
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Contact Title </th>
            <th>Company Name </th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.contactName}</td>
              <td>{item.contactTitle}</td>
              <td>{item.companyName}</td>
              <td><button onClick={() => deleteData(item.id)} className="delBtn">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
