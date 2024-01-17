import { Diagnosis, Gender, NewBaseEntry, NewEntry, NewPatientEntry } from "./types";

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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (rating: unknown): number => {
  if (rating === 0 || rating === 1 || rating === 2 || rating === 3) {
    return rating;
  }

  throw new Error("Incorrect health check rating: " + rating);
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect employer name: " + name);
  }

  const trimmedName = name.trim();
  if (trimmedName === "") {
    throw new Error("Incorrect employer name: " + name);
  }

  return trimmedName;
};

const parseSickLeave = (object: unknown): { startDate: string; endDate: string } => {
  if (!object || typeof object !== "object" || !("sickLeave" in object)) {
    throw new Error("Incorrect or missing sick leave");
  }

  const { startDate, endDate } = (object as { sickLeave: { startDate: string; endDate: string } }).sickLeave;
  if (!isString(startDate) || !isString(endDate)) {
    throw new Error("Incorrect sick leave");
  }

  return {
    startDate,
    endDate
  };
};

const parseDischarge = (object: unknown): { date: string; criteria: string } => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    throw new Error("Incorrect or missing discharge");
  }

  const { date, criteria } = (object as { discharge: { date: string; criteria: string } }).discharge;
  if (!isString(date) || !isString(criteria)) {
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
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...newEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
        }
        throw new Error("Incorrect data: healthCheckRating is missing");

      case "OccupationalHealthcare":
        if ("employerName" in object && "sickLeave" in object) {
          return {
            ...newEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
        }
        throw new Error("Incorrect data: employerName or sickLeave are missing");

      case "Hospital":
        if ("discharge" in object) {
          return {
            ...newEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge)
          };
        }
        throw new Error("Incorrect data: discharge is missing");

      default:
        throw new Error("Incorrect entry type");
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
