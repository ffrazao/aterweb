package gov.emater.aterweb.dao;

import java.io.Serializable;

/**
 * Interface que define métodos padrão para uso de chave primária em entidades.
 * 
 * @param <CP>
 *            tipo de chave primária, deve ser serializável
 * 
 * @author frazao
 * @since 1.0
 */
public interface _ChavePrimaria<CP extends Serializable> extends Serializable {

	/**
	 * Propriedade que representa o id.
	 */
	String P_ID = "id";

	/**
	 * Get da chave primaria.
	 * 
	 * @return Chave Primaria
	 */
	CP getId();

	/**
	 * Set da chave primária.
	 * 
	 * @param id
	 *            chave primária
	 */
	void setId(CP id);
}
