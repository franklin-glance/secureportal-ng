export class SessionData {
    static isLoggedIn() {
        return sessionStorage.getItem('isLoggedIn') == 'true';
    }
}
SessionData.APP_NAME = 'SecurePortal';
//# sourceMappingURL=session-data.js.map