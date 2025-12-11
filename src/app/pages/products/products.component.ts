import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, ProductCreation } from '../../core/interfaces/Product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  produtos: Product[] = [];
  novoProduto: ProductCreation = { name: '', quantity: 0 };
  
  editandoProduto = false;
  produtoEmEdicao: Product | null = null;
  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.carregar();
  }

  abrirFormulario(): void {
    this.editandoProduto = false;
    this.limparFormulario();
    window.scrollTo(0, 0);
  }

  carregar(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        alert('Erro ao carregar produtos: ' + err.message);
        this.loading = false;
      }
    });
  }

  editar(produto: Product): void {
    this.novoProduto = { ...produto };
    this.produtoEmEdicao = produto;
    this.editandoProduto = true;
    window.scrollTo(0, 0);
  }

  salvar(): void {
    if (!this.novoProduto.name) {
      alert('Preencha o Nome do produto');
      return;
    }

    const productPayload: ProductCreation = {
      name: this.novoProduto.name,
      quantity: this.novoProduto.quantity
    };

    if (this.editandoProduto && this.produtoEmEdicao?.code) {
      const code = this.produtoEmEdicao.code;
      
      this.productService.update(code, productPayload).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.carregar();
          this.limparFormulario();
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          alert('Erro ao atualizar produto: ' + err.message);
        }
      });
    } else {
      this.productService.create(productPayload).subscribe({
        next: () => {
          alert('Produto criado com sucesso!');
          this.carregar();
          this.limparFormulario();
        },
        error: (err) => {
          console.error('Erro ao criar produto:', err);
          alert('Erro ao criar produto: ' + err.message);
        }
      });
    }
  }

  cancelarEdicao(): void {
    this.limparFormulario();
    alert('Edição cancelada.');
  }

  limparFormulario(): void {
    this.novoProduto = { name: '', quantity: 0 };
    this.editandoProduto = false;
    this.produtoEmEdicao = null;
  }

  deletar(code: string): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.delete(code).subscribe({
        next: () => this.carregar(),
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
          alert('Erro ao excluir produto: ' + err.message);
        }
      });
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}