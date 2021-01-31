 $(document).ready(function(){
    var table_body = '';
$.ajax({
        type:'GET',
        url: 'http://127.0.0.1:9000/polls/polldetail',
        success:function(polls){
            var table_body = '';
            var j=1
            table_body+='<thead>';
            table_body+='<tr>';
            table_body+='<th>Number</th>';
             table_body+='<th>Options</th>';
             table_body+='<th>Vote</th>';
            table_body+='</tr>';
            table_body+='</thead>'
            
            var voteSum=0;
            var voteshow = '';
            $.grep(polls, function( n, i ) {
          //filter by question


                    $("#head").html(n.Question)
                    for(var key in n.OptionVote){
                    

   
                    table_body+='<tr>';



                    table_body +='<td style="padding-bottom: 15px;padding-top: 15px;">';
                    table_body +=''+j;
                    table_body +='</td>';
                    j=j+1;
                    table_body +='<td>';
                    table_body +=''+key;
                    table_body +='</td>';

                    table_body +='<td>';
                    table_body +=''+n.OptionVote[key];

                    table_body +='</td>';

              table_body+='</tr>';

                    var vote = parseInt(n.OptionVote[key]);
                    voteSum = voteSum + vote;
                    }
                    voteshow+='<p id="total">Total Votes : '+voteSum+'</p>'

});


//table_body+='</table>';
                 $('#detailquestion').html(table_body);
                  $('#voteSum').html(voteshow);


        }
        });
      });