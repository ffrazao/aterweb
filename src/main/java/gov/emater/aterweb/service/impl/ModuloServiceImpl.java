package gov.emater.aterweb.service.impl;

import gov.emater.aterweb.dao.ModuloDao;
import gov.emater.aterweb.dao.PerfilDao;
import gov.emater.aterweb.model.Modulo;
import gov.emater.aterweb.model.ModuloPerfil;
import gov.emater.aterweb.mvc.dto.Dto;
import gov.emater.aterweb.mvc.dto.ModuloCadFiltroDto;
import gov.emater.aterweb.service.ModuloService;
import gov.emater.aterweb.service.ServiceException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ModuloServiceImpl extends
		CrudServiceImpl<Modulo, Integer, ModuloDao> implements ModuloService {

	@Autowired
	private PerfilDao perfilDao;

	@Autowired
	public ModuloServiceImpl(ModuloDao dao) {
		super(dao);
	}

	private void fetch(Modulo entidade) {
		if (entidade != null) {
			if (entidade.getModuloPerfils() != null) {
				for (ModuloPerfil e : entidade.getModuloPerfils()) {
					e.getPerfil();
					e.getModulo();
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public List<?> filtrarByDto(Dto filtroGenerico) {
		ModuloCadFiltroDto filtro = (ModuloCadFiltroDto) filtroGenerico;
		// Converter o DTO em parâmetros
		Map<String, Object> params = new HashMap<String, Object>();
		String comando = "selord";
		if (filtro.getNome() != null && filtro.getNome().trim().length() > 0) {
			comando = "selwheordlike";
		}
		params.put(comando + "|modulo.nome", filtro.getNome());

		params.put("sel|id", "");

		List<Modulo> result = (List<Modulo>) restoreByParams(null);

		for (Modulo entidade : result) {
			fetch(entidade);
		}

		return result;
	}

	@Override
	@Transactional(readOnly = true)
	public Modulo restore(Integer id) {
		Modulo result = super.restore(id);

		// restaurar dados subjacentes
		fetch(result);

		return result;
	}

	@Override
	@Transactional
	public Modulo save(Modulo entidade) {

		// preparar a gravação dos perfis
		if (entidade.getModuloPerfils() != null
				&& entidade.getModuloPerfils().size() > 0) {
			// marcar para limpar
			List<ModuloPerfil> removidos = new ArrayList<ModuloPerfil>();
			for (ModuloPerfil moduloPerfil : entidade.getModuloPerfils()) {
				if (moduloPerfil.getPerfil() == null
						|| moduloPerfil.getPerfil().getId() == null) {
					removidos.add(moduloPerfil);
				} else {
					moduloPerfil.setModulo(entidade);
					moduloPerfil.setPerfil(perfilDao.restore(moduloPerfil
							.getPerfil().getId()));
				}
			}
			entidade.getModuloPerfils().removeAll(removidos);
		}

		if (entidade.getModuloPerfils() == null
				|| entidade.getModuloPerfils().size() == 0) {
			throw new ServiceException("Selecione no mínimo 1 perfil!");
		}

		entidade = super.save(entidade);

		return entidade;
	}

}
