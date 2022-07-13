import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";

import { AppComponent } from "./app.component";
import { LeafletDrawModule } from "@asymmetrik/ngx-leaflet-draw";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LeafletModule.forRoot(), LeafletDrawModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
