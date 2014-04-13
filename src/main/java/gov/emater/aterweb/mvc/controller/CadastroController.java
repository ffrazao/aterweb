package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.mvc.JsonResponse;

import org.springframework.validation.BindingResult;

/**
 * Interface padr�o para controladores do tipo cadastro (inclus�o, altera��o,
 * exclus�o e listagem)
 * 
 * @author frazao
 * 
 * @param <E>
 *            Entidade padr�o do cadastro
 * @param <P>
 *            DTO (Data Transformation Object) utilizado para o filtro do
 *            cadastro
 */
public interface CadastroController<E, P> {

	String ACAO_DETALHAR = "detalhar";

	String ACAO_EXCLUIR = "excluir";

	String ACAO_PREPARAR = "preparar";

	String ACAO_FILTRAR = "filtrar";

	String ACAO_RESTAURAR = "restaurar";

	String ACAO_SALVAR = "salvar";

	String VAR_FILTRO = "filtro";

	String VAR_LISTA = "lista";

	String VAR_REGISTRO = "registro";

	/**
	 * Abrir a tela principal do cadastro
	 * 
	 * @return o endere�o do cadastro
	 */
	String abrir();

	/**
	 * Efetua a exclus�o de registros do controller
	 * 
	 * @param id
	 *            Chave Prim�ria do registro a ser exclu�do
	 * @param bindingResult
	 *            Mensagens de erro ocorridas durante a exclus�o do registro
	 */
	JsonResponse excluir(Integer id);

	/**
	 * Efetua o filtro de registros a serem exibidos na listagem dos dados
	 * 
	 * @param params
	 *            O dto utilizado como filtro de registros
	 * @param bindingResult
	 *            Mensagens de erro ocorrida durante a filtragem
	 * @return Lista de dados que ser� transformado em json
	 */
	JsonResponse filtrar(P params, BindingResult bindingResult);

	/**
	 * Prepara a exibi��o do cadastro
	 * 
	 * @return para o endere�o do cadastro
	 */
	JsonResponse preparar();

	/**
	 * Restaura o valor de uma entidade. Utilizado para a exibi��o do formul�rio
	 * de inclus�o e altera��o de dados
	 * 
	 * @param id
	 *            Chave Prim�ria da entidade a ser restaurada
	 * @return A entidade restaurada que ser� transforada em json
	 */
	JsonResponse restaurar(Integer id);

	/**
	 * Executa a inclus�o (caso a chave prim�ria da entidade seja nula) ou a
	 * altera��o (caso a chave prim�ria da entidade tenha sido informada).
	 * 
	 * @param e
	 *            entidade a ser salva
	 * @param bindingResult
	 *            mensagens de erro
	 */
	JsonResponse salvar(E e, BindingResult bindingResult);

}