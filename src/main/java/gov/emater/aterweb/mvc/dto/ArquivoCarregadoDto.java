package gov.emater.aterweb.mvc.dto;

import gov.emater.aterweb.comum.Criptografia;

import java.io.IOException;

public class ArquivoCarregadoDto implements Dto {

	private static final long serialVersionUID = 1L;

	private byte[] bytes;

	private String fileExtension;

	private String md5;

	private String name;

	private int size;

	private String thumbnailUrl;
	
	private String type;

	private String url;
	
	private int id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ArquivoCarregadoDto() {
	}

	public ArquivoCarregadoDto(String name, byte[] bytes, String type)
			throws IOException {
		super();
		setName(name);
		setBytes(bytes);
		setType(type);
	}

	public byte[] getBytes() {
		return bytes;
	}
	
	public String getFileExtension() {
		return fileExtension;
	}
	
	public String getMd5() {
		return md5;
	}

	public String getName() {
		return name;
	}

	public int getSize() {
		return size;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public String getType() {
		return type;
	}

	public String getUrl() {
		return url;
	}

	public void setBytes(byte[] bytes) throws IOException {
		this.bytes = bytes;
		String md5 = null;
		int size = 0;
		if (bytes != null) {
			md5 = Criptografia.md5File(bytes);
			size = bytes.length;
		}
		setMd5(md5);
		setSize(size);
	}

	private void setFileExtension(String fileExtension) {
		this.fileExtension = fileExtension;
	}

	private void setMd5(String md5) {
		if (md5 != null) {
			md5 = md5.toLowerCase();
		}
		this.md5 = md5;
	}

	public void setName(String name) {
		this.name = name;

		String fileExtension = null;
		if (name != null && name.length() > 0 && name.lastIndexOf(".") >= 0) {
			fileExtension = name
					.substring(name.lastIndexOf("."), name.length());
		}
		setFileExtension(fileExtension);
	}

	private void setSize(int size) {
		this.size = size;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "ArquivoCarregadoDto [name=" + name + ", fileExtension="
				+ fileExtension + ", size=" + size + ", type=" + type
				+ ", md5=" + md5 + "]";
	}
}