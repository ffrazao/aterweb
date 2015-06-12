/* global aterwebApp */

'use strict';

/**
 * @ngdoc function
 * @name aterwebApp.controller:BemVindoCtrl
 * @description
 * # BemVindoCtrl
 * Controller of the aterwebApp
 */
 aterwebApp.controller('MenuCtrl', function ($scope) {
 	$scope.tree = 
 	[
 	{
 		name: 'Dashboard',
 		link: '#',
 	}, 
 	{
 		name: 'Cadastro',
 		link: '#',
 		subtree: [
 		{
 			name: 'Propriedade Rural',
 			link: 'p.propriedadeRural.filtro',
 		},
 		{
 			name: 'Grupo Social',
 			link: 'p.grupoSocial.filtro',
 		},
 		{
 			name: 'Pessoa',
 			link: 'p.pessoa.filtro',
 		}
 		]
 	},
 	{
 		name: 'Atividade',
 		link: '#',
 		subtree: [
 		{
 			name: 'Planejar',
 			link: '#',
 		},
 		{
 			name: 'Registrar',
 			link: 'p.modeloCadastro.filtro',
 		},
 		{
 			name: 'Agenda',
 			link: 'login',
 		}
 		]
 	},
 	{
 		name: 'Diagnóstico',
 		link: '#',
 		subtree: [
 		{
 			name: 'Índices de Produção',
 			link: 'p.indiceProducao.filtro',
 		},
 		{
 			name: 'Índices Sociais',
 			link: 'p.modeloCadastro.filtro',
 		},
 		{
 			name: 'Enquete',
 			link: 'login',
 			subtree: [
 			{
 				name: 'Configuração',
 				link: '#',
 			},
 			{
 				name: 'Responder',
 				link: 'p.modeloCadastro.filtro',
 				subtree: [
 				{
 					name: 'Anônimo',
 					link: '#',
 				},
 				{
 					name: 'Identificado',
 					link: 'p.modeloCadastro.filtro',
 				},
 				],
 			},
 			],
 		},
 		],
 	},
	{
		name: 'Configuração',
		link: 'login',
		subtree: [
		{
			name: 'Usuário',
			link: '#',
		},
		{
			name: 'Perfil',
			link: '#',
		},
		],
	},
 	];
 });