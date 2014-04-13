package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.dao.PessoaGrupoDao;
import gov.emater.aterweb.dao.PessoaGrupoTipoDao;
import gov.emater.aterweb.dao.PessoaRelacionamentoDao;
import gov.emater.aterweb.dao.RelacionamentoConfiguracaoDao;
import gov.emater.aterweb.dao.RelacionamentoDao;
import gov.emater.aterweb.model.Pessoa;
import gov.emater.aterweb.model.PessoaFisica;
import gov.emater.aterweb.model.PessoaGrupo;
import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.model.PessoaJuridica;
import gov.emater.aterweb.model.PessoaRelacionamento;
import gov.emater.aterweb.model.Relacionamento;
import gov.emater.aterweb.model.RelacionamentoConfiguracao;
import gov.emater.aterweb.model.RelacionamentoTipo;
import gov.emater.aterweb.model.domain.Confirmacao;
import gov.emater.aterweb.model.domain.PessoaTipo;
import gov.emater.aterweb.model.domain.RelacionamentoFuncaoParticipacao;
import gov.emater.aterweb.mvc.dto.Dto;
import gov.emater.aterweb.mvc.dto.PessoaGrupoCadFiltroDto;
import gov.emater.aterweb.service.ConstantesService;
import gov.emater.aterweb.service.PessoaGrupoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PessoaGrupoServiceImpl extends CrudServiceImpl<PessoaGrupo, Integer, PessoaGrupoDao> implements PessoaGrupoService {

    @Autowired
    private ConstantesService constantesService;

    @Autowired
    private PessoaGrupoTipoDao pessoaGrupoTipoDao;

    @Autowired
    private PessoaRelacionamentoDao pessoaRelacionamentoDao;

    @Autowired
    private RelacionamentoConfiguracaoDao relacionamentoConfiguracaoDao;

    @Autowired
    private RelacionamentoDao relacionamentoDao;

    @Autowired
    public PessoaGrupoServiceImpl(PessoaGrupoDao dao) {
	super(dao);
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> detalhar(Integer id) {
	List<?> result = null;
	return result;
    }

    private void fetch(Pessoa pessoa) {
	if (pessoa != null) {
	    if (pessoa.getPessoaMeioContatos() != null)
		pessoa.getPessoaMeioContatos().size();
	    if (pessoa.getPessoaRelacionamentos() != null)
		pessoa.getPessoaRelacionamentos().size();
	}
    }

    @Override
    @Transactional(readOnly = true)
    public List<?> filtrarByDto(Dto dto) {
	PessoaGrupoCadFiltroDto filtro = (PessoaGrupoCadFiltroDto) dto;
	return getDao().restoreByDto(filtro);
    }

    @Override
    @Transactional(readOnly = true)
    public PessoaGrupo restore(Integer id) {
	PessoaGrupo result = super.restore(id);

	// restaurar dados subjacentes
	fetch(result);

	return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PessoaGrupoTipo> restorePessoaGrupoTipo(PessoaGrupoTipo pessoaGrupoTipo) {
	return pessoaGrupoTipoDao.restore();
    }

    @Override
    @Transactional
    public PessoaGrupo save(PessoaGrupo entidade) {
	entidade.setPessoaTipo(PessoaTipo.GS);
	entidade.setPessoaGrupoTipo(constantesService.getPersonalizadoPessoaGrupoTipo());
	entidade.setPublicoAlvoConfirmacao(Confirmacao.N);

	if (entidade.getPessoaGrupo() != null) {
	    entidade.getPessoaGrupo().setPessoaTipo(PessoaTipo.GS);
	    entidade.getPessoaGrupo().setPessoaGrupoTipo(constantesService.getPersonalizadoPessoaGrupoTipo());
	    entidade.getPessoaGrupo().setPublicoAlvoConfirmacao(Confirmacao.N);
	}

	// salvar
	entidade = super.save(entidade);

	if (entidade.getPessoaRelacionamentos() != null) {
	    for (PessoaRelacionamento relacionador : entidade.getPessoaRelacionamentos()) {
		PessoaRelacionamento relacionado = new PessoaRelacionamento(entidade);
		RelacionamentoTipo relacionamentoTipo = constantesService.getRelacionamentoTipo(RelacionamentoTipo.Codigo.GESTAO_GRUPO_SOCIAL);
		Relacionamento relacionamento = relacionador.getRelacionamento();
		if (relacionamento == null) {
		    relacionamento = relacionamentoDao.save(new Relacionamento(relacionamentoTipo));
		}
		for (RelacionamentoConfiguracao configuracao : relacionamentoConfiguracaoDao.restore(new RelacionamentoConfiguracao(relacionamentoTipo))) {
		    if (configuracao.getRelacionadorFuncao().getParticipacao() == RelacionamentoFuncaoParticipacao.A) {
			relacionador.setRelacionamentoFuncao(configuracao.getRelacionadorFuncao());
			relacionado.setRelacionamentoFuncao(configuracao.getRelacionadoFuncao());
		    }
		}
		relacionador.setRelacionamento(relacionamento);
		relacionado.setRelacionamento(relacionamento);

		// inserir dados fake
		relacionador.setNome(relacionador.getPessoa().getNome());
		if (relacionador.getPessoa() instanceof PessoaFisica) {
		    relacionador.setCpfCnpj(((PessoaFisica) relacionador.getPessoa()).getCpf());
		} else if (relacionador.getPessoa() instanceof PessoaJuridica) {
		    relacionador.setCpfCnpj(((PessoaJuridica) relacionador.getPessoa()).getCnpj());
		}

		pessoaRelacionamentoDao.save(relacionador);
		pessoaRelacionamentoDao.save(relacionado);
	    }
	}

	return super.restore(entidade.getId());
    }

}
