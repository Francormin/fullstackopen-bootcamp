export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface Entry {
  // id: string;
  // description: string;
  // date: string;
  // specialist: string;
  // diagnosisCodes?: Array<Diagnose["code"]>;
  // type: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id" | "entries">;
