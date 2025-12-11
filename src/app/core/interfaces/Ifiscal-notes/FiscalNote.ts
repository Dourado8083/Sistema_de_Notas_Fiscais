import { FiscalNoteItem } from "./FiscalNoteItem";

export interface FiscalNote {
  id?: number;
  numeroSequencial?: number;
  status: 'Aberta' | 'Fechada';
  dataEmissao: string;
  dataFechamento?: string | null;
  items?: FiscalNoteItem[];
}