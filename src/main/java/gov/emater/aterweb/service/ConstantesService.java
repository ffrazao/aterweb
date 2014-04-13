package gov.emater.aterweb.service;

import gov.emater.aterweb.model.LocalizacaoTipo;
import gov.emater.aterweb.model.PessoaGrupoTipo;
import gov.emater.aterweb.model.RelacionamentoTipo;

import javax.servlet.http.HttpServletRequest;

public interface ConstantesService extends Service {

    LocalizacaoTipo getBaciaHidrograficaLocalizacaoTipo();

    String getBaseUrl(HttpServletRequest request);

    LocalizacaoTipo getComunidadeLocalizacaoTipo();

    LocalizacaoTipo getLocalizacaoTipo(gov.emater.aterweb.model.LocalizacaoTipo.Codigo codigo);

    PessoaGrupoTipo getPersonalizadoPessoaGrupoTipo();

    PessoaGrupoTipo getPessoaGrupoTipo(gov.emater.aterweb.model.PessoaGrupoTipo.Codigo codigo);

    RelacionamentoTipo getRelacionamentoTipo(gov.emater.aterweb.model.RelacionamentoTipo.Codigo codigo);

    String getServletLocalDirectoryPath(HttpServletRequest request);

    String getServletResourcesLocalDirectoryPath(HttpServletRequest request);

}
