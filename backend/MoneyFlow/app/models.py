from django.db import models

# Create your models here.
class Category(models.Model):
    id = models.AutoField(primary_key=True),
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"  
        ordering = ['name']  

    def __str__(self):
        return self.name

class Income(models.Model):
    id = models.AutoField(primary_key=True),
    amount = models.DecimalField(decimal_places=2),
    date = models.DateField(),
    description = models.CharField(max_length=500)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Income"  
        verbose_name_plural = "Incomes"  
        ordering = ['id']  

    def __str__(self):
        return self.amount

class Expense(models.Model):
    id = models.AutoField(primary_key=True),
    amount = models.DecimalField(decimal_places=2),
    date = models.DateField(),
    description = models.CharField(max_length=500)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Expense"  
        verbose_name_plural = "Expenses"  
        ordering = ['id']  

    def __str__(self):
        return self.amount

