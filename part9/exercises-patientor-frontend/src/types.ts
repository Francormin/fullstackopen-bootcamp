export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum EntryType {
  HealthCheck = "healthCheck",
  OccupationalHealthcare = "occupationalHealthcare",
  Hospital = "hospital"
}

export enum HealthCheckRating {
  Healthy = "healthy",
  LowRisk = "low risk",
  HighRisk = "high risk",
  CriticalRisk = "critical risk"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge?: {
    date: string;
    criteria: string;
  };
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type EntryFormValues = Omit<Entry, "id">;
