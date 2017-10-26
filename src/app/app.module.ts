import { PodcastUploadFormComponent } from './components/podcast/podcast-upload-form/podcast-upload-form.component';
import { PodcastAddUrlFormComponent } from './components/podcast/podcast-add-url-form/podcast-add-url-form.component';
import { PodcastAddFormComponent } from './components/podcast/podcast-add-form/podcast-add-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './services/auth.guard';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ImageService } from './services/image.service';
import { DebugService } from './services/debug.service';
import { DebugComponent } from './components/debug/debug.component';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { MomentModule } from 'angular2-moment';
import { FilterEntryPipe } from './pipes/filter-entry.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PodcastComponent } from './components/podcast/podcast.component';
import { EntryListItemComponent } from './components/podcast/entry-list-item/entry-list-item.component';

import { reducers } from './reducers';
import { PodcastsEffects } from './effects/podcast.effects';
import { EntriesEffects } from './effects/entries.effects';
import { PodcastService } from './services/podcast.service';
import { SignalRService } from 'app/services/signalr.service';
import { AppRoutingModule } from 'app/app.router';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(
        new AuthConfig({
            noClientCheck: true,
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            tokenGetter: () => localStorage.getItem('token')
        }),
        http,
        options
    );
}

@NgModule({
    declarations: [
        AppComponent,
        PodcastComponent,
        HomeComponent,
        NavbarComponent,

        FilterEntryPipe,
        OrderByPipe,

        EntryListItemComponent,
        PodcastAddFormComponent,
        PodcastUploadFormComponent,
        PodcastAddUrlFormComponent,
        DebugComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        InlineEditorModule,
        DropzoneModule.forRoot(),
        MomentModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        ToastyModule.forRoot(),

        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([PodcastsEffects, EntriesEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        })
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        SignalRService,
        ProfileService,
        PodcastService,
        ImageService,
        DebugService
        // PusherService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
