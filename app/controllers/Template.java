package controllers;

import static play.data.Form.form;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import models.Base;
import models.Base.LayoutJSON;
import play.Logger;
import play.libs.Json;
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
			base.bgColor = form.get("bgColor");
			base.txtColor = form.get("txtColor");
            Base.save(base);
        return ok();
    }
	
	public static Result saveLayout() {
		JsonNode json = request().body().asJson();
//        Base base = new Base();
        LayoutJSON returnedContainer = Base.parseContainer(json); 
        Base.saveLayout(returnedContainer);
        Logger.debug("saveLayout siteId:");
        Logger.debug(returnedContainer.siteId.toString());
        return ok();
    }

	public static Result siteSearch(String siteId) {
		ObjectNode result = Json.newObject();
//		Base base = new Base();
		String templateName = Base.siteSearch(siteId);
		if(templateName == null) {
			return null;	
		} else {
			result.put("siteId", siteId);
			result.put("templateName", templateName);
			return ok(result);
		}
        
    }
	
	public static Result loadLayout(String siteId) {
//		Base base = new Base();
		Base returnedLayout = Base.loadLayout(siteId);
		if(returnedLayout == null) {
			return badRequest();	
		} else {
			return ok(Json.toJson(returnedLayout));
		}
        
    }
}
