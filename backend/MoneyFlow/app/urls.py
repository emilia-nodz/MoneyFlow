from app.views import CategoryViewSet, IncomeViewSet, ExpenseViewSet
from rest_framework.routers import DefaultRouter
from app import views

router = DefaultRouter()

router.register(r'category', CategoryViewSet, basename='category')
router.register(r'income', IncomeViewSet, basename='income')
router.register(r'expense', ExpenseViewSet, basename='expense')

urlpatterns = router.urls
