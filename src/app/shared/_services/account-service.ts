import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL = 'http://localhost:8080/api/account/';
  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(this.baseURL,
      {});
  }

  getExcelfile(){
    return this.http.get(this.baseURL+"file",
      {});
  }

  getAccountsbyuser(id: String): Observable<any> {
    return this.http.get(this.baseURL + id,
      {});
  }
  postAccounts(Subscriptions:any): Observable<any> {
    return this.http.post(this.baseURL, {
      firstName: Subscriptions.firstName,
      lastName: Subscriptions.lastName,
      orgCode: Subscriptions.orgCode,
      user: Subscriptions.user,
      accountAuthority: Subscriptions.accountAuthority,
      about: Subscriptions.about,
      address: Subscriptions.address,
      city: Subscriptions.city,
      companyname: Subscriptions.companyname,
      contactnumber: Subscriptions.contactnumber,
      country: Subscriptions.country,
      postalcode: Subscriptions.postalcode


    });
  }

  deleteAccounts(id: number) {
    return this.http.delete(this.baseURL + id)
  }
  getAccountsbyid(id: number) {
    return this.http.get(this.baseURL + id)
  }

  updateAccounts(id: number, Subscriptions: any) {
    return this.http.put(this.baseURL + id, {
      firstName: Subscriptions.firstName,
      lastName: Subscriptions.lastName,
      orgCode: Subscriptions.orgCode,
      user: Subscriptions.user,
      accountAuthority: Subscriptions.accountAuthority,
    })
  }
}
