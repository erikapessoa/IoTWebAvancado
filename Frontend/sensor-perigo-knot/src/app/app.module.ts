import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceComponent } from './devices/device/device.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { AuthComponent } from './auth/auth.component';

import { TasksService } from './tasks/tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    DevicesComponent,
    DeviceComponent,
    ContactsComponent,
    ContactComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component:AuthComponent
      },
      {
        path: 'user',
        component:UserComponent
      },
      {
        path: 'device',
        component: DeviceComponent
      }
    ])
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
