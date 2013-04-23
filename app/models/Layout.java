package models;

import models.Base;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Id;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.ObjectMapper;

import net.vz.mongodb.jackson.DBCursor;
import net.vz.mongodb.jackson.DBQuery;
import net.vz.mongodb.jackson.DBUpdate;
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
    
    public static String containersString;
    
    public static ArrayList<ArrayList<Components>> containers = new ArrayList<ArrayList<Components>> ();
    
    public static JacksonDBCollection<Containers, Object> siteLayoutCollection = MongoDB.getCollection("sites", Containers.class, Object.class);
    
    static ObjectMapper mapper = new ObjectMapper();
    
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
        public void setComponents(Components components) {
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
    
    public static Containers parseContainer(String containerString) {
		try{
			JsonFactory f = new JsonFactory();
			JsonParser jp = f.createJsonParser(containersString);
			String textVal = jp.nextTextValue();
			Containers containers = mapper.readValue(jp, Containers.class);
			return containers;
		}catch(IOException ioe){
			Logger.debug("Exception saving containers:");
			Logger.debug(ioe.toString());
			return null;
		}
    }
    
    public static boolean save(Layout layout) {
    	DBCursor<Base> cursor = coll.find().is("siteId", layout.siteId);
    	if (cursor.hasNext()) {
    		Base dbInsertObj = cursor.next();
    		Containers parsedContainer = parseContainer(layout.containersString);
    		coll.updateById(dbInsertObj.id,DBUpdate.push("id",parsedContainer.id));
        	return true;
    	} else {
    		Logger.debug("no cursor next in layout model");
    		return true;
    	}
    }

}
