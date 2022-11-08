import "./App.css";
import { addDoc , orderBy} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ContactsDetail from "./components/ContactsDetail";
import DeleteContact from "./components/DeleteContact";
import demoData from "./data/demoData";
import db from "./firebase.js";
import { collection, docs, onSnapshot, query } from "firebase/firestore";
function App() {
  const key = "contacts";
  // const localData = JSON.parse(localStorage.getItem(key));
  // const [contacts, setContacts] = useState(localData ? localData : demoData);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);


useEffect(()=>{
  console.log("inside use")
  const q = query(collection(db,"contact-list"),orderBy('timestamp',"desc"));
  const unsubscribe = onSnapshot(q,(snapshot)=>{
    setContacts(snapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
  });
  return ()=>unsubscribe()
},[])

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: uuidv4(), ...newContact },
    ]);
    console.log(contacts);
  };

  const RemoveContact = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const editContact = (editedContact) => {
    const editedContactList = contacts.map((contact) => {
      
      if (contact.id === editedContact.id) {
        return {
          id: contact.id,
          name: editedContact.name,
          email: editedContact.email,
        };
      } else {
        return contact;
      }
    });
    console.log(editedContactList);
    setContacts(editedContactList);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(contacts));
  }, [contacts]);

  const handleSearch = (search) => {
    setSearch(search);
    console.log(search);
    if (search !== "") {
      const newSearchResult = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      console.log(newSearchResult);
      setSearchResult(newSearchResult);
    }
  };
  console.log("app js called")
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            index
            element={
              <ContactList
                contacts={search ? searchResult : contacts}
                handleRemoveContact={RemoveContact}
                search={search}
                handleSearch={handleSearch}
              />
            }
          />
          <Route
            path="/addcontact"
            element={
              <AddContact
                handleAddContact={handleAddContact}
                handleEditContact={editContact}
              />
            }
          />
          <Route
            path="/editcontact/:id"
            element={
              <AddContact
                handleAddContact={handleAddContact}
                handleEditContact={editContact}
              />
            }
          />
          <Route path="/contactdetail/:id" element={<ContactsDetail />} />
          <Route
            path="/deletecontact/:id"
            element={<DeleteContact handleRemoveContact={RemoveContact} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
