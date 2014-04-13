package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.dao.LocalizacaoTipoDao;
import gov.emater.aterweb.dao.PessoaGrupoTipoDao;
import gov.emater.aterweb.dao.RelacionamentoTipoDao;
import gov.emater.aterweb.model.LocalizacaoTipo;
import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.model.RelacionamentoTipo;
import gov.emater.aterweb.service.ConstantesService;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public final class ConstantesServiceImpl implements ConstantesService {

    private LocalizacaoTipo baciaHidrograficaLocalizacaoTipo;

    private String baseUrl;

    private LocalizacaoTipo comunidadeLocalizacaoTipo;

    @Autowired
    private LocalizacaoTipoDao localizacaoTipoDao;

    private PessoaGrupoTipo personalizadoPessoaGrupoTipo;

    @Autowired
    private PessoaGrupoTipoDao pessoaGrupoTipoDao;

    @Autowired
    private RelacionamentoTipoDao relacionamentoTipoDao;

    private String servletLocalDirectoryPath;

    private String servletResourcesLocalDirectoryPath;

    public ConstantesServiceImpl() {
    }

    @Override
    @Transactional(readOnly = true)
    public LocalizacaoTipo getBaciaHidrograficaLocalizacaoTipo() {
	if (baciaHidrograficaLocalizacaoTipo == null) {
	    this.baciaHidrograficaLocalizacaoTipo = getLocalizacaoTipo(LocalizacaoTipo.Codigo.BACIA_HIDROGRAFICA);
	}
	return baciaHidrograficaLocalizacaoTipo;
    }

    @Override
    @Transactional(readOnly = true)
    public String getBaseUrl(HttpServletRequest request) {
	if (baseUrl == null) {
	    baseUrl = request.getRequestURL().toString().replaceFirst(request.getRequestURI(), request.getContextPath());
	}
	return baseUrl;
    }

    @Override
    @Transactional(readOnly = true)
    public LocalizacaoTipo getComunidadeLocalizacaoTipo() {
	if (this.comunidadeLocalizacaoTipo == null) {
	    this.comunidadeLocalizacaoTipo = getLocalizacaoTipo(LocalizacaoTipo.Codigo.COMUNIDADE);
	}
	return comunidadeLocalizacaoTipo;
    }

    @Override
    @Transactional(readOnly = true)
    public LocalizacaoTipo getLocalizacaoTipo(LocalizacaoTipo.Codigo codigo) {
	return localizacaoTipoDao.restore(new LocalizacaoTipo(codigo)).get(0);
    }

    @Override
    @Transactional(readOnly = true)
    public PessoaGrupoTipo getPersonalizadoPessoaGrupoTipo() {
	if (this.personalizadoPessoaGrupoTipo == null) {
	    this.personalizadoPessoaGrupoTipo = getPessoaGrupoTipo(PessoaGrupoTipo.Codigo.PERSONALIZADO);
	}
	return this.personalizadoPessoaGrupoTipo;
    }

    @Override
    @Transactional(readOnly = true)
    public PessoaGrupoTipo getPessoaGrupoTipo(PessoaGrupoTipo.Codigo codigo) {
	return pessoaGrupoTipoDao.restore(new PessoaGrupoTipo(codigo)).get(0);
    }

    @Override
    @Transactional(readOnly = true)
    public RelacionamentoTipo getRelacionamentoTipo(RelacionamentoTipo.Codigo codigo) {
	RelacionamentoTipo relacionamentoTipo = new RelacionamentoTipo(codigo);
	relacionamentoTipo.setTemporario(null);
	relacionamentoTipo.setGeradoPeloSistema(null);
	return relacionamentoTipoDao.restore(relacionamentoTipo).get(0);
    }

    @Override
    @Transactional(readOnly = true)
    public String getServletLocalDirectoryPath(HttpServletRequest request) {
	if (servletLocalDirectoryPath == null) {
	    StringBuffer path = new StringBuffer(request.getServletContext().getRealPath("/"));
	    if (!path.toString().endsWith(File.separator)) {
		path.append(File.separator);
	    }
	    servletLocalDirectoryPath = path.toString();
	}
	return servletLocalDirectoryPath;
    }

    @Override
    @Transactional(readOnly = true)
    public String getServletResourcesLocalDirectoryPath(HttpServletRequest request) {
	if (servletResourcesLocalDirectoryPath == null) {
	    StringBuffer path = new StringBuffer(getServletLocalDirectoryPath(request));
	    if (!path.toString().endsWith(File.separator)) {
		path.append(File.separator);
	    }
	    path.append("resources").append(File.separator).append("upload").append(File.separator);

	    File teste = new File(path.toString());
	    if (!teste.exists()) {
		teste.mkdirs();
	    }
	    if (!teste.isDirectory()) {
		throw new IllegalStateException("Estrutura de upload invalida");
	    }

	    servletResourcesLocalDirectoryPath = path.toString();
	}
	return servletResourcesLocalDirectoryPath;
    }

}