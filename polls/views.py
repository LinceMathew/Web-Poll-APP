from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Question, Tags ,Choice
import json
from django.shortcuts import render
##from static.get import selected_tags


# from pprint import pprint
# Create your views here.
# noinspection PyUnresolvedReferences

@csrf_exempt
def createquestion(request):
    if request.method == 'POST':  # requesting for post method
        received_json_data = json.loads(
            request.body.decode("utf-8"))  # loading the json data to a dictionary called recieved_json_data

        question = Question()
        question.question_text = received_json_data["Question"]  # inserting questions to the dictionary
        #pprint(received_json_data["Question"])
        question.save()

        for key, value in received_json_data["OptionVote"].items():  # taking the key and value in the optionvote list
            question.choice_set.create(choice_text=key, vote=value)  # for creating choice
        tag = Tags.objects.values("name")  # taking tag as objects from Tags
        flag = 0
        for x in range(len(received_json_data["Tags"])):  # finding no of tags in Tags
            for y in tag:
                if (y["name"] == received_json_data["Tags"][x]):
                    # comparing object name and name in Tags for finding duplications
                    flag = 1
            if flag == 1:
                question.tags.add(
                    Tags.objects.get(name=received_json_data["Tags"][x]))  # .get for getting it if it exist
            else:
                question.tags.add(
                    Tags.objects.create(name=received_json_data["Tags"][x]))  # .create it if it is not exist

        return HttpResponse("success")



def viewquestion(request):      
    if request.method == 'GET': ##requesting get method
        lis = [] #creating list

        question = Question.objects.all() #calling question from Question model
        ##print(len(question))        
        for x in range(len(question)): #each question adding tags and options

            q=question[x] #taking each question
            ide=str(q.id)
          
            choice_vote = (Choice.objects.filter(question=q).values("choice_text","vote"))#getting choice &vote for the specific question
            choice_vote_dict={} #dic for storing choice & vote
            for c in choice_vote:     #taking each choice and adding vote to them
                ch= c["choice_text"]
                vo= str(c["vote"])
                choice_vote_dict[ch]=vo  #taking each choice and adding vote to them
            T=Tags.objects.filter(question=q).values("name") #taking each tags
            print(T)
            lis_tag=[] 
            for t in T:
                lis_tag.append(t["name"]) #tag to list
           ## for things in T:
              #  q_id = things['question']
                #li.append(q_id)    
            li={"Question_ID":ide,"Question":q.question_text,"OptionVote":choice_vote_dict,"Tags":lis_tag}  #adding each question choice and tag to li
            lis.append(li)      
        ##print(lis)
    return HttpResponse(json.dumps(lis,indent=4),content_type="application/json")
def filtertag(request):

    filtered_tags=request.GET.getlist('selected_tags[]') #getting tags in selectd_tags int to filtered_tags
    
    #print(filtered_tags)
    ##html = "<html><body>It is now .</body></html>"

    lis=[]
    list_id=[]
    for y in filtered_tags:  #taking each tag(y)stored in filtered tags

        T = Tags.objects.filter(name=y).values("question") #filtering each tags according to the question
       # print(T)
        if T.exists():#if tag exist
            for things in T:
                q_id = things['question'] #giving question id to each question according to the tag
                list_id.append(q_id)
            #print(list_id)
    list_id=list(set(list_id))
    for x in list_id: #taking each question according to the id given
        try:

            question = Question.objects.get(id=x) #taking question with id 
            q=question
            choice_vote = (Choice.objects.filter(question=q).values("choice_text", "vote"))
            choice_vote_dict = {}
            for c in choice_vote:  # giving vote as sring to each choices
                ch = c["choice_text"]
                vo = str(c["vote"])
                choice_vote_dict[ch] = vo  # dictionary of choices and votes
            lis_tags = []
            T = Tags.objects.filter(question=q).values("name") #taking tags of each question
            for t in T:
                lis_tags.append(t["name"])
            # list of tags
            li = {"Question_ID":x,"Question": q.question_text, "OptionVote": choice_vote_dict, "Tags": lis_tags}
            lis.append(li)
            #print(lis)
        except Question.DoesNotExist:
            pass
    return HttpResponse(json.dumps(lis, indent=4), content_type="application/json")
def gettags(request): #for getting all tags to the filter table
    ls_tags=[]
    tags_dict={}
    T=Tags.objects.all().values("name")
    for key in T:
        ls_tags.append(key["name"])
    tags_dict["Tags"]=ls_tags
    return HttpResponse(json.dumps(tags_dict,indent=4),content_type="application/json")    
def detail(request,question_id): #by clicking each question in home it must redirect to detail of that question
    global Question_id #declaring question id as global variable
    Question_id=question_id
    return render(request,'polls/detail_poll.html')
def polldetail(request): #taking question,choice ,vote and displaying it in detail.html

    global lis
    lis=[]
    try:
        
        question = Question.objects.get(pk=Question_id)
        q=question
        choice_vote = (Choice.objects.filter(question=q).values("choice_text", "vote"))
        choice_vote_dict = {}
        for c in choice_vote:  # concatenating choice and votes
            ch = c["choice_text"]
            vo = str(c["vote"])
            choice_vote_dict[ch] = vo  # dictionary of choices and votes
        
           
        li = {"Question_ID":Question_id,"Question": q.question_text, "OptionVote": choice_vote_dict}
        #print()
        lis.append(li)
            #print(ls)
    except Question.DoesNotExist:
        pass
    return HttpResponse(json.dumps(lis, indent=4), content_type="application/json")
@csrf_exempt    
def pollvotes(request): 
    if request.method =='PUT':
        data=json.loads(request.body)
        print(data)
        try:
            question = Question.objects.get(pk=Question_id)
            q=question
            choice_vote = (Choice.objects.filter(question=q).values("choice_text", "vote"))
            choice_vote_dict = {}
            for c in choice_vote:
                ch=c["choice_text"]
                if ([ch]==data):
                    int (c["vote"])
                    c["vote"]=c["vote"]+1
                vo = str(c["vote"])
                choice_vote_dict[ch] = vo    

            for key,value in choice_vote_dict.items():
                question.choice_set.create(choice_text=key,vote=value)
        except Question.DoesNotExist:
            pass
    return HttpResponse(request)
