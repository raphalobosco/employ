import { useEffect } from "react";
import EmployerList from "./EmployerList";
import { useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [employer, setEmployer] = useState(["Rapha Lobosco", "Aline Daher"]);
  const [input, setInput] = useState("");

  // create employer
  const addEmployer = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a name");
      return;
    }
    await addDoc(collection(db, "employers"), {
      name: input,
    });
    // setEmployer([...employer, input]);
    setInput("");
  };

  // read employer from Firebase
  useEffect(() => {
    const q = query(collection(db, "employers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let employArr = [];
      querySnapshot.forEach((doc) => {
        employArr.push({ ...doc.data(), id: doc.id });
      });
      setEmployer(employArr);
    });
    return () => unsubscribe();
  }, []);

  // delete employer from Firebase
  const deleteEmployer = async (id) => {
    await deleteDoc(doc(db, "employers", id));
  };

  return (
    <div className="App">
      <h2>Employer list</h2>
      <small>
        There are a total of {employer.length}{" "}
        {employer.length === 1 ? "employer" : "employers"} added
      </small>
      <div className="addEmployer">
        <form action="" onSubmit={addEmployer}>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button>ADD</button>
        </form>
      </div>
      <hr />
      {employer.map((employer, index) => (
        <EmployerList
          key={index}
          employer={employer}
          deleteEmployer={deleteEmployer}
        />
      ))}
    </div>
  );
}

export default App;
