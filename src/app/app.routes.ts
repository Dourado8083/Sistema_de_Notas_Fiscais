import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { FiscalNotesComponent } from './pages/fiscal-notes/fiscal-notes.component';

export const routes: Routes = [

     { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProductsComponent },
  { path: 'notas', component: FiscalNotesComponent },
  { path: '**', redirectTo: '/produtos' } // Rota 404 - redireciona para produtos
];
