/**
 * Script Geral
 */

// Menu criatividade!
$.fn.serializeAnything = function(tag) {
    var toReturn = {};
    if (tag != undefined) {
        tag = '[tag="' + tag + '"]';
    } else {
        tag = '';
    }
    $(this)
            .find(tag + ':input')
            .each(
                    function() {

                        if ((this.name || $(this).attr('nomeCampo'))
                                && !this.disabled
                                && (this.checked
                                        || /select|textarea/i
                                        .test(this.nodeName) || /text|hidden|password/i
                                        .test(this.type))) {
                            var val = $(this).val();
                            var name = this.name.split('.');

                            if ($(this).attr('nomeCampo') != undefined) {
                                name = $(this).attr('nomeCampo').split('.');
                            }

                            if (name.length <= 0) {
                                toReturn[name] = val;
                            } else if (name.length > 0 && name.length <= 2) {
                                toReturn[name[1]] = val;
                            }
                        }
                    });

    return toReturn;

}

jQuery.fn.reset = function() {
    this.each(function() {
        if ($(this).is('form')) {
            var button = jQuery(jQuery('<input type="reset" />'));
            button.hide();
            $(this).append(button);
            button.click().remove();
        } else if ($(this).parent('form').size()) {
            var button = jQuery(jQuery('<input type="reset" />'));
            button.hide();
            $(this).parent('form').append(button);
            button.click().remove();
        } else if ($(this).find('form').size()) {
            $(this).find('form').each(function() {
                var button = jQuery(jQuery('<input type="reset" />'));
                button.hide();
                $(this).append(button);
                button.click().remove();
            });
        }
    })
    return this;
};

$.fn.serializeJSON = function() {
    var json = {}
    var form = $(this);
    form.find('input, select').each(
            function() {
                var val
                if (!this.name)
                    return;

                if ('radio' === this.type) {
                    if (json[this.name]) {
                        return;
                    }

                    json[this.name] = this.checked ? this.value : '';
                } else if ('checkbox' === this.type) {
                    val = json[this.name];

                    if (!this.checked) {
                        if (!val) {
                            json[this.name] = '';
                        }
                    } else {
                        json[this.name] = typeof val === 'string' ? [val,
                            this.value] : $.isArray(val) ? $.merge(val,
                                [this.value]) : this.value;
                    }
                } else {
                    json[this.name] = this.value;
                }
            })
    return json;
}

$.fn.serializeObject = function() {
    var self = this, json = {}, push_counters = {}, patterns = {
        "validate": /^[@a-zA-Z][@a-zA-Z0-9_\[\]\.]*(?:\[(?:\d*|[@a-zA-Z0-9_]+)\])*$/,
        "key": /[@a-zA-Z0-9_\[\]\.]+|(?=\[\])/g,
        "push": /^$/,
        "fixed": /^\d+$/,
        "named": /^[@a-zA-Z0-9_\[\]\.]+$/
    };
    this.build = function(base, key, value) {
        base[key] = value;
        return base;
    };
    this.push_counter = function(key) {
        if (push_counters[key] === undefined) {
            push_counters[key] = 0;
        }
        return push_counters[key]++;
    };
    $
            .each(
                    $(this).serializeArray(),
                    function() {
                        // skip invalid keys
                        if (!patterns.validate.test(this.name)) {
                            return;
                        }
                        var k, keys = this.name.match(patterns.key), merge = this.value, reverse_key = this.name;

                        // Ignora os campos que estiverem em branco
                        if (merge == undefined || merge == '') {
                            return;
                        }
                        while ((k = keys.pop()) !== undefined) {
                            // adjust reverse_key
                            reverse_key = reverse_key.replace(new RegExp("\\["
                                    + k + "\\]$"), '');
                            // push
                            if (k.match(patterns.push)) {
                                merge = self.build([], self
                                        .push_counter(reverse_key), merge);
                            }
                            // fixed
                            else if (k.match(patterns.fixed)) {
                                merge = self.build([], k, merge);
                            }

                            // named
                            else if (k.match(patterns.named)) {
                                merge = self.build({}, k, merge);
                            }
                        }
                        json = $.extend(true, json, merge);
                    });
    return json;
};

var estadoAtual = undefined;

$(function() {
    $("#corpo").on("click", function() {
        $("#barra-ferramenta").pin({
            minWidth: 10,
            containerSelector: "#corpo"
        });
        $("#pessoa_visualizar").pin({
            minWidth: 10
        });
    });

    $("#btn_ferramenta_filtrar").click(function() {
        estadoAtual = 'filtrar';
        $("#div_formulario").hide();
        $("#div_listagem").hide();
        $("#div_filtro").show();

        $(this).hide();
        $("#btn_ferramenta_editar").hide();
        $("#btn_ferramenta_excluir").hide();
        $("#btn_ferramenta_cancelar").hide();
        $("#btn_ferramenta_salvar").hide();
        $("#btn_ferramenta_acoes").hide();
        $("#btn_ferramenta_exportar").hide();

        $("#btn_ferramenta_executar").show();
        // btnFiltrar();
    });

    $("#btn_ferramenta_incluir").click(function() {
        $("#div_filtro").hide();
        $("#div_listagem").hide();
        $("#div_formulario").show();

        $("#btn_ferramenta_editar").hide();
        $("#btn_ferramenta_excluir").hide();
        $("#btn_ferramenta_cancelar").show();
        $("#btn_ferramenta_salvar").show();
        $("#btn_ferramenta_acoes").show();

        incluir();
    });

    $("#btn_ferramenta_editar").click(function() {
        $("#div_filtro").hide();
        $("#div_listagem").hide();
        $("#div_formulario").show();

        $("#btn_ferramenta_cancelar").show();
        $("#btn_ferramenta_salvar").show();
        $("#btn_ferramenta_acoes").show();
        editar();
    });

    $("#btn_ferramenta_excluir").click(function() {
        excluir();
    });

    $("#btn_ferramenta_exportar").click(function() {
        exportar();
    });

    $("#btn_ferramenta_salvar").click(function() {
        salvar();
    });

    $("#btn_ferramenta_executar").click(function() {
        $("#div_filtro").hide();
        $("#div_formulario").hide();
        $("#div_listagem").show();

        $(this).hide();
        $("#btn_ferramenta_filtrar").show();

        $("#btn_ferramenta_editar").hide();
        $("#btn_ferramenta_excluir").hide();
        $("#btn_ferramenta_cancelar").hide();
        $("#btn_ferramenta_salvar").hide();
        filtrar();
    });

    if (estadoAtual == undefined) {
        $("#btn_ferramenta_filtrar").click();
    }
});

var arrayComparacao = new Array();

function campoRecursivo(obj, campo) {
    if (obj[campo]) {
        arrayComparacao[obj['@jsonId']] = obj[campo];
        return obj[campo];
    } else {
        return arrayComparacao[obj];
    }
}

function transformaMoedaRealParaFloat(num) {
    num = num.replace('.', '');
    num = num.replace(',', '.');

    return parseFloat(num);
}

/**
 * Faz pesquisa em estruturas json em busca de objetos cujo atributo jsonId
 * corresponda ao valor informado
 * 
 * @param contexto
 *            estrurua json que mantem todos os dados possivelmente relacionados
 * @param campo
 *            indicacao do campo a ser encontrado
 * @returns Se o parametro campo nao for um UUID valido sera retornado o seu
 *          valor. Se for um UUID valido, o objeto que possui a propriedade
 *          jsonId igual ao valor do campo informado. Se nao for encontrado
 *          nenhum objeto com o UUID informado o valor original UUID sera
 *          retornado.
 * @author frazao
 */
function valorCampoJson(contexto, campo) {
    // reg exp para encontrar numeros UUUID
    if (/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i
            .test(campo)) {
        // procurar o valor do objeto pelo @jsonId
        var result = pesquisaObjetoPeloJsonId(contexto, campo);
        if (result == null) {
            alert("Erro, OBJETO nao encontrado");
        }
        // se nao encontrou retornar o UUID original
        result = result == null ? campo : result;
        return result;
    } else {
        // se o valor nao for um UUID retornar o valor do campo
        return campo;
    }
}

/**
 * Funcao de apoio ao valorCampoJson responsavel por encontrar o objeto cuja
 * propriedade jsonId seja igual ao valor do campo informado
 * 
 * @param contexto
 *            estrutura json que mantem todos os dados relacionados atraves do
 *            jsonId
 * @param jsonId
 *            indicacao do campo a ser encontrado no formato UUID
 * @returns O objeto cuja propriedade jsonId seja igual ao UUID informado
 * @author frazao
 */
function pesquisaObjetoPeloJsonId(contexto, jsonId) {
    var result = null;
    if (contexto != null && jsonId != null) {
        if (contexto['@jsonId'] != null && contexto['@jsonId'] == jsonId) {
            // console.warn("encontrei", contexto, contexto['@jsonId'], jsonId);
            result = contexto;
        } else if (result == null
                && (contexto instanceof Array || contexto instanceof Object)) {
            $.each(contexto, function(chave, valor) {
                result = pesquisaObjetoPeloJsonId(valor, jsonId);
                if (result != null) {
                    return false;
                }
            });
        }
    }
    return result;
}

function retornarPais(elemento) {
    $.getJSON(baseUrl + "dominio",
            {ent: 'LocalizacaoPaisVi'}
    , function(data) {
        $(elemento).html('<option>Selecione</option>');
        $.each(data.resultado, function(index, value) {
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
        });

    });
}

function retornarEstado(elemento, paisId) {
    $.getJSON(baseUrl + "dominio",
            {ent: 'LocalizacaoEstadoVi', npk: 'localizacaoPaisVi.id', vpk: paisId}
    , function(data) {
        $(elemento).html('<option>Selecione</option>');
        $.each(data.resultado, function(index, value) {
            $(elemento).append('<option value="' + value.id + '">' + value.sigla + '</option>');
        });
    });
}


function retornarMunicipio(elemento, estadoId) {
    $.getJSON(baseUrl + "dominio",
            {ent: 'LocalizacaoMunicipioVi', npk: 'localizacaoEstadoVi.id', vpk: estadoId}
    , function(data) {
        $(elemento).html('<option>Selecione</option>');
        $.each(data.resultado, function(index, value) {
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
        });
    });
}


function retornarCidade(elemento, municipioId) {
    $.getJSON(baseUrl + "dominio",
            {ent: 'LocalizacaoCidadeVi', npk: 'localizacaoMunicipioVi.id', vpk: municipioId}
    , function(data) {
        $(elemento).html('<option>Selecione</option>');
        $.each(data.resultado, function(index, value) {
            $(elemento).append('<option value="' + value.id + '">' + value.nome + '</option>');
        });
    });
}

$(function(){
    $(".paises").each(function() {
        retornarPais($(this));
    });

    $(".paises").change(function() {
        retornarEstado($(this).parent().parent().find('.estados').eq(0), $(this).val());
    });

    $(".estados").change(function() {
        retornarMunicipio($(this).parent().parent().find('.municipios').eq(0), $(this).val());
    });

    $(".municipios").change(function() {
        retornarCidade($(this).parent().parent().find('.cidades').eq(0), $(this).val());
    });
    
    $.getJSON(baseUrl + "dominio", {ent: 'LocalizacaoComunidadeVi'}
    , function(data) {
        var opcoes = '';
        $.each(data.resultado, function(index, value) {
            opcoes += '<option value="' + value.id + '">' + value.nome + '</option>';
        });

        $(".comunidades").each(function() {
            $(this).html(opcoes);
        });
    });

    $.getJSON(baseUrl + "dominio", {ent: 'LocalizacaoBaciaHidrograficaVi'}
    , function(data) {
        var opcoes = '';
        $.each(data.resultado, function(index, value) {
            opcoes += '<option value="' + value.id + '">' + value.nome + '</option>';
        });

        $(".bacias").each(function() {
            $(this).html(opcoes);
        });
    });
});

$(".data").mask("99/99/9999");