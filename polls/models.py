
from django.db import models


class Tags(models.Model):
    name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    question_text = models.CharField(max_length=200)

    tags = models.ManyToManyField(Tags)



    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    vote = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text


class Vote(models.Model):
    Choice = models.ForeignKey(Choice, related_name='votes', on_delete=models.CASCADE)
    Question = models.ForeignKey(Question, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("Question","Choice")
# Create your models here.
