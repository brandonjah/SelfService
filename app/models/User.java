package models;

import models.utils.AppException;
import models.utils.Hash;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

import play.modules.mongodb.jackson.MongoDB;
import net.vz.mongodb.jackson.JacksonDBCollection;
import net.vz.mongodb.jackson.DBQuery;
import net.vz.mongodb.jackson.ObjectId;

/**
 * User: yesnault
 * Date: 20/01/12
 */
@Entity
public class User extends Model {

	@ObjectId @Id
    public String id;

    @Constraints.Required
    @Formats.NonEmpty
    @Column(unique = true)
    public String email;

    @Constraints.Required
    @Formats.NonEmpty
    @Column(unique = true)
    public String fullname;

    public String confirmationToken;

    @Constraints.Required
    @Formats.NonEmpty
    public String passwordHash;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreation;

    @Formats.NonEmpty
    public Boolean validated = false;

    //@TODO possibly should not be public
    public static JacksonDBCollection<User, Object> db() {
        return MongoDB.getCollection("users", User.class, Object.class);
    }

    /**
     * Retrieve a user from an email.
     *
     * @param email email to search
     * @return a user
     */
    
    public static User findById(String id) {
    	Logger.debug("findbyid in model user");
        return db().findOne(DBQuery.is("id", id));
    }
    
    public static User findByEmail(String email) {
    	Logger.debug("findbyemail in model user");
    	return db().findOne(DBQuery.is("email", email));
    }

    /**
     * Retrieve a user from a fullname.
     *
     * @param fullname Full name
     * @return a user
     */
    public static User findByFullname(String fullname) {
    	Logger.debug("findbyfullname in model user");
    	return db().findOne(DBQuery.is("fullname", fullname));
    }

    /**
     * Retrieves a user from a confirmation token.
     *
     * @param token the confirmation token to use.
     * @return a user if the confirmation token is found, null otherwise.
     */
    public static User findByConfirmationToken(String token) {
    	Logger.debug("findbyconfirmationtoken in model user");
    	return db().findOne(DBQuery.is("token", token));
    }
    
    /**
     * Authenticate a User, from a email and clear password.
     *
     * @param email         email
     * @param clearPassword clear password
     * @return User if authenticated, null otherwise
     * @throws AppException App Exception
     */
    public static User authenticate(String email, String clearPassword) throws AppException {
    	Logger.debug("user authenticate in model user");
    	User user = User.db().findOne(DBQuery.is("email", email));
        if (user != null) {
            // get the hash password from the salt + clear password
            if (Hash.checkPassword(clearPassword, user.passwordHash)) {
              return user;
            }
        }
        return null;
    }

    public void changePassword(String password) throws AppException {
    	Logger.debug("change password in model user");
    	this.passwordHash = Hash.createPassword(password);
        this.save();
    }

    /**
     * Confirms an account.
     *
     * @return true if confirmed, false otherwise.
     * @throws AppException App Exception
     */
    public static boolean confirm(User user) throws AppException {
    	Logger.debug("save user in model user");
    	if (user == null) {
          return false;
        }
        user.confirmationToken = null;
        user.validated = true;
        User.db().save(user);

        return true;
    }

}
