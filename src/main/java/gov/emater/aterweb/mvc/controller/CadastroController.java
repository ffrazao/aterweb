package gov.emater.aterweb.mvc.controller;

import gov.emater.aterweb.mvc.JsonResponse;

import org.springframework.validation.BindingResult;

/**
 * Interface padrão para controladores do tipo cadastro (inclusão, alteração,
 * exclusão e listagem)
 * 
 * @author frazao
 * 
 * @param <E>
 *            Entidade padrão do cadastro
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
	 * @return o endereço do cadastro
	 */
	String abrir();

	/**
	 * Efetua a exclusão de registros do controller
	 * 
	 * @param id
	 *            Chave Primária do registro a ser excluído
	 * @param bindingResult
	 *            Mensagens de erro ocorridas durante a exclusão do registro
	 */
	JsonResponse excluir(Integer id);

	/**
	 * Efetua o filtro de registros a serem exibidos na listagem dos dados
	 * 
	 * @param params
	 *            O dto utilizado como filtro de registros
	 * @param bindingResult
	 *            Mensagens de erro ocorrida durante a filtragem
	 * @return Lista de dados que será transformado em json
	 */
	JsonResponse filtrar(P params, BindingResult bindingResult);

	/**
	 * Prepara a exibição do cadastro
	 * 
	 * @return para o endereço do cadastro
	 */
	JsonResponse preparar();

	/**
	 * Restaura o valor de uma entidade. Utilizado para a exibição do formulário
	 * de inclusão e alteração de dados
	 * 
	 * @param id
	 *            Chave Primária da entidade a ser restaurada
	 * @return A entidade restaurada que será transforada em json
	 */
	JsonResponse restaurar(Integer id);

	/**
	 * Executa a inclusão (caso a chave primária da entidade seja nula) ou a
	 * alteração (caso a chave primária da entidade tenha sido informada).
	 * 
	 * @param e
	 *            entidade a ser salva
	 * @param bindingResult
	 *            mensagens de erro
	 */
	JsonResponse salvar(E e, BindingResult bindingResult);

}