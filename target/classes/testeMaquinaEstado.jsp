

<script>

	public abstract class Estado {
		public void desenha(Pagina pagina);
		public void retorna(Pagina pagina) {
			pagina.setEstado(pagina.getEstadoAnterior());
			pagina.setEstadoAnterior(null);
			pagina.desenha(pagina);
		}
	}

	public class Filtrando implemnts Estado {
		public void desenha (Pagina pagina) {
			
		}
		public void retorna(Pagina pagina) {
		}
	}

	public class Inserindo implemnts Estado {
		public void desenha (Pagina pagina) {
			
		}
		public void retorna(Pagina pagina) {
		}
	}

	public class Listando implemnts Estado {
		public void desenha (Pagina pagina) {
			
		}
		public void retorna(Pagina pagina) {
		}
	}

	public class Agindo implemnts Estado {
		public void desenha (Pagina pagina) {
			
		}
		public void retorna(Pagina pagina) {
		}
	}

	public class Excluindo implemnts Estado {
		public void desenha (Pagina pagina) {
			
		}
		public void retorna(Pagina pagina) {
		}
	}

	public class Editando implemnts Estado {
		public void desenha (Pagina pagina) {
			
		}
		public void retorna(Pagina pagina) {
		}
	}

	public class Pagina {
		private Estado estado;
		private Estado estadoAnterior;

		public Pagina(Estado estado) {
			setEstado(estado);
		}
		
		public Estado getEstado() {
			return this.estado;
		}
		public void setEstado(Estado estado) {
			this.estadoAnterior = this.estado;
			this.estado = estado;
		}
		public Estado getEstadoAnterior() {
			return this.getEstadoAnterior;
		}
		protected void setEstadoAnterior(Estado estadoAnterior) {
			this.estadoAnterior = estadoAnterior;
		}
		public void desenha() {
			getEstado().desenha();
		}		
	}


	Estado filtrando = new Filtrando();
	Estado inserindo = new Inserindo();
	Estado listando = new Listando ();
	Estado agindo = new Agindo ();
	Estado excluindo = new Excluindo ();
	Estado editando = new Editando ();
	
	Pagina pagina = new Pagina(filtrando);
	pagina.desenha();
	pagina.retorna();

</script>

<html>
<head>
</head>
<body>
</body>
</html>