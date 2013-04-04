package models;

import javax.persistence.Column;
import javax.persistence.Id;

import net.vz.mongodb.jackson.DBQuery;
import net.vz.mongodb.jackson.JacksonDBCollection;
import net.vz.mongodb.jackson.ObjectId;
import play.Logger;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.modules.mongodb.jackson.MongoDB;

//Base contains the base information for a landing page, may also be used for widgets
public class Base extends Model {

	@ObjectId @Id
    public String id;

    @Constraints.Required
    @Formats.NonEmpty
    @Column(unique = true)
    public String templateName;
    
    @Constraints.Required
    @Formats.NonEmpty
    public String siteId;
    
    public static JacksonDBCollection<Base, Object> db() {
        return MongoDB.getCollection("bases", Base.class, Object.class);
    }
    
    public static Base findById(String id) {
    	Logger.debug("findbyid in model base");
        return db().findOne(DBQuery.is("id", id));
    }
    
    public static Base findBySiteId(String siteId) {
    	Logger.debug("findbysiteid in model base");
    	return db().findOne(DBQuery.is("siteId", siteId));
    }
    
    public static boolean save(Base base) {
    	Logger.debug("save base in model base");
    	Logger.debug(base.templateName);
    	if (base == null) {
          return false;
        }
    	//@TODO check for unique template name, 
    	//if not unique, get _id and update, otherwise save will insert
    	Base.db().save(base);
    	return true;
    }
}
