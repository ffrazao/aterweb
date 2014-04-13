package gov.emater.aterweb.comum;

import java.io.File;

public class UtilitarioArquivo {

    public static String removeArquivo(String filePath) {
	// These first few lines the same as Justin's
	File f = new File(filePath);

	// if it's a directory, don't remove the extention
	if (f.isDirectory())
	    return filePath;

	String name = f.getName();

	return filePath.substring(0, filePath.lastIndexOf(name));
    }

    private static String removeDados(String filePath, String caractere) {
	// These first few lines the same as Justin's
	File f = new File(filePath);

	// if it's a directory, don't remove the extention
	if (f.isDirectory())
	    return filePath;

	String name = f.getName();

	// Now we know it's a file - don't need to do any special hidden
	// checking or contains() checking because of:
	final int lastPeriodPos = name.lastIndexOf(caractere);
	if (lastPeriodPos <= 0) {
	    // No period after first character - return name as it was passed in
	    return filePath;
	} else {
	    // Remove the last period and everything after it
	    File renamed = new File(f.getParent(), name.substring(0, lastPeriodPos));
	    return renamed.getPath();
	}
    }

    public static String removeExtensao(String filePath) {
	return removeDados(filePath, ".");
    }
}