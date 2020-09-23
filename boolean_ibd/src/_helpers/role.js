// The role object defines the all the roles in the example application, 
// I created it to use like an enum to avoid passing roles around as strings, 
// so instead of 'Admin' we can use Role.Admin.

export const Role = {
    Admin: 'Admin_Moderator_Type',       // unconventional name to not get hacked         
    User: 'Basic_User_Type',             // Basic
    Premium: 'Premium_User_Type'
}