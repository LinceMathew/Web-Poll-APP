from django.urls import path
from .views import createquestion,viewquestion,filtertag,gettags,detail,polldetail,pollvotes

urlpatterns = [
    path("createquestion",createquestion, name ="createquestion"),
    path("viewquestion",viewquestion, name ="viewquestion"),
    path("filtertag",filtertag,name ="filtertag"),
    path("gettags",gettags,name = "gettags"),
    path('<int:question_id>/',detail,name='detail'),
    path("polldetail",polldetail,name='polldetail'),
    path("pollvotes",pollvotes,name='pollvotes')
   ## path("polls/", polls_list, name="polls_list"),
   ## path("polls/<int:pk>/", polls_detail, name="polls_detail")
    ##path("polls/createquestion/",createquestion, name ="createquestion")

]

