import { Diagnosis, Gender, NewBaseEntry, NewEntry, NewPatientEntry } from "./types";
import diagnoses from "./data/diagnoses";

// Helper functions for creating new patient entries.

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name: " + name);
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn: " + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender. It must be 'male', 'female' or 'other': " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation: " + occupation);
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect description: " + description);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect specialist: " + specialist);
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> | undefined => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return;
  }

  if (!Array.isArray(object.diagnosisCodes)) throw new Error("Incorrect diagnosis codes: " + object.diagnosisCodes);

  for (const diagnosisCode of object.diagnosisCodes) {
    if (typeof diagnosisCode !== "string" || !diagnoses.map(diagnose => diagnose.code).includes(diagnosisCode)) {
      throw new Error("Incorrect diagnosis codes: " + object.diagnosisCodes);
    }
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (object: unknown): number => {
  const rating = (object as { healthCheckRating: number }).healthCheckRating;
  if (rating === 0 || rating === 1 || rating === 2 || rating === 3) {
    return rating;
  }

  throw new Error("Incorrect health check rating: " + rating);
};

const parseEmployerName = (object: unknown): string => {
  const name = (object as { employerName: string }).employerName;

  if (!isString(name)) {
    throw new Error("Incorrect employer name: " + name);
  }

  const trimmedName = name.trim();
  if (trimmedName === "") {
    throw new Error("Incorrect employer name: " + name);
  }

  return trimmedName;
};

const parseSickLeave = (object: unknown): { startDate: string; endDate: string } | undefined => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    return;
  }

  const { startDate, endDate } = (object as { sickLeave: { startDate: string; endDate: string } }).sickLeave;
  if (!startDate.length || !endDate.length) return;

  if (!isString(startDate) || !isDate(startDate) || !isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect sick leave");
  }

  return {
    startDate,
    endDate
  };
};

const parseDischarge = (object: unknown): { date: string; criteria: string } | undefined => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    return;
  }

  const { date, criteria } = (object as { discharge: { date: string; criteria: string } }).discharge;
  if (!date.length || !criteria.length) return;

  if (!isString(date) || !isDate(date) || !isString(criteria)) {
    throw new Error("Incorrect discharge");
  }

  return {
    date,
    criteria
  };
};

// Helper functions to check the type of a variable

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(value => value.toString())
    .includes(param);
};

// Main functions to export

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntryPatient = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in object && "description" in object && "date" in object && "specialist" in object) {
    const newEntry: NewBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object)
    };

    switch (object.type) {
      case "healthCheck":
        return {
          ...newEntry,
          type: "healthCheck",
          healthCheckRating: parseHealthCheckRating(object)
        };

      case "occupationalHealthcare":
        return {
          ...newEntry,
          type: "occupationalHealthcare",
          employerName: parseEmployerName(object),
          sickLeave: parseSickLeave(object)
        };

      case "hospital":
        return {
          ...newEntry,
          type: "hospital",
          discharge: parseDischarge(object)
        };

      default:
        throw new Error("Incorrect entry type");
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
