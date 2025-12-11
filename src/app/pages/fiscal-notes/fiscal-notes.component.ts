import { Component } from '@angular/core';
import { InvoiceService } from '../../core/services/invoice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiscalNote } from '../../core/interfaces/Ifiscal-notes/FiscalNote';
import { FiscalNotesItensComponent } from '../fiscal-notes-itens/fiscal-notes-itens.component';


@Component({
  selector: 'app-fiscal-notes',
  standalone: true,
  imports: [CommonModule, FormsModule,FiscalNotesItensComponent],
  templateUrl: './fiscal-notes.component.html',
  styleUrl: './fiscal-notes.component.scss'
})
export class FiscalNotesComponent {
 fiscalNotes: FiscalNote[] = [];
  filteredNotes: FiscalNote[] = [];
  loading = false;
  error = '';
  filterStatus: string = 'all';
  selectedNote: FiscalNote | null = null;
  showItemsModal = false;

  
  constructor(private fiscalNoteService:InvoiceService ) {}

  ngOnInit(): void {
    this.loadFiscalNotes();
  }

 

  loadFiscalNotes(): void {
    this.loading = true;
    this.error = '';
    
    this.fiscalNoteService.getAllFiscalNotes().subscribe({
      next: (notes) => {
        this.fiscalNotes = notes;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar notas fiscais';
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.filteredNotes = this.fiscalNotes;
    } else {
      this.filteredNotes = this.fiscalNotes.filter(
        note => note.status === this.filterStatus
      );
    }
  }

  onFilterChange(): void {
    this.applyFilter();
  }

  createNewNote(): void {
    this.loading = true;
    this.fiscalNoteService.createFiscalNote({ status: 'Aberta' }).subscribe({
      next: (note) => {
        this.fiscalNotes.push(note);
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao criar nota fiscal';
        console.error(err);
        this.loading = false;
      }
    });
  }

  closeNote(note: FiscalNote): void {
    if (!note.id) return;
    
    if (!confirm(`Deseja fechar a nota fiscal #${note.numeroSequencial}?`)) {
      return;
    }

    console.log(note.id)

    this.fiscalNoteService.closeFiscalNote(note.id).subscribe({
      next: (updatedNote) => {
        const index = this.fiscalNotes.findIndex(n => n.id === note.id);
        if (index !== -1) {
          this.fiscalNotes[index] = updatedNote;
          this.applyFilter();
        }
      },
      error: (err) => {
        this.error = 'Erro ao fechar nota fiscal';
        console.error(err);
      }
    });
  }

  deleteNote(note: FiscalNote): void {
    if (!note.id) return;
    
    if (!confirm(`Deseja excluir a nota fiscal #${note.numeroSequencial}?`)) {
      return;
    }

    this.fiscalNoteService.deleteFiscalNote(note.id).subscribe({
      next: () => {
        this.fiscalNotes = this.fiscalNotes.filter(n => n.id !== note.id);
        this.applyFilter();
      },
      error: (err) => {
        this.error = 'Erro ao excluir nota fiscal';
        console.error(err);
      }
    });
  }

  viewItems(note: FiscalNote): void {
    this.selectedNote = note;
    this.showItemsModal = true;
  }

  closeModal(): void {
    this.showItemsModal = false;
    this.selectedNote = null;
  }

  formatDate(date: string | null |undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  }

  getStatusClass(status: string): string {
    return status === 'Aberta' ? 'status-open' : 'status-closed';
  }
}
