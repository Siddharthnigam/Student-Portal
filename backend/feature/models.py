from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    duration = models.CharField(max_length=50)
    level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Certificate(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    duration = models.CharField(max_length=50)
    level = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title

class Workshop(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    date = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    available_seats = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title        