import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiscalNote } from '../interfaces/Ifiscal-notes/FiscalNote';
import { FiscalNoteItem } from '../interfaces/Ifiscal-notes/FiscalNoteItem';
import { UpdateFiscalNoteRequest } from '../interfaces/Ifiscal-notes/UpdateFiscalNoteRequest';
import { CreateFiscalNoteRequest } from '../interfaces/Ifiscal-notes/CreateFiscalNoteRequest';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = "http://localhost:5227/fiscal";

  constructor(private http: HttpClient) { }

  getAllFiscalNotes(): Observable<FiscalNote[]> {
    return this.http.get<FiscalNote[]>(`${this.apiUrl}/FiscalNote/GetAll`);
  }

  getFiscalNoteById(id: number): Observable<FiscalNote> {
    return this.http.get<FiscalNote>(`${this.apiUrl}/FiscalNote/${id}`);
  }

  getFiscalNotesByStatus(status: string): Observable<FiscalNote[]> {
    return this.http.get<FiscalNote[]>(`${this.apiUrl}/FiscalNote/status/${status}`);
  }

  createFiscalNote(fiscalNote: CreateFiscalNoteRequest): Observable<FiscalNote> {
    return this.http.post<FiscalNote>(`${this.apiUrl}/FiscalNote`, fiscalNote);
  }

  updateFiscalNote(id: number, fiscalNote: UpdateFiscalNoteRequest): Observable<FiscalNote> {
    return this.http.put<FiscalNote>(`${this.apiUrl}/FiscalNote/${id}`, fiscalNote);
  }

  closeFiscalNote(id: number): Observable<FiscalNote> {
    return this.http.patch<FiscalNote>(`${this.apiUrl}/FiscalNote/${id}/close`, {});
  }

  deleteFiscalNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/FiscalNote/${id}`);
  }

  getAllFiscalNoteItems(): Observable<FiscalNoteItem[]> {
    return this.http.get<FiscalNoteItem[]>(`${this.apiUrl}/FiscalNoteItem`);
  }

  getFiscalNoteItemById(id: number): Observable<FiscalNoteItem> {
    return this.http.get<FiscalNoteItem>(`${this.apiUrl}/FiscalNoteItem/${id}`);
  }

  getFiscalNoteItemsByNoteId(fiscalNoteId: number): Observable<FiscalNoteItem[]> {
    return this.http.get<FiscalNoteItem[]>(`${this.apiUrl}/FiscalNoteItem/bynote/${fiscalNoteId}`);
  }

  getFiscalNoteItemsByProductCode(productCode: string): Observable<FiscalNoteItem[]> {
    return this.http.get<FiscalNoteItem[]>(`${this.apiUrl}/FiscalNoteItem/byproduct/${productCode}`);
  }

  createFiscalNoteItem(item: FiscalNoteItem): Observable<FiscalNoteItem> {
    return this.http.post<FiscalNoteItem>(`${this.apiUrl}/FiscalNoteItem`, item);
  }

  updateFiscalNoteItem(id: number, item: FiscalNoteItem): Observable<FiscalNoteItem> {
    return this.http.put<FiscalNoteItem>(`${this.apiUrl}/FiscalNoteItem/${id}`, item);
  }

  deleteFiscalNoteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/FiscalNoteItem/${id}`);
  }
}