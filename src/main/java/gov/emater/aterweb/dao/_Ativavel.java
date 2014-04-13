package gov.emater.aterweb.dao;

/**
 * Marca se uma classe pode ser habilitada ou desabilitada
 * 
 * @author frazao
 * @since 1.0
 */
public interface _Ativavel {

	/**
	 * Representa o indicador ativo
	 */
	String P_IS_ATIVO = "isAtivo";

	/**
	 * Verifica se esta ativo
	 * 
	 * @return true se esta ativo
	 */
	boolean isAtivo();

	/**
	 * Set com o marcador de ativo
	 * 
	 * @param ativo
	 *            valor do marcador
	 */
	void setAtivo(boolean ativo);
}
