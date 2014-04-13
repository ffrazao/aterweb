package teste.maquinaestado;

class _Main {
	public static void main(String[] args) {
		Pagina pagina = new Pagina();
		for (int i = 0; i <= 10; i++) {
			pagina.desenha();
		}
	}
}

public abstract class EstadoPagina {

	public final static EstadoPagina EDITANDO = new EstadoPaginaEditando();
	
	public final static EstadoPagina FILTRANDO = new EstadoPaginaFiltrando();
	
	public final static EstadoPagina INSERINDO = new EstadoPaginaInserindo();
	
	public final static EstadoPagina LISTANDO = new EstadoPaginaListando();

	public abstract void desenha(Pagina pagina);

	protected EstadoPagina getQualquerEstadoPagina(EstadoPagina estadoPagina) {
		EstadoPagina result = null;
		int opcao = (int) (4 * Math.random());
		System.out.format(" ==> Opcao [%d]   ", opcao);
		switch (opcao) {
		case 0:
			result = EstadoPagina.FILTRANDO;
			break;
		case 1:
			result = EstadoPagina.EDITANDO;
			break;
		case 2:
			result = EstadoPagina.INSERINDO;
			break;
		case 3:
			result = EstadoPagina.LISTANDO;
			break;
		}
		System.out.format("    => Estava em [%s]. Escolhi [%s]\n", estadoPagina, result);
		return result;
	}
	
	public void retornar(Pagina pagina) {
		pagina.setEstadoPagina(pagina.getEstadoPaginaAnterior());
		pagina.desenha();
	}

}

class EstadoPaginaEditando extends EstadoPagina {
	public void desenha(Pagina pagina) {
		System.out.println("Estou Editando");
		// pagina.setEstadoPagina(EstadoPagina.LISTANDO);
		pagina.retornar();
	}

	@Override
	public String toString() {
		return "EDITAR";
	}
}

class EstadoPaginaFiltrando extends EstadoPagina {
	public void desenha(Pagina pagina) {
		System.out.println("Estou Filtrando");
		pagina.setEstadoPagina(getQualquerEstadoPagina(this));
	}

	@Override
	public String toString() {
		return "FILTRAR";
	}
}

class EstadoPaginaInserindo extends EstadoPagina {
	public void desenha(Pagina pagina) {
		System.out.println("Estou Inserindo");
		pagina.setEstadoPagina(getQualquerEstadoPagina(this));
	}

	@Override
	public String toString() {
		return "INSERIR";
	}
}

class EstadoPaginaListando extends EstadoPagina {
	public void desenha(Pagina pagina) {
		System.out.println("Estou Listando");
		pagina.setEstadoPagina(getQualquerEstadoPagina(this));
	}

	@Override
	public String toString() {
		return "LISTAR";
	}
}

class Pagina {

	private EstadoPagina estadoPagina;
	
	private EstadoPagina estadoPaginaAnterior;

	public Pagina() {
		setEstadoPagina(EstadoPagina.FILTRANDO);
	}

	public void desenha() {
		getEstadoPagina().desenha(this);
	}

	public EstadoPagina getEstadoPagina() {
		return this.estadoPagina;
	}

	public EstadoPagina getEstadoPaginaAnterior() {
		return this.estadoPaginaAnterior;
	}

	public void retornar() {
		getEstadoPagina().retornar(this);
	}

	public void setEstadoPagina(EstadoPagina estadoPagina) {
		this.estadoPaginaAnterior = this.estadoPagina;
		this.estadoPagina = estadoPagina;
	}

	protected void setEstadoPaginaAnterior(EstadoPagina estadoPaginaAnterior) {
		this.estadoPaginaAnterior = estadoPaginaAnterior;
	}
}