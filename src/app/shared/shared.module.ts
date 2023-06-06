import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SearchComponent } from './components/search/search.component';
import { HighlighterPipe } from '../pipes/highlighter.pipe';
import { TabbedNavComponent } from './components/tabbed-nav/tabbed-nav.component';

@NgModule({
  declarations: [
    ButtonComponent,
    SearchComponent,
    HighlighterPipe,
    TabbedNavComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    SearchComponent,
    HighlighterPipe,
    TabbedNavComponent,
  ],
})
export class SharedModule {}
