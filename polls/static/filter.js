$(document).ready(function(){
	 $("#btn").click(function() {
            flag=1;
            var selctd_tags = [];
            $.each($("input[name='tag']:checked"), function() {
                selctd_tags.push($(this).val());

            });
            console.log(selctd_tags)
            if(selctd_tags && selctd_tags.length>0){
            $.ajax({
                url: "http://127.0.0.1:9000/polls/viewquestion",
                 type: 'GET',
                    data:{"selctd_tags":selctd_tags},
                    success:function(polls){
                    console.log(polls,"polls");
            var table_body = '<table border="5">';

            table_body+='<tr>';
                    table_body +='<th>';
                    table_body +='SI.NO';
                    table_body +='</th>';
                    table_body +='<th>';
                    table_body +='POLL QUESTION';
                    table_body +='</th>';
                    table_body +='<th>';
                    table_body +='TOTAL VOTES';
                    table_body +='</th>';
                    table_body +='<th>';
                    table_body +='TAGS';
                    table_body +='</th>';
                    table_body+='</tr>';
                    table_body+='<div id="elements">';


            $.grep(polls, function( n, i ) {
          //filter by question

                    table_body+='<tr>';
                	table_body +='<td>';
                    table_body +=''+(i+1);
                    table_body +='</td>';
                    table_body +='<td>';
                    table_body +=''+n.Question;
                    table_body +='</td>';
                    table_body +='<td>';
                    var sum_votes=0;
                    for(var key in n.OptionVote){   //option related to qustn
                                                      // key related to option

                    sum_votes+=parseInt(n.OptionVote[key]);

                    }
                    table_body +=''+sum_votes;

                    table_body +='</td>';
                    table_body +='<td>';

                    for(var x in n.Tags ){

                    if(x==((n.Tags).length)-1)
                    {
                    table_body +=''+n.Tags[x];
                    }
                    else{
                    table_body +=''+n.Tags[x]+',';
                    }
                    }
                    table_body +='</td>';
              table_body+='</tr>';

console.log(table_body,"table_body");

});


table_body+='</table>';
                 $('#tableDiv').html(table_body);



        }

                });
                }
});



});
	
