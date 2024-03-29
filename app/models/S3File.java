package models;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import play.Logger;
import play.db.ebean.Model;
import play.modules.mongodb.jackson.MongoDB;
import plugins.S3Plugin;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.codehaus.jackson.map.ObjectMapper;

import models.Base.LayoutJSON;
import net.vz.mongodb.jackson.JacksonDBCollection;
import net.vz.mongodb.jackson.ObjectId;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

@Entity
public class S3File extends Model {

    @Id
    public UUID id;

    private String bucket;

    public String name;

    @Transient
    public File file;
    
    protected static JacksonDBCollection<S3File, Object> coll = MongoDB.getCollection("files", S3File.class, Object.class);
    
    public URL getUrl() throws MalformedURLException {
        return new URL("https://s3.amazonaws.com/" + bucket + "/" + getActualFileName());
    }

    private String getActualFileName() {
    	this.id = UUID.randomUUID();
        return this.id + "/" + name;
    }

    @Override
    public void save() {
        if (S3Plugin.amazonS3 == null) {
            Logger.error("Could not save because amazonS3 was null");
            throw new RuntimeException("Could not save");
        }
        else {
            this.bucket = S3Plugin.s3Bucket;
//            super.save(); // assigns an id
            Logger.debug("here");
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, getActualFileName(), file);
            putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead); // public for all
            S3Plugin.amazonS3.putObject(putObjectRequest); // upload file
            coll.save(this);
        }
    }
    
    public void saveFileObject() {
        if (S3Plugin.amazonS3 == null) {
            Logger.error("Could not save because amazonS3 was null");
            throw new RuntimeException("Could not save");
        }
        else {
            this.bucket = S3Plugin.s3Bucket;
            String myString = "test";
            InputStream is = new ByteArrayInputStream( myString.getBytes() );
            ObjectMetadata newObjectMetadata = new ObjectMetadata();
//            newObjectMetadata.setHeader(name, "PublicRead");
//            newObjectMetadata.setHeader("cannedAclHeader", "public-read");
            S3Plugin.amazonS3.putObject(this.bucket,"TEST",is, newObjectMetadata); // upload file
//            cannedAclHeader = "public-read"
//            name = "PublicRead"
            coll.save(this);
        }
    }

    @Override
    public void delete() {
        if (S3Plugin.amazonS3 == null) {
            Logger.error("Could not delete because amazonS3 was null");
            throw new RuntimeException("Could not delete");
        }
        else {
            S3Plugin.amazonS3.deleteObject(bucket, getActualFileName());
            super.delete();
        }
    }

}