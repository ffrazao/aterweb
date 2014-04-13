<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<script>
jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();	
</script>

<style type="text/css">
	@import url("<spring:url value='resources/css/wdCalendar/dailog.css'/>");
	@import url("<spring:url value='resources/css/wdCalendar/calendar.css'/>");
	@import url("<spring:url value='resources/css/wdCalendar/dp.css'/>");
	@import url("<spring:url value='resources/css/wdCalendar/alert.css'/>");
	@import url("<spring:url value='resources/css/wdCalendar/main.css'/>");
</style>
<!--
<link src='<spring:url value="resources/css/wdCalendar/dailog.css"/>' rel="stylesheet" type="text/css" />
<link src='<spring:url value="resources/css/wdCalendar/calendar.css"/>' rel="stylesheet" type="text/css" />
<link src='<spring:url value="resources/css/wdCalendar/dp.css"/>' rel="stylesheet" type="text/css" />
<link src='<spring:url value="resources/css/wdCalendar/alert.css"/>' rel="stylesheet" type="text/css" />
<link src='<spring:url value="resources/css/wdCalendar/main.css"/>' rel="stylesheet" type="text/css" />
	-->
<script src='<spring:url value="resources/js/libs/wdCalendar/Common.js"/>'></script>
<script src='<spring:url value="resources/js/libs/jquery.datepicker.js"/>'></script>
<script src='<spring:url value="resources/js/libs/wdCalendar/datepicker_lang_PT.js"/>'></script>
<script src='<spring:url value="resources/js/libs/wdCalendar/wdCalendar_lang_PT.js"/>'></script>
	
<script src='<spring:url value="resources/js/libs/jquery.alert.js"/>'></script>
<script src='<spring:url value="resources/js/libs/jquery.ifrmdailog.js"/>'></script>
<script src='<spring:url value="resources/js/libs/jquery.calendar.js"/>'></script>

<script type="text/javascript">
	$(document).ready(function() {     
	   var view="week";          

		var DATA_FEED_URL = "agenda/";
		var op = {
			view: 'month',
			theme: 3,
			showday: new Date(),
			EditCmdhandler:Edit,
			DeleteCmdhandler:Delete,
			ViewCmdhandler:View,    
			onWeekOrMonthToDay:wtd,
			onBeforeRequestData: cal_beforerequest,
			onAfterRequestData: cal_afterrequest,
			onRequestDataError: cal_onerror, 
			autoload:false,
			url: DATA_FEED_URL + "restaurar",  
			quickAddUrl: DATA_FEED_URL + "salvar", 
			quickUpdateUrl: DATA_FEED_URL + "salvar",
			quickDeleteUrl: DATA_FEED_URL + "remover"        
		};
		var $dv = $("#calhead");
		var _MH = document.documentElement.clientHeight;
		var dvH = $dv.height() + 2;
		op.height = _MH - dvH;
		op.eventItems =[];

		var p = $("#gridcontainer").bcalendar(op).BcalGetOp();
		if (p && p.datestrshow) {
			$("#txtdatetimeshow").text(p.datestrshow);
		}
		$("#caltoolbar").noSelect();

		$("#hdtxtshow").datepicker({ picker: "#txtdatetimeshow", showtarget: $("#txtdatetimeshow"),
		onReturn:function(r){                          
						var p = $("#gridcontainer").gotoDate(r).BcalGetOp();
						if (p && p.datestrshow) {
							$("#txtdatetimeshow").text(p.datestrshow);
						}
				 } 
		});
		function cal_beforerequest(type)
		{
			var t="Carregando dados...";
			switch(type)
			{
				case 1:
					t="Carregando dados...";
					break;
				case 2:                      
				case 3:  
				case 4:    
					t="Processando requisição ...";                                   
					break;
			}
			$("#errorpannel").hide();
			$("#loadingpannel").html(t).show();    
		}
		function cal_afterrequest(type)
		{
			switch(type)
			{
				case 1:
					$("#loadingpannel").hide();
					break;
				case 2:
				case 3:
				case 4:
					$("#loadingpannel").html("Sucesso!");
					window.setTimeout(function(){ $("#loadingpannel").hide();},2000);
				break;
			}              

		}
		function cal_onerror(type,data)
		{
			$("#errorpannel").show();
		}
		function Edit(data)
		{
		   var eurl="editar/?id={0}&start={2}&end={3}&isallday={4}&title={1}";   
			if(data)
			{
				var url = StrFormat(eurl,data);
				OpenModelWindow(url,{ width: 600, height: 400, caption:"Editar Evento",onclose:function(){
				   $("#gridcontainer").reload();
				}});
			}
		}    
		function View(data)
		{
			var str = "";
			$.each(data, function(i, item){
				str += "[" + i + "]: " + item + "\n";
			});
			alert(str);               
		}    
		function Delete(data,callback)
		{           

			$.alerts.okButton="Ok";  
			$.alerts.cancelButton="Cancel";  
			hiConfirm("Tem certeza que quer apagar o evento?", 'Confirmar',function(r){ r && callback(0);});           
		}
		function wtd(p)
		{
		   if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}
			$("#caltoolbar div.fcurrent").each(function() {
				$(this).removeClass("fcurrent");
			})
			$("#showdaybtn").addClass("fcurrent");
		}
		//to show day view
		$("#showdaybtn").click(function(e) {
			//document.location.href="#day";
			$("#caltoolbar div.fcurrent").each(function() {
				$(this).removeClass("fcurrent");
			})
			$(this).addClass("fcurrent");
			var p = $("#gridcontainer").swtichView("day").BcalGetOp();
			if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}
		});
		//to show week view
		$("#showweekbtn").click(function(e) {
			//document.location.href="#week";
			$("#caltoolbar div.fcurrent").each(function() {
				$(this).removeClass("fcurrent");
			})
			$(this).addClass("fcurrent");
			var p = $("#gridcontainer").swtichView("week").BcalGetOp();
			if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}

		});
		//to show month view
		$("#showmonthbtn").click(function(e) {
			//document.location.href="#month";
			$("#caltoolbar div.fcurrent").each(function() {
				$(this).removeClass("fcurrent");
			})
			$(this).addClass("fcurrent");
			var p = $("#gridcontainer").swtichView("month").BcalGetOp();
			if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}
		});

		$("#showreflashbtn").click(function(e){
			$("#gridcontainer").reload();
		});

		//Add a new event
		$("#faddbtn").click(function(e) {
			var url ="edit.php";
			OpenModelWindow(url,{ width: 500, height: 400, caption: "Criar Evento"});
		});
		//go to today
		$("#showtodaybtn").click(function(e) {
			var p = $("#gridcontainer").gotoDate().BcalGetOp();
			if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}


		});
		//previous date range
		$("#sfprevbtn").click(function(e) {
			var p = $("#gridcontainer").previousRange().BcalGetOp();
			if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}

		});
		//next date range
		$("#sfnextbtn").click(function(e) {
			var p = $("#gridcontainer").nextRange().BcalGetOp();
			if (p && p.datestrshow) {
				$("#txtdatetimeshow").text(p.datestrshow);
			}
		});

	});
</script>    
	
	
<div id="corpo" class="container" style="background-color: #FFF;">
	<div>
		<div class="col-sm-5">
			<br />
			<h1>Agenda</h1>
		</div>
		<div class="row"></div>
		<div>
			<div>

				<div id="calhead" style="padding-left:1px;padding-right:1px;">          
					<div class="cHead"><div class="ftitle">Agenda</div>
						<div id="loadingpannel" class="ptogtitle loadicon" style="display: none;">Carregando dados...</div>
						<div id="errorpannel" class="ptogtitle loaderror" style="display: none;">Os dados não foram carregados, tente novamente mais tarde.</div>
					</div>          

					<div id="caltoolbar" class="ctoolbar">
						<div id="faddbtn" class="fbutton">
							<div><span title='Click to Create New Event' class="addcal">

								Novo Evento                
								</span></div>
						</div>
						<div class="btnseparator"></div>
						<div id="showtodaybtn" class="fbutton">
							<div><span title='Click to back to today ' class="showtoday">Hoje</span></div>
						</div>
						<div class="btnseparator"></div>

						<div id="showdaybtn" class="fbutton">
							<div><span title='Day' class="showdayview">Dia</span></div>
						</div>
						<div  id="showweekbtn" class="fbutton">
							<div><span title='Week' class="showweekview">Semana</span></div>
						</div>
						<div  id="showmonthbtn" class="fbutton fcurrent">
							<div><span title='Month' class="showmonthview">Mês</span></div>

						</div>
						<div class="btnseparator"></div>
						<div  id="showreflashbtn" class="fbutton">
							<div><span title='Refresh view' class="showdayflash">Atualizar</span></div>
						</div>
						<div class="btnseparator"></div>
						<div id="sfprevbtn" title="Prev"  class="fbutton">
							<span class="fprev"></span>

						</div>
						<div id="sfnextbtn" title="Next" class="fbutton">
							<span class="fnext"></span>
						</div>
						<div class="fshowdatep fbutton">
							<div>
								<input type="hidden" name="txtshow" id="hdtxtshow" />
								<span id="txtdatetimeshow">Carregando</span>

							</div>
						</div>
						<div class="btnseparator"></div>
						<div class="fbutton">
								<select><option>Minha Agenda</option><option>GETIN</option><option>EMATER-DF</option><option>Todas</option></select>
						
						</div>
						<div class="clear"></div>
					</div>
				</div>
				<div style="padding:1px;">

					<div class="t1 chromeColor">
						&nbsp;</div>
					<div class="t2 chromeColor">
						&nbsp;</div>
					<div id="dvCalMain" class="calmain printborder">
						<div id="gridcontainer" style="overflow-y: visible;">
						</div>
					</div>
					<div class="t2 chromeColor">

						&nbsp;</div>
					<div class="t1 chromeColor">
						&nbsp;
					</div>   
				</div>

			</div>
		</div>
	</div>
</div>