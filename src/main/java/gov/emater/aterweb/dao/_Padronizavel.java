package gov.emater.aterweb.dao;

import java.io.Serializable;

/**
 * Interface que marca lasses que tem o indicador padrao. DAO verificar� se tem
 * somente um objeto padr�o usando o metodo <code>getExamplo()</code>.
 * 
 * @author frazao
 * @since 1.0
 */
public interface _Padronizavel {
	/**
	 * Propriedade que representa o indicador padr�o.
	 */
	String P_IS_PADRAO = "isPadrao";

	/**
	 * Get objeto de exemplo configurado pelo m�todo
	 * <code>_CrudDao.setComoPadrao()</code>.
	 * 
	 * Se o m�todo retornar null nenhuma das entidades ser�o alteradas para n�o
	 * padr�o.
	 * 
	 * @see _CrudDao#setComoPadrao(_Padronizavel)
	 * @return objeto exemplo
	 */
	_ChavePrimaria<Serializable> getExemplo();

	/**
	 * Verifica se o objeto � o padr�o.
	 * 
	 * @return true quando o objeto � o �nico padr�o
	 */
	boolean isPadrao();

	/**
	 * Set o objeto padr�o.
	 * 
	 * @param isPadr�o
	 *            valor do marcador padr�o
	 * @see #getExamplo()
	 */
	void setPadrao(boolean isPadrao);

}
