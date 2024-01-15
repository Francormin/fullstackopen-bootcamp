import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getPatient = async () => {
        const patientFound = await patientService.getById(id);
        patientFound ? setPatient(patientFound) : null;
      };

      getPatient();
    }
  }, [id]);

  return (
    <div>
      {patient ? (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <h2>{patient.name}</h2>
            {patient.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </div>
          <div>
            <p>
              <b>ssn:</b> {patient.ssn}
            </p>
            <p>
              <b>date of birth:</b> {patient.dateOfBirth}
            </p>
            <p>
              <b>occupation:</b> {patient.occupation}
            </p>
          </div>
          <div>
            <h3>entries</h3>
            {patient.entries.map(entry => (
              <div>
                <p>
                  {entry.date} <i>{entry.description}</i>
                </p>
                <ul>
                  {entry.diagnosisCodes?.map(code => (
                    <li>{code}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Patient not found</p>
      )}
    </div>
  );
};

export default PatientDetails;
