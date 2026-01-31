import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore();

function EditResume() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      const snapshot = await getDoc(doc(db, "resumes", id));
      const data = snapshot.data();
      setName(data.name);
      setTitle(data.title);
      setSkills(data.skills);
    };
    fetchResume();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "resumes", id), {
      name,
      title,
      skills
    });
    alert("Resume Updated!");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Resume</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={skills} onChange={e => setSkills(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditResume;
