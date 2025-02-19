import { IUser } from 'projects/shared-models/user.model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  currentUser: ICurrentUser;
  subscriptions = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(
      data => {
        this.user = data;
      }
    )


    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
          this.setMeta();
        }
      )
    );
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  setMeta() {
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });

    this.title.setTitle(`${this.user.name}`)
    this.meta.updateTag({ name: 'description', content: `${this.user.designation}`});


    this.meta.updateTag({ name: 'og:image', content: this.user.avatar });
    this.meta.updateTag({ name: 'og:image:secure_url', content: this.user.avatar });
    this.meta.updateTag({ name: 'og:title', content: `${this.user.name}` });
    this.meta.updateTag({ name: 'og:description', content: `${this.user.designation}`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: this.user.avatar });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.user.name}` });
    this.meta.updateTag({ name: 'twitter:description', content: `${this.user.designation}`});
  }

}
