package gov.emater.aterweb.model;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

// para marcar esta classe como o topo de hierarquia de entidades, porém não
// persiste informação
@MappedSuperclass
// para evitar o acesso recursivo as classes do conjunto de objetos serializados
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@jsonId")
@JsonIdentityInfo(generator = ObjectIdGenerators.UUIDGenerator.class, property = "@jsonId")
public class EntidadeBase implements Serializable {

	public static final String ATER_SCHEMA = "ater";

	public static final String PESSOA_SCHEMA = "pessoa";

	private static final long serialVersionUID = 1L;
	
	public static final String SISTEMA_SCHEMA = "sistema";

	public EntidadeBase() {

	}

	@Override
	public boolean equals(Object obj) {
		return super.equals(obj);
	}

	@Override
	public int hashCode() {
		return super.hashCode();
	}

}
