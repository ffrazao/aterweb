package gov.emater.aterweb.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

/**
 * Define os métodos genéricos de todo DAO (Data Access Object) baseado no
 * padrão CRUD (Create, Restore, Update and Delete). Implementa também outros
 * métodos utilitarios baseado em interfaces de apoio
 * 
 * @author frazao
 * 
 */
public interface _CrudDao<E extends _ChavePrimaria<CP>, CP extends Serializable> extends _Dao {

    String LIKE_MASK = "%%%s%%";

    /**
     * Cria um objeto persistido
     * 
     * @param objeto
     *            objeto persistido
     */
    E create(E e);

    /**
     * Remove todos os objetos, incluindo o padrão.
     * 
     * Se a entidade implementar <code>_Escondivel</code> então esta será
     * escondida ao invés de excluída do banco.
     * 
     * @see _Escondivel
     */
    void delete();

    /**
     * Remove um objeto pela id. Verifica se o objeto é o único padrão
     * 
     * Se a entidade implementar <code>_Escondivel</code> então esta será
     * escondida ao invés de excluída do banco.
     * 
     * @param id
     *            chave primaria do objeto
     * @throws UnsupportedOperationException
     *             - Se a entidade for a única padrão
     * @see _Escondivel
     */
    void delete(CP id) throws UnsupportedOperationException;

    /**
     * Remove um grupo de objetos pela id. Verifica se o objeto é o único padrão
     * 
     * Se a entidade implementar <code>_Escondivel</code> então esta será
     * escondida ao invés de excluída do banco.
     * 
     * @param ids
     *            chaves primarias de objetos
     * @throws UnsupportedOperationException
     *             - Se houver uma entidade que for a única padrão
     * @see {@link #delete(_ChavePrimaria)}
     */
    void delete(@SuppressWarnings("unchecked") CP... ids) throws UnsupportedOperationException;

    /**
     * Remove um objeto. Verifica se o objeto é o único padrão
     * 
     * Chama o método <Code>{@link #delete(_ChavePrimaria)}</Code>
     * 
     * @param e
     *            objeto
     * @throws UnsupportedOperationException
     *             - Se a entidade for a única padrão
     * @see {@link #delete(_ChavePrimaria)}
     */
    void delete(E e) throws UnsupportedOperationException;

    /**
     * Remove um grupo de objetos. Verifica se o objeto é o único padrão
     * 
     * Chama o método <Code>{@link #delete(_ChavePrimaria)}</Code>
     * 
     * @param e
     *            objeto
     * @throws UnsupportedOperationException
     *             - Se a entidade for a única padrão
     * @see {@link #delete(_ChavePrimaria)}
     */
    void delete(@SuppressWarnings("unchecked") E... e) throws UnsupportedOperationException;

    /**
     * Grava no banco de dados tudo que esta pendente de operação e limpa-os.
     */
    void flushAndClear();

    /**
     * Verifica se o DAO representa uma implementação <code>_Ativavel</ code>.
     * 
     * @return true se é
     * @see _Ativavel
     */
    public boolean isAtivavel();

    /**
     * Verifica se o DAO representa uma implementação <code>_Escondivel</ code>.
     * 
     * @return true se é
     * @see _Escondivel
     */
    public boolean isEscondivel();

    /**
     * Verifica se o DAO representa uma implementação <code>_Herdavel</ code>.
     * 
     * @return true se é
     * @see _Herdavel
     */
    public boolean isHerdavel();

    /**
     * Verifica se o DAO representa uma implementação
     * <code>_Padronizavel</ code>.
     * 
     * @return true se é
     * @see _Padronizavel
     */
    public boolean isPadronizavel();

    /**
     * Refresh um objeto persistido que pode ter sido alterado em outra thread
     * ou transação.
     * 
     * @param objeto
     *            objeto transiente
     */
    void refresh(E objeto);

    /**
     * Restaura todos os objetos persistidos.
     * 
     * @return lista de objetos
     */
    List<E> restore();

    /**
     * Restaura todos objetos persistidos com o pai informado
     * 
     * Se o pai for nulo, o metodo retorna a raiz de objetos (sem pai).
     * 
     * @param pai
     *            objetos pai
     * @return lista de objetos
     */
    List<E> restore(_Herdavel<E> pai);

    /**
     * Restaura um objeto persistido que possue a chave primária informada.
     * 
     * @param id
     *            chave primária do objeto
     * @return objeto persistido
     * @throws EntityNotFoundException
     *             - Se não encontrado
     */
    E restore(CP id) throws EntityNotFoundException;

    /**
     * Restaura objetos persistidos que possue alguma das chaves primárias
     * informadas.
     * 
     * Retorna nulo se não encontrado.
     * 
     * @param ids
     *            chaves primárias de objeto
     * @return objetos persistidos
     */
    List<E> restore(@SuppressWarnings("unchecked") CP... ids);

    /**
     * Remove a entidade do controle do Módulo de Persistência (Hibernate)
     * 
     * @param o
     *            objeto a ser removido do controle do Módulo de Persistência
     */
    void deatach(E entidade);

    /**
     * Restaura objetos comparando-o com o exemplo usando todos as propriedades
     * não nulas.
     * 
     * Propriedades <code>_ChavePrimaria.id</code>,
     * <code>_Padronizavel.isPadrao</code>, <code>_Ativavel.isAtivo</code> and
     * <code>_Escondivel.isEscondido</code> são ignoradas.
     * 
     * @param examplo
     *            objeto de exemplo
     * @return lista de objetos
     */
    List<E> restore(E exemplo);

    /**
     * Restaura todos objetos persistidos a relação propriedade valor informado
     * 
     * @param params
     *            parametros de pesquisa
     * @return lista de objetos
     */
    List<?> restore(Map<String, Object> params);

    /**
     * Restaura um objeto persistido que possue a chave primária informada.
     * 
     * Retorna nulo se não encontrado.
     * 
     * @param id
     *            chave primária do objeto
     * @return objeto persistido
     */
    E restoreSilencioso(CP id);

    /**
     * Salva todas as alterações feitas em um objeto
     * 
     * @param objeto
     *            objeto persistido
     */
    E save(E e);

    /**
     * Salva todas as alterações feitas em um conjunto de objetos
     * 
     * @param objetos
     *            objetos persistidos
     */
    void save(@SuppressWarnings("unchecked") E... e);

    /**
     * Set o objeto como o unico padrao.
     * 
     * Verifica se ha somente um objeto padrao - utiliza os métodos
     * <code>_Padronizavel#getExemplo()</code> e <code>#restore(E)</code> para
     * pegar objetos e marcalos como nao padrão. É possível ter mais de um
     * objeto padrão manipulando o método
     * <code>_Padronizavel#getExemplo()</code>.
     * 
     * @param objeto
     *            objeto padrao
     * @see _Padronizavel#getExemplo()
     * @see #restore(E)
     */
    void setComoPadrao(_Padronizavel objeto);

    /**
     * Atualiza um objeto persistido
     * 
     * @param objeto
     *            objeto persistido
     */
    E update(E e);

}