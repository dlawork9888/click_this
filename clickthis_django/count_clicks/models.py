# count_clicks/models.py

from django.db import models

# count_id => AUTO INCREMENT, PK
# clicked_date => Date
 
class ClickModel(models.Model):
    count_id = models.AutoField(primary_key =  True)
    clicked_date = models.DateField(auto_now_add = True) # POST 요청이 들어오면 현재 날짜가 자동으로 생성됨!

    def __str__(self):
        return f"Click {self.count_id} on {self.clicked_date}"