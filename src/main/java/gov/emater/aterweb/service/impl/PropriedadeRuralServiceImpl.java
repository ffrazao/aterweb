package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.dao.ArquivoDao;
import gov.emater.aterweb.dao.LocalizacaoDao;
import gov.emater.aterweb.dao.MeioContatoEnderecoDao;
import gov.emater.aterweb.dao.PropriedadeRuralArquivoDao;
import gov.emater.aterweb.dao.PropriedadeRuralDao;
import gov.emater.aterweb.dao.PropriedadeRuralLocalizacaoDao;
import gov.emater.aterweb.model.MeioContatoEndereco;
import gov.emater.aterweb.model.PropriedadeRural;
import gov.emater.aterweb.model.PropriedadeRuralArquivo;
import gov.emater.aterweb.model.PropriedadeRuralLocalizacao;
import gov.emater.aterweb.model.domain.Confirmacao;
import gov.emater.aterweb.model.domain.MeioContatoTipo;
import gov.emater.aterweb.mvc.dto.Dto;
import gov.emater.aterweb.service.PropriedadeRuralService;
import gov.emater.aterweb.service.ServiceException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PropriedadeRuralServiceImpl extends CrudServiceImpl<PropriedadeRural, Integer, PropriedadeRuralDao> implements PropriedadeRuralService {

    @Autowired
    private ArquivoDao arquivoDao;

    @Autowired
    private LocalizacaoDao localizacaoDao;

    @Autowired
    private MeioContatoEnderecoDao meioContatoEnderecoDao;

    @Autowired
    private PropriedadeRuralArquivoDao propriedadeRuralArquivoDao;

    @Autowired
    private PropriedadeRuralLocalizacaoDao propriedadeRuralLocalizacaoDao;

    @Autowired
    public PropriedadeRuralServiceImpl(PropriedadeRuralDao dao) {
	super(dao);
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> detalhar(Integer id) {
	// variáveis de apoio
	List<Map<String, Object>> result = null;

	// captar público alvo
	PropriedadeRural entidade = getDao().restore(id);

	if (entidade != null) {
	    result = new ArrayList<Map<String, Object>>();
	    // Map<String, Object> linha = new HashMap<String, Object>();

	    // linha.put("publicoAlvoConfirmacao", entidade
	    // .getPublicoAlvoConfirmacao().name());
	    //
	    // // verificar se a pessoa possui meios de contato
	    // if (entidade.getPessoaMeioContatos() != null) {
	    // // percorrer todos os meios de contato
	    // for (PessoaMeioContato pessoaMeioContato : entidade
	    // .getPessoaMeioContatos()) {
	    // // listar somente os meios de contato principais
	    // if (pessoaMeioContato.getOrdem().equals(1)) {
	    // linha.put(pessoaMeioContato.getMeioContato()
	    // .getMeioContatoTipo().name(),
	    // pessoaMeioContato.getMeioContato());
	    // result.add(linha);
	    // }
	    // }
	    // }
	}

	// TODO fazer consulta para devolver o endereço da principal foto da
	// pessoa

	return result;
    }

    private void fetch(PropriedadeRural entidade) {
	if (entidade != null) {
	    entidade.getMeioContatoEndereco().getId();
	    if (entidade.getPropriedadeRuralArquivoList() != null)
		entidade.getPropriedadeRuralArquivoList().size();
	    if (entidade.getPropriedadeRuralLocalizacaos() != null)
		entidade.getPropriedadeRuralLocalizacaos().size();

	    // if (entidade.getPessoaMeioContatos() != null)
	    // entidade.getPessoaMeioContatos().size();
	    // if (entidade.getPessoaRelacionamentos() != null)
	    // entidade.getPessoaRelacionamentos().size();
	}
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> filtrarByDto(Dto dto) {
	// PropriedadeRuralCadFiltroDto filtro = (PropriedadeRuralCadFiltroDto)
	// dto;

	//
	// // Converter o DTO em parâmetros
	// Map<String, Object> params = new HashMap<String, Object>();
	// String comando = "selord";
	// if (filtro.getNome() != null && filtro.getNome().trim().length() > 0)
	// {
	// comando = "selwheordlike";
	// }
	// params.put(comando + "|nome", filtro.getNome());
	// comando = "sel";
	// // if (filtro.getTipoPessoa() != null) {
	// // comando = "selwheeq";
	// // }
	// // params.put(comando + "|pessoaTipo", filtro.getNome());
	//
	// params.put("sel|id", "");
	// // params.put("sel|cpf", "");
	// // params.put("sel|cnpj", "");
	//
	// List<?> result = (List<?>) restoreByParams(params);
	//
	// for (Map<String, PropriedadeRural> entidade : (List<Map<String,
	// PropriedadeRural>>) result) {
	// fetch(entidade.get("this"));
	// }
	//
	// return result;
	return getDao().restore();
    }

    @Override
    @Transactional(readOnly = true)
    public PropriedadeRural restore(Integer id) {
	PropriedadeRural result = super.restore(id);

	// restaurar dados subjacentes
	fetch(result);

	return result;
    }

    @SuppressWarnings("rawtypes")
    @Override
    @Transactional
    public PropriedadeRural save(PropriedadeRural entidade) {
	// TODO fazer esta rotina com o Adler. Precisa de uma janela de busca
	// através da página. Permitir mesclar informações
	if (entidade == null || entidade.getMeioContatoEndereco() == null) {
	    throw new ServiceException("Dados da Propriedade Rural não informados.");
	}
	if (entidade.getPropriedadeRuralLocalizacaos() == null || entidade.getPropriedadeRuralLocalizacaos().size() < 2) {
	    throw new ServiceException("Dados de Comunidade e Bacia Hidrografica não informados.");
	}

	// preservar algumas informações
	MeioContatoEndereco meioContatoEndereco = entidade.getMeioContatoEndereco();
	List<PropriedadeRuralLocalizacao> propriedadeRuralLocalizacaoList = entidade.getPropriedadeRuralLocalizacaos();
	List<PropriedadeRuralArquivo> propriedadeRuralArquivoList = entidade.getPropriedadeRuralArquivoList();

	// recuperar e preparar a entidade do endereco da propriedade
	if (meioContatoEndereco.getDescricao() == null || meioContatoEndereco.getDescricao().trim().length() == 0) {
	    throw new ServiceException("Endereço não informado");
	}
	if (meioContatoEndereco.getLocalizacao() == null || meioContatoEndereco.getLocalizacao().getId() == null) {
	    throw new ServiceException("A Cidade do Endereço não pode ser nula");
	}

	// verificar se é um registro existente
	PropriedadeRural entidadeSalva = null;
	if (entidade.getId() != null && entidade.getId() > 0) {
	    // recuperar o registro do banco de dados
	    entidadeSalva = getDao().restore(entidade.getId());
//	    if (entidadeSalva == null) {
//		throw new ServiceException("Este registro já foi excluído do banco de dados");
//	    }
	}

	// verificar se há outro endereço com a mesma descrição e cidade
	List<MeioContatoEndereco> pesquisaEndereco = meioContatoEnderecoDao.restore(new MeioContatoEndereco(meioContatoEndereco.getDescricao(), meioContatoEndereco.getLocalizacao()));
	if (pesquisaEndereco != null) {
	    if (pesquisaEndereco.size() > 1) {
		throw new ServiceException(String.format("Foi(ram) encontrado(s) zero ou mais de um registro com o mesmo endereço/ localizacao [%s, %d]. Informe ao administrador do sistema", meioContatoEndereco.getDescricao(), meioContatoEndereco.getLocalizacao().getId()));
	    } else if (pesquisaEndereco.size() == 1) {
		entidade.setId(pesquisaEndereco.get(0).getId());
	    }
	}

	meioContatoEndereco.setMeioContatoTipo(MeioContatoTipo.END);
	meioContatoEndereco.setLocalizacao(localizacaoDao.restore(meioContatoEndereco.getLocalizacao().getId()));
	meioContatoEndereco.setPropriedadeRuralConfirmacao(Confirmacao.S);
	meioContatoEndereco.setPropriedadeRural(entidade);

	if (entidadeSalva == null) {
	    meioContatoEndereco = meioContatoEnderecoDao.create(meioContatoEndereco);
	} else {
	    meioContatoEndereco = meioContatoEnderecoDao.update(meioContatoEndereco);
	}
	entidade.setId(meioContatoEndereco.getId());
	meioContatoEndereco.setPropriedadeRural(entidade);
	entidade.setMeioContatoEndereco(meioContatoEndereco);

	// identificar as modificações ocorridas nos meios de contato
	Map<String, List> modificacoes = getModificacoes(entidade.getPropriedadeRuralArquivoList(), entidadeSalva == null ? null : entidadeSalva.getPropriedadeRuralArquivoList());

	// descartar os registros que foram excluidos
	for (Object obj : modificacoes.get(LISTA_REMOVIDO)) {
	    propriedadeRuralArquivoDao.delete((PropriedadeRuralArquivo) obj);
	}
	
	modificacoes = getModificacoes(entidade.getPropriedadeRuralLocalizacaos(), entidadeSalva == null ? null : entidadeSalva.getPropriedadeRuralLocalizacaos());

	// descartar os registros que foram excluidos
	for (Object obj : modificacoes.get(LISTA_REMOVIDO)) {
	    propriedadeRuralLocalizacaoDao.delete((PropriedadeRuralLocalizacao) obj);
	}
	
	// salvar a entidade principal
	entidade = super.save(entidade);

	// registrar os arquivos da propriedade rural
	entidade.setPropriedadeRuralArquivoList(propriedadeRuralArquivoList);
	if (entidade.getPropriedadeRuralArquivoList() != null) {
	    for (PropriedadeRuralArquivo pra : entidade.getPropriedadeRuralArquivoList()) {
		pra.setPropriedadeRural(entidade);
		if (pra.getArquivo().getId() == null) {
		    throw new IllegalStateException("Código do arquivo nao informado");
		}
		pra.setArquivo(arquivoDao.restore(pra.getArquivo().getId()));
		propriedadeRuralArquivoDao.save(pra);
	    }
	}

	// registrar as localidades da propriedade rural
	entidade.setPropriedadeRuralLocalizacaos(propriedadeRuralLocalizacaoList);
	if (entidade.getPropriedadeRuralLocalizacaos() != null) {
	    for (PropriedadeRuralLocalizacao prl : entidade.getPropriedadeRuralLocalizacaos()) {
		prl.setPropriedadeRural(entidade);
		if (prl.getLocalizacao().getId() == null) {
		    throw new IllegalStateException("Código da localizacao nao informado");
		}
		prl.setLocalizacao(localizacaoDao.restore(prl.getLocalizacao().getId()));
		propriedadeRuralLocalizacaoDao.save(prl);
	    }
	}
	
	return restore(entidade.getId());
    }
}