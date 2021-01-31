$(document).ready(function()
{
	      var selected_vote = [];
          $.ajax({
	               type:'GET',
	               url:'http://127.0.0.1:9000/polls/polldetail',
	               success:function(polls)
	               {
		              $.grep(polls,function(n,i){
			          $("#question").html(n.Question)
			          console.log(n.Question)
			          for (var x in n.OptionVote)
			          {
					    var Checkbox = $(document.createElement('div'))
					    .attr("id",'CheckboxDiv');
					    Checkbox.after().html(
						'<input type= "radio" id="checkbox" name ="option" value="'+x+'">'+'<label>'+x+'</label')
					    Checkbox.appendTo("#checkbox")
					    console.log(n.OptionVote)
					   }
	
					

				  

            

		
			
			$("#vote").click(function()
			{
				$.each($("input[name='option']:checked"),function(e)
				{
					selected_vote=[];
					selected_vote.push($(this).val());

			     });
				$.ajax({
					type:'PUT',
					url:'http://127.0.0.1:9000/polls/pollvotes',
					data:JSON.stringify(selected_vote),
					success:function(e){
						alert("thanks for voting");
					}
				});

			});
			

				});
		          }
		      });
      });

		
	
	
		
			

	

          