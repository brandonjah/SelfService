package controllers;

import static play.data.Form.form;

import models.Base;
import play.Logger;
import play.data.DynamicForm;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

//@Security.Authenticated(Secured.class)
public class Template extends Controller {
    
	public static Result save() {
	    final DynamicForm form = form().bindFromRequest();
	    	Logger.debug("save in controller template");
            Base base = new Base();
            base.siteId = form.get("siteId");
            base.templateName = form.get("templateName");    
            Logger.debug(base.siteId);
            Base.save(base);            
		
		//return ok(json).as("application/json");
        return ok();
    }
}
