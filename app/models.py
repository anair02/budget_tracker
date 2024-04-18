from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from datetime import datetime, timezone
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class UserInfo(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(120), nullable=False, unique=True)
    password_hash = Column(String(100), nullable=False)
    user_data = relationship("UserData", backref="user", uselist=False)
    budget = relationship("Budget", backref="user", uselist=False)

    def __repr__(self):
        return f"User(id={self.user_id}, username='{self.username}', email='{self.email}')"

class UserData(Base):
    __tablename__ = f"user_{UserInfo.user_id}_data"

    id = Column(Integer, primary_key=True)
    income = Column(Float, nullable=False)
    income_source = Column(String(50), nullable=False)
    expenses = Column(Float, nullable=False)
    expense_category_id = Column(Integer, ForeignKey("expense_categories.id"), nullable=False)
    expense_category = relationship("ExpenseCategory", backref="user_data")
    groceries_expenses = Column(Float, nullable=False)
    insurance_expenses = Column(Float, nullable=False)
    rent_expenses = Column(Float, nullable=False)
    subscription_expenses = Column(Float, nullable=False)
    other_expenses = Column(Float, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc)
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    def __repr__(self):
        return f"UserData(id={self.id}, income={self.income}, income_source='{self.income_source}', expenses={self.expenses}, expense_category='{self.expense_category.name}', groceries_expenses={self.groceries_expenses}, insurance_expenses={self.insurance_expenses}, rent_expenses={self.rent_expenses}, subscription_expenses={self.subscription_expenses}, other_expenses={self.other_expenses})"

    def __repr__(self):
        return f"UserData(id={self.id}, income={self.income}, income_source='{self.income_source}', expenses={self.expenses}, expense_category='{self.expense_category.name}')"

class ExpenseCategory(Base):
    __tablename__ = "expense_categories"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False, unique=True)

    def __repr__(self):
        return f"ExpenseCategory(id={self.id}, name='{self.name}')"

class Budget(Base):
    __tablename__ = "budgets"
    id = Column(Integer, primary_key=True)
    overall_budget = Column(Float, nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"Budget(id={self.id}, overall_budget={self.overall_budget})"