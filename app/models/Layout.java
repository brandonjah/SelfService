package models;

import models.Base;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Id;

import net.vz.mongodb.jackson.DBCursor;
import net.vz.mongodb.jackson.DBQuery;
import net.vz.mongodb.jackson.JacksonDBCollection;
import net.vz.mongodb.jackson.ObjectId;
import play.Logger;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.modules.mongodb.jackson.MongoDB;

public class Layout extends Model {
    @Constraints.Required
    @Formats.NonEmpty
    public String siteId;
    
    public String containersString;
    
    public static ArrayList<ArrayList<Components>> containers = new ArrayList<ArrayList<Components>> ();
    
    public class Containers {
        private String id;
        private Components components;
        
        public String getId() {
            return this.id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public Components getComponents() {
            return this.components;
        }
        public void setId(Components components) {
            this.components = components;
        }

    }
    
    public class Components {
        private String id;
        private String className;
        
        public String getId() {
            return this.id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public String getClassName() {
            return this.className;
        }
        public void setClassName(String className) {
            this.className = className;
        }

    }
    
    public static JacksonDBCollection<Base, Object> coll = MongoDB.getCollection("sites", Base.class, Object.class);
    
    public static boolean save(Layout layout) {
    	DBCursor<Base> cursor = coll.find().is("siteId", layout.siteId);
    	if (cursor.hasNext()) {
    		Base dbInsertObj = cursor.next();
    		Logger.debug("has cursor next in layout model");
    		Logger.debug(layout.containersString);
        	return true;
    	} else {
    		Logger.debug("no cursor next in layout model");
    		return true;
    	}
    }

}
