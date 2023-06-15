import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations:[AppComponent],
    bootstrap: [AppComponent],
    imports:[BrowserModule,CommonModule,HttpClientModule, LoginComponent]
})

export class AppModule {}