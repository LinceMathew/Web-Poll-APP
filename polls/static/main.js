$(document).ready(function(){
var optionpart={}  
types=[];

$("#addoption").click(function () {
           // var html ='';
            var html = '<input type="text" name="title[]" class="c" placeholder="Enter option">';
           
            $('#options').append(html);
               });



            
 
       

$('#create').on('click',function() {
    $(".c").each(function() {
 
   types.push($(this).val());
console.log(types)
   

   });
	//console.log(types)
	for(i=0;i<types.length;i++)
	{
		optionpart[types[i]] ="0"
	}        
   console.log(optionpart)


	var data =$('#data');
    var Question = $('#Question');
   // var option1 = $('#option1');
    //var option2 = $('#option2');
    var c = $('.c');
    
    

   
  //var addoption=$('#addoption');
    var Tag = $('#Tag');
    var str= Tag.val();
    var temp = new Array();

temp = str.split(",");

   // console.log(temp);
	//console.log(Question.val());

 var  data = {

   "Question":Question.val(),
    "OptionVote":optionpart,

    
    
      
    
 /*  {
     [option1.val()]:"0",
     [option2.val()]:"0"
     },*/
 
                                //[addoption.val()]"0   
   "Tags":temp
}


/*var data{}
data["Question"]=Question.val()
 data["OptionVote"]=optionpart
 data["Tags"]=temp
 console.log(data);*/
  console.log(optionpart)

    $.ajax({
    	type:'POST',
    	url:"http://127.0.0.1:9000/polls/createquestion",
    	data: JSON.stringify(data),
    	success: function(newdata){
             alert('created');
		},
		error:function(){

			alert('error occured');
		}

	});
	
    });


});

