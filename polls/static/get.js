$(document).ready(function(){
	var $poll = $("#poll");
	 $.ajax({
	 	type:'GET',
	 	url:"http://127.0.0.1:9000/polls/viewquestion",
	 	dataType:"json",


	 	success:function(poll)
	 	{
	 		var num=1;

	 		
	 		//console.log(poll);
	 		//console.log(poll);
	 		$(poll).each(function(i,getpoll){
	 		
	 			
	 	        $poll.append('<tr>')
	 	        
	 			$poll.append('<td>'+num+'</td>')
	 			num++; 
	 				
	 			//console.log(getpoll.Question);
	 			$poll.append('<td><a href = "/polls/'+getpoll.Question_ID+'">'+getpoll.Question+'</a></td>')
	 		//console.log("hii");
	 		 var votesum=0;
	 		 for(var key in getpoll.OptionVote)
	 		 {
	 		 	//console.log(key);
	 		 	//$poll.append('<li>'+getpoll.OptionVote[key]+'</li>');
	 		 		var vote= parseInt(getpoll.OptionVote[key]);
	 		 		votesum = votesum+vote;
	 		 		

	 		 }
	 		 //console.log("hello");
	 		 $poll.append('<td>'+votesum+'</td>')
	 		 $poll.append('<td>'+getpoll.Tags+'</td><br>')
	 		 $poll.append('</tr>')
	 		   

	 		});
	 	}
	 });
	       $("#btn").click(function() {
            
            var selected_tags = [];
            $.each($("input[name='tag']:checked"), function() {
                selected_tags.push($(this).val());

            });
            //console.log(selected_tags)

            $("#poll").empty();
            var tag_Q;

             tag_Q+='<thead >'
             tag_Q+='<tr bgcolor="#9CC097" >'
             tag_Q+='<th>Number</th>'
             tag_Q+='<th>Poll question</th>'
             tag_Q+='<th>Total votes</th>'
             tag_Q+='<th>Tags </th>'
             tag_Q+='</tr>'
             tag_Q+='</thead>'
             $('#poll').append(tag_Q);
             		if(selected_tags&&selected_tags.length>0)
             		{
             			$.ajax({
             				url:"http://127.0.0.1:9000/polls/filtertag",
             				type:'GET',
             				dataType:"Json",
             				data:{"selected_tags":selected_tags},
             				success:function(poll){
             					var num=1;
             					var filterHtml;
             						//console.log(getpoll.Tags)
             		               // console.log(selected_tags)
             		               $(poll).each(function(i,getpoll){
             		                    $poll.append('<tr>')
	 		                         	$poll.append('<td>'+num+'</td>')
	 			                        num++; 
	 			                         //console.log(getpoll.Question);
	 			                         $poll.append('<td>'+getpoll.Question+'</td>')
	 			                         //console.log("hii");
	 		                             var votesum=0;
	 		 
	 		                             for(var key in getpoll.OptionVote)
	 		                             {
	 		 	                                              //console.log(key);
	 		 	                         //$poll.append('<li>'+getpoll.OptionVote[key]+'</li>');
	 		 		                     var vote= parseInt(getpoll.OptionVote[key]);
	 		 		                     votesum = votesum+vote;
	 		                             }
	 		                               //console.log("hello");
	 		                             $poll.append('<td>'+votesum+'</td>')
	 		                             $poll.append('<td>'+getpoll.Tags+'</td><br>')
	 		                             $poll.append('</tr>')
	 		                             });	
             				            
             		           
                          }
             			});
             		
             		}

           });
           var $filterTags = $("#filterTags");
           var i,j;
           var tagHtml;
           var container = $('#filterTags');
           //var $poll = $("#poll");
           $.ajax({
           	url:'http://127.0.0.1:9000/polls/gettags',
           	type:'GET',
           	dataType:"json",
           	success:function(filterTags){

           		i=filterTags.Tags.length;
           		for(j=0;j<i;j++)
           		{
           			$('<input/>',{type:'checkbox', id:'f', name:'tag',value:filterTags.Tags[j]}).appendTo(container);
           			$('<label/>',{'for':'f',text:filterTags.Tags[j]}).appendTo(container);
           			$('<br><br>').appendTo(container)
           			

           		}
           	}
           	});
          

         });            



