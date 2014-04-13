package gov.emater.aterweb.dao;

/**
 * Interface que marca uma classe como sendo herd�vel. H� um n�mero ilimitado de
 * n�veis. Os pais devem ter o mesmo tipo como filho.
 * 
 * @param <E>
 *            pai do tipo, deve ser do mesmo tipo do filho
 * 
 * @author frazao
 * @since 1.0
 */
public interface _Herdavel<E> {

	/**
	 * Propriedade que representa o pai.
	 */
	String P_PAI = "pai";

	/**
	 * Get objeto do pai.
	 * 
	 * @return pai pai do objeto
	 */
	E getPai();

	/**
	 * Set o objeto que representa o pai. Null significa que � o nivel raiz de
	 * objeto (ou seja, objetos sem pai).
	 * 
	 * @param pai
	 *            pai do objeto
	 */
	void setPai(E pai);
}