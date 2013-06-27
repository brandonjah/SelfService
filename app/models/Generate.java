package models;

import java.io.File;

import play.db.ebean.Model;
import play.Logger;

public class Generate extends Model {
	public static void writeFile(String fileName, String s) {
		Logger.debug("in File model");
		File f = null;
	    try {
    	  f = new File(s);
          S3File s3File = new S3File();
          s3File.name = fileName;
          s3File.file = f;
          s3File.save();
	    } catch (Exception e) {
	      throw new RuntimeException(e);
	    } 
	}

}
