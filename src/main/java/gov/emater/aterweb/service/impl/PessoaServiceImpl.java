// TODO Se o endereco já for uma propriedade rural então tomar cuidado para não estragar a informaçao
//      nao pode mudar de propriedade rural para náo propriedade rural aqui nesta pagina

package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.dao.ArquivoDao;
import gov.emater.aterweb.dao.LocalizacaoDao;
import gov.emater.aterweb.dao.MeioContatoEmailDao;
import gov.emater.aterweb.dao.MeioContatoEnderecoDao;
import gov.emater.aterweb.dao.MeioContatoTelefonicoDao;
import gov.emater.aterweb.dao.PessoaArquivoDao;
import gov.emater.aterweb.dao.PessoaDao;
import gov.emater.aterweb.dao.PessoaMeioContatoDao;
import gov.emater.aterweb.dao.PessoaRelacionamentoDao;
import gov.emater.aterweb.dao.PropriedadeRuralDao;
import gov.emater.aterweb.dao.PropriedadeRuralLocalizacaoDao;
import gov.emater.aterweb.dao.PublicoAlvoDao;
import gov.emater.aterweb.dao.RelacionamentoConfiguracaoDao;
import gov.emater.aterweb.dao.RelacionamentoDao;
import gov.emater.aterweb.dao.RelacionamentoFuncaoDao;
import gov.emater.aterweb.dao.RelacionamentoTipoDao;
import gov.emater.aterweb.model.Localizacao;
import gov.emater.aterweb.model.MeioContatoEmail;
import gov.emater.aterweb.model.MeioContatoEndereco;
import gov.emater.aterweb.model.MeioContatoTelefonico;
import gov.emater.aterweb.model.Pessoa;
import gov.emater.aterweb.model.PessoaArquivo;
import gov.emater.aterweb.model.PessoaFisica;
import gov.emater.aterweb.model.PessoaJuridica;
import gov.emater.aterweb.model.PessoaMeioContato;
import gov.emater.aterweb.model.PessoaRelacionamento;
import gov.emater.aterweb.model.PropriedadeRural;
import gov.emater.aterweb.model.PropriedadeRuralLocalizacao;
import gov.emater.aterweb.model.Relacionamento;
import gov.emater.aterweb.model.RelacionamentoConfiguracao;
import gov.emater.aterweb.model.domain.Confirmacao;
import gov.emater.aterweb.model.domain.MeioContatoTipo;
import gov.emater.aterweb.mvc.dto.Dto;
import gov.emater.aterweb.mvc.dto.PessoaCadFiltroDto;
import gov.emater.aterweb.service.ConstantesService;
import gov.emater.aterweb.service.PessoaService;
import gov.emater.aterweb.service.ServiceException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PessoaServiceImpl extends CrudServiceImpl<Pessoa, Integer, PessoaDao> implements PessoaService {

    @Autowired
    private ArquivoDao arquivoDao;

    @Autowired
    private ConstantesService constantesService;

    @Autowired
    private LocalizacaoDao localizacaoDao;

    @Autowired
    private MeioContatoEmailDao meioContatoEmailDao;

    @Autowired
    private MeioContatoEnderecoDao meioContatoEnderecoDao;

    @Autowired
    private MeioContatoTelefonicoDao meioContatoTelefonicoDao;

    @Autowired
    private PessoaArquivoDao pessoaArquivoDao;

    @Autowired
    private PessoaMeioContatoDao pessoaMeioContatoDao;

    @Autowired
    private PessoaRelacionamentoDao pessoaRelacionamentoDao;

    @Autowired
    private PropriedadeRuralDao propriedadeRuralDao;

    @Autowired
    private PropriedadeRuralLocalizacaoDao propriedadeRuralLocalizacaoDao;

    @Autowired
    private PublicoAlvoDao publicoAlvoDao;

    @Autowired
    private RelacionamentoConfiguracaoDao relacionamentoConfiguracaoDao;

    @Autowired
    private RelacionamentoTipoDao relacionamentoTipoDao;

    @Autowired
    private RelacionamentoDao relacionamentoDao;

    @Autowired
    private RelacionamentoFuncaoDao relacionamentoFuncaoDao;

    @Autowired
    public PessoaServiceImpl(PessoaDao dao) {
	super(dao);
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> detalhar(Integer id) {
	// variáveis de apoio
	List<Map<String, Object>> result = null;

	// captar público alvo
	Pessoa pessoa = getDao().restore(id);

	if (pessoa != null) {
	    result = new ArrayList<Map<String, Object>>();
	    Map<String, Object> linha = new HashMap<String, Object>();

	    linha.put("publicoAlvoConfirmacao", pessoa.getPublicoAlvoConfirmacao().name());

	    // verificar se a pessoa possui meios de contato
	    if (pessoa.getPessoaMeioContatos() != null) {
		// percorrer todos os meios de contato
		for (PessoaMeioContato pessoaMeioContato : pessoa.getPessoaMeioContatos()) {
		    // listar somente os meios de contato principais
		    if (pessoaMeioContato.getOrdem().equals(1)) {
			linha.put(pessoaMeioContato.getMeioContato().getMeioContatoTipo().name(), pessoaMeioContato.getMeioContato());
			result.add(linha);
		    }
		}
	    }
	}

	// TODO fazer consulta para devolver o endereço da principal foto da
	// pessoa

	return result;
    }

    private void fetch(Pessoa pessoa) {
	if (pessoa != null) {
	    if (pessoa.getPessoaMeioContatos() != null) {
		for (PessoaMeioContato pmc : pessoa.getPessoaMeioContatos()) {
		    if (pmc.getMeioContato() != null && pmc.getMeioContato().getMeioContatoTipo() != null) {
			switch (pmc.getMeioContato().getMeioContatoTipo()) {
			case EMA:
			    ((MeioContatoEmail) pmc.getMeioContato()).getId();
			    break;
			case END:
			    PropriedadeRural pr = ((MeioContatoEndereco) pmc.getMeioContato()).getPropriedadeRural();
			    if (pr != null && pr.getPropriedadeRuralLocalizacaos() != null) {
				pr.getPropriedadeRuralLocalizacaos().size();
			    }
			    break;
			case TEL:
			    ((MeioContatoTelefonico) pmc.getMeioContato()).getId();
			    break;
			default:
			    break;
			}
		    }
		}
	    }
	    if (pessoa.getPessoaRelacionamentos() != null) {
		List<PessoaRelacionamento> pessoaRelacionamentoList = new ArrayList<PessoaRelacionamento>();
		for (PessoaRelacionamento pessoaRelacionamento : pessoa.getPessoaRelacionamentos()) {
		    List<PessoaRelacionamento> r = pessoaRelacionamentoDao.restore(new PessoaRelacionamento(pessoaRelacionamento.getRelacionamento()));
		    for (PessoaRelacionamento pr : r) {
			if (pr.getPessoa() != null && !pr.getPessoa().getId().equals(pessoa.getId())) {
			    pessoaRelacionamentoList.add(pr);
			}
		    }
		}
		pessoa.setPessoaRelacionamentos(pessoaRelacionamentoList);
	    }
	    if (pessoa.getPessoaArquivoList() != null)
		pessoa.getPessoaArquivoList().size();
	}
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> filtrarByDto(Dto dto) {
	PessoaCadFiltroDto filtro = (PessoaCadFiltroDto) dto;

	if (filtro.getNome() != null) {
	    filtro.setNome(filtro.getNome().replaceAll("\\s", "%"));
	}

	List<?> result = getDao().restoreByDto(filtro);

	return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Pessoa restore(Integer id) {
	Pessoa result = super.restore(id);

	// restaurar dados subjacentes
	fetch(result);

	return result;
    }

    @SuppressWarnings({ "rawtypes" })
    @Override
    @Transactional
    public Pessoa save(@Valid Pessoa entidade) {

	if (entidade == null) {
	    throw new ServiceException("Pessoa não informada");
	}

	// verificar se é um registro existente
	Pessoa entidadeSalva = null;
	if (entidade.getId() != null && entidade.getId() > 0) {
	    // recuperar o registro do banco de dados
	    entidadeSalva = getDao().restore(entidade.getId());
	    if (entidadeSalva == null) {
		throw new ServiceException("Este registro já foi excluído do banco de dados");
	    }
	    // restaurar os dados que não serão modificados por este codigo
	    if (entidadeSalva.getUsuario() != null) {
		entidade.setUsuario(entidadeSalva.getUsuario());
		entidade.getUsuario().setPessoa(entidade);
	    }
	}

	// identificar as modificações ocorridas nos meios de contato
	Map<String, List> modificacoes = getModificacoes(entidade.getPessoaMeioContatos(), entidadeSalva == null ? null : entidadeSalva.getPessoaMeioContatos());

	// descartar os registros que foram excluidos
	for (Object obj : modificacoes.get(LISTA_REMOVIDO)) {
	    pessoaMeioContatoDao.delete((PessoaMeioContato) obj);
	}

	// preparar o registro para gravação
	if (entidade.getPessoaMeioContatos() != null) {
	    int ordem[] = new int[MeioContatoTipo.values().length];
	    List<Integer> ids = new ArrayList<Integer>();
	    for (PessoaMeioContato pmc : entidade.getPessoaMeioContatos()) {
		// criticar os dados
		if (pmc.getMeioContato() == null || pmc.getMeioContato().getMeioContatoTipo() == null) {
		    throw new ServiceException("Dados de Meio de Contato inválidos");
		}

		switch (pmc.getMeioContato().getMeioContatoTipo()) {
		case EMA:
		    pmc.setMeioContato(saveEmail((MeioContatoEmail) pmc.getMeioContato()));
		    break;
		case END:
		    pmc.setMeioContato(saveEndereco((MeioContatoEndereco) pmc.getMeioContato()));
		    break;
		case TEL:
		    pmc.setMeioContato(saveTelefonico((MeioContatoTelefonico) pmc.getMeioContato()));
		    break;
		default:
		    throw new ServiceException("Dados de Meio de Contato inválidos, tipo nao informado");
		}
		for (Integer id : ids) {
		    if (pmc.getMeioContato().getId().equals(id)) {
			throw new ServiceException("Meio de Contato cadastrado mais de uma vez");
		    }
		}
		ids.add(pmc.getMeioContato().getId());

		// definir a ordem do meio de contato
		pmc.setOrdem(++ordem[pmc.getMeioContato().getMeioContatoTipo().ordinal()]);
	    }
	}

	List<PessoaArquivo> pessoaArquivoList = entidade.getPessoaArquivoList();

	// salvar o registro principal
	entidade = super.save(entidade);

	if (Confirmacao.S.equals(entidade.getPublicoAlvoConfirmacao())) {
	    if (entidade.getPublicoAlvo() == null) {
		throw new ServiceException("Informações de Publico Alvo nao fornecida");
	    }
	    entidade.getPublicoAlvo().setId(entidade.getId());
	    entidade.getPublicoAlvo().setPessoa(entidade);
	    publicoAlvoDao.save(entidade.getPublicoAlvo());
	}

	// salvar todos os meios de contato
	if (entidade.getPessoaMeioContatos() != null) {
	    for (PessoaMeioContato pmc : entidade.getPessoaMeioContatos()) {
		// atribuir o registro à pessoa
		pmc.setPessoa(entidade);
		pessoaMeioContatoDao.save(pmc);
	    }
	}

	// salvar os arquivos da pessoa
	entidade.setPessoaArquivoList(pessoaArquivoList);
	if (entidade.getPessoaArquivoList() != null) {
	    for (PessoaArquivo pa : entidade.getPessoaArquivoList()) {
		pa.setPessoa(entidade);
		pa.setArquivo(arquivoDao.restore(pa.getArquivo().getId()));
		pessoaArquivoDao.save(pa);
	    }
	}

	// salvar os relacionamentos da pessoa
	modificacoes = getModificacoes(entidade.getPessoaRelacionamentos(), entidadeSalva == null ? null : entidadeSalva.getPessoaRelacionamentos());

	// descartar os registros que foram excluidos
	for (Object obj : modificacoes.get(LISTA_REMOVIDO)) {
	    PessoaRelacionamento pessoaRelacionamento = (PessoaRelacionamento) obj;
	    if (pessoaRelacionamento.getRelacionamento() != null) {
		List<PessoaRelacionamento> pessoaRelacionamentoList = pessoaRelacionamentoDao.restore(new PessoaRelacionamento(pessoaRelacionamento.getRelacionamento()));
		for (PessoaRelacionamento deleta : pessoaRelacionamentoList) {
		    pessoaRelacionamentoDao.delete(deleta);
		}
	    }
	}

	// TODO salvar os dados dos relacionamentos
	for (Object obj : modificacoes.get(LISTA_INSERIDO)) {
	    // preparar as pessoas do relacionamento
	    PessoaRelacionamento pessoaRelacionador = new PessoaRelacionamento();
	    PessoaRelacionamento pessoaRelacionado = (PessoaRelacionamento) obj;

	    // restaurar dados essenciais
	    pessoaRelacionado.getRelacionamento().setRelacionamentoTipo(relacionamentoTipoDao.restore(pessoaRelacionado.getRelacionamento().getRelacionamentoTipo().getId()));
	    pessoaRelacionado.setRelacionamentoFuncao(relacionamentoFuncaoDao.restore(pessoaRelacionado.getRelacionamentoFuncao().getId()));

	    // construir a unidade do relacionamento
	    Relacionamento relacionamento = relacionamentoDao.create(new Relacionamento(pessoaRelacionado.getRelacionamento().getRelacionamentoTipo()));

	    // captar a funcao no relacionamento oposta
	    RelacionamentoConfiguracao relacionamentoConfiguracao = relacionamentoConfiguracaoDao.restore(new RelacionamentoConfiguracao(pessoaRelacionado.getRelacionamento().getRelacionamentoTipo(), pessoaRelacionado.getRelacionamentoFuncao())).get(0);

	    // construir dados do relacionador
	    pessoaRelacionador.setRelacionamentoFuncao(relacionamentoConfiguracao.getRelacionadorFuncao());
	    pessoaRelacionador.setRelacionamento(relacionamento);
	    pessoaRelacionador.setPessoa(entidade);
	    pessoaRelacionador.setNome(entidade.getNome());
	    if (entidade instanceof PessoaFisica) {
		pessoaRelacionador.setCpfCnpj(((PessoaFisica) entidade).getCpf());
	    } else if (entidade instanceof PessoaJuridica) {
		pessoaRelacionador.setCpfCnpj(((PessoaJuridica) entidade).getCnpj());
	    } else {
		pessoaRelacionador.setCpfCnpj(null);
	    }

	    // construir dados do relacionado
	    pessoaRelacionado.setRelacionamento(relacionamento);
	    if (pessoaRelacionado.getPessoa() != null && pessoaRelacionado.getPessoa().getId() != null) {
		Pessoa relacionado = getDao().restore(pessoaRelacionado.getPessoa().getId());
		pessoaRelacionado.setPessoa(relacionado);
		pessoaRelacionado.setNome(relacionado.getNome());
		// atualizar campos Fake
		if (relacionado instanceof PessoaFisica) {
		    pessoaRelacionado.setCpfCnpj(((PessoaFisica) relacionado).getCpf());
		} else if (relacionado instanceof PessoaJuridica) {
		    pessoaRelacionado.setCpfCnpj(((PessoaJuridica) relacionado).getCnpj());
		} else {
		    pessoaRelacionado.setCpfCnpj(null);
		}
	    } else if (pessoaRelacionado.getNome() == null || pessoaRelacionado.getNome().trim().length() == 0) {
		throw new ServiceException("Nome do relacionado nao pode ser nulo");
	    }

	    pessoaRelacionamentoDao.create(pessoaRelacionador);
	    pessoaRelacionamentoDao.create(pessoaRelacionado);
	}

	return restore(entidade.getId());
    }

    @Transactional
    private MeioContatoEmail saveEmail(@Valid MeioContatoEmail entidade) {
	// criticar os dados informados
	if (entidade == null) {
	    throw new ServiceException("Dados invalidos");
	}
	if (entidade.getEmail() == null || entidade.getEmail().trim().length() == 0) {
	    throw new ServiceException("Email não informado");
	}
	entidade.setMeioContatoTipo(MeioContatoTipo.EMA);
	List<MeioContatoEmail> entidadeSalva = meioContatoEmailDao.restore(new MeioContatoEmail(entidade.getEmail()));
	if (entidadeSalva != null && entidadeSalva.size() == 1) {
	    entidade = entidadeSalva.get(0);
	}
	return meioContatoEmailDao.save(entidade);
    }

    @Transactional
    private MeioContatoEndereco saveEndereco(@Valid MeioContatoEndereco entidade) {
	// INICIO critica dos dados
	if (entidade == null) {
	    throw new ServiceException("Dados invalidos");
	}
	if (entidade.getDescricao() == null || entidade.getDescricao().trim().length() == 0) {
	    throw new ServiceException("Endereço não informado");
	}
	if (entidade.getLocalizacao() == null || entidade.getLocalizacao().getId() == null) {
	    throw new ServiceException("A Cidade do Endereço não pode ser nula");
	}

	// verificar se ja existe o endereco
	MeioContatoEndereco entidadeSalva = null;
	if (entidade.getId() != null && entidade.getId() > 0) {
	    entidadeSalva = meioContatoEnderecoDao.restore(entidade.getId());
	    if (entidadeSalva == null) {
		throw new ServiceException("Este registro já foi excluído do banco de dados");
	    }
	}

	// verificar se há outro endereço com a mesma descrição e cidade
	List<MeioContatoEndereco> pesquisaEndereco = meioContatoEnderecoDao.restore(new MeioContatoEndereco(entidade.getDescricao(), entidade.getLocalizacao()));
	if (pesquisaEndereco != null) {
	    if (pesquisaEndereco.size() > 1) {
		throw new ServiceException(String.format("Foi(ram) encontrado(s) mais de um registro com o mesmo endereço/ localizacao [%s, %d]. Informe ao administrador do sistema", entidade.getDescricao(), entidade.getLocalizacao().getId()));
	    } else if (pesquisaEndereco.size() == 1) {
		entidade.setId(pesquisaEndereco.get(0).getId());
	    }
	}

	// verificar se há outro endereço com as mesmas coordenados latitude e
	// longitude
	if (entidade.getId() != null && entidade.getId() > 0) {
	    if (entidade.getLatitude() != null || entidade.getLongitude() != null) {
		pesquisaEndereco = meioContatoEnderecoDao.restore(new MeioContatoEndereco(entidade.getLatitude(), entidade.getLongitude()));
		if (pesquisaEndereco != null) {
		    String msg = String.format("Foi encontrado mais de um registro com a mesma coordenada de latitude/longitude [%d, %d]. Informe ao administrador do sistema", entidade.getLatitude(), entidade.getLongitude());
		    if (pesquisaEndereco.size() == 0 || (pesquisaEndereco.size() <= 1 && entidade.getId().equals(pesquisaEndereco.get(0).getId()))) {
			msg = null;
		    }
		    if (msg != null) {
			throw new ServiceException(msg);
		    }
		}
	    }
	}
	// FIM critica dos dados

	// INICIO preparar a informação
	entidade.setMeioContatoTipo(MeioContatoTipo.END);
	entidade.setLocalizacao(localizacaoDao.restore(entidade.getLocalizacao().getId()));
	if (entidade.getPropriedadeRuralConfirmacao() == null) {
	    entidade.setPropriedadeRuralConfirmacao(Confirmacao.N);
	}

	// preservar informações da propriedade rural
	PropriedadeRural propriedadeRural = entidade.getPropriedadeRural();

	// salvar o endereço
	entidade = meioContatoEnderecoDao.save(entidade);

	// restaurar informações da propriedade rural
	if (propriedadeRural != null) {
	    propriedadeRural.setId(entidade.getId());
	    propriedadeRural.setMeioContatoEndereco(entidade);
	    entidade.setPropriedadeRural(propriedadeRural);
	}

	// salvar os dados da propriedade rural
	if (Confirmacao.S.equals(entidade.getPropriedadeRuralConfirmacao())) {
	    entidade.setPropriedadeRural(savePropriedadeRural(entidade.getPropriedadeRural()));
	}

	return meioContatoEnderecoDao.restore(entidade.getId());
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    private PropriedadeRural savePropriedadeRural(@Valid PropriedadeRural entidade) {
	if (entidade == null || entidade.getMeioContatoEndereco() == null || entidade.getMeioContatoEndereco().getId() == null) {
	    throw new ServiceException("Dados da Propriedade Rural não informados.");
	}
	if (entidade.getPropriedadeRuralLocalizacaos() == null || entidade.getPropriedadeRuralLocalizacaos().size() < 2) {
	    throw new ServiceException("Dados de Comunidade e Bacia Hidrografica não informados.");
	}

	// preservar algumas informações
	MeioContatoEndereco meioContatoEndereco = entidade.getMeioContatoEndereco();
	List<PropriedadeRuralLocalizacao> propriedadeRuralLocalizacaoList = entidade.getPropriedadeRuralLocalizacaos();

	// recuperar as localizações da propriedade rural
	for (PropriedadeRuralLocalizacao prl : propriedadeRuralLocalizacaoList) {
	    List<PropriedadeRuralLocalizacao> resultado = propriedadeRuralLocalizacaoDao.restore(new PropriedadeRuralLocalizacao(entidade, prl.getLocalizacao()));
	    if (resultado.size() != 1) {
		throw new ServiceException(String.format("Localidade não encontrada [%d].", prl.getLocalizacao().getId()));
	    }
	    prl.setId(resultado.get(0).getId());
	}

	// restaurar a entidade salva
	boolean novo = true;
	if (entidade.getId() != null && entidade.getId() > 0) {
	    PropriedadeRural entidadeSalva = propriedadeRuralDao.restoreSilencioso(entidade.getId());
	    if (entidadeSalva != null) {
		entidade = entidadeSalva;
		novo = false;
	    }
	}

	// restaurar as informações salvas
	entidade.setId(meioContatoEndereco.getId());
	meioContatoEndereco.setPropriedadeRural(entidade);
	entidade.setMeioContatoEndereco(meioContatoEndereco);

	// salvar dados da propriedade rural
	if (novo) {
	    entidade = propriedadeRuralDao.create(entidade);
	} else {
	    entidade = propriedadeRuralDao.update(entidade);
	}

	// identificar as modificações ocorridas nos meios de contato
	Map<String, List> modificacoes = getModificacoes(propriedadeRuralLocalizacaoList, entidade.getPropriedadeRuralLocalizacaos());

	// descartar os registros que foram excluidos
	for (Object obj : modificacoes.get(LISTA_REMOVIDO)) {
	    propriedadeRuralLocalizacaoDao.delete((PropriedadeRuralLocalizacao) obj);
	}
	entidade.setPropriedadeRuralLocalizacaos(propriedadeRuralLocalizacaoList);

	// salvar as comunidades e bacias hidrograficas
	Localizacao comunidade = null;
	Localizacao baciaHidrografica = null;
	for (PropriedadeRuralLocalizacao prl : entidade.getPropriedadeRuralLocalizacaos()) {
	    if (prl.getLocalizacao() == null || prl.getLocalizacao().getId() == null) {
		throw new ServiceException("Comunidade ou Bacia Hidrografica inválida.");
	    }

	    // preparar o registro
	    prl.setPropriedadeRural(entidade);
	    prl.setLocalizacao(localizacaoDao.restore(prl.getLocalizacao().getId()));

	    propriedadeRuralLocalizacaoDao.save(prl);

	    // identificar informações
	    if (prl.getLocalizacao().getLocalizacaoTipo().getId().equals(constantesService.getComunidadeLocalizacaoTipo().getId())) {
		comunidade = prl.getLocalizacao();
	    } else if (prl.getLocalizacao().getLocalizacaoTipo().getId().equals(constantesService.getBaciaHidrograficaLocalizacaoTipo().getId())) {
		baciaHidrografica = prl.getLocalizacao();
	    }
	}
	if (comunidade == null || baciaHidrografica == null) {
	    throw new ServiceException("Propriedade sem identificacao de Comunidade e/ou Bacia Hidrográfica.");
	}
	return entidade;
    }

    @Transactional
    private MeioContatoTelefonico saveTelefonico(@Valid MeioContatoTelefonico entidade) {
	// criticar os dados informados
	if (entidade == null) {
	    throw new ServiceException("Dados invalidos");
	}
	if (entidade.getNumero() == null || entidade.getNumero().trim().length() == 0) {
	    throw new ServiceException("Número do telefone não informado");
	}
	entidade.setMeioContatoTipo(MeioContatoTipo.TEL);
	List<MeioContatoTelefonico> entidadeSalva = meioContatoTelefonicoDao.restore(new MeioContatoTelefonico(entidade.getNumero()));
	if (entidadeSalva != null && entidadeSalva.size() == 1) {
	    entidade = entidadeSalva.get(0);
	}
	return meioContatoTelefonicoDao.save(entidade);
    }
}