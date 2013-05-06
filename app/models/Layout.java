package models;

import models.Base;
import models.Base.LayoutJSON;

import java.io.IOException;
import java.util.Collection;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;

import com.mongodb.util.JSON;

import net.vz.mongodb.jackson.DBCursor;
import net.vz.mongodb.jackson.JacksonDBCollection;

import play.Logger;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.modules.mongodb.jackson.MongoDB;

public class Layout extends Model {
    
    public static JacksonDBCollection<LayoutJSON, Object> siteLayoutCollection = MongoDB.getCollection("sites", LayoutJSON.class, Object.class);
    
    protected static ObjectMapper mapper = new ObjectMapper();
    
    public static JacksonDBCollection<Base, Object> coll = MongoDB.getCollection("sites", Base.class, Object.class);
    
    public static LayoutJSON parseContainer(JsonNode containerNode) {
		try{
			LayoutJSON mappedContainers = mapper.treeToValue(containerNode, LayoutJSON.class);
			return mappedContainers;
		}catch(IOException ioe){
			Logger.debug("Exception saving containers:");
			Logger.debug(ioe.toString());
			return null;
		}
    }
    
    public static boolean save(LayoutJSON returnedContainer) {
    	DBCursor<Base> cursor = coll.find().is("siteId", returnedContainer.siteId);
    	if (cursor.hasNext()) {
    		Base dbInsertObj = cursor.next();
    		dbInsertObj.layout = returnedContainer;
    		coll.save(dbInsertObj);
        	return true;
    	} else {
    		Logger.debug("no cursor next in layout model");
    		return false;
    	}
    }
}