package gov.emater.aterweb.comum;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.apache.log4j.Logger;
import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;
import org.imgscalr.Scalr.Mode;

/**
 * 
 * 
 * @author Abhishek Somani
 * 
 */
public class UtilitarioImagem {
    private static final Logger logger = Logger.getLogger(UtilitarioImagem.class);

    public static File redimensionar(File arquivo, int pixels) throws IOException {

	long startTime = System.currentTimeMillis();
	BufferedImage img = ImageIO.read(arquivo); // load image

	// Quality indicate that the scaling implementation should do everything
	// create as nice of a result as possible , other options like speed
	// will return result as fast as possible
	// Automatic mode will calculate the resultant dimensions according
	// to image orientation .so resultant image may be size of 50*36.if you
	// want
	// fixed size like 50*50 then use FIT_EXACT
	// other modes like FIT_TO_WIDTH..etc also available.

	BufferedImage thumbImg = Scalr.resize(img, Method.QUALITY, Mode.AUTOMATIC, pixels, pixels, Scalr.OP_ANTIALIAS);
	// convert bufferedImage to outpurstream
	ByteArrayOutputStream os = new ByteArrayOutputStream();
	ImageIO.write(thumbImg, "jpg", os);

	// or wrtite to a file

	File result = new File(UtilitarioArquivo.removeArquivo(arquivo.getAbsolutePath()), "thumbnail_" + pixels + "_" + arquivo.getName());

	ImageIO.write(thumbImg, "jpg", result);

	if (logger.isDebugEnabled()) {
	    logger.debug(String.format("thumbnail gerado em [%d] milisegundos.", (System.currentTimeMillis() - startTime)));
	}

	return result;
    }
}