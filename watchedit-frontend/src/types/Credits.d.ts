import { Film } from "./Films";
import { Person } from "./People";

export type Credit = {
  id?: number;
  person: Person;
  film: Film;
  role: string;
  type: string;
};

export type EditableCredit = {
  id?: number;
  role: string;
  type: string;
};

export type CreditFormErrors = {
  onSave?: string;
  role?: string;
  type?: string;
};
