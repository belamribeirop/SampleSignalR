import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { HomeComponent } from './home/home.component';
import { SingleChatComponent } from './single-chat/single-chat.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'broadcast',
    pathMatch: 'full',
    component: BroadcastComponent,
  },
  {
    path: 'chat',
    pathMatch: 'full',
    component: SingleChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
