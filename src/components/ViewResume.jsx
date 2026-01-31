import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const db = getFirestore();

function ViewResume() {
    const { id } = useParams();
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            const snapshot = await getDoc(doc(db, "resumes", id));
            setResume(snapshot.data());
        };
        fetchResume();
    }, [id]);

    const downloadPDF = () => {
        const pdf = new jsPDF();
        pdf.text(`Name: ${resume.name}`, 10, 10);
        pdf.text(`Title: ${resume.title}`, 10, 20);
        pdf.text(`Skills: ${resume.skills}`, 10, 30);
        pdf.save("resume.pdf");
    };

    if (!resume) return <p>Loading...</p>;

    return (
        <>
            <div style={{
                maxWidth: "800px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #ddd",
                fontFamily: "Arial"
            }}>
                <h1>{resume.name}</h1>
                <h3>{resume.title}</h3>
                <hr />
                <p><b>Skills:</b> {resume.skills}</p>
            </div>
             <button onClick={downloadPDF}>Download PDF</button>
</>
    );
}

export default ViewResume;
