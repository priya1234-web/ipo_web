from django.db import models

class IPO(models.Model):
    company_name = models.CharField(max_length=255)
    issue_date = models.DateField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    lot_size = models.IntegerField()
    status = models.CharField(
        max_length=50,
        choices=[
            ('upcoming', 'Upcoming'),
            ('ongoing', 'Ongoing'),
            ('closed', 'Closed')
        ]
    )

    def __str__(self):
        return self.company_name
