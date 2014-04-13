package gov.emater.aterweb.dao;

import java.io.Serializable;

/**
 * Interface que marca lasses que tem o indicador padrao. DAO verificará se tem
 * somente um objeto padrão usando o metodo <code>getExamplo()</code>.
 * 
 * @author frazao
 * @since 1.0
 */
public interface _Padronizavel {
	/**
	 * Propriedade que representa o indicador padrão.
	 */
	String P_IS_PADRAO = "isPadrao";

	/**
	 * Get objeto de exemplo configurado pelo método
	 * <code>_CrudDao.setComoPadrao()</code>.
	 * 
	 * Se o método retornar null nenhuma das entidades serão alteradas para não
	 * padrão.
	 * 
	 * @see _CrudDao#setComoPadrao(_Padronizavel)
	 * @return objeto exemplo
	 */
	_ChavePrimaria<Serializable> getExemplo();

	/**
	 * Verifica se o objeto é o padrão.
	 * 
	 * @return true quando o objeto é o único padrão
	 */
	boolean isPadrao();

	/**
	 * Set o objeto padrão.
	 * 
	 * @param isPadrão
	 *            valor do marcador padrão
	 * @see #getExamplo()
	 */
	void setPadrao(boolean isPadrao);

}
