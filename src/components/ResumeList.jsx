import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const db = getFirestore();

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchResumes = async () => {
    const snapshot = await getDocs(collection(db, "resumes"));
    const data = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(resume => resume.userId === auth.currentUser.uid);
    setResumes(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "resumes", id));
    fetchResumes();
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const filteredResumes = resumes.filter(resume =>
    resume.name.toLowerCase().includes(search.toLowerCase()) ||
    resume.skills.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>My Resumes</h2>

      <input
        placeholder="Search by name or skills"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredResumes.map(resume => (
        <div key={resume.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{resume.name}</h3>
          <p>{resume.title}</p>

          <button onClick={() => navigate(`/view/${resume.id}`)}>View</button>
          <button onClick={() => navigate(`/edit/${resume.id}`)}>Edit</button>
          <button onClick={() => handleDelete(resume.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ResumeList;
