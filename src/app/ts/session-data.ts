export class SessionData{
  public static readonly APP_NAME = 'SecurePortal';


  public static isLoggedIn(): boolean{
    return sessionStorage.getItem('isLoggedIn') == 'true';
  }
}
