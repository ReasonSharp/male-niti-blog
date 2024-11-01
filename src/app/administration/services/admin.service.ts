import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ 'providedIn': 'root' })
export class AdminService {
 user: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

 setUser(user: any) {
  if (user) this.user.next(user);
 }
 setSession(session: any) {
  if (session) {
   let user = this.user.getValue();
   if (user) {
    user.session = session;
    this.user.next(user);
   } else if (session.user) {
    this.user.next({ user: session.user, session: session });
   } else throw new Error('unable to retrieve user info');
  } else throw new Error('session expired');
 }
}