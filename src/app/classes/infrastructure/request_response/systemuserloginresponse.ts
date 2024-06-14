export class SystemUserLoginResponse
{
    SystemUserLoginRequestRef: number = 0;
    UserName: string = '';
    FullName: string = '';
    CustomerName: string = '';
    Token: number = 0;
    TransDateTime: string = '';
    SystemUserRef: number = 0;
    SystemUserRoleRefs: number[] = [];
    CustomerLicenseNo: number = 0;
    ProjectName: string = '';
    VJLicenseKey: string = '';
    PermanentStatusGranted: boolean = false;
}