import { async } from "@firebase/util";
import { addDoc,doc, collection, setDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import db from "../firebase.js";



const AddContact = ({ handleAddContact, handleEditContact }) => {
  const { state } = useLocation();
  const [userDetail, setUserDetail] = useState(
    state
      ? { ...state.contact }
      : {
          name: "",
          email: ""
        }
  );
  const navigate = useNavigate();

///////

  const handleClick = () =>{
    // e.preventDefault()
    if(userDetail.name&&userDetail.email){
      addDoc(collection(db,"contact-list"),{
        name:userDetail.name,
        email:userDetail.email,
        timestamp:new Date()
      })
  }
}

  // adding contacts in database
  // const addFire = (event) => {
    async function addFire(event){
  addDoc(collection(db,"contact-list"),{
    name: userDetail.name,
    email:userDetail.email,
    timestamp:new Date()
  })
  };
// updating contacts in database
  async function updateFire(){
    const q = doc(db,"contact-list",userDetail.id);
    setDoc(q,{
      name:userDetail.name,
      email:userDetail.email,
      timestamp:new Date()
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetail.name === "" || userDetail.email === "") {
      alert("all the fields are mendetory");
      return;
    }
///////---------
    if(state){
      handleEditContact(userDetail) 
      updateFire()
    } else{handleAddContact(userDetail);
      addFire()
    }
    setUserDetail({ name: "", email: "" });
    navigate("/");
  };
  console.log("-", userDetail.name);

  // useEffect(() => {
  //   if (state) {
  //     setUserDetail({ name: state.contact.name, email: state.contact.email });
  //   }
  // }, [userDetail]);

  return (
    <div className="addContact container-body">
      <form className="form" onSubmit={handleSubmit}>
        {state ? (
          <h1 className="add-heading">Edit Contact</h1>
        ) : (
          <h1 className="edit-heading">Add Contact</h1>
        )}
        <hr />
        <div className="input-group">
          <label>Name</label>
          <input
            className="input name-input"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={userDetail.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            className="input name-input"
            type="text"
            name="email"
            placeholder="Enter Your Email"
            value={userDetail.email}
            onChange={handleChange}
          />
        </div>
        {state ? (
          <button className="add-button">Edit Contact</button>
        ) : (
          <button className="add-button">Add Contact</button>
        )}
        <Link to="/">
          <button className=" add-goto-list">Go to List</button>
        </Link>
      </form>
    </div>
  );
};

export default AddContact;
