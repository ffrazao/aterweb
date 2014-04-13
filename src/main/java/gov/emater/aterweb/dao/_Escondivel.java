package gov.emater.aterweb.dao;

/**
 * Marca se uma classe nao pode ser excluida. Se alguem chamar este metodo a
 * classe sera escondida ao inves de deletada.
 * 
 * @author frazao
 * @since 1.0
 */
public interface _Escondivel {

	/**
	 * Representa o marcador escondivel
	 */
	String P_IS_ESCONDIDO = "isEscondivel";

	/**
	 * Verifica se o objeto esta escondido
	 * 
	 * @return true se estiver
	 */
	boolean isEscondido();

	/**
	 * Set o objeto como escondivel
	 * 
	 * @param isEcondivel
	 *            valor do marcador
	 */
	void setEscondido(boolean isEscondivel);
}
