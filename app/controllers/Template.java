package controllers;

import static play.data.Form.form;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.UUID;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import models.Base;
import models.Base.LayoutJSON;
import models.S3File;
import play.Logger;
import play.libs.Json;
import play.data.DynamicForm;
import play.db.ebean.Model;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import play.mvc.Security;

//@Security.Authenticated(Secured.class)
public class Template extends Controller {
    
	public static Result save() {
	    final DynamicForm form = form().bindFromRequest();
            Base base = new Base();
            base.bundleId = form.get("bundleId");
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
        return ok();
    }

	public static Result siteSearch(String bundleId) {
		ObjectNode result = Json.newObject();
//		Base base = new Base();
		Base siteInfo = Base.siteSearch(bundleId);
		if(siteInfo == null) {
			return null;	
		} else {
			result.put("bundleId", bundleId);
			result.put("templateName", siteInfo.templateName);
			result.put("bgColor", siteInfo.bgColor);
			result.put("txtColor", siteInfo.txtColor);
			return ok(result);
		}
        
    }
	
	public static Result loadLayout(String bundleId) {
		Base returnedLayout = Base.loadLayout(bundleId);
		if(returnedLayout.bundleId == null) {
			Logger.debug("returnedLayout is null");
			return badRequest();	
		} else {
			Logger.debug("returnedLayout ok");
			Logger.debug(returnedLayout.bundleId);
			return ok(Json.toJson(returnedLayout));
		}
        
    }
	
	public static Result fileUpload() {
		  MultipartFormData body = request().body().asMultipartFormData();
		  FilePart picture = body.getFile("picture");
		  if (picture != null) {
		    String fileName = picture.getFilename();
		    String contentType = picture.getContentType(); 
		    File file = picture.getFile();
		    Logger.debug("file upload info:");
		    Logger.debug(contentType);
		    Logger.debug(fileName);
            S3File s3File = new S3File();
            s3File.name = fileName;
            s3File.file = file;
            s3File.save();

		    return ok("File uploaded");
		  } else {
		    flash("error", "Missing file");
		    return redirect(routes.Application.index());    
		  }
    }
	
    public static Result listUploads() {
        List<S3File> uploads = new Model.Finder(UUID.class, S3File.class).all();
        Logger.debug("in listUploads");
        Logger.debug(uploads.toString());
        return ok(Json.toJson(uploads));
    }
	
	public static Result generate() {
		Logger.debug("in generate");
		PrintWriter writer;
		
		FileOutputStream fop = null;
		File file;
		String content = "This is the text content";
		
		try {
			writer = new PrintWriter("landing-page.html", "UTF-8");
			writer.println("The first line");
			writer.println("The second line");
			writer.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			 
			file = new File("Users/bjahner/Desktop/newfile.txt");
			fop = new FileOutputStream(file);
 
			// if file doesnt exists, then create it
				file.createNewFile();
 
			// get the content in bytes
			byte[] contentInBytes = content.getBytes();
 
			fop.write(contentInBytes);
			fop.flush();
			fop.close();
 
			System.out.println("Done");
 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fop != null) {
					fop.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
        return ok();
    }
}
