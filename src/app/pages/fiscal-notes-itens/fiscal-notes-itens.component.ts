import { Component, Input, OnInit } from '@angular/core';
import { FiscalNoteItem } from '../../core/interfaces/Ifiscal-notes/FiscalNoteItem';
import { InvoiceService } from '../../core/services/invoice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fiscal-notes-itens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fiscal-notes-itens.component.html',
  styleUrl: './fiscal-notes-itens.component.scss'
})
export class FiscalNotesItensComponent implements OnInit {

  @Input() fiscalNoteId!: number;
  @Input() isReadOnly = false;

  items: FiscalNoteItem[] = [];
  loading = false;
  error = '';
  
  newItem: FiscalNoteItem = {
    productCode: '',
    quantity: 0
  };
  
  showAddForm = false;
  editingItem: FiscalNoteItem | null = null;

  constructor(private fiscalNoteService: InvoiceService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = '';
  
    this.fiscalNoteService.getFiscalNoteItemsByNoteId(this.fiscalNoteId).subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar itens';
        console.error(err);
        this.loading = false;
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetNewItem();
    }
  }

  resetNewItem(): void {
    this.newItem = {
      productCode: '',
      quantity: 0
    };
  }

  addItem(): void {
    if (!this.newItem.productCode || this.newItem.quantity <= 0) {
      this.error = 'Preencha todos os campos corretamente';
      return;
    }

    this.loading = true;
    this.error = '';

    const itemToCreate = {
      ...this.newItem,
      fiscalNoteId: this.fiscalNoteId
    };

    this.fiscalNoteService.createFiscalNoteItem(itemToCreate).subscribe({
      next: (item) => {
        this.items.push(item);
        this.resetNewItem();
        this.showAddForm = false;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao adicionar item';
        console.error(err);
        this.loading = false;
      }
    });
  }

  startEdit(item: FiscalNoteItem): void {
    this.editingItem = { ...item };
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  saveEdit(): void {
    if (!this.editingItem?.id) return;

    if (!this.editingItem.productCode || this.editingItem.quantity <= 0) {
      this.error = 'Preencha todos os campos corretamente';
      return;
    }

    this.loading = true;
    this.error = '';

    this.fiscalNoteService.updateFiscalNoteItem(this.editingItem.id, this.editingItem).subscribe({
      next: (updatedItem) => {
        const index = this.items.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
        this.editingItem = null;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao atualizar item';
        console.error(err);
        this.loading = false;
      }
    });
  }

  deleteItem(item: FiscalNoteItem): void {
    if (!item.id) return;

    if (!confirm(`Deseja excluir o item ${item.productCode}?`)) {
      return;
    }

    this.fiscalNoteService.deleteFiscalNoteItem(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id);
      },
      error: (err) => {
        this.error = 'Erro ao excluir item';
        console.error(err);
      }
    });
  }

  isEditing(item: FiscalNoteItem): boolean {
    return this.editingItem?.id === item.id;
  }
}