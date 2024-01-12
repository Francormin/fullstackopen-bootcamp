import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          <h2>{patient.name}</h2>
          <div>
            <p>
              <b>ssn:</b> {patient.ssn}
            </p>
            <p>
              <b>occupation:</b> {patient.occupation}
            </p>
          </div>
        </div>
      ) : (
        <p>Patient not found</p>
      )}
    </div>
  );
};

export default PatientDetails;
