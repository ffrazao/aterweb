package gov.emater.aterweb.comum;

import java.io.IOException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.util.DigestUtils;

public final class Criptografia {

	public static final synchronized String md5(String text)
			throws NoSuchAlgorithmException {
		MessageDigest messageDigest = MessageDigest.getInstance("MD5");
		messageDigest.update(text.getBytes(), 0, text.length());
		String result = new BigInteger(1, messageDigest.digest()).toString(16);
		if (result.length() < 32) {
			result = "0" + result;
		}
		return result;
	}

	public static final synchronized String md5File(byte[] bytes)
			throws IOException {
		return DigestUtils.md5DigestAsHex(bytes);
	}

}
