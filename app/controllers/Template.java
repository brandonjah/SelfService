package controllers;

import static play.data.Form.form;

import models.Base;
import models.Layout;
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

            Base.save(base);
		
        return ok();
    }
	
	public static Result saveLayout() {
	    final DynamicForm form = form().bindFromRequest();
	    	Logger.debug("saveLayout in controller template");
            Layout layout = new Layout();
            layout.siteId = form.get("siteId");
            layout.containersString = form.get("containers");
            Logger.debug(layout.containersString);
            Layout.save(layout);
		
        return ok();
    }
}
