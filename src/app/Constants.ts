export class Constants {
    public static SUCCESS = "Success";
	public static FAILED = "Failed";
	public static NOT_FOUND = "Not Found";
	public static INVALID_EMAIL = "Invalid Email";
	public static WRONG_PASSWORD = "Wrong Password";
	public static EXIST_EMAIL = " Email allready Exist";
	public static NOT_FOUND_EMAIL = "Not Found Email";
	public static ERROR_TITLE_MSG = "Error!";
	public static ERROR_ALL_FIELD_MSG = "All * fields are mandatory";
	public static ERROR_PWD_MSG = 'New Password and Confirm Password should be same';
	public static ERROR_EMAIL_VALID = "Not a valid email";
	public static APP_WARNING_TITLE = "After submit, data can't be change";
	public static APP_WARNING_MSG = "Before submit, verify your details";
	public static APP_SUCCESS_TITLE = "Sucessfully submited";
	public static APP_SUCCESS_MSG = "Your application submitted successfully.";
	public static TASK_SUCCESS_TITLE = "Sucessfully aasigned";
	public static TASK_SUCCESS_MSG = "Task submitted successfully.";
    
    public static REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}